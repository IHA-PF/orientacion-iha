import {chromium} from "playwright";
import {readFile,writeFile} from "node:fs/promises";

const paths=["home-1440","home-390","mega-menu","catalog-1440","service-1440","pricing-1440","legal-360-1440","digital-justice-os-1440"];
const browser=await chromium.launch();
try{
 const page=await browser.newPage({viewport:{width:1040,height:770}});
 const cards=[];
 for(const name of paths){
  const bytes=await readFile("test-artifacts/"+name+".png");
  cards.push('<figure><img src="data:image/png;base64,'+bytes.toString("base64")+'"><figcaption>'+name+'</figcaption></figure>');
 }
 await page.setContent('<style>*{box-sizing:border-box}body{margin:8px;background:#eef2f1;font:14px system-ui;display:grid;grid-template-columns:repeat(3,1fr);gap:10px}figure{margin:0;background:white;padding:5px}img{width:100%;height:208px;object-fit:contain}figcaption{margin:4px}</style>'+cards.join(""));
 const sheet=await page.screenshot({path:"test-artifacts/layout-review.jpg",type:"jpeg",quality:55});
 // A small inline preview lets reviewers inspect the sheet through the job log.
 console.log("IHA_REVIEW_PREVIEW="+sheet.toString("base64"));
 const metrics=[];
 await Promise.all([390,1440].flatMap(width=>["es/","es/soluciones/","es/precios/","features/"].map(async route=>{
   const tab=await browser.newPage({viewport:{width,height:950}});
   try{
    const response=await tab.goto("https://www.guesty.com/"+route,{waitUntil:"domcontentloaded",timeout:22000});
    const layout=await tab.evaluate(()=>{
      const visible=s=>[...document.querySelectorAll(s)].find(e=>e.getBoundingClientRect().height>0);
      const box=e=>{if(!e)return null;const r=e.getBoundingClientRect();const s=getComputedStyle(e);return {x:Math.round(r.x),y:Math.round(r.y),width:Math.round(r.width),height:Math.round(r.height),font:s.fontSize}};
      return {title:document.title,header:box(visible("header")),heading:box(visible("h1")),button:box(visible("header button,header a"))};
    });
    metrics.push({route,width,http:response.status(),...layout});
   }catch(error){metrics.push({route,width,error:error.message.split("\n")[0]})}
   finally{await tab.close()}
 })));
 console.log("REFERENCE_GEOMETRY="+JSON.stringify(metrics));
 await writeFile("test-artifacts/reference-geometry.json",JSON.stringify(metrics,null,2));
}finally{await browser.close()}
