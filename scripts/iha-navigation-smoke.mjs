import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
const browser=await chromium.launch({headless:true});
const targets=[
 ["/?lang=es#servicios","es"],
 ["/es/legal-360/","es"],
 ["/fr/preparez-votre-dossier/","fr"],
 ["/pt/digital-justice-os/","pt"],
 ["/ai-agents/","es"]
];
await mkdir("test-artifacts",{recursive:true});
try{
 for(const width of [390,820,1100,1440,1500]){
  for(const [url,lang] of targets){
   const page=await browser.newPage({viewport:{width,height:950},colorScheme:"dark"});
   const errors=[];page.on("pageerror",e=>errors.push(e.message));
   const response=await page.goto("http://127.0.0.1:8765"+url,{waitUntil:"domcontentloaded"});
   assert.equal(response?.status(),200,url+" HTTP status");
   await page.locator("body.iha-nav-ready > header").waitFor({state:"visible",timeout:13000});
   assert.equal(await page.locator("header .iha-nav-layout").count(),1,url+" one layout");
   assert.equal(await page.locator("header .iha-nav-groups > details").count(),4,url+" three menus and mobile access");
   assert.equal(await page.locator("header .iha-nav-price").count(),1,url+" pricing link");
   assert.equal(await page.locator("header .iha-nav-start").count(),1,url+" start CTA");
   // Header transitions from the page's legacy theme to the new white translucent style.
   // Check after the transition has actually settled rather than sampling mid-animation.
   await page.waitForFunction(()=>{
     const h=document.querySelector("body.iha-nav-ready > header");
     if(!h)return false;
     const m=getComputedStyle(h).backgroundColor.match(/rgba?\(([^)]+)\)/);
     return m&&m[1].split(",").slice(0,3).map(Number).every(x=>x===255);
   },null,{timeout:4500});
   const state=await page.evaluate(()=>{
    const header=document.querySelector("body > header"),g=header.querySelector(".iha-nav-groups"),n=header.querySelector(".iha-nav-right");
    const boxes=[header.querySelector(".brand"),g,n].map(x=>{const r=x.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}});
    return {headerBg:getComputedStyle(header).backgroundColor,
      heroText:getComputedStyle(header).color,
      logoLoaded:header.querySelector("img.iha-brand-symbol")?.complete&&header.querySelector("img.iha-brand-symbol")?.naturalWidth>0,
      boxes,menuDisplay:getComputedStyle(header.querySelector(".iha-nav-mobile-button")).display,
      navDisplay:getComputedStyle(g).display,
      cta:getComputedStyle(header.querySelector(".iha-nav-start")).backgroundColor,
      viewport:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,
      href:header.querySelector(".iha-nav-price").parentElement.querySelector("a").getAttribute("href")};
   });
   assert.equal(state.logoLoaded,true,url+" IHA logo loads");
   assert.ok(state.headerBg.includes("255, 255, 255"),url+" white transparent navigation: "+JSON.stringify(state));
   assert.equal(state.cta,"rgb(216, 242, 242)",url+" light turquoise CTA");
   assert.ok(/^\/(es\/servicios|en\/services|pt\/servicos|fr\/services)\/$/.test(state.href),url+" pricing route must work");
   assert.ok(state.scroll<=state.viewport+12,url+" horizontal overflow "+JSON.stringify(state));
   if(width===1440 && url==="/?lang=es#servicios"){
    const geometry=await page.evaluate(()=>{
      const header=document.querySelector("body.iha-nav-ready > header");
      const brand=header.querySelector(".brand").getBoundingClientRect();
      const first=header.querySelector(".iha-nav-groups > details > summary").getBoundingClientRect();
      const nav=header.querySelector(".iha-nav-groups");
      return {logoToMenu:first.left-brand.right,firstX:first.left,
        headerHeight:header.getBoundingClientRect().height,
        visibleWordmark:getComputedStyle(header.querySelector(".brand .brand-t")).display,
        navGap:getComputedStyle(nav).columnGap};
    });
    assert.ok(geometry.firstX>=340&&geometry.firstX<=390,"Guesty-inspired first menu position "+JSON.stringify(geometry));
    assert.ok(geometry.logoToMenu>=170&&geometry.logoToMenu<=310,"Generous logo-to-menu whitespace "+JSON.stringify(geometry));
    assert.ok(geometry.headerHeight>=84&&geometry.headerHeight<=100,"Reference-style header height "+JSON.stringify(geometry));
    assert.equal(geometry.visibleWordmark,"none","Compact IHA header wordmark");
   }
   const group=page.locator("header .iha-nav-groups");
   const platform=group.locator(":scope > details").first();
   if(width>1050){
    assert.notEqual(state.navDisplay,"none",url+" desktop nav should show");
    assert.equal(state.menuDisplay,"none",url+" desktop menu button should hide");
    assert.ok(state.boxes[0].x<state.boxes[1].x && state.boxes[1].x<state.boxes[2].x,url+" order brand, menus, actions "+JSON.stringify(state.boxes));
    await platform.locator("summary").click();
    await platform.locator(".iha-nav-panel a").first().waitFor({state:"visible"});
    assert.ok((await platform.locator(".iha-nav-panel a").count())>=4,url+" active submenu");
    if(width===1440 && url.includes("#servicios"))await page.screenshot({path:"test-artifacts/mega-menu.png"});
    await page.keyboard.press("Escape");
    assert.equal(await platform.evaluate(el=>el.open),false,url+" Escape closes dropdown");
   }else{
    assert.equal(state.navDisplay,"none",url+" mobile navigation closed by default");
    const menu=page.locator("header .iha-nav-mobile-button");
    await menu.click();
    assert.equal(await menu.getAttribute("aria-expanded"),"true");
    await group.waitFor({state:"visible"});
    await platform.locator("summary").click();
    await platform.locator(".iha-nav-panel a").first().waitFor({state:"visible"});
    assert.equal(await group.locator(".iha-mobile-access").count(),1,url+" portal access in mobile nav");
    await menu.click();assert.equal(await menu.getAttribute("aria-expanded"),"false");
   }
   if(width===1440&&lang==="es"&&url.includes("servicios")){
    await page.screenshot({path:"test-artifacts/iha-navigation-pricing-desktop.png",fullPage:false});
   }
   if(width===390&&lang==="es"&&url.includes("legal-360")){
    await page.screenshot({path:"test-artifacts/iha-navigation-legal-mobile.png",fullPage:false});
   }
   assert.equal(errors.length,0,url+" browser errors: "+JSON.stringify(errors));
   console.log("Navigation",url,width,"OK");
   await page.close();
  }
 }
}finally{await browser.close();}
