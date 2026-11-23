import assert from "node:assert/strict";
import { readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { chromium } from "playwright";
const base="http://127.0.0.1:8765";
const dirs={es:"es/servicios",en:"en/services",fr:"fr/services",pt:"pt/servicos"};
const plans={es:"es/plan-anfitrion-en-regla",en:"en/host-compliance-plan",fr:"fr/abonnement-hote-en-regle",pt:"pt/plano-anfitriao-em-dia"};
const browser=await chromium.launch({headless:true});
const ctx=await browser.newContext({viewport:{width:1440,height:900}});
const screenshotNames={
 "es/servicios/analisis-de-su-caso":"service-analysis-desktop.png",
 "fr/services/verification-logement-en-regle":"service-housing-fr-desktop.png",
 "pt/plano-anfitriao-em-dia":"service-host-plan-pt-desktop.png"
};
await mkdir("test-artifacts",{recursive:true});
let count=0;
try{
 for(const [lang,dir] of Object.entries(dirs)){
  const items=(await readdir(dir,{withFileTypes:true})).filter(x=>x.isDirectory()).map(x=>dir+"/"+x.name).filter(path=>existsSync(path+"/index.html"));
  assert.equal(items.length,16,lang+" exactly 16 detailed offers (excluding annual plan)");
  items.push(plans[lang]);
  for(const path of items){
   const page=await ctx.newPage();
   const errors=[];page.on("pageerror",err=>errors.push(err.message));
   const res=await page.goto(base+"/"+path+"/",{waitUntil:"domcontentloaded",timeout:30000});
   assert.equal(res?.status(),200,path+" returned non-200");
   const hero=page.locator(".iha-service-hero");
   await hero.waitFor({state:"visible",timeout:10000});
   assert.equal(await page.locator("main.w h1").count(),1,path+" needs a single original h1");
   assert.equal(await hero.locator("a.iha-service-hero-action").count(),1,path+" first CTA missing");
   assert.equal(await page.locator(".iha-service-layout").count(),1,path+" structure missing");
   assert.equal(await page.locator(".iha-service-steps .iha-service-step").count(),3,path+" must show 3 process steps");
   assert.ok(await page.locator("main details.iha-service-question").count()>=2,path+" FAQ derived from existing terms");
   const sidebar=page.locator(".iha-service-aside");
   assert.equal(await sidebar.locator("section").count(),2,path+" must preserve pricing and contact sections");
   assert.ok((await sidebar.locator("section").first().innerText()).length>40,path+" price panel absent");
   assert.ok((await page.locator(".iha-service-details section").count())>=3,path+" included/excluded/terms incomplete");
   assert.equal(await page.locator(".langs a[hreflang]").count(),3,path+" language links missing");
   const dim=await page.evaluate(()=>({vw:document.documentElement.clientWidth,sw:document.documentElement.scrollWidth}));
   assert.ok(dim.sw<=dim.vw+10,path+" has horizontal overflow "+JSON.stringify(dim));
   const upcoming=/(?:curso-en-linea|online-course|cours-en-ligne|curso-on-line|auditoria-de-trans|audit-de-transition|zoning-plan-pot|auditoria-de-transicao)/.test(path);
   assert.equal(await hero.locator(".iha-service-state").count(),upcoming?1:0,path+" upcoming status wrong");
   assert.deepEqual(errors,[],path+" browser exceptions");
   if(screenshotNames[path])await page.screenshot({path:"test-artifacts/"+screenshotNames[path],fullPage:false});
   await page.close();
   count++;
  }
  const catalog=await ctx.newPage();
  const res=await catalog.goto(base+"/"+dir+"/",{waitUntil:"domcontentloaded"});
  assert.equal(res?.status(),200,lang+" catalog HTTP error");
  await catalog.locator("body.iha-catalog-premium").waitFor({state:"attached",timeout:10000});
  assert.equal(await catalog.locator(".store-family").count(),4,lang+" four families");
  assert.equal(await catalog.locator(".store-card").count(),17,lang+" seventeen services");
  assert.equal(await catalog.locator(".iha-catalog-upcoming").count(),2,lang+" two planned offers");
  assert.equal(await catalog.locator(".iha-catalog-upcoming .iha-catalog-tag").count(),2,lang+" status tag visible");
  if(lang==="es")await catalog.screenshot({path:"test-artifacts/service-catalog-es-desktop.png",fullPage:false});
  await catalog.close();
 }
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 for(const [lang,path] of Object.entries({es:"es/servicios/analisis-de-su-caso",en:"en/services/host-alerts",fr:"fr/services/reclamation-apres-votre-depart",pt:"pt/plano-anfitriao-em-dia"})){
  const page=await mobile.newPage();
  await page.goto(base+"/"+path+"/",{waitUntil:"domcontentloaded"});
  await page.locator(".iha-service-hero").waitFor({state:"visible"});
  const metrics=await page.evaluate(()=>({vw:document.documentElement.clientWidth,sw:document.documentElement.scrollWidth,columns:getComputedStyle(document.querySelector(".iha-service-layout")).gridTemplateColumns}));
  assert.ok(metrics.sw<=metrics.vw+10,lang+" mobile overflow "+JSON.stringify(metrics));
  assert.equal(await page.locator(".iha-service-steps .iha-service-step").count(),3);
  if(lang==="es")await page.screenshot({path:"test-artifacts/service-mobile-es.png",fullPage:false});
  await page.close();
 }
 await mobile.close();
 console.log("Premium service test passed: "+count+" individual pages, four catalogues, four mobile samples.");
}finally{await ctx.close();await browser.close();}