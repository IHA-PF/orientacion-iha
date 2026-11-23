/* IHA lightweight Guesty-inspired navigation (original IHA design). */
(()=>{"use strict";
if(window.__ihaNavigationActive)return;
window.__ihaNavigationActive=true;
const languageFromPath=()=>{const m=location.pathname.match(/^\/(es|en|fr|pt)(?:\/|$)/);return m?.[1]||document.documentElement.lang.slice(0,2).toLowerCase().replace("br","pt")||"es"};
const messages={
 es:{platform:"Plataforma",solutions:"Soluciones",prices:"Precio",language:"Idioma",access:"Acceder",start:"Empezar",menu:"Menú",home:"Inicio",guide:"Guía jurídica",digital:"Digital Justice OS",agents:"AI Agents",legal:"LEGAL 360",guest:"Para huéspedes",host:"Para anfitriones",prepare:"Preparar mi caso",accessHead:"Acceso privado IHA",accessNote:"El portal privado está en preparación y el acceso será por invitación.",request:"Solicitar invitación",emergency:"Ayuda urgente · 123"},
 en:{platform:"Platform",solutions:"Solutions",prices:"Pricing",language:"Language",access:"Log in",start:"Get started",menu:"Menu",home:"Home",guide:"Legal guide",digital:"Digital Justice OS",agents:"AI Agents",legal:"LEGAL 360",guest:"For guests",host:"For hosts",prepare:"Prepare my case",accessHead:"IHA private access",accessNote:"The private portal is being prepared. Access will be by invitation.",request:"Request an invitation",emergency:"Emergency help · 123"},
 fr:{platform:"Plateforme",solutions:"Solutions",prices:"Tarifs",language:"Langue",access:"Accéder",start:"Commencer",menu:"Menu",home:"Accueil",guide:"Guide juridique",digital:"Digital Justice OS",agents:"Agents IA",legal:"LEGAL 360",guest:"Pour les voyageurs",host:"Pour les hôtes",prepare:"Préparer mon dossier",accessHead:"Accès privé IHA",accessNote:"Le portail privé est en préparation. L’accès se fera sur invitation.",request:"Demander une invitation",emergency:"Urgence · 123"},
 pt:{platform:"Plataforma",solutions:"Soluções",prices:"Preços",language:"Idioma",access:"Acessar",start:"Começar",menu:"Menu",home:"Início",guide:"Guia jurídico",digital:"Digital Justice OS",agents:"Agentes de IA",legal:"LEGAL 360",guest:"Para hóspedes",host:"Para anfitriões",prepare:"Preparar meu caso",accessHead:"Acesso privado IHA",accessNote:"O portal privado está em preparação e terá acesso por convite.",request:"Solicitar convite",emergency:"Emergência · 123"}
};
const prepSlug={es:"prepare-su-caso",en:"prepare-your-case",fr:"preparez-votre-dossier",pt:"prepare-o-seu-caso"};
const languageLabel={es:"Español",en:"English",fr:"Français",pt:"Português"};
function create(tag,cls,txt){const el=document.createElement(tag);if(cls)el.className=cls;if(txt!=null)el.textContent=txt;return el}
function lnk(text,href,cls){const e=create("a",cls,text);e.href=href;return e}
function init(){
 const header=document.querySelector("body > header");
 if(!header || header.dataset.ihaNavInstalled)return;
 const inner=header.querySelector(":scope > .bar-in, :scope > .hb, :scope > .head, :scope > .wrap, :scope > .in")||header.firstElementChild;
 const brand=inner?.querySelector(":scope > .brand");
 if(!brand)return;
 const lang=messages[languageFromPath()]?languageFromPath():"es",t=messages[lang];
 const root=(hash)=>"/?lang="+lang+"#"+hash;
 const paths={home:root("inicio"),guide:root("guia"),pricing:root("servicios"),guest:root("consumidor"),host:root("anfitrion"),legal:"/"+lang+"/legal-360/",digital:"/"+lang+"/digital-justice-os/",agents:"/ai-agents/",prepare:"/"+lang+"/"+prepSlug[lang]+"/"};
 const nav=create("nav","iha-nav-groups");
 nav.setAttribute("aria-label",t.platform+" · "+t.solutions);
 const group=(label,links)=>{
  const d=create("details","iha-nav-dropdown");
  const sum=create("summary","iha-nav-trigger",label);
  sum.setAttribute("aria-label",label);
  const chev=create("span","iha-nav-chevron");chev.setAttribute("aria-hidden","true");
  sum.append(chev);
  const panel=create("div","iha-nav-panel");
  for(const [title,url] of links)panel.append(lnk(title,url,"iha-nav-entry"));
  d.append(sum,panel);return {d,panel};
 };
 const platform=group(t.platform,[[t.home,paths.home],[t.guide,paths.guide],[t.digital,paths.digital],[t.agents,paths.agents]]);
 const solutions=group(t.solutions,[[t.guest,paths.guest],[t.host,paths.host],[t.legal,paths.legal],[t.prepare,paths.prepare]]);
 nav.append(platform.d,solutions.d,lnk(t.prices,paths.pricing,"iha-nav-price"));
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
 const start=lnk(t.start,paths.guide,"iha-nav-start");
 right.append(start);
 const menuBtn=create("button","iha-nav-mobile-button");
 menuBtn.type="button";menuBtn.setAttribute("aria-label",t.menu);menuBtn.setAttribute("aria-expanded","false");
 const bars=create("span","iha-nav-mobile-bars");bars.setAttribute("aria-hidden","true");menuBtn.append(bars);
 const menuId="iha-menu-"+lang;nav.id=menuId;menuBtn.setAttribute("aria-controls",menuId);
 // Preserve the emergency button's existing click handler by moving it into the menu.
 const sos=oldTools?.querySelector("#sosbtn");
 if(sos){const holder=create("div","iha-nav-urgent");const label=create("span",null,t.emergency);holder.append(label,sos);platform.panel.append(holder)}
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
 document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeAll();inner.classList.remove("iha-nav-mobile-open");menuBtn.setAttribute("aria-expanded","false")}});
 menuBtn.addEventListener("click",()=>{const open=inner.classList.toggle("iha-nav-mobile-open");menuBtn.setAttribute("aria-expanded",String(open));if(!open)closeAll()});
 nav.addEventListener("click",e=>{if(e.target.closest("a")){inner.classList.remove("iha-nav-mobile-open");menuBtn.setAttribute("aria-expanded","false");closeAll()}});
 right.addEventListener("click",e=>{if(e.target.closest("a"))closeAll()});
 // The public app switches languages without a full page reload. Keep this nav localized.
 const syncLanguage=()=>{
   const code=languageFromPath(),nt=messages[code]||messages.es;
   const route=(hash)=>"/?lang="+code+"#"+hash;
   const target={home:route("inicio"),guide:route("guia"),pricing:route("servicios"),guest:route("consumidor"),host:route("anfitrion"),legal:"/"+code+"/legal-360/",digital:"/"+code+"/digital-justice-os/",agents:"/ai-agents/",prepare:"/"+code+"/"+prepSlug[code]+"/"};
   const setLinks=(parent,names)=>{
     const links=parent.querySelectorAll(":scope > a.iha-nav-entry");
     names.forEach(([key,href],i)=>{if(links[i]){links[i].textContent=nt[key];links[i].href=href}});
   };
   platform.d.querySelector("summary").firstChild.textContent=nt.platform;
   solutions.d.querySelector("summary").firstChild.textContent=nt.solutions;
   setLinks(platform.panel,[["home",target.home],["guide",target.guide],["digital",target.digital],["agents",target.agents]]);
   setLinks(solutions.panel,[["guest",target.guest],["host",target.host],["legal",target.legal],["prepare",target.prepare]]);
   const prices=nav.querySelector(".iha-nav-price");prices.textContent=nt.prices;prices.href=target.pricing;
   start.textContent=nt.start;start.href=target.guide;
   for(const d of [access,mobileAccess]){
     d.querySelector("summary").textContent=nt.access;
     d.querySelector(".iha-nav-access-title").textContent=nt.accessHead;
     d.querySelector(".iha-nav-access-note").textContent=nt.accessNote;
     const req=d.querySelector(".iha-nav-request");req.textContent=nt.request;req.href="mailto:contacto@ihasolucioneslegales.com.co?subject="+encodeURIComponent("IHA LEGAL 360 - "+nt.request);
   }
   menuBtn.setAttribute("aria-label",nt.menu);
   const urgent=platform.panel.querySelector(".iha-nav-urgent span");if(urgent)urgent.textContent=nt.emergency;
 };
 const langWatcher=new MutationObserver(()=>syncLanguage());
 langWatcher.observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});

 header.dataset.ihaNavInstalled="true";
 document.body.classList.add("iha-nav-ready");
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();