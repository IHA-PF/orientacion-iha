import assert from "node:assert/strict";
import {existsSync,readFileSync} from "node:fs";
import {dirname,resolve,sep} from "node:path";
import {fileURLToPath} from "node:url";

const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const languages=["es","en","fr","pt"];
const host="https://ihasolucioneslegales.com.co";
const read=p=>readFileSync(resolve(root,p),"utf8");
const target=url=>{
  const u=new URL(url,host);
  assert.equal(u.origin,host,"Unexpected origin in internal URL");
  const rel=decodeURIComponent(u.pathname).replace(/^\/+/, "");
  const file=resolve(root,rel.endsWith("/")?rel+"index.html":rel);
  assert.ok(file.startsWith(root+sep),"Path escaped repository");
  return file;
};
const counts={pages:0,localLinks:0,structuredData:0,languageAlternates:0};
const sitemap=read("sitemap.xml");
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
assert.equal(new Set(urls).size,urls.length,"Sitemap contains duplicate URLs");

for(const lang of languages){
  const pagePath=`${lang}/digital-justice-os/index.html`;
  const content=read(pagePath);
  assert.match(content,/^<!doctype html>/i,"Missing doctype");
  assert.match(content,/<meta name="description"/,"Missing SEO description");
  assert.match(content,/<meta http-equiv="Content-Security-Policy"/,"Missing CSP");
  assert.match(content,/<\/html>\s*$/i,"Missing HTML closing tag");
  assert.equal((content.match(/<details>/g)||[]).length,6,"Relationship explorer incomplete");
  assert.equal((content.match(/<\/details>/g)||[]).length,6,"Unclosed relationship panel");
  const canonical=`${host}/${lang}/digital-justice-os/`;
  assert.ok(content.includes(`<link rel="canonical" href="${canonical}">`),"Incorrect canonical");
  assert.ok(urls.includes(canonical),"Missing sitemap entry");
  const alt=[...content.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)];
  assert.equal(alt.length,5,"Missing alternate languages");
  for(const [,code,href] of alt){ assert.ok(existsSync(target(href)),`Missing hreflang target ${code}`);counts.languageAlternates++; }
  const metadata=content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(metadata,"Missing schema.org metadata");
  const schema=JSON.parse(metadata[1]);
  assert.equal(schema["@graph"][0].url,canonical,"Wrong JSON-LD page URL");
  assert.equal(schema["@graph"][0]["@type"],"WebPage","Planned software incorrectly advertised as service");
  counts.structuredData++;
  for(const match of content.matchAll(/<(?:a|img)\b[^>]*?\b(?:href|src)="([^"]+)"/g)){
    const link=match[1];
    if(link.startsWith("#")||link.startsWith("mailto:")||link.startsWith("tel:")||link.startsWith("data:"))continue;
    const u=new URL(link,canonical);
    if(u.origin!==host)continue;
    assert.ok(existsSync(target(u.href)),`Broken link in ${pagePath}: ${link}`);
    counts.localLinks++;
  }
  const guidance=read(`${lang}/index.html`);
  const services=read(`${lang}/legal-360/index.html`);
  assert.match(guidance,/class="os-promo"/,"Language index lacks OS promo");
  assert.match(guidance,/class="os-link"/,"Language index lacks nav link");
  assert.match(services,/class="os-related"/,"LEGAL 360 lacks OS CTA");
  assert.match(services,/href="\.\.\/digital-justice-os\/"/,"LEGAL 360 lacks correct link");
  counts.pages++;
}
const home=read("index.html");
assert.ok(home.includes("os-simple-home"),"Main homepage lacks simplified orientation");
assert.ok(home.includes('href="simple-orientation.css"'),"Simplified homepage stylesheet is missing");
assert.equal((home.match(/class="os-spotlight"/g)||[]).length,0,"Legacy technical banner crowds the homepage");
assert.ok(home.includes('href="digital-justice-os/"'),"Digital Justice OS must remain accessible");
assert.ok(home.includes('href="legal-360/"'),"Legal services must remain accessible");
assert.ok(read("digital-justice-os/index.html").includes("digital-justice-os-redirect.js"),"Locale router missing");
assert.ok(read("digital-justice-os-redirect.js").includes("location.replace"),"Locale redirect missing");
assert.ok(read("llms.txt").includes("## IHA Digital Justice OS"),"Language-model index missing project");
console.log("IHA Digital Justice OS: PASS",counts);
