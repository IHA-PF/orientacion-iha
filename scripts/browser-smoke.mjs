import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const BASE = "http://127.0.0.1:8765";
const strings = {
  es:"Soluciones jurídicas e inteligencia para plataformas digitales",
  en:"Legal solutions and intelligence for digital platforms",
  fr:"Solutions juridiques et intelligence pour les plateformes numériques",
  pt:"Soluções jurídicas e inteligência para plataformas digitais"
};
const browser = await chromium.launch({headless:true});
const results = [];
try {
  await mkdir("test-artifacts", {recursive:true});
  for(const [lang,expectedTitle] of Object.entries(strings)){
    for(const mobile of [false,true]){
      const page = await browser.newPage({
        viewport:mobile?{width:390,height:844}:{width:1440,height:900},
        deviceScaleFactor:1,
        isMobile:mobile,
        hasTouch:mobile,
        locale:lang==="pt"?"pt-BR":lang
      });
      const errors=[];
      page.on("pageerror", error=>errors.push(error.message));
      const response=await page.goto(BASE+"/?lang="+lang,{waitUntil:"domcontentloaded",timeout:35000});
      assert.equal(response?.status(),200,"Home request returned HTTP error");
      const headline=page.locator("#app .os-simple-home h1");
      try {
        await headline.waitFor({state:"visible",timeout:7000});
      } catch(error){
        const diagnostics=await page.evaluate(()=>({
          readyState:document.readyState,
          language:document.documentElement.lang,
          location:location.href,
          appHTML:(document.querySelector("#app")?.innerHTML||"").slice(0,1000),
          bodyPreview:document.body.innerText.slice(0,1000),
          scripts:document.querySelectorAll("script").length
        }));
        await page.screenshot({path:"test-artifacts/diagnostic-"+lang+"-"+(mobile?"mobile":"desktop")+".png",fullPage:true});
        console.error("BROWSER DEBUG",JSON.stringify({lang,mobile,diagnostics,errors},null,2));
        throw error;
      }
      assert.equal((await headline.textContent())?.trim(),expectedTitle,"Wrong localized headline");
      assert.equal(await page.locator(".os-simple-choices button").count(),3,"Exactly three choices should be visible");
      assert.equal(await page.locator(".os-two-cards > article").count(),2,"Both audience cards must be visible");
      assert.equal(await page.locator(".os-benefit").count(),3,"Host needs three understandable benefits");
      assert.equal(await page.locator(".os-host-cta").isVisible(),true,"Host solutions CTA not visible");
      assert.equal(await page.locator(".os-host-link").getAttribute("href"),"digital-justice-os/","Technology link must use existing page");
      assert.ok((await page.locator("#os-host-title").textContent())?.length>50,"Localized host title missing");
      assert.equal(await page.locator(".os-header-start").textContent(),({es:"Comenzar",en:"Start",fr:"Commencer",pt:"Começar"})[lang],"Header CTA is not localized");
      assert.equal(await page.locator(".os-spotlight").count(),0,"The technology promo must not crowd the home");
      assert.equal(await page.locator(".os-simple-cta").isVisible(),true,"Action is not visible");
      const layout=await page.evaluate(()=>({
        viewport:document.documentElement.clientWidth,
        bodyWidth:document.body.scrollWidth,
        font: getComputedStyle(document.querySelector(".os-simple-cta")).fontFamily,
        inputWidth:document.querySelector("#os-situation").getBoundingClientRect().width
      }));
      assert.ok(layout.inputWidth>=130,"Search input too narrow");
      assert.ok(layout.bodyWidth<=layout.viewport+6,"Horizontal overflow on "+lang+" "+(mobile?"mobile":"desktop")+": "+JSON.stringify(layout));
      assert.equal(errors.length,0,"Uncaught browser errors: "+errors.join("; "));
      await page.screenshot({path:"test-artifacts/"+lang+"-"+(mobile?"mobile":"desktop")+".png",fullPage:true});
      if(mobile){
        const text="reserva cancelada y falta de reembolso";
        await page.locator("#os-situation").fill(text);
        await page.locator(".os-simple-cta").click();
        await page.locator("#guide-search").waitFor({state:"visible",timeout:18000});
        assert.equal(await page.locator("#guide-search").inputValue(),text,"Search did not pass the phrase to legal guide");
      }else{
        await page.locator(".os-choice").first().click();
        await page.locator("#guide-search").waitFor({state:"visible",timeout:18000});
        assert.ok(page.url().includes("#guia"),"Bookings did not open legal guide");
        const checked=await page.locator(".chips button[aria-pressed=true]").count();
        assert.equal(checked,1,"Guide should mark the selected category");
      }
      if(!mobile){
        await page.goto(BASE+"/?lang="+lang,{waitUntil:"domcontentloaded"});
        await page.locator(".os-host-cta").click();
        await page.waitForURL(/#servicios/, {timeout:10000});
        assert.equal(await page.locator(".os-simple-home").count(),0,"Host CTA did not open actual services");
        assert.ok(await page.locator("#app h1").isVisible(),"Host CTA destination has no heading");
      }
      results.push(lang+"-"+(mobile?"mobile":"desktop")+": OK");
      await page.close();
    }
    const page=await browser.newPage();
    for(const path of ["/"+lang+"/legal-360/","/"+lang+"/digital-justice-os/"]){
      const r=await page.goto(BASE+path,{waitUntil:"domcontentloaded"});
      assert.equal(r?.status(),200,"Missing services or technology page: "+path);
      assert.ok((await page.locator("h1").count())>=1,"Missing first-level heading on "+path);
    }
    await page.close();
  }
  console.log("Playwright browser tests passed:\n"+results.join("\n"));
} finally {
  await browser.close();
}
