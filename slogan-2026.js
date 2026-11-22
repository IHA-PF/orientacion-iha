(()=>{"use strict";
const copy={
  es:"La transformación digital avanza. Tus derechos también.",
  en:"Digital transformation is advancing. So are your rights.",
  fr:"La transformation numérique avance. Vos droits aussi.",
  pt:"A transformação digital avança. Seus direitos também."
};
const apply=()=>{
  const lang=(document.documentElement.lang||"es").slice(0,2);
  const h1=document.querySelector("#app h1#view-title");
  if(h1&&copy[lang]&&h1.textContent!==copy[lang]) h1.textContent=copy[lang];
};
const root=document.getElementById("app");
if(root) new MutationObserver(apply).observe(root,{childList:true,subtree:true});
new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
document.addEventListener("DOMContentLoaded",apply,{once:true});
apply();
})();
