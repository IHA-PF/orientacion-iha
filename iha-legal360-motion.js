
(() => {
  const root = document.querySelector(".legal360-motion");
  if (!root) return;
  const language = document.documentElement.lang.split("-")[0];
  const translations = {
    es: ["Explore el recorrido","Recorrido","Etapa","Anterior","Repetir animación","Siguiente","Módulos LEGAL 360","Litigios","Anfitriones",[
      ["Enviar a revisión","La ficha pasa a la bandeja del equipo."],["Pedir una aclaración","La abogada publica una pregunta en el expediente asignado."],["Responder desde el expediente","El cliente responde a la pregunta publicada."],["Publicar el seguimiento","El cliente consulta la actualización aprobada."],
      ["Registrar el inmueble y la estancia","La ficha del inmueble reúne las estancias."],["Control del anfitrión","El anfitrión revisa los equipos antes de entregar las llaves."],["Compartir el enlace de llegada","El huésped abre la checklist y confirma el estado de los equipos."],["Asignar la incidencia","La avería se asigna a quien interviene, con un plazo."],["Informar la reparación","El anfitrión registra la reparación y solicita una confirmación."],["Confirmar el restablecimiento","El huésped confirma que funciona y se cierra la incidencia."],
      ["Vincular hechos y pruebas","Cada hecho se relaciona con un extracto y su referencia."],["Construir la cronología","Las fuentes permiten distinguir envío y recepción."],["Mostrar una contradicción","Las piezas discordantes quedan visibles y la propuesta se detiene."],["Validar antes de publicar","La abogada valida el texto antes de comunicarlo."]]],
    en: ["Explore the process","Process","Step","Previous","Replay animation","Next","LEGAL 360 modules","Disputes","Hosts",[
      ["Submit for review","The submission goes to the team's review queue."],["Ask for clarification","The lawyer publishes a question in the assigned case."],["Reply from the case","The client answers the published question."],["Publish a case update","The client can read the approved update."],
      ["Register a property and stay","The property record lists its stays."],["Complete the host check","The host checks the equipment before handing over the keys."],["Share the arrival link","The guest opens the checklist and confirms what works."],["Assign the issue","The host records who will act and sets a deadline."],["Report the repair","The host records the repair and asks the guest to confirm."],["Confirm the fix","The guest confirms the equipment works and the issue closes."],
      ["Link facts and evidence","Each fact points to an excerpt and its source."],["Build the timeline","Source dates distinguish dispatch from receipt."],["Show conflicting evidence","Both versions stay visible and the proposed action is paused."],["Approve before publishing","The lawyer approves the text before sharing it."]]],
    fr: ["Explorer les parcours","Parcours","Étape","Précédent","Rejouer l’animation","Suivant","Modules LEGAL 360","Litiges","Hôtes",[
      ["Envoyer en révision","La fiche rejoint la file de l’équipe."],["Demander une précision","L’avocate publie une question dans le dossier attribué."],["Répondre depuis le dossier","Le client répond à la question publiée."],["Publier le suivi","Le client consulte la mise à jour approuvée."],
      ["Enregistrer le bien et le séjour","La fiche du bien regroupe les séjours."],["Effectuer le contrôle hôte","L’hôte vérifie les équipements avant de remettre les clés."],["Partager le lien d’arrivée","Le locataire ouvre la checklist et confirme l’état des équipements."],["Attribuer l’incident","L’hôte désigne la personne qui intervient et fixe un délai."],["Annoncer la réparation","L’hôte enregistre la réparation et demande une confirmation."],["Confirmer le rétablissement","Le locataire confirme que l’équipement fonctionne et l’incident est clos."],
      ["Relier les faits aux preuves","Chaque fait renvoie à un extrait et à sa source."],["Établir la chronologie","Les dates sourcées distinguent l’envoi de la réception."],["Afficher une contradiction","Les pièces discordantes restent visibles et la proposition est bloquée."],["Valider avant publication","L’avocate valide le texte avant sa communication."]]],
    pt: ["Explore as etapas","Percurso","Etapa","Anterior","Repetir animação","Próxima","Módulos LEGAL 360","Litígios","Anfitriões",[
      ["Enviar para análise","A ficha segue para a fila de análise da equipe."],["Pedir esclarecimento","A advogada publica uma pergunta no caso atribuído."],["Responder no caso","O cliente responde à pergunta publicada."],["Publicar o acompanhamento","O cliente consulta a atualização aprovada."],
      ["Cadastrar o imóvel e a estadia","A ficha do imóvel reúne as estadias."],["Verificar os equipamentos","O anfitrião verifica os equipamentos antes de entregar as chaves."],["Compartilhar o link de chegada","O hóspede abre a lista e confirma o estado dos equipamentos."],["Atribuir o problema","O anfitrião indica quem vai agir e define um prazo."],["Informar o reparo","O anfitrião registra o reparo e pede uma confirmação."],["Confirmar o restabelecimento","O hóspede confirma que o equipamento funciona e a ocorrência é encerrada."],
      ["Vincular fatos e provas","Cada fato remete a um trecho e à respectiva fonte."],["Montar a cronologia","As datas com fonte distinguem envio e recebimento."],["Mostrar uma contradição","As provas divergentes ficam visíveis e a proposta é bloqueada."],["Validar antes de publicar","A advogada aprova o texto antes da comunicação."]]]
  };
  const [heading,trackLabel,stepLabel,previous,replay,forward,modules,disputes,hosts,details] = translations[language] || translations.es;
  const steps = Array.from(document.querySelectorAll("#how .step"), item => [
    item.querySelector(".step-num").textContent.replace(/^\d+\.\s*/, ""), item.querySelector("p").textContent
  ]);
  const services = Array.from(document.querySelectorAll('article.module[id^="module-"]'), item => [
    item.querySelector(".module-name").textContent, item.querySelector("h3").textContent
  ]);
  const tracks = [[document.querySelector("#how h2").textContent, steps],[modules,services],[disputes,details.slice(0,4)],[hosts,details.slice(4,10)],["Digital Justice OS",details.slice(10)]];
  const scenes = [
    [["message","person","document"],["folder","document","clip"],["person","search","scales"],["hands","check","clock"]],
    [["shield","document","search"],["folder","camera","document"],["search","document","scales"],["edit","route","message"],["clock","bell","check"],["heart","person","message"]],
    [["send","document","folder"],["message","person","lock"],["reply","message","folder"],["check","person","bell"]],
    [["house","clock","key"],["check","house","key"],["link","check","phone"],["wrench","drop","clock"],["bell","wrench","phone"],["done","drop","check"]],
    [["search","document","link"],["clock","send","folder"],["warning","document","lock"],["person","lock","done"]]
  ];
  const icons = {
    message:"M4 5h16v11H9l-5 4z M8 9h8 M8 12h5",person:"M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M5 21v-2a7 7 0 0 1 14 0v2",
    document:"M6 3h8l4 4v14H6z M14 3v5h4 M9 12h6 M9 16h6",folder:"M3 7h7l2 3h9l-3 10H3z M3 7V4h7l2 3h8v3",
    clip:"M8 13l6-6a3 3 0 0 1 4 4l-8 8a4 4 0 0 1-6-6l8-8 M10 15l6-6",search:"M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M15 15l6 6",
    scales:"M12 3v17 M7 21h10 M4 7h16 M5 7l-3 8h6z M19 7l-3 8h6z",hands:"M2 12l5-6 4 2 3-2 8 6-5 6-6-5-2 2-3-2 M8 16l4 4 4-2",
    check:"M5 3h14v18H5z M8 8l1 1 2-2 M13 8h3 M8 14l1 1 2-2 M13 14h3",clock:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v6l4 2",
    shield:"M12 3l8 4v5c0 4-3 7-8 9-5-2-8-5-8-9V7z M8 12l3 3 5-6",camera:"M3 7h4l2-3h6l2 3h4v13H3z M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    edit:"M12 5H5v15h15v-7 M9 15l1-4L18 3l3 3-8 8z",route:"M5 5h10a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h10 M16 18l3 3-3 3",
    bell:"M5 17h14l-2-4V9a5 5 0 0 0-10 0v4z M10 21h4",heart:"M12 20 4 12a5 5 0 0 1 8-6 5 5 0 0 1 8 6z",
    send:"M3 10l18-7-7 18-4-7z M10 14 21 3",lock:"M6 10h12v11H6z M8 10V7a4 4 0 0 1 8 0v3 M12 14v3",
    reply:"M9 5l-6 6 6 6 M3 11h10a7 7 0 0 1 7 7",house:"M3 11l9-8 9 8 M6 10v11h12V10 M10 21v-7h4v7",
    key:"M15 11a5 5 0 1 0-4-4l-8 8v5h5v-3h3v-3z M17 6h.01",link:"M10 14l4-4 M7 16l-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0 M17 8l1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0",
    phone:"M7 3h10v18H7z M10 17h4",wrench:"M14 6l4 4 3-3a6 6 0 0 1-8 8l-6 6-4-4 6-6a6 6 0 0 1 8-8z",
    drop:"M12 3c-2 4-6 8-6 12a6 6 0 0 0 12 0c0-4-4-8-6-12z",done:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M8 12l3 3 5-6",
    warning:"M12 3 2 20h20z M12 9v5 M12 17h.01"
  };
  const get = key => root.querySelector("[data-motion-" + key + "]");
  const track = get("track"), step = get("step");
  const markers = [...root.querySelectorAll(".motion-scene span")];
  const previousButton = get("prev"), nextButton = get("next"), replayButton = get("replay");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const running = [];
  const draw = (container, icon) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS(svg.namespaceURI, "path");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.55");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    path.setAttribute("d", icons[icon]);
    svg.append(path);
    container.replaceChildren(svg);
  };
  const play = () => {
    running.splice(0).forEach(animation => animation.cancel());
    if (reduced.matches || !markers[0].animate) return;
    const direction = Number(track.value) === 2 && Number(step.value) === 2 ? -1 : 1;
    markers.forEach((marker, index) => {
      const x = ((index === 2 ? 24 : -24) * direction) + "px";
      const frames = index ? [{translate:x+" 12px",opacity:.45},{translate:"0 0",opacity:1}] : [{scale:.86},{scale:1.05,offset:.7},{scale:1}];
      running.push(marker.animate(frames,{duration:510,delay:45*index,easing:"cubic-bezier(.2,.72,.28,1)"}));
    });
  };
  const show = animate => {
    const t = Number(track.value), s = Number(step.value), entries = tracks[t][1];
    get("title").textContent = entries[s][0];
    get("detail").textContent = entries[s][1];
    scenes[t][s].forEach((icon,i) => draw(markers[i],icon));
    previousButton.disabled = s === 0;
    nextButton.disabled = s === entries.length - 1;
    if (animate) play();
  };
  const setSteps = () => step.replaceChildren(...tracks[Number(track.value)][1].map(([label], i) => new Option(label,i)));
  get("heading").textContent = heading;
  get("track-label").textContent = trackLabel;
  get("step-label").textContent = stepLabel;
  previousButton.textContent = previous;
  replayButton.textContent = replay;
  nextButton.textContent = forward;
  track.replaceChildren(...tracks.map(([label],i) => new Option(label,i)));
  track.addEventListener("change", () => {setSteps(); show(true);});
  step.addEventListener("change", () => show(true));
  previousButton.addEventListener("click", () => {step.selectedIndex--; show(true);});
  nextButton.addEventListener("click", () => {step.selectedIndex++; show(true);});
  replayButton.addEventListener("click", play);
  setSteps();
  show(false);
  root.hidden = false;
})();
