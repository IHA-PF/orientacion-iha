(() => {
  const panels = [...document.querySelectorAll("[data-access-lang]")];
  const requested = new URLSearchParams(location.search).get("lang");
  const chosen = panels.find(panel => panel.dataset.accessLang === requested) ?? panels[0];
  for (const panel of panels) panel.hidden = panel !== chosen;
  document.documentElement.lang = chosen.dataset.accessLang;
})();
