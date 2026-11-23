"""Inventory static public HTML, SEO tags, and same-site link destinations."""
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
from xml.etree import ElementTree

ORIGIN = "https://ihasolucioneslegales.com.co"
class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.canonical = None
        self.languages = []
        self.h1 = 0
        self.redirect = False
        self.schema = 0
    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == "h1":
            self.h1 += 1
        if tag == "meta" and attrs.get("http-equiv", "").lower() == "refresh":
            self.redirect = True
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href")
        if tag == "link" and "hreflang" in attrs:
            self.languages.append(attrs["hreflang"])
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self.schema += 1
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])

sitemap = {node.text for node in ElementTree.parse("sitemap.xml").iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")}
inventory = []
broken = set()
for file in sorted(Path(".").rglob("index.html")):
    if any(part in {"node_modules", ".git", "test-artifacts"} for part in file.parts):
        continue
    path = "/" + file.as_posix().removesuffix("index.html")
    page = Page()
    page.feed(file.read_text(encoding="utf-8"))
    for href in page.links:
        url = urlsplit(urljoin(ORIGIN + path, href))
        if url.netloc != urlsplit(ORIGIN).netloc:
            continue
        target = Path(unquote(url.path).lstrip("/"))
        if not target.exists():
            broken.add((path, href))
    inventory.append(dict(path=path, canonical=page.canonical, headings=page.h1,
                          redirect=page.redirect, languages=page.languages, structured_data=page.schema,
                          sitemap=ORIGIN+path in sitemap, static_links=len(page.links)))
Path("test-artifacts").mkdir(exist_ok=True)
Path("test-artifacts/public-audit.json").write_text(json.dumps({"pages":inventory,"missing_paths":sorted(broken)}, ensure_ascii=False, indent=2))
print(f"Public HTML inventory: {len(inventory)} pages, {len(broken)} unresolved local destinations.")
for path, href in sorted(broken):
    print("UNRESOLVED",path,href)
