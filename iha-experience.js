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
  "intro": "Elija su caso. Cada ficha dice qué recibe, cuánto cuesta y qué no incluye.",
  "how": "Cómo funciona",
  "consumers": "Consumidores",
  "travel": "Viajeros",
  "hosts": "Anfitriones",
  "business": "Empresas",
  "conflicts": "Conflictos con plataformas",
  "case": "Análisis de su caso",
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
  "scopeQ": "¿Cómo sé qué incluye?",
  "scope": "Antes de contratar, solicite el alcance, el precio y las condiciones por escrito.",
  "view": "Ver ficha",
  "final": "Sepa qué hacer en 2 minutos",
  "problem": "Problemas con plataformas",
  "protect": "Plan para anfitriones",
  "catalogue": "¿Qué necesita?",
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
  "intro": "Pick your case. Each page says what you get, what it costs and what it doesn’t cover.",
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
  "scopeQ": "How do I know what’s included?",
  "scope": "Before engaging a service, ask for the scope, price and terms in writing.",
  "view": "View service",
  "final": "Find out what to do in 2 minutes",
  "problem": "Platform problems",
  "protect": "Host plan",
  "catalogue": "What do you need?",
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
  "intro": "Choisissez votre cas. Chaque fiche indique ce que vous recevez, le prix et ce qui n’est pas inclus.",
  "how": "Comment ça marche",
  "consumers": "Consommateurs",
  "travel": "Voyageurs",
  "hosts": "Hôtes",
  "business": "Entreprises",
  "conflicts": "Litiges avec les plateformes",
  "case": "Analyse de votre dossier",
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
  "scopeQ": "Comment savoir ce qui est inclus ?",
  "scope": "Avant de vous engager, demandez le périmètre, le prix et les conditions par écrit.",
  "view": "Voir la fiche",
  "final": "Sachez quoi faire en 2 minutes",
  "problem": "Problèmes avec une plateforme",
  "protect": "Abonnement hôte",
  "catalogue": "De quoi avez-vous besoin ?",
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
  "intro": "Escolha seu caso. Cada ficha diz o que você recebe, quanto custa e o que não inclui.",
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
  "scopeQ": "Como sei o que está incluído?",
  "scope": "Antes de contratar, solicite o escopo, o preço e as condições por escrito.",
  "view": "Ver serviço",
  "final": "Saiba o que fazer em 2 minutos",
  "problem": "Problemas com plataformas",
  "protect": "Plano para anfitriões",
  "catalogue": "Do que você precisa?",
  "about": "Conheça a IHA"
 }
};


