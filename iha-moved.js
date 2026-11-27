/* Página trasladada sin idioma en la ruta: lleva al visitante a «Cómo trabajamos» en su idioma. */
(function(){var a=["es","en","fr","pt"],l="es";try{var s=localStorage.getItem("iha-lang"),n=(navigator.language||"es").slice(0,2);l=a.indexOf(s)>=0?s:a.indexOf(n)>=0?n:"es"}catch(e){}location.replace("/?lang="+l+"#como-trabajamos")})();
