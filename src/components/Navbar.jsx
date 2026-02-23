import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Podcast", href: "#podcast" },
  { label: "Contenido", href: "#contenido" },
  { label: "Blog", href: "#blog" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 10);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16 lg:h-18'>
          {/* Logo */}
          <a href='#inicio' className='flex items-center gap-2 group'>
            <div
              className='w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform'
              style={{
                background: "linear-gradient(135deg, #1A3A8F, #00AEEF)",
              }}
            >
              AA
            </div>
            <div className='hidden sm:block'>
              <p
                className='text-sm font-black leading-tight'
                style={{ color: "#1A3A8F" }}
              >
                Alfredo Álvarez
              </p>
              <p className='text-xs leading-tight' style={{ color: "#4A4A4A" }}>
                Contadores Públicos
              </p>
            </div>
          </a>

          {/* Desktop links */}
          <ul className='hidden lg:flex items-center gap-1'>
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className='px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:text-azul-brillante'
                  style={{ color: "#4A4A4A" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className='hidden lg:block'>
            <a
              href='#contacto'
              onClick={(e) => handleNavClick(e, "#contacto")}
              className='px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg shadow-md'
              style={{
                background: "linear-gradient(135deg, #1A3A8F, #00AEEF)",
              }}
            >
              Agendar Consulta
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className='lg:hidden p-2 rounded-lg'
            style={{ color: "#1A3A8F" }}
            aria-label='Menú'
          >
            <div className='w-6 space-y-1.5'>
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  open ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current transition-all duration-300 ${
                  open ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='lg:hidden overflow-hidden bg-white border-t'
            style={{ borderColor: "#F4F6F9" }}
          >
            <div className='px-4 py-4 space-y-1'>
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className='block px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gris-claro'
                  style={{ color: "#4A4A4A" }}
                >
                  {l.label}
                </a>
              ))}
              <div className='pt-2'>
                <a
                  href='#contacto'
                  onClick={(e) => handleNavClick(e, "#contacto")}
                  className='block text-center px-4 py-3 rounded-xl text-sm font-semibold text-white'
                  style={{
                    background: "linear-gradient(135deg, #1A3A8F, #00AEEF)",
                  }}
                >
                  Agendar Consulta
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
