/* IHA shared editorial sections, original copy and structure. The existing page content remains untouched. */
(()=>{"use strict";
const lang=(document.documentElement.lang||"es").slice(0,2).toLowerCase();
const locale={
es:{eye:"ANFITRIONES Y CONSUMIDORES",hero:"Sus derechos y obligaciones, en claro.",intro:"Para anfitriones, administradores y consumidores: normas, prevención y cómo reclamar.",four:[["Normativa","Requisitos que importan"],["Prevención","Anticipar conflictos"],["Evidencia","Documentar cada caso"],["Orientación","Entender las opciones"]],audiences:[["ANFITRIONES","Ponga su vivienda en regla","Registro, documentos y buenas prácticas para alquilar por días.","Ver servicios"],["CONFLICTOS","Prevenga y resuelva desacuerdos","Ordene los hechos, guarde pruebas y vea cómo resolver.","Ver soluciones"],["CONSUMIDORES","Defienda sus derechos","Cancelaciones, reembolsos, cobros y publicidad engañosa: vea cómo reclamar.","Ver mis opciones"]],how:"Cómo funciona",steps:[["01","Cuente qué pasó","El problema y su contexto."],["02","Reúna pruebas","Mensajes, documentos y fechas."],["03","Elija qué hacer","Vea sus opciones y pida apoyo si lo necesita."]],disclaimer:"Información general: no sustituye el análisis jurídico de su caso. Algunas funciones automáticas están en desarrollo.",cta:"Ver mis opciones"},
en:{eye:"HOSTS AND CONSUMERS",hero:"Your rights and obligations, made clear.",intro:"For hosts, property managers and consumers: rules, prevention and how to complain.",four:[["Regulation","Relevant requirements"],["Prevention","Anticipate disputes"],["Evidence","Document each case"],["Guidance","Understand your options"]],audiences:[["HOSTS","Legal compliance for your properties","Information about registration, records and best accommodation practices.","View services"],["DISPUTE MANAGEMENT","Address disagreements early","Organize facts, preserve evidence and consider proportionate solutions.","Explore solutions"],["CONSUMERS","Protect your digital rights","Cancellations, refunds, charges or misleading advertising: explore available options.","Start guidance"]],how:"How it works",steps:[["01","Identify","Describe the issue and context."],["02","Document","Gather relevant records and messages."],["03","Move forward","Explore options and seek professional advice if needed."]],disclaimer:"Informational content only; individual cases require legal review. Some automation features remain in development.",cta:"See my options"},
fr:{eye:"HÔTES ET CONSOMMATEURS",hero:"Vos droits et obligations, en clair.",intro:"Pour les hôtes, gestionnaires et consommateurs : règles, prévention et comment réclamer.",four:[["Réglementation","Exigences pertinentes"],["Prévention","Anticiper les conflits"],["Preuves","Documenter chaque dossier"],["Orientation","Comprendre les options"]],audiences:[["HÉBERGEURS","Conformité juridique des logements","Informations sur les enregistrements, documents et bonnes pratiques d'hébergement.","Voir les services"],["GESTION DES CONFLITS","Prévenir et gérer les différends","Organisez les faits, conservez les preuves et explorez des solutions adaptées.","Découvrir les solutions"],["CONSOMMATEURS","Protéger vos droits numériques","Annulations, remboursements, frais ou publicité trompeuse : explorez vos démarches.","Commencer"]],how:"Comment ça marche",steps:[["01","Identifier","Décrivez le problème et son contexte."],["02","Documenter","Réunissez les échanges et les preuves utiles."],["03","Avancer","Explorez les options et sollicitez un conseil si besoin."]],disclaimer:"Contenu informatif ; chaque dossier exige un examen individuel. Certaines fonctions automatisées sont en développement.",cta:"Voir mes options"},
pt:{eye:"ANFITRIÕES E CONSUMIDORES",hero:"Seus direitos e obrigações, com clareza.",intro:"Para anfitriões, gestores e consumidores: normas, prevenção e como reclamar.",four:[["Normas","Requisitos relevantes"],["Prevenção","Antecipar conflitos"],["Provas","Documentar casos"],["Orientação","Entender opções"]],audiences:[["ANFITRIÕES","Conformidade legal para imóveis","Informações sobre registros, documentos e boas práticas em hospedagem.","Ver serviços"],["GESTÃO DE CONFLITOS","Prevenir e gerir desacordos","Organize fatos, preserve provas e explore soluções proporcionais.","Conhecer soluções"],["CONSUMIDORES","Proteja seus direitos digitais","Cancelamentos, reembolsos, cobranças ou publicidade enganosa: conheça seus caminhos.","Iniciar orientação"]],how:"Como funciona",steps:[["01","Identifique","Descreva o problema e seu contexto."],["02","Documente","Reúna comunicações e provas relevantes."],["03","Avance","Conheça opções e procure apoio jurídico se necessário."]],disclaimer:"Conteúdo informativo; cada caso exige análise individual. Algumas funções automatizadas ainda estão em desenvolvimento.",cta:"Ver minhas opções"}};
const t=locale[lang]||locale.es;const path=location.pathname;const legal=/\/legal-360\/?$/.test(path),os=/\/digital-justice-os\/?$/.test(path);
const base=/\/(legal-360|digital-justice-os)\/?$/.test(path)?"../../":"../";
const photo=["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=940&q=80","https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=940&q=80","https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=940&q=80"];
const escapeHTML=v=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function build(){
 if(document.getElementById("iha-subpage-experience")||!document.body.classList.contains("iha-site-surface"))return;
 const target=document.querySelector(".hero")||document.querySelector("main")||document.querySelector("section");
 const section=document.createElement("section"); section.id="iha-subpage-experience";section.className="iha-subpage-experience";section.setAttribute("aria-label","IHA Soluciones Legales");
 const top=t.four.map((a,i)=>'<article class="iha-mini-feature"><span aria-hidden="true">'+["§","◇","✓","◎"][i]+'</span><div><strong>'+escapeHTML(a[0])+'</strong><small>'+escapeHTML(a[1])+'</small></div></article>').join("");
 const cards=t.audiences.map((a,i)=>'<article class="iha-sub-card"><div class="iha-sub-photo"><img src="'+photo[i]+'" width="800" height="520" alt="" loading="lazy" decoding="async"><span>'+escapeHTML(a[0])+'</span></div><div class="iha-sub-copy"><h3>'+escapeHTML(a[1])+'</h3><p>'+escapeHTML(a[2])+'</p><a href="'+base+'?lang='+lang+(i===2?"#inicio":"#servicios")+'">'+escapeHTML(a[3])+' <span aria-hidden="true">↗</span></a></div></article>').join("");
 const steps=t.steps.map(a=>'<article><span>'+escapeHTML(a[0])+'</span><h3>'+escapeHTML(a[1])+'</h3><p>'+escapeHTML(a[2])+'</p></article>').join("");
 section.innerHTML='<div class="iha-sub-inner"><div class="iha-sub-trust">'+top+'</div><div class="iha-sub-heading"><span class="iha-sub-eye">'+escapeHTML(t.eye)+'</span><h2>'+escapeHTML(t.hero)+'</h2><p>'+escapeHTML(t.intro)+'</p></div><div class="iha-sub-card-grid">'+cards+'</div><div class="iha-sub-process"><h2>'+escapeHTML(t.how)+'</h2><div class="iha-sub-steps">'+steps+'</div><p class="iha-sub-disclaimer">'+escapeHTML(t.disclaimer)+'</p></div><div class="iha-sub-cta"><span>IHA LEGAL 360</span><a href="'+base+'?lang='+lang+'#inicio">'+escapeHTML(t.cta)+' →</a></div></div>';
 if((legal||os)&&target)target.insertAdjacentElement("afterend",section);
 else {const footer=document.querySelector("footer");if(footer)footer.before(section);else document.body.append(section)}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",build,{once:true});else build();
})();

/* IHA translucent header scroll controller: one shared behavior per page. */
(()=>{"use strict";
 const target="body.iha-site-surface > header";
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
