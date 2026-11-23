/* IHA shared editorial sections, original copy and structure. The existing page content remains untouched. */
(()=>{"use strict";
const lang=(document.documentElement.lang||"es").slice(0,2).toLowerCase();
const locale={
es:{eye:"UNA MISMA IDENTIDAD. DOS TIPOS DE NECESIDADES.",hero:"Derechos y obligaciones claros para cada etapa digital.",intro:"Soluciones jurídicas para anfitriones, administradores y consumidores: información sobre cumplimiento, prevención y vías de reclamación.",four:[["Normativa","Requisitos que importan"],["Prevención","Anticipar conflictos"],["Evidencia","Documentar cada caso"],["Orientación","Entender las opciones"]],audiences:[["ANFITRIONES","Conformidad legal para tus viviendas","Información sobre registro, documentación y buenas prácticas de alojamiento.","Ver servicios"],["GESTIÓN DE CONFLICTOS","Prevenir y gestionar desacuerdos","Organiza los hechos, conserva pruebas y explora soluciones proporcionadas.","Conocer soluciones"],["CONSUMIDORES","Protege tus derechos digitales","Cancelaciones, reembolsos, cobros y publicidad engañosa: conoce las vías disponibles.","Iniciar orientación"]],how:"Un método claro, paso a paso.",steps:[["01","Identifica","Describe el problema y su contexto."],["02","Documenta","Reúne comunicaciones y pruebas relevantes."],["03","Avanza","Conoce opciones y solicita apoyo profesional si procede."]],disclaimer:"Contenido informativo: ninguna recomendación sustituye el análisis jurídico individual. Algunas funciones automatizadas se encuentran en desarrollo.",cta:"Empezar orientación"},
en:{eye:"ONE IDENTITY. TWO SIDES OF DIGITAL LIFE.",hero:"Clearer rights and obligations at every digital step.",intro:"Legal information for hosts, property managers and consumers, from compliance and prevention to exploring options for complaints.",four:[["Regulation","Relevant requirements"],["Prevention","Anticipate disputes"],["Evidence","Document each case"],["Guidance","Understand your options"]],audiences:[["HOSTS","Legal compliance for your properties","Information about registration, records and best accommodation practices.","View services"],["DISPUTE MANAGEMENT","Address disagreements early","Organize facts, preserve evidence and consider proportionate solutions.","Explore solutions"],["CONSUMERS","Protect your digital rights","Cancellations, refunds, charges or misleading advertising: explore available options.","Start guidance"]],how:"A simple, step-by-step approach.",steps:[["01","Identify","Describe the issue and context."],["02","Document","Gather relevant records and messages."],["03","Move forward","Explore options and seek professional advice if needed."]],disclaimer:"Informational content only; individual cases require legal review. Some automation features remain in development.",cta:"Start guidance"},
fr:{eye:"UNE IDENTITÉ. DEUX PARCOURS NUMÉRIQUES.",hero:"Des droits et obligations plus clairs à chaque étape.",intro:"Informations juridiques pour les hébergeurs, gestionnaires et consommateurs : conformité, prévention et voies de réclamation.",four:[["Réglementation","Exigences pertinentes"],["Prévention","Anticiper les conflits"],["Preuves","Documenter chaque dossier"],["Orientation","Comprendre les options"]],audiences:[["HÉBERGEURS","Conformité juridique des logements","Informations sur les enregistrements, documents et bonnes pratiques d'hébergement.","Voir les services"],["GESTION DES CONFLITS","Prévenir et gérer les différends","Organisez les faits, conservez les preuves et explorez des solutions adaptées.","Découvrir les solutions"],["CONSOMMATEURS","Protéger vos droits numériques","Annulations, remboursements, frais ou publicité trompeuse : explorez vos démarches.","Commencer"]],how:"Une méthode claire, étape par étape.",steps:[["01","Identifier","Décrivez le problème et son contexte."],["02","Documenter","Réunissez les échanges et les preuves utiles."],["03","Avancer","Explorez les options et sollicitez un conseil si besoin."]],disclaimer:"Contenu informatif ; chaque dossier exige un examen individuel. Certaines fonctions automatisées sont en développement.",cta:"Commencer"},
pt:{eye:"UMA IDENTIDADE. DUAS NECESSIDADES DIGITAIS.",hero:"Direitos e obrigações mais claros em cada etapa.",intro:"Informações jurídicas para anfitriões, gestores e consumidores: conformidade, prevenção e alternativas de reclamação.",four:[["Normas","Requisitos relevantes"],["Prevenção","Antecipar conflitos"],["Provas","Documentar casos"],["Orientação","Entender opções"]],audiences:[["ANFITRIÕES","Conformidade legal para imóveis","Informações sobre registros, documentos e boas práticas em hospedagem.","Ver serviços"],["GESTÃO DE CONFLITOS","Prevenir e gerir desacordos","Organize fatos, preserve provas e explore soluções proporcionais.","Conhecer soluções"],["CONSUMIDORES","Proteja seus direitos digitais","Cancelamentos, reembolsos, cobranças ou publicidade enganosa: conheça seus caminhos.","Iniciar orientação"]],how:"Um método claro, passo a passo.",steps:[["01","Identifique","Descreva o problema e seu contexto."],["02","Documente","Reúna comunicações e provas relevantes."],["03","Avance","Conheça opções e procure apoio jurídico se necessário."]],disclaimer:"Conteúdo informativo; cada caso exige análise individual. Algumas funções automatizadas ainda estão em desenvolvimento.",cta:"Começar"}};
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
