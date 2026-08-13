// Navegación entre la página principal (con secciones ancla) y otras rutas.
// Si ya estamos en "/", hace scroll suave a la sección. Si estamos en otra
// ruta, navega a "/" y pide a Home que haga el scroll una vez montada.
export function goToSection(navigate, pathname, id) {
  if (pathname === "/") {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  } else {
    navigate("/", { state: { scrollTo: id } });
  }
}