const tr={
 "es": {
  "eyebrow": "Dos caminos, una misma protección.",
  "title": "Claridad jurídica para plataformas digitales.",
  "description": "Para anfitriones y usuarios de plataformas. Conozca sus obligaciones, prevenga riesgos y resuelva conflictos.",
  "features": [
   "Normas",
   "Prevención",
   "Conflictos",
   "Orientación clara"
  ],
  "details": [
   "Requisitos según su actividad",
   "Documente antes de escalar",
   "Opciones y seguimiento",
   "Vías disponibles en Colombia"
  ],
  "heads": [
   "Anfitriones: ponga su vivienda en regla",
   "Conflictos con plataformas",
   "Sus derechos como consumidor"
  ],
  "copy": [
   "Registros, obligaciones y buenas prácticas para alquilar por días.",
   "Ordene mensajes y documentos. Vea cómo reclamar.",
   "Cancelaciones, cobros, reembolsos o publicidad engañosa: vea qué puede hacer."
  ],
  "tags": [
   "Requisitos y documentos",
   "Prevención de conflictos",
   "Opciones para reclamar"
  ],
  "cta": [
   "Servicios para anfitriones",
   "Servicios para conflictos",
   "Servicios para consumidores"
  ],
  "stepsTitle": "Del problema al siguiente paso.",
  "steps": [
   [
    "01",
    "Cuente qué pasó",
    "Fechas, partes y documentos."
   ],
   [
    "02",
    "Vea sus opciones",
    "Qué dice la ley y dónde reclamar."
   ],
   [
    "03",
    "Elija qué hacer",
    "Use la guía o pida que una abogada revise su caso."
   ]
  ],
  "alert": "Orientación informativa. Cada caso exige revisar hechos, pruebas y normas. La automatización avanzada está en desarrollo.",
  "final": "Su situación merece una respuesta clara.",
  "button": "Ver mis opciones"
 },
 "en": {
  "eyebrow": "Two paths, one standard of protection.",
  "title": "Legal clarity for digital platforms.",
  "description": "For hosts and platform users. Know your obligations, prevent risks and resolve disputes.",
  "features": [
   "Regulation",
   "Prevention",
   "Disputes",
   "Clear guidance"
  ],
  "details": [
   "Requirements for your activity",
   "Document early",
   "Options and follow-up",
   "Channels in Colombia"
  ],
  "heads": [
   "Hosts: get your rental compliant",
   "Platform disputes",
   "Your consumer rights"
  ],
  "copy": [
   "Registration, obligations and good practice for short-term rentals.",
   "Organise messages and documents. See how to complain.",
   "Cancellations, charges, refunds or misleading ads: see what you can do."
  ],
  "tags": [
   "Requirements and records",
   "Dispute prevention",
   "Ways to complain"
  ],
  "cta": [
   "Host services",
   "Dispute services",
   "Consumer services"
  ],
  "stepsTitle": "From problem to next step.",
  "steps": [
   [
    "01",
    "Tell us what happened",
    "Dates, parties and documents."
   ],
   [
    "02",
    "See your options",
    "What the law says and where to complain."
   ],
   [
    "03",
    "Choose what to do",
    "Use the guide or ask a lawyer to review your case."
   ]
  ],
  "alert": "General information only. Each case needs a review of the facts, evidence and law. Advanced automation is in development.",
  "final": "Your situation deserves a clear answer.",
  "button": "See my options"
 },
 "fr": {
  "eyebrow": "Deux parcours, une même protection.",
  "title": "La clarté juridique pour les plateformes numériques.",
  "description": "Pour les hôtes et les utilisateurs de plateformes. Connaissez vos obligations, prévenez les risques et réglez les litiges.",
  "features": [
   "Réglementation",
   "Prévention",
   "Litiges",
   "Orientation claire"
  ],
  "details": [
   "Exigences selon votre activité",
   "Documentez tôt",
   "Options et suivi",
   "Voies possibles en Colombie"
  ],
  "heads": [
   "Hôtes : mettez votre logement en règle",
   "Litiges avec les plateformes",
   "Vos droits de consommateur"
  ],
  "copy": [
   "Enregistrements, obligations et bonnes pratiques pour la location courte durée.",
   "Rassemblez messages et documents. Voyez comment réclamer.",
   "Annulations, frais, remboursements ou publicité trompeuse : voyez ce que vous pouvez faire."
  ],
  "tags": [
   "Exigences et documents",
   "Prévention des litiges",
   "Voies de réclamation"
  ],
  "cta": [
   "Services aux hôtes",
   "Services en cas de litige",
   "Services aux consommateurs"
  ],
  "stepsTitle": "Du problème à la prochaine étape.",
  "steps": [
   [
    "01",
    "Racontez ce qui s’est passé",
    "Dates, parties et documents."
   ],
   [
    "02",
    "Voyez vos options",
    "Ce que dit la loi et où réclamer."
   ],
   [
    "03",
    "Choisissez la suite",
    "Utilisez le guide ou demandez l’avis d’une avocate."
   ]
  ],
  "alert": "Information générale uniquement. Chaque dossier exige l’examen des faits, des preuves et du droit. L’automatisation avancée est en développement.",
  "final": "Votre situation mérite une réponse claire.",
  "button": "Voir mes options"
 },
 "pt": {
  "eyebrow": "Dois caminhos, uma mesma proteção.",
  "title": "Clareza jurídica para plataformas digitais.",
  "description": "Para anfitriões e usuários de plataformas. Conheça suas obrigações, previna riscos e resolva conflitos.",
  "features": [
   "Normas",
   "Prevenção",
   "Conflitos",
   "Orientação clara"
  ],
  "details": [
   "Requisitos por atividade",
   "Documente cedo",
   "Opções e acompanhamento",
   "Canais na Colômbia"
  ],
  "heads": [
   "Anfitriões: regularize seu imóvel",
   "Conflitos com plataformas",
   "Seus direitos de consumidor"
  ],
  "copy": [
   "Registros, obrigações e boas práticas para aluguel por temporada.",
   "Organize mensagens e documentos. Veja como reclamar.",
   "Cancelamentos, cobranças, reembolsos ou publicidade enganosa: veja o que fazer."
  ],
  "tags": [
   "Requisitos e documentos",
   "Prevenção de conflitos",
   "Opções de reclamação"
  ],
  "cta": [
   "Serviços para anfitriões",
   "Serviços para conflitos",
   "Serviços para consumidores"
  ],
  "stepsTitle": "Do problema ao próximo passo.",
  "steps": [
   [
    "01",
    "Conte o que aconteceu",
    "Datas, partes e documentos."
   ],
   [
    "02",
    "Veja suas opções",
    "O que diz a lei e onde reclamar."
   ],
   [
    "03",
    "Escolha o que fazer",
    "Use o guia ou peça a análise de uma advogada."
   ]
  ],
  "alert": "Informação geral. Cada caso exige análise dos fatos, provas e leis. A automação avançada está em desenvolvimento.",
  "final": "Sua situação merece uma resposta clara.",
  "button": "Ver minhas opções"
 }
};
const homeCopy={
 "es": [
  "¿Problema con una reserva, una compra o una app? Sepa qué hacer.",
  "Gratis y en 2 minutos: vea qué dice la ley en Colombia, qué pruebas guardar y dónde reclamar.",
  "Más recursos",
  "¿Qué necesita?",
  "Una compra",
  "Una reserva",
  "Soy anfitrión",
  "Ver mis opciones",
  "Guía jurídica",
  "Pruebas",
  "Servicios y precios",
  "Precios"
 ],
 "fr": [
  "Un problème avec une réservation, un achat ou une appli ? Sachez quoi faire.",
  "Gratuit, en 2 minutes : ce que dit la loi colombienne, les preuves à garder et où réclamer.",
  "Autres ressources",
  "De quoi avez-vous besoin ?",
  "Un achat",
  "Une réservation",
  "Je suis hôte",
  "Voir mes options",
  "Guide juridique",
  "Preuves",
  "Services et prix",
  "Tarifs"
 ],
 "en": [
  "Problem with a booking, a purchase or an app? Find out what to do.",
  "Free, in 2 minutes: see what Colombian law says, what evidence to keep and where to complain.",
  "More resources",
  "What do you need?",
  "A purchase",
  "A booking",
  "I'm a host",
  "See my options",
  "Legal guide",
  "Evidence",
  "Services and prices",
  "Pricing"
 ],
 "pt": [
  "Problema com uma reserva, uma compra ou um app? Saiba o que fazer.",
  "Grátis, em 2 minutos: veja o que diz a lei colombiana, que provas guardar e onde reclamar.",
  "Mais recursos",
  "Do que você precisa?",
  "Uma compra",
  "Uma reserva",
  "Sou anfitrião",
  "Ver minhas opções",
  "Guia jurídico",
  "Provas",
  "Serviços e preços",
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
  "Qué hacer según su caso",
  [
   "Le cancelaron la reserva o el lugar no era como en el anuncio",
   "Guarde la confirmación, los mensajes y las fotos del lugar. Prueban lo que le ofrecieron."
  ],
  [
   "El pedido no llegó o le cobraron de más",
   "Guarde el pedido, la factura y el comprobante de pago. Con ellos podrá reclamar."
  ],
  [
   "Alquila su vivienda por días",
   "Vea qué registros, documentos y obligaciones le aplican en Colombia."
  ]
 ],
 "fr": [
  "Que faire selon votre cas",
  [
   "Réservation annulée ou logement différent de l’annonce",
   "Gardez la confirmation, les messages et les photos du logement. Ils prouvent ce qui vous a été proposé."
  ],
  [
   "Commande non livrée ou paiement contesté",
   "Gardez la commande, la facture et le justificatif de paiement. Ils vous permettront de réclamer."
  ],
  [
   "Vous louez un logement à la nuitée",
   "Voyez quels enregistrements, documents et obligations s’appliquent à vous en Colombie."
  ]
 ],
 "en": [
  "What to do in your case",
  [
   "Your booking was cancelled or the place didn’t match the listing",
   "Keep the confirmation, messages and photos of the place. They prove what you were offered."
  ],
  [
   "Your order didn’t arrive or you were overcharged",
   "Keep the order, invoice and payment receipt. You’ll need them to complain."
  ],
  [
   "You rent out a property short-term",
   "See which registrations, records and obligations apply to you in Colombia."
  ]
 ],
 "pt": [
  "O que fazer no seu caso",
  [
   "Reserva cancelada ou hospedagem diferente do anúncio",
   "Guarde a confirmação, as mensagens e as fotos do lugar. Elas provam o que foi oferecido."
  ],
  [
   "Pedido não entregue ou cobrança indevida",
   "Guarde o pedido, a fatura e o comprovante de pagamento. Com eles, você poderá reclamar."
  ],
  [
   "Você aluga seu imóvel por temporada",
   "Veja quais registros, documentos e obrigações se aplicam a você na Colômbia."
  ]
 ]
};
const legal360Intro={
 "es": [
  "IHA LEGAL 360",
  "Su caso, sus pruebas y sus plazos en",
  "un solo lugar",
  "Ver cómo funciona"
 ],
 "en": [
  "IHA LEGAL 360",
  "Your case, evidence and deadlines in",
  "one place",
  "See how it works"
 ],
 "fr": [
  "IHA LEGAL 360",
  "Votre dossier, vos preuves et vos délais",
  "au même endroit",
  "Voir comment ça marche"
 ],
 "pt": [
  "IHA LEGAL 360",
  "Seu caso, suas provas e seus prazos em",
  "um só lugar",
  "Ver como funciona"
 ]
};

