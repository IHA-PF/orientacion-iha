/* IHA lightweight Guesty-inspired navigation (original IHA design). */
(()=>{"use strict";
if(window.__ihaNavigationActive)return;
window.__ihaNavigationActive=true;
const languageFromPath=()=>{const m=location.pathname.match(/^\/(es|en|fr|pt)(?:\/|$)/);return m?.[1]||document.documentElement.lang.slice(0,2).toLowerCase().replace("br","pt")||"es"};
const messages={
 es:{nav:"Navegación principal",problem:"Resolver un problema",hosts:"Anfitriones",prices:"Servicios y precios",how:"Cómo trabajamos",language:"Idioma",access:"Acceder",start:"Enviar mi caso",menu:"Menú",accessHead:"Acceso privado IHA",accessNote:"El portal privado está en preparación y el acceso será por invitación.",request:"Solicitar invitación",emergency:"Ayuda urgente · 123"},
 en:{nav:"Main navigation",problem:"Solve a problem",hosts:"Hosts",prices:"Services and prices",how:"How we work",language:"Language",access:"Log in",start:"Send my case",menu:"Menu",accessHead:"IHA private access",accessNote:"The private portal is being prepared. Access will be by invitation.",request:"Request an invitation",emergency:"Emergency help · 123"},
 fr:{nav:"Navigation principale",problem:"Résoudre un problème",hosts:"Hôtes",prices:"Services et prix",how:"Notre méthode",language:"Langue",access:"Accéder",start:"Envoyer mon dossier",menu:"Menu",accessHead:"Accès privé IHA",accessNote:"Le portail privé est en préparation. L’accès se fera sur invitation.",request:"Demander une invitation",emergency:"Urgence · 123"},
 pt:{nav:"Navegação principal",problem:"Resolver um problema",hosts:"Anfitriões",prices:"Serviços e preços",how:"Como trabalhamos",language:"Idioma",access:"Acessar",start:"Enviar meu caso",menu:"Menu",accessHead:"Acesso privado IHA",accessNote:"O portal privado está em preparação e terá acesso por convite.",request:"Solicitar convite",emergency:"Emergência · 123"}
};
// Arquitectura simple (revisión del 27/11/2026): cuatro entradas, una por necesidad, sin menús desplegables.
const prepSlug={es:"prepare-su-caso",en:"prepare-your-case",fr:"preparez-votre-dossier",pt:"prepare-o-seu-caso"};
const hostSlug={es:"plan-anfitrion-en-regla",en:"host-compliance-plan",fr:"abonnement-hote-en-regle",pt:"plano-anfitriao-em-dia"};
const serviceSlug={es:"servicios-y-precios",en:"services-and-prices",fr:"services-et-prix",pt:"servicos-e-precos"};
const languageLabel={es:"Español",en:"English",fr:"Français",pt:"Português"};
function create(tag,cls,txt){const el=document.createElement(tag);if(cls)el.className=cls;if(txt!=null)el.textContent=txt;return el}
function lnk(text,href,cls){const e=create("a",cls,text);e.href=href;return e}
const links=code=>{const t=messages[code];return [
 [t.problem,"/?lang="+code+"#guia"],
 [t.hosts,"/"+code+"/"+hostSlug[code]+"/"],
 [t.prices,"/"+code+"/"+serviceSlug[code]+"/"],
 [t.how,"/?lang="+code+"#como-trabajamos"]]};
function init(){
 const header=document.querySelector("body > header");
 if(!header || header.dataset.ihaNavInstalled)return;
 const inner=header.querySelector(":scope > .bar-in, :scope > .hb, :scope > .head, :scope > .wrap, :scope > .in")||header.firstElementChild;
 const brand=inner?.querySelector(":scope > .brand");
 if(!brand)return;
 const lang=messages[languageFromPath()]?languageFromPath():"es",t=messages[lang];
 const nav=create("nav","iha-nav-groups iha-nav-flat");
 nav.setAttribute("aria-label",t.nav);
 const flat=links(lang).map(([title,url],i)=>{const a=lnk(title,url,"iha-nav-link"+(i===2?" iha-nav-price":""));nav.append(a);return a});
 const here=location.pathname+location.search+location.hash;
 flat.forEach(a=>{const u=a.getAttribute("href");if(u===location.pathname||u===here)a.setAttribute("aria-current","page")});
 const right=create("div","iha-nav-right");
 const oldTools=inner.querySelector(":scope > .tools");
 const oldLang=oldTools?.querySelector("#lm");
 if(oldLang){
   oldLang.classList.add("iha-nav-existing-language");
   right.append(oldLang);
   const codeLabel=oldLang.querySelector("#lcur");
   if(codeLabel){
     const titleCase=()=>{
       const raw=codeLabel.textContent.trim();
       const label=raw?raw.slice(0,1).toUpperCase()+raw.slice(1).toLowerCase():raw;
       if(label!==raw)codeLabel.textContent=label;
     };
     new MutationObserver(titleCase).observe(codeLabel,{childList:true,characterData:true,subtree:true});
     titleCase();
   }
 }else{
   const languages=create("details","iha-nav-dropdown iha-nav-language");
   const sum=create("summary","iha-nav-trigger",lang[0].toUpperCase()+lang.slice(1));
   sum.append(create("span","iha-nav-chevron"));
   const panel=create("div","iha-nav-panel");
   const present=document.querySelectorAll('nav.langs a[hreflang],.langs a[hreflang]');
   const targets={};
   for(const a of document.querySelectorAll('link[rel="alternate"][hreflang]'))targets[a.hreflang.slice(0,2).toLowerCase()]=a.href;
   for(const a of present){const langCode=a.getAttribute("hreflang")?.slice(0,2).toLowerCase();if(langCode)targets[langCode]=a.href}
   for(const code of ["es","en","fr","pt"]){
     const url=code===lang?location.href:(targets[code]||"/?lang="+code+"#inicio");
     const a=lnk(languageLabel[code],url,"iha-nav-entry");
     a.lang=code;
     if(code===lang)a.setAttribute("aria-current","page");
     panel.append(a);
   }
   languages.append(sum,panel);right.append(languages);
 }
 const access=create("details","iha-nav-dropdown iha-nav-access");
 const accessTrigger=create("summary","iha-nav-trigger iha-nav-login",t.access);
 const accessPanel=create("div","iha-nav-panel iha-nav-access-panel");
 const aTitle=create("strong","iha-nav-access-title",t.accessHead);
 const aNote=create("p","iha-nav-access-note",t.accessNote);
 const aRequest=lnk(t.request,"mailto:contacto@ihasolucioneslegales.com.co?subject="+encodeURIComponent("IHA LEGAL 360 - "+t.request),"iha-nav-entry iha-nav-request");
 accessPanel.append(aTitle,aNote,aRequest);
 access.append(accessTrigger,accessPanel);right.append(access);
 const mobileAccess=access.cloneNode(true);mobileAccess.classList.add("iha-mobile-access");nav.append(mobileAccess);
 const start=lnk(t.start,"/"+lang+"/"+prepSlug[lang]+"/","iha-nav-start");
 right.append(start);
 const menuBtn=create("button","iha-nav-mobile-button");
 menuBtn.type="button";menuBtn.setAttribute("aria-label",t.menu);menuBtn.setAttribute("aria-expanded","false");
 const bars=create("span","iha-nav-mobile-bars");bars.setAttribute("aria-hidden","true");menuBtn.append(bars);
 const menuId="iha-menu-"+lang;nav.id=menuId;menuBtn.setAttribute("aria-controls",menuId);
 // Preserve the emergency button's existing click handler by moving it into the menu.
 const sos=oldTools?.querySelector("#sosbtn");
 if(sos){const holder=create("div","iha-nav-urgent");const label=create("span",null,t.emergency);holder.append(label,sos);nav.append(holder)}
 // Keep original application navigation mounted so its state handlers still run,
 // but substitute our link-based navigation for user interaction.
 const oldNav=inner.querySelector(":scope > nav:not(.iha-nav-groups)");
 if(oldNav){oldNav.classList.add("iha-nav-original");oldNav.setAttribute("aria-hidden","true");oldNav.querySelectorAll("button,a").forEach(el=>el.tabIndex=-1)}
 const oldCTA=Array.from(inner.children).filter(el=>el.matches("a.go,a.btn,a.access")&&!el.classList.contains("iha-nav-start"));
 oldCTA.forEach(el=>{el.classList.add("iha-nav-original-cta");el.tabIndex=-1;el.setAttribute("aria-hidden","true")});
 if(oldTools){oldTools.classList.add("iha-nav-original-tools");oldTools.querySelectorAll("a,button").forEach(el=>{el.tabIndex=-1;el.setAttribute("aria-hidden","true")})}
 // Preserve visual order: logo, dropdowns + pricing, language/login/start, mobile menu.
 inner.append(nav,right,menuBtn);
 inner.classList.add("iha-nav-layout");
 const closeAll=except=>header.querySelectorAll(".iha-nav-dropdown[open]").forEach(d=>{if(d!==except)d.open=false});
 header.querySelectorAll(".iha-nav-dropdown").forEach(d=>d.addEventListener("toggle",()=>{if(d.open)closeAll(d)}));
 document.addEventListener("click",e=>{if(!header.contains(e.target))closeAll()});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"){const active=header.querySelector("details[open] > summary");if(active)active.focus();else if(inner.classList.contains("iha-nav-mobile-open"))menuBtn.focus();closeAll();if(inner.classList.contains("iha-nav-mobile-open"))menuBtn.focus();inner.classList.remove("iha-nav-mobile-open");menuBtn.setAttribute("aria-expanded","false")}});
 menuBtn.addEventListener("click",()=>{const open=inner.classList.toggle("iha-nav-mobile-open");menuBtn.setAttribute("aria-expanded",String(open));if(!open)closeAll()});
 nav.addEventListener("click",e=>{if(e.target.closest("a")){inner.classList.remove("iha-nav-mobile-open");menuBtn.setAttribute("aria-expanded","false");closeAll()}});
 right.addEventListener("click",e=>{if(e.target.closest("a"))closeAll()});
 // The public app switches languages without a full page reload. Keep this nav localized.
 const syncLanguage=()=>{
   const code=languageFromPath(),nt=messages[code]||messages.es;
   links(code).forEach(([title,url],i)=>{flat[i].textContent=title;flat[i].href=url});
   nav.setAttribute("aria-label",nt.nav);
   start.textContent=nt.start;start.href="/"+code+"/"+prepSlug[code]+"/";
   for(const d of [access,mobileAccess]){
     d.querySelector("summary").textContent=nt.access;
     d.querySelector(".iha-nav-access-title").textContent=nt.accessHead;
     d.querySelector(".iha-nav-access-note").textContent=nt.accessNote;
     const req=d.querySelector(".iha-nav-request");req.textContent=nt.request;req.href="mailto:contacto@ihasolucioneslegales.com.co?subject="+encodeURIComponent("IHA LEGAL 360 - "+nt.request);
   }
   menuBtn.setAttribute("aria-label",nt.menu);
   const urgent=nav.querySelector(".iha-nav-urgent span");if(urgent)urgent.textContent=nt.emergency;
 };
 const langWatcher=new MutationObserver(()=>syncLanguage());
 langWatcher.observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});

 header.dataset.ihaNavInstalled="true";
 document.body.classList.add("iha-nav-ready");
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();