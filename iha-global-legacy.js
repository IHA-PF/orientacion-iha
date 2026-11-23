/* IHA original unified page experience. Enhances static pages without altering legal text or form actions. */
(()=>{"use strict";
const ready=fn=>document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fn,{once:true}):fn();
ready(()=>{
 const body=document.body,main=document.querySelector("main.w"),bar=document.querySelector("header .hb");
 if(!body||!main||!bar||body.classList.contains("iha-site-surface")||document.getElementById("iha-global-hero"))return;
 const lang=(document.documentElement.lang||"es").toLowerCase().slice(0,2);
 const tr={
 es:{home:"Inicio",services:"Servicios y precios",digital:"Digital Justice OS",legal:"LEGAL 360",start:"Preparar mi caso",kicker:"IHA · SOLUCIONES LEGALES",host:"Conformidad para anfitriones",conflict:"Prevención de conflictos",consumer:"Defensa del consumidor",hostSub:"Regulación, documentos y buenas prácticas de hospedaje.",conflictSub:"Documenta incidencias y explora vías de solución.",consumerSub:"Conoce tus opciones ante plataformas digitales.",action:"Explorar",how:"¿Cómo funciona?",steps:[["01","Describe tu situación","Identifica los hechos y lo que buscas resolver."],["02","Reúne las pruebas","Conserva mensajes, documentos y fechas."],["03","Conoce tus opciones","Explora recursos y apoyo profesional cuando corresponda."]],eyebrow:"ORIENTACIÓN JURÍDICA DIGITAL",detail:"Contenido jurídico, práctico y estructurado. La información general no sustituye la revisión individual del caso.",cta:"¿Necesitas ayuda con un caso específico?",ctaText:"Accede a la orientación y conoce los servicios disponibles.",ctaGo:"Comenzar orientación",badge:"Colombia · Plataformas digitales"},
 en:{home:"Home",services:"Services & prices",digital:"Digital Justice OS",legal:"LEGAL 360",start:"Prepare my case",kicker:"IHA · LEGAL SOLUTIONS",host:"Compliance for hosts",conflict:"Dispute prevention",consumer:"Consumer rights",hostSub:"Regulation, records and accommodation practices.",conflictSub:"Document incidents and explore practical options.",consumerSub:"Understand your options on digital platforms.",action:"Explore",how:"How it works",steps:[["01","Describe the issue","Clarify the facts and desired outcome."],["02","Gather evidence","Keep messages, records and dates."],["03","Explore your options","Review guidance and professional services if needed."]],eyebrow:"DIGITAL LEGAL GUIDANCE",detail:"Practical legal information in a clear format. General information is not a substitute for individual case review.",cta:"Need help with a specific case?",ctaText:"Start with guidance and review available services.",ctaGo:"Start guidance",badge:"Colombia · Digital platforms"},
 fr:{home:"Accueil",services:"Services et tarifs",digital:"Digital Justice OS",legal:"LEGAL 360",start:"Préparer mon dossier",kicker:"IHA · SOLUTIONS JURIDIQUES",host:"Conformité des hébergeurs",conflict:"Prévention des litiges",consumer:"Droits des consommateurs",hostSub:"Règles, documents et bonnes pratiques d'hébergement.",conflictSub:"Documentez les incidents et examinez les solutions.",consumerSub:"Comprenez vos recours face aux plateformes.",action:"Découvrir",how:"Comment ça marche",steps:[["01","Décrivez la situation","Clarifiez les faits et vos objectifs."],["02","Réunissez les preuves","Conservez échanges, documents et dates."],["03","Explorez les options","Consultez les ressources ou un professionnel."]],eyebrow:"ORIENTATION JURIDIQUE NUMÉRIQUE",detail:"Une information juridique pratique et structurée. Elle ne remplace pas un examen individuel.",cta:"Besoin d'aide pour un dossier ?",ctaText:"Découvrez l'orientation et les services disponibles.",ctaGo:"Commencer",badge:"Colombie · Plateformes numériques"},
 pt:{home:"Início",services:"Serviços e preços",digital:"Digital Justice OS",legal:"LEGAL 360",start:"Preparar meu caso",kicker:"IHA · SOLUÇÕES JURÍDICAS",host:"Conformidade para anfitriões",conflict:"Prevenção de conflitos",consumer:"Direitos do consumidor",hostSub:"Regulamentos, documentos e boas práticas.",conflictSub:"Documente ocorrências e conheça alternativas.",consumerSub:"Conheça seus direitos nas plataformas digitais.",action:"Explorar",how:"Como funciona",steps:[["01","Descreva o caso","Identifique os fatos e objetivos."],["02","Reúna provas","Guarde mensagens, documentos e datas."],["03","Conheça as opções","Use os recursos ou procure apoio profissional."]],eyebrow:"ORIENTAÇÃO JURÍDICA DIGITAL",detail:"Informação jurídica prática e organizada. Não substitui a análise individual do caso.",cta:"Precisa de ajuda com um caso?",ctaText:"Comece com orientação e descubra os serviços.",ctaGo:"Começar",badge:"Colômbia · Plataformas digitais"}};
 const t=tr[lang]||tr.es;
 const pages={es:{services:"servicios-y-precios",prepare:"prepare-su-caso"},en:{services:"services-and-prices",prepare:"prepare-your-case"},fr:{services:"services-et-prix",prepare:"preparez-votre-dossier"},pt:{services:"servicos-e-precos",prepare:"prepare-o-seu-caso"}}[lang]||{services:"servicios-y-precios",prepare:"prepare-su-caso"};
 const hrefs={home:"/"+lang+"/",legal:"/"+lang+"/legal-360/",digital:"/"+lang+"/digital-justice-os/",services:"/"+lang+"/"+pages.services+"/",prepare:"/"+lang+"/"+pages.prepare+"/"};
 const esc=x=>String(x).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
 const crumb=main.querySelector(":scope > .crumb"),h1=main.querySelector(":scope > h1"),lead=main.querySelector(":scope > .lead");
 if(!h1)return;
 const full=(h1.textContent+" "+(lead?.textContent||"")+" "+location.pathname).toLowerCase();
 const host=/anfitri|host|hôte|hosped|hospedagem|logement|alojamiento|alojamento|location courte|rental|vivienda|imóvel|inmueble|finca|rnt|pot|turism|imóvel|aluguel/.test(full);
 const conflict=/conflit|conflict|litig|reclam|claim|complaint|medi|resolv|gesti[oó]n de casos|défend/.test(full);
 const heroImage=host?"/assets/iha-premium-host.svg":conflict?"/assets/iha-premium-conflict.svg":"/assets/iha-premium-consumer.svg";
 body.classList.add("iha-global-page");
 const nav=document.createElement("nav");nav.className="iha-global-nav";nav.setAttribute("aria-label","IHA");
 for(const [name,url] of [["home",hrefs.home],["services",hrefs.services],["legal",hrefs.legal],["digital",hrefs.digital]]){const a=document.createElement("a");a.href=url;a.textContent=t[name];nav.append(a)}
 bar.append(nav);
 const top=document.createElement("section");top.id="iha-global-hero";top.className="iha-global-hero";
 const left=document.createElement("div");left.className="iha-global-hero-copy";
 const eyebrow=document.createElement("p");eyebrow.className="iha-global-eyebrow";eyebrow.textContent=t.kicker;
 left.append(eyebrow);
 if(crumb)left.append(crumb);
 left.append(h1);if(lead)left.append(lead);
 const actions=document.createElement("div");actions.className="iha-global-actions";
 const action=document.createElement("a");action.className="iha-global-primary";action.href=hrefs.prepare;action.textContent=t.start;
 const tech=document.createElement("a");tech.className="iha-global-secondary";tech.href=hrefs.legal;tech.textContent=t.legal+" ↗";
 actions.append(action,tech);left.append(actions);
 const picture=document.createElement("div");picture.className="iha-global-visual";
 const img=document.createElement("img");img.src=heroImage;img.alt="";img.width=900;img.height=650;img.decoding="async";img.fetchPriority="high";picture.append(img);
 const chip=document.createElement("span");chip.className="iha-global-chip";chip.textContent=t.badge;picture.append(chip);
 top.append(left,picture); main.before(top);
 const strip=document.createElement("div");strip.className="iha-global-trust";
 for(const [ic,label,sub] of [["§",t.host,t.hostSub],["◇",t.conflict,t.conflictSub],["✓",t.consumer,t.consumerSub]]){const d=document.createElement("div");d.className="iha-global-trust-item";const icon=document.createElement("span");icon.className="iha-global-trust-icon";icon.textContent=ic;const txt=document.createElement("div");const strong=document.createElement("strong");strong.textContent=label;const small=document.createElement("small");small.textContent=sub;txt.append(strong,small);d.append(icon,txt);strip.append(d)}
 main.before(strip);
 const related=document.createElement("section");related.className="iha-global-related";related.setAttribute("aria-label",t.how);
 const heading=document.createElement("div");heading.className="iha-global-related-head";const eye=document.createElement("span");eye.textContent=t.eyebrow;const h2=document.createElement("h2");h2.textContent=t.how;heading.append(eye,h2);related.append(heading);
 const row=document.createElement("div");row.className="iha-global-feature-grid";
 const images=["/assets/iha-premium-host.svg","/assets/iha-premium-conflict.svg","/assets/iha-premium-consumer.svg"];
 const texts=[[t.host,t.hostSub,hrefs.services],[t.conflict,t.conflictSub,hrefs.legal],[t.consumer,t.consumerSub,hrefs.prepare]];
 texts.forEach(([title,desc,url],i)=>{const article=document.createElement("article");article.className="iha-global-feature-card";const pic=document.createElement("img");pic.src=images[i];pic.alt="";pic.width=900;pic.height=650;pic.loading="lazy";pic.decoding="async";const content=document.createElement("div");const titleEl=document.createElement("h3");titleEl.textContent=title;const p=document.createElement("p");p.textContent=desc;const a=document.createElement("a");a.href=url;a.textContent=t.action+" ↗";content.append(titleEl,p,a);article.append(pic,content);row.append(article)});
 related.append(row);
 const steps=document.createElement("div");steps.className="iha-global-steps";
 t.steps.forEach(([num,title,desc])=>{const div=document.createElement("article");const numEl=document.createElement("span");numEl.textContent=num;const titleEl=document.createElement("h3");titleEl.textContent=title;const p=document.createElement("p");p.textContent=desc;div.append(numEl,titleEl,p);steps.append(div)});
 related.append(steps);
 const disclaimer=document.createElement("p");disclaimer.className="iha-global-disclaimer";disclaimer.textContent=t.detail;related.append(disclaimer);
 const cta=document.createElement("div");cta.className="iha-global-final";
 const copy=document.createElement("div");const label=document.createElement("strong");label.textContent=t.cta;const p=document.createElement("p");p.textContent=t.ctaText;copy.append(label,p);
 const link=document.createElement("a");link.href=hrefs.prepare;link.textContent=t.ctaGo+" →";cta.append(copy,link);related.append(cta);
 main.after(related);
});
})();

/* IHA translucent header scroll controller: one shared behavior per page. */
(()=>{"use strict";
 const target="body.iha-global-page > header";
 function start(){
   const header=document.querySelector(target);
   if(!header||document.body.dataset.ihaGlassBound==="true")return;
   document.body.dataset.ihaGlassBound="true";
   const syncHeight=()=>{
     const h=header.getBoundingClientRect().height;
     if(h>0)document.documentElement.style.setProperty("--iha-glass-h",Math.ceil(h)+"px");
   };
   const syncScroll=()=>document.body.classList.toggle("iha-glass-scrolled",window.scrollY>24);
   syncHeight();syncScroll();
   window.addEventListener("resize",syncHeight,{passive:true});
   window.addEventListener("scroll",syncScroll,{passive:true});
   if(typeof ResizeObserver!=="undefined")new ResizeObserver(syncHeight).observe(header);
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});
 else start();
})();
