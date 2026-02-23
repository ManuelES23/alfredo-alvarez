import { useState, useEffect } from "react";

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
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (href) => {
    setOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
        background: scrolled ? "#ffffff" : "#0D2260",
        boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.1)" : "none",
        transition: "background 0.4s, box-shadow 0.4s",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          width: "100%",
          boxSizing: "border-box",
          margin: "0 auto",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <a
          href='#inicio'
          onClick={(e) => {
            e.preventDefault();
            navigate("#inicio");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
              fontSize: "18px",
              background: "linear-gradient(135deg, #1A3A8F, #00AEEF)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            AA
          </div>
        </a>

        {/* Desktop links — hidden on mobile via media query inline */}
        <ul
          style={{
            display: "none",
            alignItems: "center",
            gap: "4px",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className='lg:flex!'
        >
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(l.href);
                }}
                style={{
                  padding: "8px 12px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: scrolled ? "#4A4A4A" : "rgba(255,255,255,0.9)",
                  textDecoration: "none",
                  borderRadius: "8px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#00AEEF")}
                onMouseLeave={(e) =>
                  (e.target.style.color = scrolled
                    ? "#4A4A4A"
                    : "rgba(255,255,255,0.9)")
                }
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href='#contacto'
          onClick={(e) => {
            e.preventDefault();
            navigate("#contacto");
          }}
          style={{
            display: "none",
            padding: "10px 20px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#fff",
            textDecoration: "none",
            background: "linear-gradient(135deg, #1A3A8F, #00AEEF)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            transition: "transform 0.2s",
          }}
          className='lg:inline-block!'
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Agendar Consulta
        </a>

        {/* Hamburger — ALWAYS visible on mobile */}
        <button
          onClick={() => setOpen(!open)}
          aria-label='Menú'
          className='lg:hidden!'
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            padding: 0,
            border: scrolled
              ? "2px solid #1A3A8F"
              : "2px solid rgba(255,255,255,0.8)",
            borderRadius: "10px",
            background: scrolled ? "#ffffff" : "rgba(255,255,255,0.15)",
            cursor: "pointer",
            transition: "border 0.4s, background 0.4s",
          }}
        >
          {open ? (
            <svg
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='none'
              stroke={scrolled ? "#1A3A8F" : "#ffffff"}
              strokeWidth='3'
              strokeLinecap='round'
            >
              <line x1='6' y1='6' x2='18' y2='18' />
              <line x1='6' y1='18' x2='18' y2='6' />
            </svg>
          ) : (
            <svg
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='none'
              stroke={scrolled ? "#1A3A8F" : "#ffffff"}
              strokeWidth='3'
              strokeLinecap='round'
            >
              <line x1='3' y1='6' x2='21' y2='6' />
              <line x1='3' y1='12' x2='21' y2='12' />
              <line x1='3' y1='18' x2='21' y2='18' />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div
          style={{
            background: "#ffffff",
            borderTop: "1px solid #eee",
            padding: "12px 16px",
          }}
          className='lg:hidden!'
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                navigate(l.href);
              }}
              style={{
                display: "block",
                padding: "14px 16px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#4A4A4A",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#F4F6F9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {l.label}
            </a>
          ))}
          <div style={{ paddingTop: "8px" }}>
            <a
              href='#contacto'
              onClick={(e) => {
                e.preventDefault();
                navigate("#contacto");
              }}
              style={{
                display: "block",
                textAlign: "center",
                padding: "14px 16px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#fff",
                textDecoration: "none",
                background: "linear-gradient(135deg, #1A3A8F, #00AEEF)",
              }}
            >
              Agendar Consulta
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
