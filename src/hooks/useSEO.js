import { useEffect } from "react";

export const SITE_URL = "https://corporativoaa.com.mx";
export const SITE_NAME = "Alfredo Álvarez | Contador Público";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/img/social/og-image.png`;

function setMetaByName(name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property, content) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  if (!href) return;
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Actualiza title, meta description, canonical, Open Graph y Twitter Card
 * cuando cambia de ruta. index.html trae valores por defecto (para la home
 * y como fallback de bots que no ejecutan JS); este hook los sobreescribe
 * por página una vez que React monta.
 */
export function useSEO({ title, description, path = "/", image = DEFAULT_OG_IMAGE }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;

    if (title) document.title = title;
    setMetaByName("description", description);
    setCanonical(url);

    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:image", image);

    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", image);
  }, [title, description, path, image]);
}
