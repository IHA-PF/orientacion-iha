import assert from "node:assert/strict";
import {mkdir} from "node:fs/promises";
import {chromium} from "playwright";

const browser=await chromium.launch();
await mkdir("test-artifacts",{recursive:true});
try{
 for(const width of [390,820,1100,1440,1887]){
  const page=await browser.newPage({viewport:{width,height:width===1887?628:900},reducedMotion:"reduce"});
  await page.goto("http://127.0.0.1:8765/?lang=es");
  await page.locator("body.iha-nav-ready .home-picker").waitFor();
  const box=selector=>page.locator(selector).first().boundingBox();
  const title=await box(".home-copy h1"),panel=await box(".home-picker"),lead=await box(".home-copy .os-premium-lead");
  const photo=page.locator(".home-preview img");await photo.evaluate(img=>img.decode());
  const dimensions=await photo.evaluate(img=>({width:img.clientWidth,height:img.clientHeight,ratio:img.naturalWidth/img.naturalHeight,fit:getComputedStyle(img).objectFit}));
  assert.ok(dimensions.width>0 && Math.abs(dimensions.height-dimensions.width/dimensions.ratio)<1.1,"Entire LEGAL 360 photograph is visible at "+width);
  assert.equal(dimensions.fit,"contain");
  console.log("First screen",width,JSON.stringify({title,panel,lead}));
  if(width===1887){
   assert.ok(title.x>90 && title.x<145 && title.y>115 && title.y<180,"title origin");
   assert.ok(panel.x>1000 && panel.x<1140 && panel.y>350 && panel.y<445,"choice panel origin");
   assert.ok(panel.width>630 && panel.width<760,"choice panel width");
   await page.screenshot({path:"test-artifacts/home-reference-width.png"});
   const preview=await page.screenshot({type:"jpeg",quality:53});
   console.log("HOME_REVIEW="+preview.toString("base64"));
  }
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),"horizontal overflow");
  // Cada opción lleva a su servicio (27/11/2026): conflicto y alojamiento abren la orientación gratuita;
  // «Consultar a una abogada» abre la ficha del servicio con su precio.
  await page.locator(".home-option").nth(1).click();await page.locator(".home-picker button[type=submit]").click();
  await page.waitForFunction(()=>location.hash==="#anfitrion"&&document.querySelector("#app .opt"));
  await page.goto("http://127.0.0.1:8765/?lang=es");await page.locator("body.iha-nav-ready .home-picker").waitFor();
  await page.locator(".home-option").nth(2).click();
  assert.match(await page.locator(".home-picker button[type=submit]").innerText(),/servicio/);
  await page.locator(".home-picker button[type=submit]").click();
  await page.waitForURL("**/es/servicios/pregunta-escrita-a-una-abogada/");
  await page.close();
 }
}finally{await browser.close()}
