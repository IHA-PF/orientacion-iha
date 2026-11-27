"""Verify the Pages rollout using public HTML and the exact catalogue CSS."""
import hashlib
import time
from pathlib import Path
from urllib.error import URLError
from urllib.request import Request, urlopen

ORIGIN = "https://ihasolucioneslegales.com.co"
def fetch(path):
    request = Request(ORIGIN + path, headers={"Cache-Control": "no-cache"})
    with urlopen(request, timeout=12) as response:
        return response.read()

expected = Path("iha-experience.css").read_bytes()
digest = hashlib.sha256(expected).hexdigest()[:12]
for attempt in range(35):
    try:
        if fetch("/iha-experience.css?release=" + digest) == expected:
            break
    except URLError:
        pass
    time.sleep(8)
else:
    raise RuntimeError("Pages has not served the expected catalogue stylesheet")

routes = {"es": ("servicios", "servicios-y-precios", "analisis-de-su-caso"),
          "en": ("services", "services-and-prices", "case-analysis"),
          "fr": ("services", "services-et-prix", "analyse-de-votre-dossier"),
          "pt": ("servicos", "servicos-e-precos", "analise-do-seu-caso")}
for lang, (catalog, prices, service) in routes.items():
    # Arquitectura simple (27/11/2026): el índice del catálogo, LEGAL 360 y Digital Justice OS
    # son páginas de renvío hacia «Servicios y precios» y «Cómo trabajamos».
    for path, marker in [(catalog, 'url=/' + lang + '/' + prices + '/'), (prices, 'id="hosts"'),
                         (catalog + "/" + service, '<h1>'), ("legal-360", '#como-trabajamos'),
                         ("digital-justice-os", '#como-trabajamos')]:
        url = "/" + lang + "/" + path + "/"
        assert marker in fetch(url).decode(), url
        print(ORIGIN + url)
assert 'os-simple-home' in fetch("/").decode()
assert 'home-masthead' in fetch("/iha-experience.js?release=" + digest).decode()

for asset in ["iha-stay.jpg", "iha-case-review.jpg", "iha-legal-360-consultation.jpg", "profile-buyer.jpg", "profile-traveller.jpg", "profile-host.jpg"]:
    assert fetch("/assets/"+asset).startswith(b"\xff\xd8"), asset
