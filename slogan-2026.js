(()=>{"use strict";
const next={
  es:"La transformación digital avanza. Tus derechos también.",
  en:"Digital transformation is advancing. So are your rights.",
  fr:"La transformation numérique avance. Vos droits aussi.",
  pt:"A transformação digital avança. Seus direitos também."
};
const previous={
  es:"Sus derechos vienen incluidos en cada clic.",
  en:"Your rights come with every click.",
  fr:"Vos droits sont inclus dans chaque clic.",
  pt:"Seus direitos vêm incluídos em cada clique."
};
const apply=()=>{
  const lang=(document.documentElement.lang||"es").slice(0,2);
  const h1=document.querySelector("#app h1#view-title");
  if(h1&&next[lang]&&previous[lang]&&h1.textContent.trim()===previous[lang]) h1.textContent=next[lang];
};
const root=document.getElementById("app");
if(root) new MutationObserver(apply).observe(root,{childList:true,subtree:true});
new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
document.addEventListener("DOMContentLoaded",apply,{once:true});
apply();
})();
