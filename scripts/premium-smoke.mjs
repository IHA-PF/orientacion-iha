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
 // Transparent header acceptance: homepage, hero subpages and an illustrated service page.
 for(const [path,headerSel,heroSel] of [
   ["/?lang=es","header.bar",".os-simple-home"],
   ["/es/legal-360/","body > header",".hero"],
   ["/en/digital-justice-os/","body > header",".hero"],
   ["/es/prepare-su-caso/","body > header",".iha-global-hero"]
 ]){
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const pageErrors=[];page.on("pageerror",e=>pageErrors.push(e.message));
  const response=await page.goto("http://127.0.0.1:8765"+path,{waitUntil:"domcontentloaded"});
  assert.equal(response?.status(),200,path+" should load");
  await page.locator(heroSel).waitFor({state:"visible",timeout:10000});
  await page.waitForFunction(()=>document.body.dataset.ihaGlassBound==="true",{timeout:8000});
  const style=await page.locator(headerSel).evaluate(el=>({
   pos:getComputedStyle(el).position,
   filter:getComputedStyle(el).backdropFilter||getComputedStyle(el).webkitBackdropFilter,
   background:getComputedStyle(el).backgroundColor,
   gradient:getComputedStyle(el).backgroundImage,
   headerHeight:el.getBoundingClientRect().height
  }));
  assert.equal(style.pos,"fixed",path+" header must overlay the hero");
  assert.notEqual(style.filter,"none",path+" header must have glass blur");
  // A blurred dark opaque header is not a transparent header. Check actual alpha.
  const alpha=c=>{const m=c.match(/rgba?\(([^)]+)\)/);return m?(m[1].split(",")[3]===undefined?1:Number(m[1].split(",")[3])):1};
  assert.ok(alpha(style.background)<=0.38,path+" navbar must be genuinely transparent (alpha <= 0.38): "+JSON.stringify(style));
  const artwork=await page.locator(heroSel).evaluate(el=>{
    const computed=getComputedStyle(el);
    if(el.classList.contains("iha-global-hero"))return Boolean(el.querySelector(".iha-global-visual img")?.complete);
    return computed.backgroundImage.includes("iha-premium-");
  });
  assert.ok(artwork,path+" hero artwork must be behind transparent navbar");
  assert.ok(style.headerHeight>40,path+" must have a substantial nav");
  const top=await page.locator(heroSel).boundingBox();
  assert.ok(top&&top.y>=-3&&top.y<50,path+" must extend beneath the header: "+JSON.stringify(top));
  await page.evaluate(()=>window.scrollTo(0,550));
  await page.waitForFunction(()=>document.body.classList.contains("iha-glass-scrolled"),{timeout:3000});
  const scrollColor=await page.locator(headerSel).evaluate(el=>getComputedStyle(el).backgroundColor);
  assert.ok(alpha(scrollColor)>=0.85,path+" nav should become opaque when scrolled: "+scrollColor);
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.waitForFunction(()=>!document.body.classList.contains("iha-glass-scrolled"),{timeout:3000});
  assert.equal(pageErrors.length,0,path+" must not have browser exceptions "+pageErrors.join(";"));
  if(path.includes("legal-360"))await page.screenshot({path:"test-artifacts/legal360-transparent-header.png",fullPage:false});
  console.log("Transparent header",path,"OK");
  await page.close();
 }
}finally{await browser.close();}
