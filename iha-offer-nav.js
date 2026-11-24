(() => {
  const link = document.getElementById("iha-offer-nav");
  if (!link) return;
  const routes = new Map([
    ["es", "/es/servicios-y-precios/"],
    ["en", "/en/services-and-prices/"],
    ["fr", "/fr/services-et-prix/"],
    ["pt", "/pt/servicos-e-precos/"],
  ]);
  function update() {
    link.href = routes.get(document.documentElement.lang.slice(0, 2)) ?? routes.get("es");
  }
  new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  update();
})();
