(()=>{"use strict";
const photos=[
 "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1050&q=75",
 "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1050&q=75",
 "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1050&q=75"
];
const tr={
es:{eyebrow:"DOS CAMINOS. UNA MISMA PROTECCIÓN.",title:"Más claridad jurídica para un mundo conectado.",description:"Para quienes ofrecen alojamiento y para quienes utilizan plataformas digitales. Entiende las obligaciones, prevén riesgos y descubre posibles vías de solución ante los conflictos.",features:["Normativa digital","Prevención de riesgos","Gestión de conflictos","Orientación clara"],details:["Requisitos según tu actividad","Documentar antes de escalar","Alternativas y seguimiento","Opciones disponibles en Colombia"],heads:["Cumplimiento para anfitriones","Conflictos mejor gestionados","Tus derechos ante las plataformas"],copy:["Orientación sobre obligaciones, registros y buenas prácticas en viviendas vinculadas a plataformas digitales.","Organiza comunicaciones, documentación e incidencias, y examina posibles soluciones antes de que el problema escale.","Cancelaciones, cobros, reembolsos o publicidad engañosa: describe tu situación y conoce tus opciones iniciales."],tags:["Requisitos y documentos","Prevención de conflictos","Opciones de reclamación"],cta:["Explorar soluciones","Conocer los servicios","Comenzar orientación"],stepsTitle:"Del problema a los siguientes pasos, de forma clara.",steps:[["01","Describe tu situación","Identifica el problema y reúne los datos principales."],["02","Explora las opciones","Consulta la información normativa y las vías disponibles."],["03","Decide cómo avanzar","Revisa recursos útiles o solicita una evaluación profesional."]],alert:"Orientación informativa inicial. Cada caso exige revisar los hechos, pruebas y normas aplicables. Los módulos avanzados de automatización se encuentran en desarrollo.",final:"Tu situación merece una respuesta comprensible.",button:"Comenzar ahora"},
en:{eyebrow:"TWO PATHS. ONE STANDARD OF PROTECTION.",title:"Greater legal clarity for a connected world.",description:"For accommodation providers and people using digital platforms. Understand obligations, anticipate risks and explore ways to address disputes.",features:["Digital regulation","Risk prevention","Dispute management","Clear guidance"],details:["Requirements for your activity","Document matters early","Options and follow-up","Available channels in Colombia"],heads:["Compliance for hosts","Better dispute management","Your rights on digital platforms"],copy:["Guidance on obligations, registration and best practice for accommodation listed on platforms.","Organize documents, messages and incidents, and explore ways to resolve issues early.","Cancellations, charges, refunds or misleading advertising: describe your issue and explore initial options."],tags:["Requirements and records","Dispute prevention","Complaint options"],cta:["Explore solutions","Discover services","Start guidance"],stepsTitle:"From the problem to next steps, clearly.",steps:[["01","Describe your situation","Identify the issue and key facts."],["02","Review the options","Explore regulations and available channels."],["03","Choose the next step","Use resources or request professional review."]],alert:"Initial informational guidance only. Each case requires a review of facts, evidence and applicable law. Advanced automation modules remain in development.",final:"Your situation deserves a clear response.",button:"Get started"},
fr:{eyebrow:"DEUX PARCOURS. UNE MÊME PROTECTION.",title:"Plus de clarté juridique dans un monde connecté.",description:"Pour les hébergeurs et les utilisateurs de plateformes numériques. Comprenez les obligations, anticipez les risques et explorez les voies de résolution des litiges.",features:["Réglementation","Prévention","Gestion des litiges","Orientation claire"],details:["Exigences applicables","Documenter les incidents","Options et suivi","Voies possibles en Colombie"],heads:["Conformité des hébergeurs","Mieux gérer les litiges","Vos droits sur les plateformes"],copy:["Orientation sur les obligations, enregistrements et bonnes pratiques pour les logements proposés sur les plateformes.","Rassemblez les échanges et pièces utiles et examinez les solutions avant l'aggravation d'un désaccord.","Annulations, frais, remboursements ou publicité trompeuse : décrivez les faits et découvrez vos premières options."],tags:["Exigences et documents","Prévention des litiges","Voies de réclamation"],cta:["Explorer les solutions","Découvrir les services","Commencer"],stepsTitle:"Du problème aux prochaines étapes, simplement.",steps:[["01","Décrivez la situation","Identifiez le problème et les faits importants."],["02","Explorez les options","Consultez les règles et démarches possibles."],["03","Choisissez la suite","Utilisez les ressources ou demandez un avis professionnel."]],alert:"Première orientation informative. Chaque dossier exige l'examen des faits, preuves et règles applicables. Les modules avancés sont en développement.",final:"Votre situation mérite une réponse claire.",button:"Commencer"},
pt:{eyebrow:"DOIS CAMINHOS. UMA MESMA PROTEÇÃO.",title:"Mais clareza jurídica em um mundo conectado.",description:"Para anfitriões e usuários de plataformas digitais. Entenda obrigações, antecipe riscos e explore caminhos para solucionar conflitos.",features:["Normas digitais","Prevenção","Gestão de conflitos","Orientação clara"],details:["Requisitos por atividade","Documentação preventiva","Alternativas e acompanhamento","Opções na Colômbia"],heads:["Conformidade para anfitriões","Melhor gestão de conflitos","Seus direitos nas plataformas"],copy:["Orientação sobre obrigações, registros e boas práticas para imóveis divulgados em plataformas digitais.","Organize mensagens, documentos e ocorrências, buscando soluções antes que o conflito aumente.","Cancelamentos, cobranças, reembolsos ou publicidade enganosa: descreva seu caso e veja opções iniciais."],tags:["Requisitos e documentos","Prevenção de conflitos","Opções de reclamação"],cta:["Explorar soluções","Conhecer serviços","Iniciar orientação"],stepsTitle:"Do problema aos próximos passos, com clareza.",steps:[["01","Descreva sua situação","Identifique o problema e os fatos principais."],["02","Explore as opções","Consulte regras e alternativas disponíveis."],["03","Escolha o próximo passo","Use recursos ou solicite análise profissional."]],alert:"Orientação inicial informativa. Cada caso exige análise de fatos, provas e legislação aplicável. Módulos avançados seguem em desenvolvimento.",final:"Sua situação merece uma resposta clara.",button:"Começar"}
};
function render(){
 const app=document.getElementById("app");
 if(!app||!app.querySelector(".os-simple-home")||document.getElementById("iha-experience"))return;
 const t=tr[(document.documentElement.lang||"es").slice(0,2).toLowerCase()]||tr.es;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const section=document.createElement("section");section.id="iha-experience";section.className="iha-experience";
 let html='<div class="iha-trust">';
 t.features.forEach((v,i)=>{html+='<div class="iha-trust-item"><i aria-hidden="true">'+["§","◇","✓","◎"][i]+'</i><div><strong>'+esc(v)+'</strong><small>'+esc(t.details[i])+'</small></div></div>'});
 html+='</div><div class="iha-intro"><div><span class="iha-kicker">'+esc(t.eyebrow)+'</span><h2>'+esc(t.title)+'</h2><p>'+esc(t.description)+'</p></div><a class="iha-main-cta" href="#inicio">'+esc(t.button)+' <b aria-hidden="true">→</b></a></div>';
 html+='<div class="iha-photo-grid">';
 t.heads.forEach((h,i)=>{html+='<article class="iha-photo-card"><div class="iha-photo"><img loading="lazy" decoding="async" src="'+photos[i]+'" width="1000" height="700" alt=""><span class="iha-photo-chip">✓ '+esc(t.tags[i])+'</span></div><div class="iha-card-body"><span class="iha-card-overline">IHA SOLUCIONES LEGALES</span><h3>'+esc(h)+'</h3><p>'+esc(t.copy[i])+'</p><a href="'+["#servicios","#servicios","#inicio"][i]+'">'+esc(t.cta[i])+' <b aria-hidden="true">↗</b></a></div></article>'});
 html+='</div><section class="iha-process"><span class="iha-kicker">IHA · LEGAL 360</span><h2>'+esc(t.stepsTitle)+'</h2><div class="iha-step-grid">';
 t.steps.forEach(x=>{html+='<article class="iha-step"><strong>'+esc(x[0])+'</strong><h3>'+esc(x[1])+'</h3><p>'+esc(x[2])+'</p></article>'});
 html+='</div><p class="iha-disclaimer">'+esc(t.alert)+'</p></section>';
 html+='<div class="iha-final"><h2>'+esc(t.final)+'</h2><a href="#inicio">'+esc(t.button)+' <b aria-hidden="true">→</b></a></div><p class="iha-credits">Fotografías: Unsplash · IHA diseño original</p>';
 section.innerHTML=html;app.append(section);
}
const app=document.getElementById("app");if(!app)return;new MutationObserver(render).observe(app,{childList:true});render();
})();

/* IHA translucent header scroll controller: one shared behavior per page. */
(()=>{"use strict";
 const target="body > header.bar";
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


/* IHA global brand deployment for the dynamic main homepage. */
;(function(){var s=document.createElement("script");s.src="/iha-brand-system.js?v=20261123-v1";s.defer=true;document.head.appendChild(s)})();
