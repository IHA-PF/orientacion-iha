/* IHA lightweight Guesty-inspired navigation (original IHA design). */
(()=>{"use strict";
if(window.__ihaNavigationActive)return;
window.__ihaNavigationActive=true;
const languageFromPath=()=>{const m=location.pathname.match(/^\/(es|en|fr|pt)(?:\/|$)/);return m?.[1]||document.documentElement.lang.slice(0,2).toLowerCase().replace("br","pt")||"es"};
const messages={
 es:{nav:"Navegación principal",problem:"Resolver un problema",hosts:"Anfitriones",prices:"Servicios y precios",how:"Cómo trabajamos",language:"Idioma",access:"Acceder",start:"Enviar mi caso",menu:"Menú",accessHead:"Acceso privado IHA",accessNote:"El portal privado está en preparación y el acceso será por invitación.",request:"Solicitar invitación",emergency:"Ayuda urgente · 123",home:"Inicio",homeLabel:"Volver al inicio de IHA Soluciones Legales",wa:"WhatsApp",waLabel:"Escribir a IHA por WhatsApp",waText:"Hola, IHA. Tengo una pregunta:",hours:"Atención: lunes a viernes, de 8:00 a. m. a 6:00 p. m. (hora de Colombia). WhatsApp: "},
 en:{nav:"Main navigation",problem:"Solve a problem",hosts:"Hosts",prices:"Services and prices",how:"How we work",language:"Language",access:"Log in",start:"Send my case",menu:"Menu",accessHead:"IHA private access",accessNote:"The private portal is being prepared. Access will be by invitation.",request:"Request an invitation",emergency:"Emergency help · 123",home:"Home",homeLabel:"Back to the IHA Soluciones Legales home page",wa:"WhatsApp",waLabel:"Message IHA on WhatsApp",waText:"Hello IHA, I have a question:",hours:"Hours: Monday to Friday, 8:00 a.m. to 6:00 p.m. (Colombia time). WhatsApp: "},
 fr:{nav:"Navigation principale",problem:"Résoudre un problème",hosts:"Hôtes",prices:"Services et prix",how:"Notre méthode",language:"Langue",access:"Accéder",start:"Envoyer mon dossier",menu:"Menu",accessHead:"Accès privé IHA",accessNote:"Le portail privé est en préparation. L’accès se fera sur invitation.",request:"Demander une invitation",emergency:"Urgence · 123",home:"Accueil",homeLabel:"Revenir à l’accueil d’IHA Soluciones Legales",wa:"WhatsApp",waLabel:"Écrire à IHA sur WhatsApp",waText:"Bonjour IHA, j’ai une question :",hours:"Horaires : du lundi au vendredi, de 8 h à 18 h (heure de Colombie). WhatsApp : "},
 pt:{nav:"Navegação principal",problem:"Resolver um problema",hosts:"Anfitriões",prices:"Serviços e preços",how:"Como trabalhamos",language:"Idioma",access:"Acessar",start:"Enviar meu caso",menu:"Menu",accessHead:"Acesso privado IHA",accessNote:"O portal privado está em preparação e terá acesso por convite.",request:"Solicitar convite",emergency:"Emergência · 123",home:"Início",homeLabel:"Voltar ao início da IHA Soluciones Legales",wa:"WhatsApp",waLabel:"Escrever para a IHA pelo WhatsApp",waText:"Olá, IHA. Tenho uma pergunta:",hours:"Atendimento: segunda a sexta, das 8h às 18h (horário da Colômbia). WhatsApp: "}
};
// Cabecera organizada como la de Guesty (27/11/2026): tres menús con grupos y una línea de descripción
// por entrada (Soluciones, Servicios, Recursos), dos enlaces directos (Precios, Cómo trabajamos)
// y, a la derecha, idioma, acceso y la acción principal. Cada entrada lleva a su servicio, sin duplicados.
const prepSlug={es:"prepare-su-caso",en:"prepare-your-case",fr:"preparez-votre-dossier",pt:"prepare-o-seu-caso"};
const languageLabel={es:"Español",en:"English",fr:"Français",pt:"Português"};
const MENUS={"es":{"menus":[{"label":"Soluciones","groups":[{"title":"Huéspedes y consumidores · gratis","items":[["Reservas y alojamiento","Cancelaciones, sobreventa, alojamiento distinto","/?lang=es#alojamiento"],["Vuelos y transporte","Retrasos, cancelaciones, equipaje","/?lang=es#transporte"],["Compras y otros consumos","Compras en línea, bancos, telefonía, salud…","/?lang=es#otros"]]},{"title":"Anfitriones","items":[["Revisar mi vivienda","Gratis: RNT, reglamento del edificio, SIRE","/?lang=es#anfitrion"],["Una plataforma bloqueó mi cuenta","Cuenta suspendida o pagos retenidos","/?lang=es#plataforma"],["Plan Anfitrión en regla","$928.000 al año","/es/plan-anfitrion-en-regla/"]]}],"footer":["Ver todas las situaciones","/?lang=es#guia"]},{"label":"Servicios","groups":[{"title":"Con una abogada","items":[["Pregunta escrita a una abogada","$62.800","/es/servicios/pregunta-escrita-a-una-abogada/"],["Análisis de su caso","$128.000","/es/servicios/analisis-de-su-caso/"],["Reclamación administrativa","$280.000","/es/servicios/reclamacion-administrativa/"],["Fraude: denuncia y reclamo","$1.280.000","/es/servicios/fraude-denuncia-y-reclamo/"]]},{"title":"Viajeros y visitantes","items":[["Revisión legal en su idioma","$199.900","/es/servicios/revision-legal-en-su-idioma/"],["Reclamo después del viaje","$749.800","/es/servicios/reclamo-despues-del-viaje/"]]},{"title":"Anfitriones","items":[["Revisión: vivienda en regla","$280.000","/es/servicios/revision-vivienda-en-regla/"],["Alertas Anfitrión","$28.000 al mes","/es/servicios/alertas-anfitrion/"],["Respuesta a requerimiento o sanción","$928.000","/es/servicios/respuesta-a-requerimiento-o-sancion/"],["Cuenta suspendida o pagos retenidos","$589.600","/es/servicios/cuenta-suspendida-o-pagos-retenidos/"]]}]},{"label":"Recursos","groups":[{"title":"Guías","items":[["Guía de derechos","Qué dice la ley, plazos y dónde reclamar","/es/"],["Guía de pruebas","Qué reunir y cómo cuidarlo","/es/guia-de-pruebas/"],["Preguntas frecuentes","Lo que nos preguntan antes de escribirnos","/es/preguntas-frecuentes/"]]},{"title":"Al día","items":[["Novedades de la vivienda turística","Decreto del RNT, POT y otros cambios","/es/novedades-vivienda-turistica/"],["Guía por zona","Reglas según su ciudad","/orientador/"]]}]}],"links":[["Precios","/es/servicios-y-precios/","price"],["Cómo trabajamos","/?lang=es#como-trabajamos","how"]]},"en":{"menus":[{"label":"Solutions","groups":[{"title":"Guests and consumers · free","items":[["Bookings and stays","Cancellations, overbooking, place not as listed","/?lang=en#alojamiento"],["Flights and transport","Delays, cancellations, baggage","/?lang=en#transporte"],["Shopping and other services","Online shopping, banks, phone, health…","/?lang=en#otros"]]},{"title":"Hosts","items":[["Check my rental","Free: RNT, building rules, SIRE","/?lang=en#anfitrion"],["A platform blocked my account","Suspended account or withheld payouts","/?lang=en#plataforma"],["Host Compliance Plan","COP 928,000 a year","/en/host-compliance-plan/"]]}],"footer":["See all situations","/?lang=en#guia"]},{"label":"Services","groups":[{"title":"With a lawyer","items":[["Written question to a lawyer","COP 62,800","/en/services/written-question-to-a-lawyer/"],["Case analysis","COP 128,000","/en/services/case-analysis/"],["Administrative complaint","COP 280,000","/en/services/administrative-complaint/"],["Fraud: report and claim","COP 1,280,000","/en/services/fraud-report-and-claim/"]]},{"title":"Travellers and visitors","items":[["Legal review in your language","COP 199,900","/en/services/legal-review-in-your-language/"],["Claim handled after you leave","COP 749,800","/en/services/claim-handled-after-you-leave/"]]},{"title":"Hosts","items":[["Review: is your rental compliant?","COP 280,000","/en/services/review-is-your-rental-compliant/"],["Host Alerts","COP 28,000 a month","/en/services/host-alerts/"],["Reply to an official notice or sanction","COP 928,000","/en/services/reply-to-an-official-notice-or-sanction/"],["Suspended account or withheld payouts","COP 589,600","/en/services/suspended-account-or-withheld-payouts/"]]}]},{"label":"Resources","groups":[{"title":"Guides","items":[["Rights guide","What the law says, deadlines and where to complain","/en/"],["Evidence guide","What to gather and how to keep it","/en/evidence-guide/"],["FAQ","What people ask before writing to us","/en/faq/"]]},{"title":"Stay up to date","items":[["Short-term rental updates","RNT decree, zoning and other changes","/en/short-term-rental-updates/"],["Guide by area","Rules by city","/orientador/"]]}]}],"links":[["Pricing","/en/services-and-prices/","price"],["How we work","/?lang=en#como-trabajamos","how"]]},"fr":{"menus":[{"label":"Solutions","groups":[{"title":"Voyageurs et consommateurs · gratuit","items":[["Réservations et hébergement","Annulations, surréservation, logement non conforme","/?lang=fr#alojamiento"],["Vols et transport","Retards, annulations, bagages","/?lang=fr#transporte"],["Achats et autres services","Achats en ligne, banques, télécoms, santé…","/?lang=fr#otros"]]},{"title":"Hôtes","items":[["Vérifier mon logement","Gratuit : RNT, règlement de copropriété, SIRE","/?lang=fr#anfitrion"],["Une plateforme a bloqué mon compte","Compte suspendu ou paiements retenus","/?lang=fr#plataforma"],["Abonnement Hôte en règle","928 000 COP par an","/fr/abonnement-hote-en-regle/"]]}],"footer":["Voir toutes les situations","/?lang=fr#guia"]},{"label":"Services","groups":[{"title":"Avec une avocate","items":[["Question écrite à une avocate","62 800 COP","/fr/services/question-ecrite-a-une-avocate/"],["Analyse de votre dossier","128 000 COP","/fr/services/analyse-de-votre-dossier/"],["Réclamation administrative","280 000 COP","/fr/services/reclamation-administrative/"],["Fraude : plainte et réclamation","1 280 000 COP","/fr/services/fraude-plainte-et-reclamation/"]]},{"title":"Voyageurs et visiteurs","items":[["Revue juridique dans votre langue","199 900 COP","/fr/services/revue-juridique-dans-votre-langue/"],["Réclamation après votre départ","749 800 COP","/fr/services/reclamation-apres-votre-depart/"]]},{"title":"Hôtes","items":[["Vérification : logement en règle","280 000 COP","/fr/services/verification-logement-en-regle/"],["Alertes Hôte","28 000 COP par mois","/fr/services/alertes-hote/"],["Réponse à une mise en demeure ou une sanction","928 000 COP","/fr/services/reponse-a-une-mise-en-demeure-ou-une-sanction/"],["Compte suspendu ou paiements bloqués","589 600 COP","/fr/services/compte-suspendu-ou-paiements-bloques/"]]}]},{"label":"Ressources","groups":[{"title":"Guides","items":[["Guide des droits","Ce que dit la loi, les délais et où réclamer","/fr/"],["Guide des preuves","Quoi rassembler et comment le conserver","/fr/guide-des-preuves/"],["Questions fréquentes","Ce qu’on nous demande avant d’écrire","/fr/questions-frequentes/"]]},{"title":"Actualité","items":[["Actualités location touristique","Décret RNT, POT et autres changements","/fr/actualites-location-touristique/"],["Guide par zone","Règles selon votre ville","/orientador/"]]}]}],"links":[["Tarifs","/fr/services-et-prix/","price"],["Notre méthode","/?lang=fr#como-trabajamos","how"]]},"pt":{"menus":[{"label":"Soluções","groups":[{"title":"Hóspedes e consumidores · grátis","items":[["Reservas e hospedagem","Cancelamentos, overbooking, hospedagem diferente","/?lang=pt#alojamiento"],["Voos e transporte","Atrasos, cancelamentos, bagagem","/?lang=pt#transporte"],["Compras e outros consumos","Compras on-line, bancos, telefonia, saúde…","/?lang=pt#otros"]]},{"title":"Anfitriões","items":[["Verificar meu imóvel","Grátis: RNT, regulamento do prédio, SIRE","/?lang=pt#anfitrion"],["Uma plataforma bloqueou minha conta","Conta suspensa ou pagamentos retidos","/?lang=pt#plataforma"],["Plano Anfitrião em dia","$928.000 COP por ano","/pt/plano-anfitriao-em-dia/"]]}],"footer":["Ver todas as situações","/?lang=pt#guia"]},{"label":"Serviços","groups":[{"title":"Com uma advogada","items":[["Pergunta escrita a uma advogada","$62.800 COP","/pt/servicos/pergunta-escrita-a-uma-advogada/"],["Análise do seu caso","$128.000 COP","/pt/servicos/analise-do-seu-caso/"],["Reclamação administrativa","$280.000 COP","/pt/servicos/reclamacao-administrativa/"],["Fraude: denúncia e reclamação","$1.280.000 COP","/pt/servicos/fraude-denuncia-e-reclamacao/"]]},{"title":"Viajantes e visitantes","items":[["Revisão jurídica no seu idioma","$199.900 COP","/pt/servicos/revisao-juridica-no-seu-idioma/"],["Reclamação depois da viagem","$749.800 COP","/pt/servicos/reclamacao-depois-da-viagem/"]]},{"title":"Anfitriões","items":[["Revisão: imóvel em dia","$280.000 COP","/pt/servicos/revisao-imovel-em-dia/"],["Alertas Anfitrião","$28.000 COP por mês","/pt/servicos/alertas-anfitriao/"],["Resposta a notificação ou sanção","$928.000 COP","/pt/servicos/resposta-a-notificacao-ou-sancao/"],["Conta suspensa ou pagamentos retidos","$589.600 COP","/pt/servicos/conta-suspensa-ou-pagamentos-retidos/"]]}]},{"label":"Recursos","groups":[{"title":"Guias","items":[["Guia de direitos","O que diz a lei, prazos e onde reclamar","/pt/"],["Guia de provas","O que reunir e como guardar","/pt/guia-de-provas/"],["Perguntas frequentes","O que nos perguntam antes de escrever","/pt/perguntas-frequentes/"]]},{"title":"Novidades","items":[["Novidades da moradia turística","Decreto do RNT, POT e outras mudanças","/pt/novidades-moradia-turistica/"],["Guia por zona","Regras conforme a sua cidade","/orientador/"]]}]}],"links":[["Preços","/pt/servicos-e-precos/","price"],["Como trabalhamos","/?lang=pt#como-trabajamos","how"]]}};
function create(tag,cls,txt){const el=document.createElement(tag);if(cls)el.className=cls;if(txt!=null)el.textContent=txt;return el}
function lnk(text,href,cls){const e=create("a",cls,text);e.href=href;return e}
function fillNav(nav,code){
 const data=MENUS[code]||MENUS.es;
 nav.querySelectorAll(":scope > .iha-nav-menu, :scope > .iha-nav-link").forEach(n=>n.remove());
 const anchor=nav.firstChild;
 const here=location.pathname+location.search+location.hash;
 data.menus.forEach((m,i)=>{
  const d=create("details","iha-nav-dropdown iha-nav-menu");
  const sum=create("summary","iha-nav-trigger",m.label);
  const chev=create("span","iha-nav-chevron");chev.setAttribute("aria-hidden","true");sum.append(chev);
  const panel=create("div","iha-nav-panel iha-nav-mega");panel.style.setProperty("--cols",String(m.groups.length));
  m.groups.forEach(g=>{const col=create("div","iha-nav-col");col.append(create("p","iha-nav-col-title",g.title));
   g.items.forEach(([title,desc,url])=>{const a=create("a","iha-nav-entry iha-nav-item");a.href=url;a.append(create("span","iha-nav-item-title",title));if(desc)a.append(create("span","iha-nav-item-desc",desc));if(url===location.pathname||url===here)a.setAttribute("aria-current","page");col.append(a)});
   panel.append(col)});
  if(m.footer){const f=create("div","iha-nav-mega-foot");f.append(lnk(m.footer[0]+" →",m.footer[1],"iha-nav-entry iha-nav-foot-link"));panel.append(f)}
  d.append(sum,panel);nav.insertBefore(d,anchor);
 });
 data.links.forEach(([title,url,kind])=>{const a=lnk(title,url,"iha-nav-link"+(kind==="price"?" iha-nav-price":""));if(url===location.pathname||url===here)a.setAttribute("aria-current","page");nav.insertBefore(a,anchor)});
}
function init(){
 const header=document.querySelector("body > header");
 if(!header || header.dataset.ihaNavInstalled)return;
 const inner=header.querySelector(":scope > .bar-in, :scope > .hb, :scope > .head, :scope > .wrap, :scope > .in")||header.firstElementChild;
 const brand=inner?.querySelector(":scope > .brand");
 if(!brand)return;
 const lang=messages[languageFromPath()]?languageFromPath():"es",t=messages[lang];
 const nav=create("nav","iha-nav-groups iha-nav-flat iha-nav-organised");
 nav.setAttribute("aria-label",t.nav);
 fillNav(nav,lang);
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
 // Idiomas dentro del menú del teléfono (la barra no tiene sitio para el selector y el nombre a la vez).
 const mLangs=create("div","iha-mobile-langs");
 const fillMLangs=code=>{
   mLangs.replaceChildren(create("span","iha-mobile-langs-label",(messages[code]||messages.es).language));
   const alt={};for(const a of document.querySelectorAll('link[rel="alternate"][hreflang]'))alt[a.hreflang.slice(0,2).toLowerCase()]=a.href;
   for(const c of ["es","en","fr","pt"]){
     const url=location.pathname==="/"?"/?lang="+c+location.hash:(alt[c]||"/?lang="+c);
     const a=lnk(languageLabel[c],url,"iha-nav-entry");a.lang=c;if(c===code)a.setAttribute("aria-current","true");mLangs.append(a);
   }
 };
 fillMLangs(lang);nav.append(mLangs);
 window.addEventListener("hashchange",()=>fillMLangs(languageFromPath()));
 const start=lnk(t.start,"/"+lang+"/"+prepSlug[lang]+"/","iha-nav-start");
 right.append(start);
 const menuBtn=create("button","iha-nav-mobile-button");
 menuBtn.type="button";menuBtn.setAttribute("aria-label",t.menu);menuBtn.setAttribute("aria-expanded","false");
 const bars=create("span","iha-nav-mobile-bars");bars.setAttribute("aria-hidden","true");menuBtn.append(bars);
 const menuId="iha-menu-"+lang;nav.id=menuId;menuBtn.setAttribute("aria-controls",menuId);
 // Preserve the emergency button's existing click handler by moving it into the menu.
 const sos=oldTools?.querySelector("#sosbtn");
 if(sos){const holder=create("div","iha-nav-urgent");const label=create("span",null,t.emergency);holder.append(label,sos);nav.querySelector(".iha-nav-menu .iha-nav-mega")?.append(holder)}
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
 header.addEventListener("toggle",e=>{const d=e.target;if(d.matches&&d.matches(".iha-nav-dropdown")&&d.open)closeAll(d)},true);
 document.addEventListener("click",e=>{if(!header.contains(e.target))closeAll()});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"){const active=header.querySelector("details[open] > summary");if(active)active.focus();else if(inner.classList.contains("iha-nav-mobile-open"))menuBtn.focus();closeAll();if(inner.classList.contains("iha-nav-mobile-open"))menuBtn.focus();inner.classList.remove("iha-nav-mobile-open");menuBtn.setAttribute("aria-expanded","false")}});
 menuBtn.addEventListener("click",()=>{const open=inner.classList.toggle("iha-nav-mobile-open");menuBtn.setAttribute("aria-expanded",String(open));if(!open)closeAll()});
 nav.addEventListener("click",e=>{if(e.target.closest("a")){inner.classList.remove("iha-nav-mobile-open");menuBtn.setAttribute("aria-expanded","false");closeAll()}});
 right.addEventListener("click",e=>{if(e.target.closest("a"))closeAll()});
 // The public app switches languages without a full page reload. Keep this nav localized.
 const syncLanguage=()=>{
   const code=languageFromPath(),nt=messages[code]||messages.es;
   const keep=nav.querySelector(".iha-nav-urgent");fillNav(nav,code);if(keep)nav.querySelector(".iha-nav-menu .iha-nav-mega")?.append(keep);
   nav.setAttribute("aria-label",nt.nav);
   start.textContent=nt.start;start.href="/"+code+"/"+prepSlug[code]+"/";
   for(const d of [access,mobileAccess]){
     d.querySelector("summary").textContent=nt.access;
     d.querySelector(".iha-nav-access-title").textContent=nt.accessHead;
     d.querySelector(".iha-nav-access-note").textContent=nt.accessNote;
     const req=d.querySelector(".iha-nav-request");req.textContent=nt.request;req.href="mailto:contacto@ihasolucioneslegales.com.co?subject="+encodeURIComponent("IHA LEGAL 360 - "+nt.request);
   }
   menuBtn.setAttribute("aria-label",nt.menu);
   home.href="/?lang="+code;homeText.textContent=nt.home;home.setAttribute("aria-label",nt.homeLabel);
   wa.href="https://wa.me/"+WA+"?text="+encodeURIComponent(nt.waText);wa.setAttribute("aria-label",nt.waLabel);
   fillHours(nt);
   fillMLangs(code);
   const urgent=nav.querySelector(".iha-nav-urgent span");if(urgent)urgent.textContent=nt.emergency;
 };
 const langWatcher=new MutationObserver(()=>syncLanguage());
 langWatcher.observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});

 // Botón «Inicio» (27/11/2026): visible fuera de la portada para volver al menú principal.
 const home=lnk("", "/?lang="+lang,"iha-nav-home");
 const homeIcon=document.createElementNS("http://www.w3.org/2000/svg","svg");homeIcon.setAttribute("viewBox","0 0 24 24");homeIcon.setAttribute("aria-hidden","true");
 homeIcon.innerHTML='<path d="M3 11.2 12 4l9 7.2M5.5 9.5V20h4.8v-5.6h3.4V20h4.8V9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
 const homeText=create("span","iha-nav-home-text",t.home);home.append(homeIcon,homeText);home.setAttribute("aria-label",t.homeLabel);
 brand.after(home);
 const syncHome=()=>{const atHome=location.pathname==="/"&&(!location.hash||location.hash==="#"||location.hash==="#inicio");home.hidden=atHome;inner.classList.toggle("iha-nav-has-home",!atHome)};
 syncHome();window.addEventListener("hashchange",syncHome);
 // Botón de WhatsApp siempre visible, salvo en el formulario de envío (ya tiene su propio botón).
 const WA="573013832196";
 const isIntake=Object.values(prepSlug).some(slug=>location.pathname.includes("/"+slug+"/"))||location.hash==="#prepare-su-caso";
 const wa=lnk("", "https://wa.me/"+WA+"?text="+encodeURIComponent(t.waText),"iha-wa");
 wa.target="_blank";wa.rel="noopener";wa.setAttribute("aria-label",t.waLabel);
 const waIcon=document.createElementNS("http://www.w3.org/2000/svg","svg");waIcon.setAttribute("viewBox","0 0 24 24");waIcon.setAttribute("aria-hidden","true");
 waIcon.innerHTML='<path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M9.1 8.3c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.7l-.5.6c-.1.1-.1.3 0 .5.6 1 1.4 1.8 2.4 2.4.2.1.4.1.5 0l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.6v.4c0 .4-.2.7-.5.9-.6.4-1.4.5-2.1.3a8.2 8.2 0 0 1-5.3-5.2c-.3-.8-.1-1.6.3-2.3Z" fill="currentColor"/>';
 const waText=create("span","iha-wa-text",t.wa);wa.append(waIcon,waText);
 const syncWa=()=>{const hide=isIntake||location.hash==="#prepare-su-caso";wa.hidden=hide;document.body.classList.toggle("iha-wa-on",!hide)};
 if(!document.querySelector("a.iha-wa")){document.body.append(wa);syncWa();window.addEventListener("hashchange",syncWa)}
 // Horario de atención en el pie de página, junto al correo de contacto.
 const footer=document.querySelector("body > footer")||document.querySelector("footer");
 const hours=create("p","iha-hours");
 const fillHours=tt=>{hours.replaceChildren(document.createTextNode(tt.hours));const w=lnk("+57 301 383 2196","https://wa.me/"+WA);w.rel="noopener";w.target="_blank";hours.append(w)};
 fillHours(t);
 if(footer&&!footer.querySelector(".iha-hours")){
   const mail=footer.querySelector('a[href^="mailto:contacto@"],#foot-mail');
   const row=mail?.closest("p");
   if(row)row.after(hours);else (footer.querySelector(".w,.in,.wrap")||footer).append(hours);
 }
 header.dataset.ihaNavInstalled="true";
 document.body.classList.add("iha-nav-ready");
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();