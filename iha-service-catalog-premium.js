/* Premium catalogue progressive enhancement: visual states only.
   Existing service cards, prices, destinations and legal copy remain unchanged. */
(function(){
 "use strict";
 function init(){
   const main=document.querySelector("main.store-wrap");
   if(!main||!main.querySelector(".store-family")||document.body.classList.contains("iha-catalog-premium"))return;
   document.body.classList.add("iha-catalog-premium");
   const lang=(document.documentElement.lang||"es").slice(0,2).toLowerCase();
   const state={es:"En preparación",en:"In preparation",fr:"En préparation",pt:"Em preparação"}[lang]||"En preparación";
   for(const card of main.querySelectorAll(".store-family .store-card")){
     const href=card.querySelector("a[href]")?.getAttribute("href")||"";
     if(!/(?:curso-en-linea|online-course|cours-en-ligne|curso-on-line|auditoria-de-trans|audit-de-transition|zoning-plan-pot|auditoria-de-transicao)/i.test(href))continue;
     card.classList.add("iha-catalog-upcoming");
     const tag=document.createElement("span");
     tag.className="iha-catalog-tag";tag.textContent=state;
     const h=card.querySelector("h3");if(h)card.insertBefore(tag,h);
   }
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();