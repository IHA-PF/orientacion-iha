import assert from "node:assert/strict";
import { chromium } from "playwright";
const browser=await chromium.launch({headless:true});
const pages=[
 ["/","homepage",".os-header-start"],
 ["/es/","language landing",".iha-global-primary"],
 ["/es/prepare-su-caso/","legal intake",".iha-global-primary"],
 ["/en/prepare-your-case/","legal intake en",".iha-global-primary"],
 ["/fr/legal-360/","LEGAl 360 fr","header .btn"],
 ["/pt/digital-justice-os/","OS pt",".hero .btn"],
 ["/orientador/","location guide","#app>.hero .btn"],
 ["/ai-agents/","agents",".access"]
];
const error=[];
try{
 for(const width of [390,1440]){
  for(const [path,label,cta] of pages){
    const page=await browser.newPage({viewport:{width,height:900}});
    page.on("pageerror",e=>error.push(path+" JS: "+e.message));
    const res=await page.goto("http://127.0.0.1:8765"+path,{waitUntil:"domcontentloaded"});
    assert.equal(res?.status(),200,path+" HTTP 200");
    await page.locator("#iha-brand-theme").waitFor({state:"attached",timeout:12000});
    await page.locator("header .brand img.iha-brand-symbol").waitFor({state:"visible",timeout:12000});
    await page.waitForFunction(()=>Boolean(document.querySelector("#iha-brand-theme")?.sheet),null,{timeout:12000});
    const state=await page.evaluate(()=>{
      const color=x=>getComputedStyle(x).backgroundColor;
      const mark=document.querySelector("header .brand img.iha-brand-symbol");
      const style=document.getElementById("iha-brand-theme");
      return {markSrc:mark?.getAttribute("src"),markLoaded:!!mark?.complete&&mark.naturalWidth>0,
        text:getComputedStyle(document.body).color,bg:color(document.body),stylesheet:style?.href,
        iconHref:document.querySelector("link[rel=icon]")?.href || ""};
    });
    assert.ok(state.markSrc?.endsWith("assets/iha-mark.svg"),path+" approved mark must be in header");
    assert.equal(state.markLoaded,true,path+" logo must load");
    assert.equal(state.text,"rgb(16, 16, 16)",path+" body text uses Guesty ink");
    assert.equal(state.bg,"rgb(255, 255, 255)",path+" body uses Guesty white");
    if(cta){
      const el=page.locator(cta).first();
      if(await el.count()){
        const bg=await el.evaluate(x=>getComputedStyle(x).backgroundColor);
        assert.equal(bg,"rgb(0, 122, 103)",path+" primary action uses Guesty teal, was "+bg);
      }
    }
    const dims=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
    assert.ok(dims.scroll<=dims.viewport+10,path+" layout must not overflow: "+JSON.stringify(dims));
    console.log("Brand palette",path,width,"OK");
    await page.close();
  }
 }

 // Regression from a real customer screenshot: pricing in dark browser theme
 // had forest-green hero, black headings on dark cards and yellow accents.
 for(const width of [390,1440]){
   const page=await browser.newPage({viewport:{width,height:900},colorScheme:"dark"});
   page.on("pageerror",e=>error.push("pricing "+e.message));
   const res=await page.goto("http://127.0.0.1:8765/#servicios",{waitUntil:"domcontentloaded"});
   assert.equal(res?.status(),200,"pricing SPA should respond 200");
   await page.locator(".sv-path").first().waitFor({state:"visible",timeout:15000});
   await page.locator("#iha-brand-theme").waitFor({state:"attached",timeout:12000});
   await page.waitForFunction(()=>Boolean(document.getElementById("iha-brand-theme")?.sheet),null,{timeout:12000});
   const colors=await page.evaluate(()=>{
     const c=(sel,attr="color")=>{const el=document.querySelector(sel);return el?getComputedStyle(el)[attr]:"missing"};
     return {
       theme:document.documentElement.dataset.theme,
       header:c("body>header.bar","backgroundColor"),
       hero:c(".band.compact","backgroundColor"),
       heroText:c(".band.compact h1"),
       card:c(".sv-path","backgroundColor"),
       cardHeading:c(".sv-path h2"),
       cardBody:c(".sv-path .sp-sub"),
       accent:c(".sv-path.sp-guest","borderTopColor"),
       wordmark:getComputedStyle(document.querySelector("header .os-wordmark")).display,
       logoLoaded:document.querySelector("header img.iha-brand-symbol")?.naturalWidth>0,
       overflowing:document.documentElement.scrollWidth>document.documentElement.clientWidth+10
     };
   });
   assert.equal(colors.theme,"light","pricing must not inherit old dark theme");
   assert.equal(colors.hero,"rgb(245, 250, 248)","pricing hero must use pale mint");
   assert.equal(colors.heroText,"rgb(16, 16, 16)","pricing headline must be black on mint");
   assert.equal(colors.card,"rgb(255, 255, 255)","pricing cards must be white");
   assert.equal(colors.cardHeading,"rgb(16, 16, 16)","card headings must be readable");
   assert.equal(colors.accent,"rgb(0, 122, 103)","card border must use teal, not yellow");
   assert.notEqual(colors.wordmark,"none","IHA wordmark should be visible next to logo");
   assert.equal(colors.logoLoaded,true,"IHA symbol must load");
   assert.equal(colors.overflowing,false,"pricing must fit viewport");
   await page.screenshot({path:"test-artifacts/guesty-pricing-"+width+".png",fullPage:false});
   console.log("Pricing dark-mode regression",width,"OK",JSON.stringify(colors));
   await page.close();
 }

 assert.equal(error.length,0,error.join("; "));
}finally{await browser.close();}