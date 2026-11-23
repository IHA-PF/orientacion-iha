import assert from "node:assert/strict";
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
const browser=await chromium.launch({headless:true});
const cases=[
 ["/es/prepare-su-caso/","es",true],
 ["/en/prepare-your-case/","en",true],
 ["/fr/preparez-votre-dossier/","fr",true],
 ["/pt/prepare-o-seu-caso/","pt",true],
 ["/es/me-cancelaron-la-reserva/","es",true],
 ["/es/servicios/analisis-de-su-caso/","es",true],
 ["/es/servicios-y-precios/","es",true],
 ["/fr/legal-360/","fr",false],
 ["/pt/digital-justice-os/","pt",false]
];
try{
 await mkdir("test-artifacts",{recursive:true});
 for(const [path,lang,legacy] of cases){
  for(const width of [390,1440]){
   const page=await browser.newPage({viewport:{width,height:900},locale:lang==="pt"?"pt-BR":lang});
   const errors=[]; page.on("pageerror",e=>errors.push(e.message));
   const res=await page.goto("http://127.0.0.1:8765"+path,{waitUntil:"domcontentloaded",timeout:30000});
   assert.equal(res?.status(),200,path+" must load");
   assert.equal(await page.locator("h1").count(),1,path+" must keep exactly one h1");
   if(legacy){
    await page.locator(".iha-global-hero").waitFor({state:"visible",timeout:9000});
    assert.equal(await page.locator(".iha-global-feature-card").count(),3,path+" must have three premium cards");
    assert.equal(await page.locator(".iha-global-steps article").count(),3,path+" must have process cards");
    assert.equal(await page.locator(".iha-global-visual img").evaluate(n=>n.complete && n.naturalWidth>0),true,path+" hero must load image");
    const style=await page.locator(".iha-global-hero").evaluate(n=>getComputedStyle(n).display);
    assert.equal(style,"grid",path+" premium grid CSS should be active");
   }else{
    await page.locator(".iha-subpage-experience").waitFor({state:"visible",timeout:9000});
   }
   assert.equal(errors.length,0,path+" browser errors "+JSON.stringify(errors));
   const dims=await page.evaluate(()=>({w:document.documentElement.clientWidth,scroll:document.body.scrollWidth}));
   assert.ok(dims.scroll<=dims.w+8,path+" viewport overflow "+JSON.stringify(dims));
   if(path==="/es/prepare-su-caso/")await page.screenshot({path:"test-artifacts/prepare-su-caso-"+width+".png",fullPage:true});
   console.log(path,width,"OK");
   await page.close();
  }
 }
 // Contrast regression: pale premium heroes must never retain white-on-white text.
 for(const lang of ["es","en","fr","pt"]){
  for(const subpage of ["legal-360","digital-justice-os"]){
   for(const width of [390,1440]){
    const page=await browser.newPage({viewport:{width,height:900}});
    const path="/"+lang+"/"+subpage+"/";
    const result=await page.goto("http://127.0.0.1:8765"+path,{waitUntil:"domcontentloaded"});
    assert.equal(result?.status(),200,path+" must load");
    const contrast=await page.locator(".hero").evaluate(hero=>{
      const textNode=selector=>hero.querySelector(selector);
      const col=el=>getComputedStyle(el).color;
      const rgb=s=>s.match(/[\d.]+/g).slice(0,3).map(Number);
      const luminance=s=>{
       const channels=rgb(s).map(c=>{c/=255;return c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4});
       return channels[0]*0.2126+channels[1]*0.7152+channels[2]*0.0722;
      };
      const headings=[textNode("h1"),textNode(".lead"),textNode(".eyebrow")].filter(Boolean);
      const secondary=textNode(".btn.secondary, .btn.outline");
      return {headingColors:headings.map(col),headingLuminances:headings.map(x=>luminance(col(x))),secondaryColor:secondary?col(secondary):null,secondaryLuminance:secondary?luminance(col(secondary)):null,background:getComputedStyle(hero).backgroundImage};
    });
    assert.ok(contrast.headingLuminances.every(x=>x<0.22),path+" light hero must use dark heading, lead and eyebrow text: "+JSON.stringify(contrast));
    assert.ok(contrast.secondaryLuminance!==null&&contrast.secondaryLuminance<0.22,path+" secondary CTA needs dark, legible text: "+JSON.stringify(contrast));
    if(lang==="es"&&subpage==="legal-360")await page.screenshot({path:"test-artifacts/legal360-contrast-"+width+".png",fullPage:false});
    console.log("Hero contrast",path,width,"OK");
    await page.close();
   }
  }
 }
}finally{await browser.close();}
