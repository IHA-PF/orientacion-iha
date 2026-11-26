import assert from "node:assert/strict";
import {access, mkdir} from "node:fs/promises";
import {chromium} from "playwright";

const base="http://127.0.0.1:8765";
const languages=[["es","servicios","servicios-y-precios","analisis-de-su-caso"],["en","services","services-and-prices","case-analysis"],["fr","services","services-et-prix","analyse-de-votre-dossier"],["pt","servicos","servicos-e-precos","analise-do-seu-caso"]];
const browser=await chromium.launch();
await mkdir("test-artifacts",{recursive:true});
try {
 for(const [lang,catalog,price,analysis] of languages){
  const page=await browser.newPage({viewport:{width:1440,height:950},reducedMotion:"reduce"});
  const errors=[];page.on("pageerror",e=>errors.push(e.message));
  for(const width of [390,820,1100,1440,1500]){
   await page.setViewportSize({width,height:950});
   const urls=[["home","/?lang="+lang],["catalog","/"+lang+"/"+catalog+"/"],["service","/"+lang+"/"+catalog+"/"+analysis+"/"],["pricing","/"+lang+"/"+price+"/"],["legal-360","/"+lang+"/legal-360/"],["digital-justice-os","/"+lang+"/digital-justice-os/"]];
   for(const [type,url] of urls){
    const response=await page.goto(base+url,{waitUntil:"domcontentloaded"});
    assert.equal(response.status(),200,url);
    await page.locator("body.iha-nav-ready").waitFor({state:"attached"});
    assert.equal(await page.locator("h1").count(),1,url+" headline");
    if(type==="home"){
     const banners=page.locator(".profile-banner");
     assert.equal(await banners.count(),3);
     for(const banner of await banners.all()){
       await banner.scrollIntoViewIfNeeded();await banner.locator("img").evaluate(img=>img.decode());
       await access("."+new URL(await banner.locator("a").getAttribute("href"),base).pathname+"index.html");
     }
     if(lang==="es"&&[390,1440].includes(width)){
       await banners.first().scrollIntoViewIfNeeded();await page.screenshot({path:"test-artifacts/profile-banners-"+width+".png"});
     }
     const tabs=page.locator("#iha-experience [role=tab]");
     await tabs.first().waitFor({state:"visible"});
     assert.equal(await tabs.locator(".service-visual").count(),3);
     const orientation=page.locator(".editorial-choice .editorial-orientation");
     assert.equal(await orientation.count(),3);
     assert.equal(new Set(await orientation.allTextContents()).size,3);
     const destinations=(await orientation.evaluateAll(links=>links.map(link=>link.href))).map(href=>new URL(href));
     assert.deepEqual(destinations.slice(0,2).map(url=>[url.pathname,url.hash]),[
       ["/"+lang+"/"+catalog+"/","#hosts"],["/"+lang+"/"+catalog+"/","#platforms"]
     ]);
     assert.equal(destinations[2].searchParams.get("situation"),"litige");
     const visuals=page.locator(".editorial-services .store-tabs");
     await visuals.scrollIntoViewIfNeeded();
     await visuals.locator("img").evaluateAll(images=>Promise.all(images.map(img=>img.decode())));
     const boxes=await tabs.locator(".service-visual").evaluateAll(items=>items.map(item=>{const {x,y,width,height}=item.getBoundingClientRect();return {x,y,width,height}}));
     assert.ok(boxes.every(b=>b.width/b.height>0.98 && b.width/b.height<1.08));
     assert.equal(Math.round(boxes[0].y)===Math.round(boxes[2].y),width>700);
     if(lang==="es"&&width===1440){
       await visuals.screenshot({path:"test-artifacts/editorial-services-desktop.png"});
       const preview=await visuals.screenshot({type:"jpeg",quality:50});
       console.log("SERVICE_PREVIEW="+preview.toString("base64"));
     }
     if(lang==="es"&&width===390)await visuals.screenshot({path:"test-artifacts/editorial-services-mobile.png"});
     await tabs.first().focus();await page.keyboard.press("ArrowRight");
     assert.equal(await tabs.nth(1).getAttribute("aria-selected"),"true");
     assert.equal(await page.locator("#iha-experience [role=tabpanel]:visible").count(),1);
     assert.equal(await page.locator("#iha-experience a[href*='#module-']").count(),6);
     await page.evaluate(()=>{document.activeElement.blur();scrollTo({top:0,behavior:"instant"})});
    }else if(type==="catalog"){
     assert.equal(await page.locator(".store-family").count(),4);
     const links=await page.locator(".store-family a").evaluateAll(a=>a.map(n=>new URL(n.href).pathname));
     assert.equal(new Set(links).size,13);
     for(const path of links)await access("."+path+"index.html");
    }else if(type==="service"){
     assert.ok(await page.locator("main details").count()>=1,url+" service FAQ");
    }else if(type==="pricing"){
     assert.equal(await page.locator("#compare .store-card").count(),4);
    }else if(type==="legal-360"){
     assert.equal(await page.locator("[id^=module-]").count(),6);
     const motion=page.locator(".legal360-motion");
     await motion.waitFor({state:"visible"});
     const track=motion.locator("[data-motion-track]"), step=motion.locator("[data-motion-step]");
     assert.equal(await track.locator("option").count(),5);
     if([390,1440].includes(width)){
       for(const [index,count] of [4,6,4,6,4].entries()){
         await track.selectOption({index});
         assert.equal(await step.locator("option").count(),count);
         await step.selectOption({index:count-1});
         assert.ok((await motion.locator("[data-motion-title]").textContent()).trim());
         assert.equal(await motion.locator(".motion-scene svg path[d]").count(),3);
         assert.ok(await motion.locator("[data-motion-next]").isDisabled());
       }
       await motion.locator("[data-motion-prev]").click();
       assert.equal(await step.inputValue(),"2");
       await motion.locator("[data-motion-replay]").click();
       assert.equal(await motion.locator(".motion-scene").evaluate(scene=>scene.getAnimations({subtree:true}).length),0);
     }
    }
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),url+" overflow at "+width);
    if(lang==="es"&&[390,1440].includes(width))await page.screenshot({path:"test-artifacts/"+type+"-"+width+".png"});
   }
  }
  const agentPath=lang==="es"?"/ai-agents/":"/"+lang+"/ai-agents/";
  await page.goto(base+agentPath);
  assert.equal(await page.locator("html").getAttribute("lang"),lang);
  await page.locator(".filters button").nth(2).click();
  assert.equal(await page.locator(".grid article:visible").count(),2);
  assert.equal(await page.locator(".filters button").nth(2).getAttribute("aria-pressed"),"true");
  assert.deepEqual(errors,[]);await page.close();
 }
}finally{await browser.close()}