function render(){
 const app=document.getElementById("app");
 if(!app?.querySelector(".os-simple-home")||document.getElementById("iha-experience"))return;
 const lang=document.documentElement.lang.slice(0,2);
 const d=directory[lang]||directory.es, t=tr[lang]||tr.es;
 const base="/"+lang+"/",svcBase=base+d.catalog+"/",catalog=base+({es:"servicios-y-precios",en:"services-and-prices",fr:"services-et-prix",pt:"servicos-e-precos"}[lang]||"servicios-y-precios")+"/";
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
   [base,base+d.evidence+"/",catalog].forEach((url,i)=>links.append(link(labels[i+8],url)));
   const preview=make("a","home-preview");
   preview.href="#como-trabajamos";preview.append(make("strong","","IHA LEGAL 360"));
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
   // Cada opción lleva a su servicio (revisión del 27/11/2026): orientación gratuita del conflicto,
   // orientación gratuita del anfitrión, o la ficha del servicio «Pregunta escrita a una abogada» con su precio.
   const pickerSubs={"es": ["Gratis · plazos y carta de reclamo", "Gratis · lo que le falta", "$62.800 · respuesta en 2 días hábiles"], "en": ["Free · deadlines and complaint letter", "Free · what you’re missing", "$62,800 COP · reply in 2 business days"], "fr": ["Gratuit · délais et lettre de réclamation", "Gratuit · ce qui vous manque", "62 800 COP · réponse en 2 jours ouvrables"], "pt": ["Grátis · prazos e carta de reclamação", "Grátis · o que falta", "$62.800 COP · resposta em 2 dias úteis"]}[lang]||["Gratis · plazos y carta de reclamo", "Gratis · lo que le falta", "$62.800 · respuesta en 2 días hábiles"];
   const pickerOther={"es": ["Ver el servicio y el precio", "¿Una plataforma bloqueó su cuenta o retiene sus pagos?"], "en": ["See the service and price", "Did a platform block your account or hold your payouts?"], "fr": ["Voir le service et le prix", "Une plateforme a bloqué votre compte ou retient vos paiements ?"], "pt": ["Ver o serviço e o preço", "Uma plataforma bloqueou sua conta ou retém seus pagamentos?"]}[lang]||["Ver el servicio y el precio", "¿Una plataforma bloqueó su cuenta o retiene sus pagos?"];
   const lawyerPage={"es": "/es/servicios/pregunta-escrita-a-una-abogada/", "en": "/en/services/written-question-to-a-lawyer/", "fr": "/fr/services/question-ecrite-a-une-avocate/", "pt": "/pt/servicos/pergunta-escrita-a-uma-advogada/"}[lang]||"/es/servicios/pregunta-escrita-a-una-abogada/";
   const pickerGo=["#consumidor","#anfitrion",lawyerPage];
   const offerNames={"es":["Resolver un conflicto","Poner un alojamiento en regla","Consultar a una abogada"],"en":["Resolve a dispute","Bring a rental into compliance","Consult a lawyer"],"fr":["Résoudre un litige","Mettre un hébergement en règle","Consulter une avocate"],"pt":["Resolver um conflito","Regularizar uma hospedagem","Consultar uma advogada"]}[lang] || ["Resolver un conflicto","Poner un alojamiento en regla","Consultar a una abogada"];
   destinations.forEach((topic,i)=>{
     const option=make("label","home-option"),radio=make("input","");
     radio.type="radio";radio.name="need";radio.value=topic;radio.required=true;
     const icon=i===0?make("span","home-document-icon","≡"):make("img","");
     if(i!==0){icon.src=i===1?"/assets/iha-stay.jpg":"/assets/iha-case-review.jpg";icon.alt="";icon.width=58;icon.height=58}
     icon.setAttribute("aria-hidden","true");
     const sub=make("small","home-option-sub",pickerSubs[i]);
     option.append(radio,icon,make("span","",offerNames[i]),sub);options.append(option);
   });
   fieldset.append(legend,options);
   const submit=make("button","",labels[7]);submit.type="submit";
   const platformLink=make("a","home-picker-platform",pickerOther[1]);platformLink.href="#plataforma";
   panel.append(make("p","home-picker-brand","IHA GROUP S.A.S. · Colombia"),fieldset,submit,platformLink);
   panel.addEventListener("change",()=>{const selected=panel.querySelector("input:checked");submit.textContent=selected&&selected.value==="consultation"?pickerOther[0]:labels[7]});
   panel.addEventListener("submit",event=>{event.preventDefault();const selected=panel.querySelector("input:checked");if(!selected)return;
     const target=pickerGo[destinations.indexOf(selected.value)];
     if(target.charAt(0)==="#"){if(location.hash===target)window.dispatchEvent(new HashChangeEvent("hashchange"));else location.hash=target;}else location.assign(target)});
   hero.replaceChildren(copy,panel);hero.classList.add("home-masthead");
 }
 const needs=block(d.catalogue), shortcuts=make("nav","store-links");needs.append(shortcuts);
 [[d.problem,catalog+"#platforms"],[d.consumers,catalog+"#consumers"],[d.hosts,catalog+"#hosts"],[d.protect,base+d.host+"/"]].forEach(([label,url])=>shortcuts.append(link(label,url)));
 const steps=grid(block(d.how));t.steps.forEach(([,title,copy])=>card(steps,title,copy));
 const services=block(d.services),tabs=make("div","store-tabs");tabs.setAttribute("role","tablist");tabs.setAttribute("aria-label",d.services);services.append(tabs);
 services.classList.add("editorial-services");wrap.prepend(services);
 const [introLabel,introLead,introEmphasis,introAction]=legal360Intro[lang]||legal360Intro.es;
 const legalIntro=make("section","legal360-intro");
 legalIntro.id="como-funciona";
 legalIntro.setAttribute("aria-labelledby","legal360-intro-title");
 const introCopy=make("div","legal360-intro-copy");
 const introHeading=make("h2","legal360-intro-title",introLead+" ");
 introHeading.id="legal360-intro-title";
 introHeading.append(make("em","",introEmphasis),".");
 introCopy.append(make("p","legal360-intro-label",introLabel),introHeading);
 const introLink=make("a","legal360-intro-cta",introAction);
 introLink.href="#como-trabajamos";
 legalIntro.append(introCopy,introLink);
 wrap.prepend(legalIntro);
 const visualLabels=artLabels[lang]||artLabels.es;
 const buttons=[],panels=[];
 const circleObserver=typeof IntersectionObserver==="function" && !matchMedia("(prefers-reduced-motion: reduce)").matches
   ?new IntersectionObserver((entries,observer)=>{
     for(const entry of entries){
       if(!entry.isIntersecting)continue;
       entry.target.classList.add("circles-in-view");
       observer.unobserve(entry.target);
     }
   },{threshold:.35})
   :null;
 function serviceVisual(index){
   const visual=make("span","service-visual visual-"+index);
   visual.setAttribute("aria-hidden","true");
   if(index===1){
     const stack=make("span","evidence-stack");
     visualLabels.slice(3,6).forEach((label,i)=>stack.append(make("span","evidence-note note-"+i,label)));
     visual.append(stack);
   }else{
     const photo=make("img","");
     photo.src=index===0?"/assets/iha-stay.jpg":"/assets/consumer-orientation.jpg?v=approved";photo.alt="";photo.width=800;photo.height=800;photo.loading="lazy";photo.decoding="async";visual.append(photo);
     const overlay=make("span",index===0?"property-tags":"case-slip");
     if(index===0)visualLabels.slice(0,3).forEach(label=>overlay.append(make("span","",label)));
     else overlay.append(make("span","case-rule","IHA"),make("span","",({es:"Derechos del consumidor",en:"Consumer rights",fr:"Droits des consommateurs",pt:"Direitos do consumidor"}[lang]||"Derechos del consumidor")));
     visual.append(overlay);
   }
   circleObserver?.observe(visual);
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
   const startLabels={"es":["Revisar mi alojamiento","Describir mi conflicto","Ver mis opciones"],"en":["Review my rental","Describe my dispute","See my options"],"fr":["Vérifier mon hébergement","Décrire mon litige","Voir mes options"],"pt":["Revisar minha hospedagem","Descrever meu conflito","Ver minhas opções"]};
   const startLabel=i<2?t.cta[i]:(startLabels[lang]||startLabels.es)[i];
   const start=link(startLabel,i<2?catalog+"#"+["hosts","platforms"][i]:base+d.prepare+"/?situation="+topics[i]);start.classList.add("editorial-orientation");start.setAttribute("aria-label",startLabel+" · "+name);
   tile.append(tab,start);tabs.append(tile);
   panel.append(copy);services.append(panel);buttons.push(tab);panels.push(panel);
   tab.addEventListener("click",()=>{select(i);if(matchMedia("(max-width:700px)").matches)panel.scrollIntoView({block:"center"})});tab.addEventListener("keydown",e=>{const next={ArrowRight:(i+1)%3,ArrowLeft:(i+2)%3,Home:0,End:2}[e.key];if(next!==undefined){e.preventDefault();select(next);buttons[next].focus()}});
 });select(0);
 const [profileTitle,...stories]=profileCopy[lang]||profileCopy.es;
 const profiles=block(profileTitle);profiles.classList.add("profile-banners");
 const stack=make("div","profile-stack");profiles.append(stack);
 [[d.travel,d.proof,base+d.evidence+"/","traveller"],[d.consumers,d.case,svcBase+d.analysis+"/","buyer"],[d.hosts,d.protect,base+d.host+"/","host"]].forEach(([audience,action,url,scene],i)=>{
   const banner=make("article","profile-banner");
   const photo=make("img","profile-photo");photo.src="/assets/profile-"+scene+".jpg";photo.alt="";photo.loading="lazy";photo.decoding="async";
   const title=make("div","profile-title");title.append(make("h3","",stories[i][0]),make("span","profile-label",audience));
   const detail=make("div","profile-detail");detail.append(make("p","",stories[i][1]),link(action,url));
   banner.append(photo,title,detail);stack.append(banner);
 });
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
