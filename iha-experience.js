(()=>{"use strict";
const directory={
 "es": {
  "catalog": "servicios",
  "price": "servicios-y-precios",
  "evidence": "guia-de-pruebas",
  "analysis": "analisis-de-su-caso",
  "host": "plan-anfitrion-en-regla",
  "prepare": "prepare-su-caso",
  "services": "Servicios jurídicos",
  "intro": "Elija el servicio que corresponde a su situación. Cada ficha explica qué recibe, cuánto cuesta y cuáles son sus límites.",
  "how": "Cómo funciona",
  "consumers": "Consumidores",
  "travel": "Viajeros",
  "hosts": "Anfitriones",
  "business": "Empresas",
  "conflicts": "Conflictos con plataformas",
  "case": "Análisis de expediente",
  "proof": "Preparar pruebas",
  "free": "Orientación gratuita",
  "personal": "Acompañamiento personalizado",
  "quote": "Solicitar cotización",
  "single": "Servicios puntuales",
  "pro": "Soluciones profesionales",
  "explore": "Ver servicios",
  "compare": "Comparar opciones",
  "faq": "Preguntas frecuentes",
  "freeQ": "¿Qué puedo hacer gratis?",
  "scopeQ": "¿Cómo se confirma el alcance?",
  "scope": "Antes de contratar, solicite el alcance, el precio y las condiciones por escrito.",
  "view": "Ver ficha",
  "final": "Prepare su consulta jurídica",
  "problem": "Controversias con plataformas",
  "protect": "Consultar el plan para anfitriones",
  "catalogue": "Catálogo de servicios",
  "about": "Conozca IHA"
 },
 "en": {
  "catalog": "services",
  "price": "services-and-prices",
  "evidence": "evidence-guide",
  "analysis": "case-analysis",
  "host": "host-compliance-plan",
  "prepare": "prepare-your-case",
  "services": "Legal services",
  "intro": "Find a service for your situation. Each page explains what you receive, its price and the limits of the engagement.",
  "how": "How it works",
  "consumers": "Consumers",
  "travel": "Travellers",
  "hosts": "Hosts",
  "business": "Businesses",
  "conflicts": "Platform disputes",
  "case": "Case analysis",
  "proof": "Prepare evidence",
  "free": "Free guidance",
  "personal": "Personalised support",
  "quote": "Request a quote",
  "single": "One-off services",
  "pro": "Professional solutions",
  "explore": "Explore services",
  "compare": "Compare options",
  "faq": "Frequently asked questions",
  "freeQ": "What can I do for free?",
  "scopeQ": "How is the scope confirmed?",
  "scope": "Before engaging a service, ask for the scope, price and terms in writing.",
  "view": "View service",
  "final": "Start with legal clarity",
  "problem": "I have a problem with a platform",
  "protect": "I want to protect my business",
  "catalogue": "Service catalogue",
  "about": "About IHA"
 },
 "fr": {
  "catalog": "services",
  "price": "services-et-prix",
  "evidence": "guide-des-preuves",
  "analysis": "analyse-de-votre-dossier",
  "host": "abonnement-hote-en-regle",
  "prepare": "preparez-votre-dossier",
  "services": "Services juridiques",
  "intro": "Trouvez le service adapté à votre situation. Chaque fiche précise les livrables, le prix et les limites de la prestation.",
  "how": "Comment ça marche",
  "consumers": "Consommateurs",
  "travel": "Voyageurs",
  "hosts": "Hôtes",
  "business": "Entreprises",
  "conflicts": "Litiges avec les plateformes",
  "case": "Analyse de dossier",
  "proof": "Préparer les preuves",
  "free": "Orientation gratuite",
  "personal": "Accompagnement personnalisé",
  "quote": "Demander un devis",
  "single": "Prestations ponctuelles",
  "pro": "Solutions professionnelles",
  "explore": "Explorer les services",
  "compare": "Comparer les options",
  "faq": "Questions fréquentes",
  "freeQ": "Que puis-je faire gratuitement ?",
  "scopeQ": "Comment le périmètre est-il confirmé ?",
  "scope": "Avant de vous engager, demandez le périmètre, le prix et les conditions par écrit.",
  "view": "Voir la fiche",
  "final": "Faites le premier pas en connaissance de vos droits",
  "problem": "J’ai un problème avec une plateforme",
  "protect": "Je souhaite protéger mon activité",
  "catalogue": "Catalogue des services",
  "about": "Découvrir IHA"
 },
 "pt": {
  "catalog": "servicos",
  "price": "servicos-e-precos",
  "evidence": "guia-de-provas",
  "analysis": "analise-do-seu-caso",
  "host": "plano-anfitriao-em-dia",
  "prepare": "prepare-o-seu-caso",
  "services": "Serviços jurídicos",
  "intro": "Encontre o serviço adequado à sua situação. Cada ficha explica o que você recebe, o preço e os limites da contratação.",
  "how": "Como funciona",
  "consumers": "Consumidores",
  "travel": "Viajantes",
  "hosts": "Anfitriões",
  "business": "Empresas",
  "conflicts": "Conflitos com plataformas",
  "case": "Análise do caso",
  "proof": "Preparar provas",
  "free": "Orientação gratuita",
  "personal": "Acompanhamento personalizado",
  "quote": "Solicitar orçamento",
  "single": "Serviços pontuais",
  "pro": "Soluções profissionais",
  "explore": "Explorar serviços",
  "compare": "Comparar opções",
  "faq": "Perguntas frequentes",
  "freeQ": "O que posso fazer gratuitamente?",
  "scopeQ": "Como é confirmado o escopo?",
  "scope": "Antes de contratar, solicite o escopo, o preço e as condições por escrito.",
  "view": "Ver serviço",
  "final": "Comece com clareza jurídica",
  "problem": "Tenho um problema com uma plataforma",
  "protect": "Quero proteger minha atividade",
  "catalogue": "Catálogo de serviços",
  "about": "Conheça a IHA"
 }
};
const modules={
 "es": [
  [
   "IHA PREVENT",
   "Identificar riesgos antes de que se conviertan en conflictos."
  ],
  [
   "IHA EVIDENCE",
   "Organizar los hechos y conservar sus soportes."
  ],
  [
   "IHA ANALYZE",
   "Entender el problema desde el derecho colombiano."
  ],
  [
   "IHA RESOLVE",
   "Gestionar la solución jurídica adecuada."
  ],
  [
   "IHA MONITOR",
   "No perder de vista compromisos y fechas importantes."
  ],
  [
   "IHA LEGAL CARE",
   "Mantener un acompañamiento jurídico a lo largo del tiempo."
  ]
 ],
 "en": [
  [
   "IHA PREVENT",
   "Identify risks before they become disputes."
  ],
  [
   "IHA EVIDENCE",
   "Organise the facts and preserve supporting records."
  ],
  [
   "IHA ANALYZE",
   "Understand the issue under Colombian law."
  ],
  [
   "IHA RESOLVE",
   "Manage an appropriate legal response."
  ],
  [
   "IHA MONITOR",
   "Keep track of commitments and important dates."
  ],
  [
   "IHA LEGAL CARE",
   "Maintain legal support over time."
  ]
 ],
 "fr": [
  [
   "IHA PREVENT",
   "Identifier les risques avant qu'ils ne deviennent des litiges."
  ],
  [
   "IHA EVIDENCE",
   "Organiser les faits et conserver les pièces utiles."
  ],
  [
   "IHA ANALYZE",
   "Comprendre le problème au regard du droit colombien."
  ],
  [
   "IHA RESOLVE",
   "Mettre en œuvre la réponse juridique adaptée."
  ],
  [
   "IHA MONITOR",
   "Suivre les engagements et les échéances importantes."
  ],
  [
   "IHA LEGAL CARE",
   "Maintenir un accompagnement juridique dans la durée."
  ]
 ],
 "pt": [
  [
   "IHA PREVENT",
   "Identificar riscos antes que se transformem em conflitos."
  ],
  [
   "IHA EVIDENCE",
   "Organizar os fatos e preservar os documentos de apoio."
  ],
  [
   "IHA ANALYZE",
   "Compreender o problema conforme o direito colombiano."
  ],
  [
   "IHA RESOLVE",
   "Gerenciar a solução jurídica adequada."
  ],
  [
   "IHA MONITOR",
   "Acompanhar compromissos e datas importantes."
  ],
  [
   "IHA LEGAL CARE",
   "Manter acompanhamento jurídico ao longo do tempo."
  ]
 ]
};
const statusText={
 "es": [
  "Disponible hoy",
  "Guías públicas, preparación de pruebas y orientación inicial.",
  "En desarrollo",
  "Los motores de análisis y las funciones de automatización forman parte del proyecto Digital Justice OS."
 ],
 "en": [
  "Available today",
  "Public guides, evidence preparation and initial legal guidance.",
  "In development",
  "The analysis engines and automation features are part of the Digital Justice OS project."
 ],
 "fr": [
  "Disponible aujourd’hui",
  "Guides publics, préparation des preuves et première orientation juridique.",
  "En développement",
  "Les moteurs d’analyse et les fonctions d’automatisation font partie du projet Digital Justice OS."
 ],
 "pt": [
  "Disponível hoje",
  "Guias públicos, preparação de provas e orientação inicial.",
  "Em desenvolvimento",
  "Os motores de análise e as funções de automação fazem parte do projeto Digital Justice OS."
 ]
};
const tr={
es:{eyebrow:"DOS CAMINOS. UNA MISMA PROTECCIÓN.",title:"Más claridad jurídica para un mundo conectado.",description:"Para quienes ofrecen alojamiento y para quienes utilizan plataformas digitales. Entiende las obligaciones, prevén riesgos y descubre posibles vías de solución ante los conflictos.",features:["Normativa digital","Prevención de riesgos","Gestión de conflictos","Orientación clara"],details:["Requisitos según tu actividad","Documentar antes de escalar","Alternativas y seguimiento","Opciones disponibles en Colombia"],heads:["Cumplimiento para anfitriones","Análisis de controversias","Derechos de los usuarios de plataformas"],copy:["Orientación sobre obligaciones, registros y buenas prácticas en viviendas vinculadas a plataformas digitales.","Organice la correspondencia y los documentos para precisar los hechos y evaluar las vías de reclamación.","Consulte las opciones de orientación ante cancelaciones, cobros controvertidos, solicitudes de reembolso o publicidad engañosa."],tags:["Requisitos y documentos","Prevención de conflictos","Opciones de reclamación"],cta:["Explorar soluciones","Conocer los servicios","Comenzar orientación"],stepsTitle:"Del problema a los siguientes pasos, de forma clara.",steps:[["01","Describa los hechos","Indique las fechas, las partes y los documentos pertinentes."],["02","Examine las opciones","Consulte la normativa y las vías de reclamación disponibles."],["03","Defina la siguiente actuación","Consulte las guías o solicite una revisión profesional del expediente."]],alert:"Orientación informativa inicial. Cada caso exige revisar los hechos, pruebas y normas aplicables. Los módulos avanzados de automatización se encuentran en desarrollo.",final:"Tu situación merece una respuesta comprensible.",button:"Comenzar ahora"},
en:{eyebrow:"TWO PATHS. ONE STANDARD OF PROTECTION.",title:"Greater legal clarity for a connected world.",description:"For accommodation providers and people using digital platforms. Understand obligations, anticipate risks and explore ways to address disputes.",features:["Digital regulation","Risk prevention","Dispute management","Clear guidance"],details:["Requirements for your activity","Document matters early","Options and follow-up","Available channels in Colombia"],heads:["Compliance for hosts","Better dispute management","Your rights on digital platforms"],copy:["Guidance on obligations, registration and best practice for accommodation listed on platforms.","Organize documents, messages and incidents, and explore ways to resolve issues early.","Cancellations, charges, refunds or misleading advertising: describe your issue and explore initial options."],tags:["Requirements and records","Dispute prevention","Complaint options"],cta:["Explore solutions","Discover services","Start guidance"],stepsTitle:"From the problem to next steps, clearly.",steps:[["01","Describe your situation","Identify the issue and key facts."],["02","Review the options","Explore regulations and available channels."],["03","Choose the next step","Use resources or request professional review."]],alert:"Initial informational guidance only. Each case requires a review of facts, evidence and applicable law. Advanced automation modules remain in development.",final:"Your situation deserves a clear response.",button:"Get started"},
fr:{eyebrow:"DEUX PARCOURS. UNE MÊME PROTECTION.",title:"Plus de clarté juridique dans un monde connecté.",description:"Pour les hébergeurs et les utilisateurs de plateformes numériques. Comprenez les obligations, anticipez les risques et explorez les voies de résolution des litiges.",features:["Réglementation","Prévention","Gestion des litiges","Orientation claire"],details:["Exigences applicables","Documenter les incidents","Options et suivi","Voies possibles en Colombie"],heads:["Conformité des hébergeurs","Mieux gérer les litiges","Vos droits sur les plateformes"],copy:["Orientation sur les obligations, enregistrements et bonnes pratiques pour les logements proposés sur les plateformes.","Rassemblez les échanges et pièces utiles et examinez les solutions avant l'aggravation d'un désaccord.","Annulations, frais, remboursements ou publicité trompeuse : décrivez les faits et découvrez vos premières options."],tags:["Exigences et documents","Prévention des litiges","Voies de réclamation"],cta:["Explorer les solutions","Découvrir les services","Commencer"],stepsTitle:"Du problème aux prochaines étapes, simplement.",steps:[["01","Décrivez la situation","Identifiez le problème et les faits importants."],["02","Explorez les options","Consultez les règles et démarches possibles."],["03","Choisissez la suite","Utilisez les ressources ou demandez un avis professionnel."]],alert:"Première orientation informative. Chaque dossier exige l'examen des faits, preuves et règles applicables. Les modules avancés sont en développement.",final:"Votre situation mérite une réponse claire.",button:"Commencer"},
pt:{eyebrow:"DOIS CAMINHOS. UMA MESMA PROTEÇÃO.",title:"Mais clareza jurídica em um mundo conectado.",description:"Para anfitriões e usuários de plataformas digitais. Entenda obrigações, antecipe riscos e explore caminhos para solucionar conflitos.",features:["Normas digitais","Prevenção","Gestão de conflitos","Orientação clara"],details:["Requisitos por atividade","Documentação preventiva","Alternativas e acompanhamento","Opções na Colômbia"],heads:["Conformidade para anfitriões","Melhor gestão de conflitos","Seus direitos nas plataformas"],copy:["Orientação sobre obrigações, registros e boas práticas para imóveis divulgados em plataformas digitais.","Organize mensagens, documentos e ocorrências, buscando soluções antes que o conflito aumente.","Cancelamentos, cobranças, reembolsos ou publicidade enganosa: descreva seu caso e veja opções iniciais."],tags:["Requisitos e documentos","Prevenção de conflitos","Opções de reclamação"],cta:["Explorar soluções","Conhecer serviços","Iniciar orientação"],stepsTitle:"Do problema aos próximos passos, com clareza.",steps:[["01","Descreva sua situação","Identifique o problema e os fatos principais."],["02","Explore as opções","Consulte regras e alternativas disponíveis."],["03","Escolha o próximo passo","Use recursos ou solicite análise profissional."]],alert:"Orientação inicial informativa. Cada caso exige análise de fatos, provas e legislação aplicável. Módulos avançados seguem em desenvolvimento.",final:"Sua situação merece uma resposta clara.",button:"Começar"}
};
const homeCopy={
 "es": [
  "Orientación jurídica para quienes usan plataformas digitales",
  "Consulte las vías de reclamación disponibles en Colombia para controversias relacionadas con compras, reservas y plataformas digitales. Identifique los documentos que respaldan su solicitud.",
  "Recursos de IHA",
  "¿Cuál es el objeto de su consulta?",
  "Una compra",
  "Una reserva",
  "Mi actividad",
  "Ver mis opciones",
  "Guía jurídica",
  "Pruebas",
  "Servicios",
  "Tarifas"
 ],
 "fr": [
  "Une orientation juridique pour les usagers des plateformes numériques",
  "Un achat, une réservation ou un litige avec une plateforme en Colombie ? Découvrez vos options, rassemblez les preuves et préparez votre prochaine démarche.",
  "Ressources IHA",
  "Quel est l’objet de votre demande ?",
  "Un achat",
  "Une réservation",
  "Mon activité",
  "Voir mes options",
  "Guide juridique",
  "Preuves",
  "Services",
  "Tarifs"
 ],
 "en": [
  "Legal guidance for people who use digital platforms",
  "Explore your options after a purchase, a booking or a dispute with a platform in Colombia. Supporting documents and decide what to do next.",
  "IHA resources",
  "What is the subject of your enquiry?",
  "A purchase",
  "A booking",
  "My business",
  "Explore my options",
  "Legal guide",
  "Evidence",
  "Services",
  "Pricing"
 ],
 "pt": [
  "Orientação jurídica para quem usa plataformas digitais",
  "Conheça suas opções em uma compra, reserva ou disputa com uma plataforma na Colômbia. Organize as provas e prepare seu próximo passo.",
  "Recursos IHA",
  "Qual é o objeto da consulta?",
  "Uma compra",
  "Uma reserva",
  "Minha atividade",
  "Ver minhas opções",
  "Guia jurídico",
  "Provas",
  "Serviços",
  "Preços"
 ]
};
const artLabels={
 "es": [
  "Alojamiento",
  "Documentos",
  "Pruebas",
  "Descripción de los hechos",
  "Documentos de respaldo",
  "Cronología del caso",
  "Revisión del caso"
 ],
 "en": [
  "Property",
  "Documents",
  "Evidence",
  "Statement of facts",
  "Supporting documents",
  "Case chronology",
  "Case review"
 ],
 "fr": [
  "Logement",
  "Documents",
  "Preuves",
  "Exposé des faits",
  "Pièces justificatives",
  "Chronologie du dossier",
  "Étude du dossier"
 ],
 "pt": [
  "Imóvel",
  "Documentos",
  "Provas",
  "Descrição dos fatos",
  "Documentos comprobatórios",
  "Cronologia do caso",
  "Análise do caso"
 ]
};
const profileCopy={
  "es": [
    "Orientación según el ámbito de la consulta",
    [
      "Cancelación de reservas y discrepancias con el anuncio",
      "Conserve la confirmación de la reserva, los mensajes y las fotografías del alojamiento. Estos documentos permiten identificar las condiciones ofrecidas y sustentar su reclamación."
    ],
    [
      "Incumplimientos de entrega y cobros en disputa",
      "La revisión del pedido, la factura y el comprobante de pago permite precisar el motivo de la reclamación y evaluar las opciones disponibles."
    ],
    [
      "Obligaciones de los prestadores de alojamiento turístico",
      "Consulte el plan para anfitriones e identifique los registros, documentos y obligaciones aplicables a su actividad en Colombia."
    ]
  ],
  "fr": [
    "Orientation selon l’objet de votre demande",
    [
      "Annulation de réservation et hébergement non conforme à l’annonce",
      "Conservez la confirmation de réservation, les échanges et les photographies du logement. Ces pièces permettent de comparer la prestation annoncée à celle fournie et d’étayer votre réclamation."
    ],
    [
      "Défaut de livraison et contestation d’un paiement",
      "L’examen de la commande, de la facture et du justificatif de paiement permet de préciser le motif de votre réclamation et d’évaluer les démarches possibles."
    ],
    [
      "Obligations des exploitants d’hébergements touristiques",
      "Consultez le programme destiné aux hôtes pour identifier les formalités, les documents et les obligations applicables à votre activité en Colombie."
    ]
  ],
  "en": [
    "Guidance by type of enquiry",
    [
      "Booking cancellations and discrepancies with the listing",
      "Keep the booking confirmation, correspondence and photographs of the accommodation. These records can establish what was offered and support a complaint."
    ],
    [
      "Undelivered orders and disputed charges",
      "A review of the order, invoice and payment record can clarify the grounds for a complaint and help identify the available options."
    ],
    [
      "Compliance for tourist accommodation providers",
      "Consult the host plan to identify registrations, records and obligations relevant to your accommodation business in Colombia."
    ]
  ],
  "pt": [
    "Orientação por tipo de consulta",
    [
      "Cancelamento de reservas e divergências em relação ao anúncio",
      "Guarde a confirmação da reserva, as mensagens e as fotografias da hospedagem. Esses documentos ajudam a identificar as condições oferecidas e a fundamentar a reclamação."
    ],
    [
      "Falhas na entrega e contestação de cobranças",
      "A análise do pedido, da fatura e do comprovante de pagamento permite esclarecer o motivo da reclamação e avaliar as medidas disponíveis."
    ],
    [
      "Obrigações dos prestadores de hospedagem turística",
      "Consulte o plano para anfitriões e identifique os registros, documentos e obrigações aplicáveis à sua atividade na Colômbia."
    ]
  ]
};
function render(){
 const app=document.getElementById("app");
 if(!app?.querySelector(".os-simple-home")||document.getElementById("iha-experience"))return;
 const lang=document.documentElement.lang.slice(0,2);
 const d=directory[lang]||directory.es, t=tr[lang]||tr.es;
 const base="/"+lang+"/",catalog=base+d.catalog+"/",legal=base+"legal-360/";
 const section=document.createElement("div");
 section.className="iha-store";section.id="iha-experience";
 const wrap=document.createElement("div");wrap.className="store-wrap";section.append(wrap);
 const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt)e.textContent=txt;return e};
 const link=(title,url)=>{const a=make("a","store-link",title);a.href=url;return a};
 const block=title=>{const el=make("section","store-section");el.append(make("h2","",title));wrap.append(el);return el};
 const grid=parent=>{const g=make("div","store-grid");parent.append(g);return g};
 const card=(parent,title,copy,action,url)=>{const el=make("article","store-card");el.append(make("h3","",title));if(copy)el.append(make("p","",copy));if(action)el.append(link(action,url));parent.append(el)};
 const hero=app.querySelector(".os-premium-intro");
 if(hero){
   const labels=homeCopy[lang]||homeCopy.es;
   const heading=hero.querySelector("h1"),lead=hero.querySelector(".os-premium-lead");
   heading.textContent=labels[0];lead.textContent=labels[1];
   const copy=make("div","home-copy");
   copy.append(heading,lead);
   const resources=make("div","home-resources"),links=make("div","home-shortcuts");
   resources.append(make("p","",labels[2]),links);
   [base,base+d.evidence+"/",catalog,base+d.price+"/"].forEach((url,i)=>links.append(link(labels[i+8],url)));
   const preview=make("a","home-preview");
   preview.href=legal;preview.append(make("strong","","IHA LEGAL 360"));
   const art=make("img","");
   // The former consultation JPEG contained baked-in corruption (yellow/pink
   // washout and mismatched image panels). Use a verified sharp local asset.
   art.src="/assets/iha-case-review.jpg";
   art.alt=({
     es:"Profesional revisando documentación en su oficina junto a un computador portátil.",
     fr:"Professionnelle examinant des documents dans son bureau avec un ordinateur portable.",
     en:"Professional reviewing documents in an office alongside a laptop.",
     pt:"Profissional analisando documentos em seu escritório com um computador portátil."
   })[lang];
   art.width=800;art.height=800;art.loading="eager";art.decoding="async";
   preview.append(art);copy.append(resources,preview);
   const panel=make("form","home-picker"),fieldset=make("fieldset","");
   const legend=make("legend","",labels[3]),options=make("div","home-options");
   const destinations=["litige","hebergement","consultation"];
   const offerNames={"es":["Resolver un conflicto","Poner un alojamiento en regla","Consultar a una abogada"],"en":["Resolve a dispute","Bring a rental into compliance","Consult a lawyer"],"fr":["Résoudre un litige","Mettre un hébergement en règle","Consulter une avocate"],"pt":["Resolver um conflito","Regularizar uma hospedagem","Consultar uma advogada"]}[lang] || ["Resolver un conflicto","Poner un alojamiento en regla","Consultar a una abogada"];
   destinations.forEach((topic,i)=>{
     const option=make("label","home-option"),radio=make("input","");
     radio.type="radio";radio.name="need";radio.value=topic;radio.required=true;
     const icon=i===0?make("span","home-document-icon","≡"):make("img","");
     if(i!==0){icon.src=i===1?"/assets/iha-stay.jpg":"/assets/iha-case-review.jpg";icon.alt="";icon.width=58;icon.height=58}
     icon.setAttribute("aria-hidden","true");
     option.append(radio,icon,make("span","",offerNames[i]));options.append(option);
   });
   fieldset.append(legend,options);
   const submit=make("button","",labels[7]);submit.type="submit";
   panel.append(make("p","home-picker-brand","IHA GROUP S.A.S. · Colombia"),fieldset,submit);
   panel.addEventListener("submit",event=>{event.preventDefault();const selected=panel.querySelector("input:checked");if(selected)location.assign(base+d.prepare+"/?situation="+selected.value)});
   hero.replaceChildren(copy,panel);hero.classList.add("home-masthead");
 }
 const needs=block(d.catalogue), shortcuts=make("nav","store-links");needs.append(shortcuts);
 [[d.problem,catalog+"#platforms"],[d.consumers,catalog+"#consumers"],[d.hosts,catalog+"#hosts"],[d.protect,base+d.host+"/"]].forEach(([label,url])=>shortcuts.append(link(label,url)));
 const steps=grid(block(d.how));t.steps.forEach(([,title,copy])=>card(steps,title,copy));
 const services=block(d.services),tabs=make("div","store-tabs");tabs.setAttribute("role","tablist");tabs.setAttribute("aria-label",d.services);services.append(tabs);
 services.classList.add("editorial-services");wrap.prepend(services);
 const visualLabels=artLabels[lang]||artLabels.es;
 const buttons=[],panels=[];
 function serviceVisual(index){
   const visual=make("span","service-visual visual-"+index);
   visual.setAttribute("aria-hidden","true");
   if(index===1){
     const stack=make("span","evidence-stack");
     visualLabels.slice(3,6).forEach((label,i)=>stack.append(make("span","evidence-note note-"+i,label)));
     visual.append(stack);
   }else{
     const photo=make("img","");
     photo.src=index===0?"/assets/iha-stay.jpg":"/assets/iha-case-review.jpg";photo.alt="";photo.width=800;photo.height=800;photo.loading="lazy";photo.decoding="async";visual.append(photo);
     const overlay=make("span",index===0?"property-tags":"case-slip");
     if(index===0)visualLabels.slice(0,3).forEach(label=>overlay.append(make("span","",label)));
     else overlay.append(make("span","case-rule","IHA"),make("span","",visualLabels[6]));
     visual.append(overlay);
   }
   return visual;
 }
 const select=i=>{buttons.forEach((b,j)=>{b.setAttribute("aria-selected",String(i===j));b.tabIndex=i===j?0:-1;panels[j].hidden=i!==j})};
 [d.hosts,d.conflicts,d.consumers].forEach((name,i)=>{
   const tab=make("button","editorial-tab");tab.append(serviceVisual(i),make("span","editorial-caption",name));tab.type="button";tab.id="family-tab-"+i;tab.setAttribute("role","tab");
   const panel=make("div","store-panel");panel.id="family-panel-"+i;panel.setAttribute("role","tabpanel");panel.setAttribute("aria-labelledby",tab.id);tab.setAttribute("aria-controls",panel.id);
   const copy=make("div");copy.append(make("h3","",t.heads[i]),make("p","store-copy",t.copy[i]));
   if(i===2)copy.append(link(t.cta[i],catalog+"#consumers"));
   const tile=make("div","editorial-choice");tile.setAttribute("role","presentation");
   const topics=["hebergement","litige","litige"];
   const startLabels={"es":["Revisar mi alojamiento","Describir mi conflicto","Comenzar orientación"],"en":["Review my rental","Describe my dispute","Start guidance"],"fr":["Vérifier mon hébergement","Décrire mon litige","Commencer l’orientation"],"pt":["Revisar minha hospedagem","Descrever meu conflito","Iniciar orientação"]};
   const startLabel=i<2?t.cta[i]:(startLabels[lang]||startLabels.es)[i];
   const start=link(startLabel,i<2?catalog+"#"+["hosts","platforms"][i]:base+d.prepare+"/?situation="+topics[i]);start.classList.add("editorial-orientation");start.setAttribute("aria-label",startLabel+" · "+name);
   tile.append(tab,start);tabs.append(tile);
   panel.append(copy);services.append(panel);buttons.push(tab);panels.push(panel);
   tab.addEventListener("click",()=>{select(i);if(matchMedia("(max-width:700px)").matches)panel.scrollIntoView({block:"center"})});tab.addEventListener("keydown",e=>{const next={ArrowRight:(i+1)%3,ArrowLeft:(i+2)%3,Home:0,End:2}[e.key];if(next!==undefined){e.preventDefault();select(next);buttons[next].focus()}});
 });select(0);
 const [profileTitle,...stories]=profileCopy[lang]||profileCopy.es;
 const profiles=block(profileTitle);profiles.classList.add("profile-banners");
 const stack=make("div","profile-stack");profiles.append(stack);
 [[d.travel,d.proof,base+d.evidence+"/","traveller"],[d.consumers,d.case,catalog+d.analysis+"/","buyer"],[d.hosts,d.protect,base+d.host+"/","host"]].forEach(([audience,action,url,scene],i)=>{
   const banner=make("article","profile-banner");
   const photo=make("img","profile-photo");photo.src="/assets/profile-"+scene+".jpg";photo.alt="";photo.loading="lazy";photo.decoding="async";
   const title=make("div","profile-title");title.append(make("h3","",stories[i][0]),make("span","profile-label",audience));
   const detail=make("div","profile-detail");detail.append(make("p","",stories[i][1]),link(action,url));
   banner.append(photo,title,detail);stack.append(banner);
 });
 const mod=grid(block("IHA LEGAL 360"));modules[lang].forEach(([name,copy],i)=>card(mod,name,copy,d.view,legal+"#module-"+String(i+1).padStart(2,"0")));
 const tech=block("Digital Justice OS"),states=grid(tech),[live,available,planned,roadmap]=statusText[lang];
 card(states,live,available,d.free,base);card(states,planned,roadmap,"Digital Justice OS",base+"digital-justice-os/");
 const trust=block("IHA GROUP S.A.S.");trust.append(make("p","","NIT 900.365.039-8 · Medellín, Colombia"),make("p","store-copy",t.alert),link("contacto@ihasolucioneslegales.com.co","mailto:contacto@ihasolucioneslegales.com.co"));
 const close=block(d.final);close.classList.add("store-closing");close.append(link(t.button,base+d.prepare+"/"));
 app.append(section);
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
;(function(){var s=document.createElement("script");s.src="/iha-brand-system.js?v=20261123-v5";s.defer=true;document.head.appendChild(s)})();
