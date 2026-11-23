const filters = document.querySelector(".filters");
const buttons = [...filters.querySelectorAll("button")];
const cards = [...document.querySelectorAll(".grid article")];
const result = document.querySelector(".result");
filters.hidden = false;
function show(selected) {
  let count = 0;
  for (const card of cards) {
    card.hidden = selected !== buttons[0] && card.dataset.group !== selected.textContent;
    if (!card.hidden) count++;
  }
  for (const button of buttons) button.setAttribute("aria-pressed", String(button === selected));
  result.textContent = count + " " + ({en:["agent","agents"],fr:["agent","agents"],es:["agente","agentes"],pt:["agente","agentes"]}[document.documentElement.lang] || ["agent","agents"])[count === 1 ? 0 : 1];
}
for (const button of buttons) button.addEventListener("click", () => show(button));
show(buttons[0]);
