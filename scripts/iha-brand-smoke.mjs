import assert from "node:assert/strict";
import { chromium } from "playwright";
const browser=await chromium.launch({headless:true});
const pages=[
 ["/","homepage",".os-header-start"],
 ["/es/","language landing",".iha-global-primary"],
 ["/es/prepare-su-caso/","legal intake",".iha-global-primary"],
 ["/en/prepare-your-case/","legal intake en",".iha-global-primary"],
 ["/orientador/","location guide","#app>.hero .btn"]
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
    assert.ok(state.markSrc?.split("?")[0].endsWith("assets/iha-mark.svg"),path+" approved mark must be in header");
    assert.equal(state.markLoaded,true,path+" logo must load");
    assert.equal(state.text,"rgb(16, 16, 16)",path+" body text uses Guesty ink");
    assert.equal(state.bg,"rgb(255, 255, 255)",path+" body uses Guesty white");
    if(cta){
      const el=page.locator(cta).first();
      if(await el.count()){
        // Legacy controls animate from their initial green into the new teal.
        // Wait for the real computed value to settle before asserting.
        await page.waitForFunction(selector=>{
          const node=document.querySelector(selector);
          return !!node&&getComputedStyle(node).backgroundColor==="rgb(0, 122, 103)";
        },cta,{timeout:3500});
        const bg=await el.evaluate(x=>getComputedStyle(x).backgroundColor);
        assert.equal(bg,"rgb(0, 122, 103)",path+" primary action uses Guesty teal, was "+bg);
      }
    }
    const dims=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
    if(dims.scroll>dims.viewport+10){const offenders=await page.evaluate(()=>[...document.querySelectorAll("body *")].map(el=>{const r=el.getBoundingClientRect();return {tag:el.tagName,classes:el.className?.toString().slice(0,75),right:Math.round(r.right),left:Math.round(r.left),width:Math.round(r.width),text:el.textContent?.trim().slice(0,35)}}).filter(o=>o.right>innerWidth+8&&o.width>0).sort((a,b)=>b.right-a.right).slice(0,12));console.log("Overflow diagnostic",path,width,JSON.stringify(offenders));}
    assert.ok(dims.scroll<=dims.viewport+10,path+" layout must not overflow: "+JSON.stringify(dims));
    console.log("Brand palette",path,width,"OK");
    await page.close();
  }
 }

 // Regresión (captura real de un cliente): en tema oscuro del navegador, la portada sigue clara y legible.
 // Los servicios ya no tienen copia dentro de la aplicación: #servicios lleva a la página única.
 for(const width of [390,1440]){
   const page=await browser.newPage({viewport:{width,height:900},colorScheme:"dark"});
   page.on("pageerror",e=>error.push("dark home "+e.message));
   const res=await page.goto("http://127.0.0.1:8765/?lang=es",{waitUntil:"domcontentloaded"});
   assert.equal(res?.status(),200,"home should respond 200");
   await page.locator("body.iha-nav-ready").waitFor({state:"attached",timeout:15000});
   const state=await page.evaluate(()=>({theme:document.documentElement.dataset.theme,
     logoLoaded:document.querySelector("header img.iha-brand-symbol")?.naturalWidth>0,
     overflowing:document.documentElement.scrollWidth>document.documentElement.clientWidth+10}));
   assert.equal(state.theme,"light","home must not inherit the old dark theme");
   assert.equal(state.logoLoaded,true,"IHA symbol must load");
   assert.equal(state.overflowing,false,"home must fit viewport");
   await page.goto("http://127.0.0.1:8765/?lang=es#servicios");
   await page.waitForURL(u=>u.pathname==="/es/servicios-y-precios/",{timeout:8000});
   console.log("Dark-mode home regression",width,"OK");
   await page.close();
 }

 assert.equal(error.length,0,error.join("; "));
}finally{await browser.close();}