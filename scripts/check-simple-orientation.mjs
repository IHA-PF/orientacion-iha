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
assert.ok(home.includes('ke("all")')&&home.includes("ke(sector)"),"Guide stays reachable from search and category choices");
assert.ok(home.includes("O=input.value.trim()"),"Search forwards the entered phrase to existing guide");
assert.ok(home.includes('data-nav="guide"')&&home.includes('data-nav="servicios"'),"Guide/services remain in top nav");
assert.ok(home.includes('href="legal-360/"')&&home.includes('href="digital-justice-os/"'),"Services and technology accessible");
assert.ok(home.includes('data-t="navZona"')&&home.includes('data-t="navExpress"'),"Secondary orientation links localized");
assert.ok(!css.includes("14px/1.2 inherit"),"Valid font declarations");
assert.ok(css.includes("@media(max-width:610px)"),"Mobile layout defined");

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

for(const lang of ["es","en","fr","pt"]){
  const hub=read(lang+"/index.html");
  const page=read(lang+"/digital-justice-os/index.html");
  const legal=read(lang+"/legal-360/index.html");
  assert.ok(hub.includes('href="digital-justice-os/"'),lang+" hub links project page");
  assert.ok(page.includes('href="../legal-360/"'),lang+" technology links actual legal services");
  assert.ok(page.includes('href="../'),lang+" technology has working local navigation");
  assert.ok(legal.includes('href="../digital-justice-os/"'),lang+" LEGAL 360 links technology");
  assert.ok(existsSync(lang+"/digital-justice-os/index.html"));
  assert.ok(page.includes("EN DESARROLLO")||page.includes("IN DEVELOPMENT")||page.includes("EN DÉVELOPPEMENT")||page.includes("EM DESENVOLVIMENTO"),lang+" clear development label");
  assert.ok(page.includes("<title>")&&page.includes('rel="canonical"'),lang+" discoverable metadata");
  assert.equal((page.match(/<details>/g)||[]).length,6,lang+" interactive map preserved");
}
assert.ok(existsSync("orientador/index.html"),"Legacy geographic guidance kept");
assert.ok(existsSync("digital-justice-os/index.html"),"Multilingual entry fallback kept");
console.log("IHA simplified orientation: static checks and inline JavaScript parsing passed.");
