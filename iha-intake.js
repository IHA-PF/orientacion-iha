(() => {
  const form = document.getElementById("iha-intake");
  if (!form) return;
  const need = document.getElementById("intake-need");
  const facts = document.getElementById("intake-facts");
  const goal = document.getElementById("intake-goal");
  const date = document.getElementById("intake-date");
  const draft = document.getElementById("iha-intake-draft");
  const preview = document.getElementById("intake-preview");
  const whatsapp = document.getElementById("intake-whatsapp");
  const mail = document.getElementById("intake-mail");
  const params = new URLSearchParams(location.search);
  const topic = params.get("situation");
  if (["litige", "hebergement", "consultation"].includes(topic)) need.value = topic;
  // Asunto que llega desde la ficha de un caso o de un servicio: se muestra y va en el mensaje.
  const subjectLabel = { es: "Asunto:", en: "Subject:", fr: "Objet :", pt: "Assunto:" }[document.documentElement.lang.slice(0, 2)] || "Asunto:";
  const asunto = (params.get("asunto") || "").replace(/[\u0000-\u001f<>]/g, "").trim().slice(0, 120);
  if (asunto) {
    const line = document.createElement("p");
    line.className = "intake-topic";
    const label = document.createElement("strong");
    label.textContent = subjectLabel + " ";
    line.append(label, document.createTextNode(asunto));
    form.prepend(line);
  }

  form.addEventListener("input", () => {
    draft.hidden = true;
    whatsapp.removeAttribute("href");
    mail.removeAttribute("href");
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    facts.value = facts.value.trim();
    goal.value = goal.value.trim();
    if (!form.reportValidity()) return;
    const subject = form.dataset.subject;
    const sections = [subject, ...(asunto ? [subjectLabel + " " + asunto] : []), need.labels[0].textContent + " " + need.selectedOptions[0].text];
    for (const field of [facts, goal, date]) {
      if (field.value.trim()) sections.push(field.labels[0].textContent + "\n" + field.value.trim());
    }
    const message = sections.join("\n\n");
    preview.textContent = message;
    whatsapp.href = "https://wa.me/573013832196?text=" + encodeURIComponent(message);
    mail.href = "mailto:contacto@ihasolucioneslegales.com.co?subject=" + encodeURIComponent(subject)
      + "&body=" + encodeURIComponent(message.replace(/\n/g, "\r\n"));
    draft.hidden = false;
    document.getElementById("intake-draft-heading").focus();
  });
  form.hidden = false;
})();
