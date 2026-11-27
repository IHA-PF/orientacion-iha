/* Semantic enhancement for the 17 IHA service offers (ES/EN/FR/PT).
   Source text, legal terms, prices, URLs and existing CTA are preserved. */
(function () {
 "use strict";
 const copy={
  es:{eyebrow:"IHA · SERVICIOS JURÍDICOS", planned:"En preparación · consulte disponibilidad",
      steps:[["Describa su necesidad","Explique su situación y el objetivo que busca."],
             ["Confirme las condiciones","Reciba por escrito el alcance, precio, plazo y exclusiones."],
             ["Reciba el servicio","Tras acordar la contratación, se realiza la prestación indicada en esta ficha."]]},
  en:{eyebrow:"IHA · LEGAL SERVICES",planned:"In preparation · check availability",
      steps:[["Describe your need","Explain your circumstances and the outcome you seek."],
             ["Confirm the terms","Receive the scope, price, timing and exclusions in writing."],
             ["Receive the service","Once engagement is agreed, the service described on this page is provided."]]},
  fr:{eyebrow:"IHA · SERVICES JURIDIQUES",planned:"En préparation · vérifier la disponibilité",
      steps:[["Exposez votre besoin","Décrivez votre situation et l'objectif recherché."],
             ["Validez les conditions","Recevez par écrit le périmètre, le prix, les délais et les exclusions."],
             ["Recevez la prestation","Après accord, la prestation décrite dans cette fiche est réalisée."]]},
  pt:{eyebrow:"IHA · SERVIÇOS JURÍDICOS",planned:"Em preparação · consulte a disponibilidade",
      steps:[["Explique sua necessidade","Descreva sua situação e o resultado que busca."],
             ["Confirme as condições","Receba por escrito o escopo, o preço, o prazo e as exclusões."],
             ["Receba o serviço","Após o acordo, o serviço descrito nesta página é prestado."]]}
 };
 function node(tag, cls, text){
   const el=document.createElement(tag);
   if(cls)el.className=cls;
   if(text!==undefined)el.textContent=text;
   return el;
 }
 function enhance(){
   const main=document.querySelector("main.w");
   if(!main||main.dataset.ihaServicePremium==="ready")return;
   const heading=main.querySelector(":scope > h1");
   const lead=main.querySelector(":scope > .lead");
   const sections=Array.from(main.querySelectorAll(":scope > section"));
   const price=sections.find(section=>/^(precio|price|prix|preço)\b/i.test(section.querySelector("h2")?.textContent?.trim()||""));
   const cta=sections.find(section=>section.classList.contains("cta"));
   if(!heading||!lead||!price||!cta||sections.length<5)return;
   const lang=(document.documentElement.lang||"es").slice(0,2).toLowerCase();
   const l=copy[lang]||copy.es;
   const link=cta.querySelector("a.go");
   if(!link)return;
   main.dataset.ihaServicePremium="ready";
   document.body.classList.add("iha-service-premium");
   if(location.pathname.includes("plan-anfitrion")||location.pathname.includes("compliance-plan")||location.pathname.includes("abonnement-hote")||location.pathname.includes("plano-anfitriao"))document.body.classList.add("iha-service-plan");
   const planned=/(?:curso-en-linea|online-course|cours-en-ligne|curso-on-line|auditoria-de-trans|audit-de-transition|zoning-plan-pot|auditoria-de-transicao)/i.test(location.pathname);
   const hero=node("div","iha-service-hero");
   hero.setAttribute("aria-label",heading.textContent.trim());
   const intro=node("div","iha-service-hero-copy");
   intro.append(node("span","iha-service-eyebrow",l.eyebrow));
   if(planned)intro.append(node("span","iha-service-state",l.planned));
   intro.append(heading,lead);
   const primary=link.cloneNode(true);
   primary.className="iha-service-hero-action";
   intro.append(primary);
   const artwork=node("div","iha-service-hero-art");
   artwork.setAttribute("aria-hidden","true");
   const mark=node("div","iha-service-art-inner");
   // El recuadro muestra el precio del servicio (antes: «IHA · LEGAL 360», concepto interno).
   const amountText=(price.querySelector("p")?.textContent||"").trim(),amount=amountText.match(/\$\s?[\d.,]+/);
   const priceWord={es:"Precio",en:"Price",fr:"Prix",pt:"Preço"}[(document.documentElement.lang||"es").slice(0,2)]||"Precio";
   if(amount){mark.append(node("span","iha-service-art-text",priceWord),node("span","iha-service-art-mark iha-service-art-price",amount[0].replace(/\s/g,"")),node("span","iha-service-art-text",amountText.slice(amountText.indexOf(amount[0])+amount[0].length).replace(/^[\s,]+/,"").split(/[.;]/)[0]))}
   else mark.append(node("span","iha-service-art-mark","IHA"),node("span","iha-service-art-text","Soluciones Legales"));
   artwork.append(mark);hero.append(intro,artwork);
   const layout=node("div","iha-service-layout");
   const details=node("div","iha-service-details");
   const sidebar=node("aside","iha-service-aside");
   sidebar.setAttribute("aria-label",(price.querySelector("h2")?.textContent||"")+" / "+link.textContent);
   const steps=node("div","iha-service-steps");
   const allowedSteps=l.steps;
   allowedSteps.forEach(([name,desc],i)=>{
     const block=node("div","iha-service-step");
     block.append(node("span","iha-service-step-index",String(i+1).padStart(2,"0")),node("strong","",name),node("p","",desc));
     steps.append(block);
   });
   details.append(steps);
   const before=sections[0];
   main.insertBefore(hero,before);
   main.insertBefore(layout,before);
   for(const s of sections){
     if(s===price||s===cta)sidebar.append(s);
     else{
       const t=(s.querySelector("h2")?.textContent||"").trim().toLowerCase();
       if(/^(incluye|includes|comprend|inclui|qué incluye|what.s included|ce qui est inclus|o que está incluído)/i.test(t))s.classList.add("iha-service-scope");
       if(/^(no incluye|qué no incluye|not included|what.s not included|ne comprend pas|ce qui n|não inclui|o que não)/i.test(t))s.classList.add("iha-service-exclusions");
       details.append(s);
     }
   }
   layout.append(details,sidebar);
   // FAQ answers are taken from the exact current page's contractual text.
   // No new prices, guarantees or services are asserted.
   const faqLabels={
    es:["Preguntas frecuentes","¿Cómo se solicita el servicio?","¿Qué no está incluido?","¿Qué condiciones se confirman antes de empezar?"],
    en:["Frequently asked questions","How do I request this service?","What is excluded?","Which terms are confirmed before work starts?"],
    fr:["Questions fréquentes","Comment demander cette prestation ?","Qu'est-ce qui est exclu ?","Quelles conditions sont confirmées avant de commencer ?"],
    pt:["Perguntas frequentes","Como solicitar este serviço?","O que não está incluído?","Quais condições são confirmadas antes de começar?"]
   }[lang]||["Preguntas frecuentes","¿Cómo se solicita el servicio?","¿Qué no está incluido?","¿Qué condiciones se confirman antes de empezar?"];
   const faq=node("section","iha-service-faq");
   faq.append(node("h2","",faqLabels[0]));
   const addQuestion=(question,answer)=>{
     if(!answer)return;
     const d=node("details","iha-service-question");
     d.append(node("summary","",question),node("p","",answer.trim()));
     faq.append(d);
   };
   addQuestion(faqLabels[1],cta.querySelector("p")?.textContent);
   const exclusions=details.querySelector(".iha-service-exclusions");
   addQuestion(faqLabels[2],exclusions?.querySelector("ul")?.textContent?.replace(/\s+/g," "));
   const terms=sections.find(el=>/^(condiciones|terms|conditions|condições)/i.test(el.querySelector("h2")?.textContent||""));
   const termsCopy=terms?.querySelector("li:nth-child(2)")?.textContent;
   if(termsCopy)addQuestion(faqLabels[3],termsCopy);
   details.append(faq);

 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",enhance,{once:true});
 else enhance();
})();