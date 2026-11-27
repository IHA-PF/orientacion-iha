import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { Script } from "node:vm";

const read = path => readFileSync(path,"utf8");
const home = read("index.html");
const css = read("simple-orientation.css");

assert.ok(home.includes('href="simple-orientation.css"'),"Homepage links responsive CSS");
assert.ok(home.includes("os-simple-home"),"New orientation hero is the default home");
assert.equal((home.match(/class="os-spotlight"/g)||[]).length,0,"Old technical banner removed");
// Tarjetas de la portada (27/11/2026): la búsqueda propone las fichas que coinciden y abre su orientación;
// las categorías abren la orientación de ese sector; la guía completa sigue en «Resolver un problema».
assert.ok(home.includes('href:"#orientar-"+cs.id')&&home.includes('href:"#"+sector'),"Search and categories lead to the matching orientation");
assert.ok(home.includes("O=input.value.trim()"),"Search forwards the entered phrase to existing guide");
assert.ok(home.includes('data-nav="guide"'), "Guide remains in top nav");
assert.match(home, /<a[^>]*id="iha-offer-nav"[^>]*href="\/es\/servicios-y-precios\/"/, "Pricing menu links to the single services page");
assert.ok(home.includes('href="#como-trabajamos"'),"How we work is reachable from the homepage");
assert.ok(home.includes('<script src="/iha-routes.js'),"In-app copies redirect to their single static page");
assert.ok(home.includes('data-t="navZona"')&&home.includes('data-t="navExpress"'),"Secondary orientation links localized");
assert.ok(!css.includes("14px/1.2 inherit"),"Valid font declarations");
assert.ok(css.includes("@media(max-width:700px)"),"Mobile layout defined");
assert.ok(home.includes('class:"os-two-cards"'),"Two-column layout must exist");
assert.ok(home.includes('class:"os-host-cta"'),"Professional services must be accessible");
assert.ok(home.includes('class:"os-host-cta",href:"#anfitrion"'),"Host CTA opens the free host check");
assert.ok(!home.includes('os-technology-tab')&&!home.includes('os-ai-agents-tab'),"Internal concept tabs removed from the homepage");
assert.ok(css.includes("grid-template-columns:repeat(2,minmax(0,1fr))"),"Desktop layout should have two columns");

const scripts = [...home.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
const csp = home.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/)?.[1];
assert.ok(csp,"Strict Content Security Policy is required");
const scriptSource = csp.match(/script-src ([^;]+);/)?.[1];
assert.ok(scriptSource,"CSP must include a script-src directive");
assert.ok(!scriptSource.includes("'unsafe-inline'"),"Inline scripts must use SHA-256 hashes, not unsafe-inline");
let executableScripts=0;
for(const [,attrs,body] of scripts){
  if(attrs.includes("src="))continue;
  const digest=createHash("sha256").update(body,"utf8").digest("base64");
  assert.ok(scriptSource.includes("'sha256-"+digest+"'"),"CSP hash missing or stale for inline script");
  if(attrs.includes("application/ld+json")){JSON.parse(body);continue;}
  if(body.trim()){new Script(body,{filename:"index.html:inline-script"});executableScripts++;}
}
assert.ok(executableScripts>=2,"Homepage JavaScript syntax validated");

// Arquitectura simple (27/11/2026): páginas fusionadas → página de renvío sin indexar.
const moved={"legal-360":"#como-trabajamos","digital-justice-os":"#como-trabajamos","ai-agents":"#como-trabajamos"};
const servicesSlug={es:["servicios","servicios-y-precios"],en:["services","services-and-prices"],fr:["services","services-et-prix"],pt:["servicos","servicos-e-precos"]};
for(const lang of ["es","en","fr","pt"]){
  for(const [dir,hash] of Object.entries(moved)){
    if(lang==="es"&&dir==="ai-agents")continue;
    const stub=read(lang+"/"+dir+"/index.html");
    assert.ok(stub.includes('content="noindex')&&stub.includes("url=/?lang="+lang+hash),lang+"/"+dir+" redirects to how we work");
  }
  const [old,now]=servicesSlug[lang];
  assert.ok(read(lang+"/"+old+"/index.html").includes("url=/"+lang+"/"+now+"/"),lang+" catalogue index redirects to the single services page");
  const hub=read(lang+"/index.html");
  assert.ok(!/href="[^"]*(legal-360|digital-justice-os)\//.test(hub),lang+" hub no longer links merged pages");
}
assert.ok(read("ai-agents/index.html").includes("url=/?lang=es#como-trabajamos"),"Agents page redirects");
assert.ok(read("zona-prueba/index.html").includes("url=/orientador/"),"Test page redirects to the area guide");
assert.ok(existsSync("orientador/index.html"),"Geographic guidance kept");
const routes=read("iha-routes.js");
assert.ok(routes.includes('"caso":')&&routes.includes('"servicio":'),"Route map generated");
console.log("IHA simplified orientation: static checks and inline JavaScript parsing passed.");
