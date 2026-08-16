import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSEO } from "../hooks/useSEO";
import { servicios } from "../data/servicios";
import { goToSection } from "../utils/scrollNav";
import {
  FiFileText,
  FiRefreshCw,
  FiShield,
  FiClipboard,
  FiTarget,
  FiArrowRight,
} from "react-icons/fi";

const iconMap = {
  1: FiFileText,
  2: FiRefreshCw,
  3: FiShield,
  4: FiClipboard,
  5: FiTarget,
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.06 },
  }),
};

export default function ServiciosPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useSEO({
    title: "Servicios Contables y Fiscales | Alfredo Álvarez Contador",
    description:
      "Servicios contables y fiscales en México: contabilidad mensual, recuperación de ISR e IVA, seguridad social IMSS/INFONAVIT, REPSE y asesoría fiscal. Cumple con el SAT sin complicaciones.",
    path: "/servicios",
  });

  // Permite llegar con /servicios#slug y hacer scroll directo a ese bloque.
  useEffect(() => {
    const id = location.hash?.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, [location.hash]);

  return (
    <>
      {/* Encabezado */}
      <section
        className='pt-36 pb-16'
        style={{ background: "#0D2260" }}
      >
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <p
            className='text-sm font-semibold uppercase tracking-widest mb-3'
            style={{ color: "#00AEEF" }}
          >
            Servicios Profesionales
          </p>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black mb-4 text-white'>
            Todos nuestros servicios
            <br />
            <span style={{ color: "#00AEEF" }}>contables y fiscales</span>
          </h1>
          <p
            className='mt-4 text-base max-w-2xl mx-auto'
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Desde el control diario de tu contabilidad hasta la recuperación
            de impuestos, la seguridad social de tu equipo y el cumplimiento
            ante el SAT. Todo explicado claro, sin tecnicismos.
          </p>
        </div>
      </section>

      {/* Bloques de servicio */}
      <section className='py-20 bg-white'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10'>
          {servicios.map((servicio, i) => {
            const IconComp = iconMap[servicio.id];
            return (
              <motion.div
                id={servicio.slug}
                key={servicio.id}
                custom={i}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                className='scroll-mt-24 rounded-2xl p-6 sm:p-8'
                style={{
                  boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                  borderLeft: "3px solid #00AEEF",
                }}
              >
                <div className='flex items-start gap-5'>
                  <div
                    className='shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center'
                    style={{ background: "#F4F6F9" }}
                  >
                    {IconComp && (
                      <IconComp size={24} style={{ color: "#1A3A8F" }} />
                    )}
                  </div>
                  <div>
                    <h2
                      className='text-xl sm:text-2xl font-bold mb-1'
                      style={{ color: "#0D2260" }}
                    >
                      {servicio.titulo}
                    </h2>
                    <p
                      className='text-sm sm:text-base font-medium'
                      style={{ color: "#00AEEF" }}
                    >
                      {servicio.subtitulo}
                    </p>
                  </div>
                </div>

                <ul className='mt-6 space-y-4 sm:pl-[76px]'>
                  {servicio.bullets.map((b) => (
                    <li key={b.label} className='flex gap-3'>
                      <span
                        className='mt-2 w-1.5 h-1.5 rounded-full shrink-0'
                        style={{ background: "#00AEEF" }}
                      />
                      <p
                        className='text-sm leading-relaxed'
                        style={{ color: "#4A4A4A" }}
                      >
                        <span className='font-bold' style={{ color: "#1A3A8F" }}>
                          {b.label}:{" "}
                        </span>
                        {b.texto}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* CTA final */}
        <div className='text-center mt-16'>
          <a
            href='#contacto'
            onClick={(e) => {
              e.preventDefault();
              goToSection(navigate, location.pathname, "contacto");
            }}
            className='inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-lg'
            style={{ background: "linear-gradient(135deg, #1A3A8F, #00AEEF)" }}
          >
            Agendar consulta gratuita
            <FiArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
