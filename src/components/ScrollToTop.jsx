import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Al cambiar de ruta, React Router no reposiciona el scroll (a diferencia
// de una navegación normal del navegador): la página nueva hereda el
// scroll que traía la anterior. Este componente lo resetea al inicio,
// salvo que la navegación venga pidiendo ir a una sección específica
// (ver src/utils/scrollNav.js), en cuyo caso Home.jsx se encarga de eso.
export default function ScrollToTop() {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    if (hash || state?.scrollTo) return;
    window.scrollTo(0, 0);
  }, [pathname, hash, state]);

  return null;
}
