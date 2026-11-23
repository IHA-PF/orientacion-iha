/* IHA brand system: an original approved symbol + uniform Guesty-inspired palette.
   No third-party images, logo or code is used. */
(()=>{"use strict";
 if(window.__IHA_BRAND_SYSTEM_LOADED)return;
 window.__IHA_BRAND_SYSTEM_LOADED=true;
 // Keep the legal-tech visual identity consistent even when the browser prefers dark mode.
 // The older app's automatic dark palette caused near-black cards with black lettering.
 document.documentElement.dataset.theme="light";
 try{localStorage.setItem("iha-theme","light")}catch(_){}
 const current=document.currentScript;
 const base=current&&current.src?new URL(".",current.src):new URL("/",location.href);
 const path=(f)=>new URL(f,base).href;
 const cssUrl=path("iha-guesty-theme.css?v=20261123-v3");
 const existing=document.getElementById("iha-brand-theme")||document.querySelector('link[href*="iha-guesty-theme.css"]');
 if(existing){existing.id="iha-brand-theme";if(existing.href!==cssUrl)existing.href=cssUrl;}
 else {const css=document.createElement("link");css.rel="stylesheet";css.id="iha-brand-theme";css.href=cssUrl;document.head.append(css);}
 function apply(){
   const logo=path("assets/iha-mark.svg");
   const oldFavicon=document.querySelector("link[rel='icon']");
   if(oldFavicon){oldFavicon.href=logo;oldFavicon.type="image/svg+xml";}
   else{const icon=document.createElement("link");icon.rel="icon";icon.type="image/svg+xml";icon.href=logo;document.head.append(icon);}
   const brand=document.querySelector("header .brand");
   if(!brand)return;
   if(brand.querySelector(".iha-brand-symbol"))return;
   const existing=brand.querySelector("img");
   let el;
   if(existing){
     el=existing;el.src=logo;el.srcset="";el.removeAttribute("style");el.alt="";
     el.classList.remove("mono");el.classList.add("iha-brand-symbol");
     el.width=41;el.height=41;el.decoding="async";
   }else{
     el=document.createElement("img");el.src=logo;el.alt="";el.width=41;el.height=41;
     el.className="iha-brand-symbol";el.decoding="async";
     brand.prepend(el);
   }
   // Pages which formerly used a monogram alone still need visible IHA lettering.
   if(!/\bIHA\b/i.test(brand.textContent)){
     const text=document.createElement("span");
     text.className="iha-wordmark-text";text.textContent="IHA";
     el.insertAdjacentElement("afterend",text);
   }
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",apply,{once:true});else apply();
})();