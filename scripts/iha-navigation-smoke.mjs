import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
// Cabecera organizada como Guesty (27/11/2026): tres menús con grupos, dos enlaces directos, acceso y acción principal.
const browser=await chromium.launch({headless:true});
const targets=[
 ["/?lang=es","es"],
 ["/?lang=en","en"],
 ["/?lang=fr","fr"],
 ["/?lang=pt","pt"]
];
const expected={
 es:["/es/servicios-y-precios/","/?lang=es#como-trabajamos","/es/prepare-su-caso/"],
 en:["/en/services-and-prices/","/?lang=en#como-trabajamos","/en/prepare-your-case/"],
 fr:["/fr/services-et-prix/","/?lang=fr#como-trabajamos","/fr/preparez-votre-dossier/"],
 pt:["/pt/servicos-e-precos/","/?lang=pt#como-trabajamos","/pt/prepare-o-seu-caso/"]
};
await mkdir("test-artifacts",{recursive:true});
try{
 for(const width of [390,820,1100,1440]){
  for(const [url,lang] of targets){
   const page=await browser.newPage({viewport:{width,height:950},colorScheme:"dark"});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   const response=await page.goto("http://127.0.0.1:8765"+url,{waitUntil:"domcontentloaded"});
   assert.equal(response?.status(),200,url+" HTTP status");
   await page.locator("body.iha-nav-ready > header").waitFor({state:"visible",timeout:13000});
   const finalLang=(await page.locator("html").getAttribute("lang")).slice(0,2);
   const want=expected[finalLang]||expected.es;
   assert.equal(await page.locator("header .iha-nav-layout").count(),1,url+" one layout");
   const menus=page.locator("header .iha-nav-organised > details.iha-nav-menu");
   assert.equal(await menus.count(),3,url+" three organised menus");
   const links=page.locator("header .iha-nav-organised > a.iha-nav-link");
   assert.equal(await links.count(),2,url+" two direct links");
   assert.deepEqual(await links.evaluateAll(a=>a.map(x=>x.getAttribute("href"))),want.slice(0,2),url+" link targets");
   assert.equal(await page.locator("header .iha-nav-start").getAttribute("href"),want[2],url+" main action sends the case");
   // Cada entrada de menú tiene título y destino propio; ninguna se repite.
   const items=await page.locator("header .iha-nav-organised a.iha-nav-item").evaluateAll(a=>a.map(x=>x.getAttribute("href")));
   assert.ok(items.length>=18,url+" menu entries "+items.length);
   assert.equal(new Set(items).size,items.length,url+" no duplicate destinations");
   const state=await page.evaluate(()=>{
    const header=document.querySelector("body > header"),g=header.querySelector(".iha-nav-groups"),n=header.querySelector(".iha-nav-right");
    const boxes=[header.querySelector(".brand"),g,n].map(x=>{const r=x.getBoundingClientRect();return {x:r.x,w:r.width}});
    return {boxes,menuDisplay:getComputedStyle(header.querySelector(".iha-nav-mobile-button")).display,navDisplay:getComputedStyle(g).display,
      viewport:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth};
   });
   assert.ok(state.scroll<=state.viewport+12,url+" horizontal overflow "+JSON.stringify(state));
   if(width>1279){
    assert.notEqual(state.navDisplay,"none",url+" desktop nav should show");
    assert.equal(state.menuDisplay,"none",url+" desktop menu button should hide");
    assert.ok(state.boxes[0].x<state.boxes[1].x&&state.boxes[1].x<state.boxes[2].x,url+" order brand, links, actions "+JSON.stringify(state.boxes));
    await menus.nth(1).locator("summary").click();
    await menus.nth(1).locator(".iha-nav-item").first().waitFor({state:"visible"});
    await menus.nth(0).locator("summary").click();
    await page.waitForFunction(()=>!document.querySelectorAll("header .iha-nav-organised > details.iha-nav-menu")[1].open,null,{timeout:3000});
    if(width===1440&&url==="/?lang=es")await page.screenshot({path:"test-artifacts/iha-navigation-desktop.png",fullPage:false});
    await page.keyboard.press("Escape");
    assert.equal(await menus.nth(0).evaluate(d=>d.open),false,url+" Escape closes the menu");
   }else{
    assert.equal(state.navDisplay,"none",url+" mobile navigation closed by default");
    const menu=page.locator("header .iha-nav-mobile-button");
    await menu.click();
    assert.equal(await menu.getAttribute("aria-expanded"),"true");
    await menus.first().locator("summary").click();
    await menus.first().locator(".iha-nav-item").first().waitFor({state:"visible"});
    assert.equal(await page.locator("header .iha-nav-organised .iha-mobile-access").count(),1,url+" portal access in mobile nav");
    if(width===390&&url==="/?lang=es")await page.screenshot({path:"test-artifacts/iha-navigation-mobile.png",fullPage:false});
    await page.keyboard.press("Escape");
    assert.equal(await menu.getAttribute("aria-expanded"),"false",url+" Escape closes the menu");
   }
   assert.equal(errors.length,0,url+" browser errors: "+JSON.stringify(errors));
   console.log("Navigation",url,width,"OK");
   await page.close();
  }
 }
}finally{await browser.close();}
