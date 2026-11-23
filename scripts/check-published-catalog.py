"""Verify the Pages rollout using public HTML and the exact catalogue CSS."""
import hashlib
import time
from pathlib import Path
from urllib.error import URLError
from urllib.request import Request, urlopen

ORIGIN = "https://ihasolucioneslegales.com.co"
def fetch(path):
    request = Request(ORIGIN + path, headers={"Cache-Control": "no-cache"})
    with urlopen(request, timeout=12) as response:
        return response.read()

expected = Path("iha-experience.css").read_bytes()
digest = hashlib.sha256(expected).hexdigest()[:12]
for attempt in range(35):
    try:
        if fetch("/iha-experience.css?release=" + digest) == expected:
            break
    except URLError:
        pass
    time.sleep(8)
else:
    raise RuntimeError("Pages has not served the expected catalogue stylesheet")

routes = {"es": ("servicios", "servicios-y-precios", "analisis-de-su-caso"),
          "en": ("services", "services-and-prices", "case-analysis"),
          "fr": ("services", "services-et-prix", "analyse-de-votre-dossier"),
          "pt": ("servicos", "servicos-e-precos", "analise-do-seu-caso")}
for lang, (catalog, prices, service) in routes.items():
    for path, marker in [(catalog, 'class="store-family"'), (prices, 'id="compare"'),
                         (catalog + "/" + service, '<h1>'), ("legal-360", 'id="module-06"'),
                         ("digital-justice-os", '<h1')]:
        url = "/" + lang + "/" + path + "/"
        assert marker in fetch(url).decode(), url
        print(ORIGIN + url)
assert 'os-simple-home' in fetch("/").decode()
assert 'home-masthead' in fetch("/iha-experience.js?release=" + digest).decode()
