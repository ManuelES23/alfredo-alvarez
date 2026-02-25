import { FaInstagram, FaTiktok, FaYoutube, FaLinkedinIn } from "react-icons/fa";

const redesSociales = [
  {
    Icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
    color: "#E1306C",
  },
  {
    Icon: FaTiktok,
    href: "https://tiktok.com",
    label: "TikTok",
    color: "#ffffff",
  },
  {
    Icon: FaYoutube,
    href: "https://youtube.com",
    label: "YouTube",
    color: "#FF0000",
  },
  {
    Icon: FaLinkedinIn,
    href: "https://linkedin.com",
    label: "LinkedIn",
    color: "#0A66C2",
  },
];

const columnas = {
  Servicios: [
    "Declaraciones Anuales",
    "Asesoría RESICO",
    "Contabilidad Mensual",
    "Trámites SAT",
    "Facturación CFDI 4.0",
    "Planeación Fiscal",
  ],
  Recursos: [
    "Blog Fiscal",
    "La Mesita Fiscal",
    "Calculadora ISR",
    "Guía RESICO 2025",
    "Calendario SAT",
    "Preguntas Frecuentes",
  ],
  Redes: [
    "Instagram",
    "TikTok",
    "YouTube",
    "LinkedIn",
    "Spotify",
    "Apple Podcasts",
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#0D2260" }}>
      {/* Separador cyan */}
      <div
        className='h-1 w-full'
        style={{
          background: "linear-gradient(90deg, #00AEEF, #1A3A8F, #00AEEF)",
        }}
      />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12'>
          {/* Logo y descripción */}
          <div className='lg:col-span-2'>
            <div className='flex items-center gap-3 mb-5'>
              <img
                src='/img/logo/logo.png'
                alt='Alfredo Álvarez'
                style={{
                  height: "52px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
            <p
              className='text-sm leading-relaxed mb-5'
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Contador Público certificado con más de 8 años de experiencia.
              Especialista en RESICO, CFDI 4.0, declaraciones anuales y
              planeación fiscal estratégica para mexicanos.
            </p>
            {/* Redes */}
            <div className='flex gap-3'>
              {redesSociales.map((red) => (
                <a
                  key={red.label}
                  href={red.href}
                  aria-label={red.label}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 border'
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderColor: "rgba(0,174,239,0.2)",
                    color: red.color,
                  }}
                >
                  <red.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Columnas de links */}
          {Object.entries(columnas).map(([titulo, items]) => (
            <div key={titulo}>
              <h4 className='text-white font-bold text-sm mb-4'>{titulo}</h4>
              <ul className='space-y-2'>
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href='#'
                      className='text-xs transition-colors hover:text-azul-brillante'
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contacto rápido */}
        <div
          className='rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border'
          style={{
            background: "rgba(0,174,239,0.08)",
            borderColor: "rgba(0,174,239,0.2)",
          }}
        >
          <div>
            <p className='text-white font-bold text-sm'>
              ¿Listo para ordenar tus impuestos?
            </p>
            <p className='text-xs' style={{ color: "rgba(255,255,255,0.5)" }}>
              contacto@alfredotucontador.mx · +52 55 0000 0000
            </p>
          </div>
          <a
            href='#contacto'
            className='px-5 py-2.5 rounded-xl text-sm font-bold text-white shrink-0 transition-all hover:scale-105'
            style={{ background: "linear-gradient(135deg, #1A3A8F, #00AEEF)" }}
          >
            Agendar consulta →
          </a>
        </div>

        {/* Bottom bar */}
        <div
          className='flex flex-col sm:flex-row items-center justify-between gap-3 pt-6'
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <p
            className='text-xs text-center sm:text-left'
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            © 2025 Alfredo Álvarez - Contador Público. Todos los derechos
            reservados.
          </p>
          <div className='flex gap-4'>
            <a
              href='#'
              className='text-xs transition-colors hover:text-azul-brillante'
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Aviso de Privacidad
            </a>
            <a
              href='#'
              className='text-xs transition-colors hover:text-azul-brillante'
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
