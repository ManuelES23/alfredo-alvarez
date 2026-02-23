import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useRef } from "react";
import { FaInstagram, FaTiktok, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import {
  FiFileText,
  FiAlertTriangle,
  FiFile,
  FiActivity,
  FiBarChart2,
  FiLock,
} from "react-icons/fi";

const publicaciones = [
  {
    tema: "RESICO",
    subtema: "¿Qué es y cómo funciona en 2025?",
    Icon: FiFileText,
    delay: 0,
  },
  {
    tema: "SAT",
    subtema: "5 errores que te generan multas",
    Icon: FiAlertTriangle,
    delay: 0.05,
  },
  {
    tema: "CFDI",
    subtema: "Cancelación correcta paso a paso",
    Icon: FiFile,
    delay: 0.1,
  },
  {
    tema: "ISR",
    subtema: "Cómo deducir tus gastos médicos",
    Icon: FiActivity,
    delay: 0.15,
  },
  {
    tema: "IVA",
    subtema: "Todo sobre la DIOT mensual",
    Icon: FiBarChart2,
    delay: 0.2,
  },
  {
    tema: "e.Firma",
    subtema: "Renovación sin cita presencial",
    Icon: FiLock,
    delay: 0.25,
  },
];

const redes = [
  {
    nombre: "Instagram",
    handle: "@alfredotucontador",
    Icon: FaInstagram,
    url: "https://instagram.com/alfredotucontador",
    seguidores: "45K",
    color: "#E1306C",
  },
  {
    nombre: "TikTok",
    handle: "@alfredotucontador",
    Icon: FaTiktok,
    url: "https://tiktok.com/@alfredotucontador",
    seguidores: "120K",
    color: "#010101",
  },
  {
    nombre: "YouTube",
    handle: "Alfredo Tu Contador",
    Icon: FaYoutube,
    url: "https://youtube.com",
    seguidores: "28K",
    color: "#FF0000",
  },
  {
    nombre: "LinkedIn",
    handle: "Alfredo Álvarez",
    Icon: FaLinkedinIn,
    url: "https://linkedin.com",
    seguidores: "12K",
    color: "#0077B5",
  },
];

const gradients = [
  "linear-gradient(135deg, #1A3A8F, #00AEEF)",
  "linear-gradient(135deg, #0D2260, #1A3A8F)",
  "linear-gradient(135deg, #00AEEF, #1A3A8F)",
  "linear-gradient(135deg, #1A3A8F, #0D2260)",
  "linear-gradient(135deg, #0D2260, #00AEEF)",
  "linear-gradient(135deg, #00AEEF, #0D2260)",
];

function FollowerCounter({ target, inView }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const num = parseInt(target.replace(/\D/g, ""));
  const suffix = target.replace(/[0-9]/g, "");

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      let current = 0;
      const steps = 50;
      const inc = num / steps;
      const timer = setInterval(() => {
        current += inc;
        if (current >= num) {
          setCount(num);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 1500 / steps);
      return () => clearInterval(timer);
    }
  }, [inView, num]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function RedesSociales() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [hovered, setHovered] = useState(null);

  return (
    <section id='contenido' className='py-20' style={{ background: "#F4F6F9" }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-14'>
          <p
            className='text-sm font-semibold uppercase tracking-widest mb-3'
            style={{ color: "#00AEEF" }}
          >
            Creador de Contenido
          </p>
          <h2
            className='text-3xl sm:text-4xl lg:text-5xl font-black mb-4'
            style={{ color: "#1A3A8F" }}
          >
            Educación fiscal{" "}
            <span style={{ color: "#00AEEF" }}>para todos</span>
          </h2>
          <p
            className='text-base max-w-2xl mx-auto'
            style={{ color: "#4A4A4A" }}
          >
            Sígueme en redes y aprende algo nuevo cada día sobre tus impuestos,
            el SAT y cómo cuidar tu dinero.
          </p>
        </div>

        {/* Contadores de seguidores */}
        <div ref={ref} className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12'>
          {redes.map((red, i) => (
            <motion.div
              key={red.nombre}
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className='bg-white rounded-2xl p-4 text-center'
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
            >
              <div
                className='w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2'
                style={{ background: `${red.color}18` }}
              >
                <red.Icon size={20} style={{ color: red.color }} />
              </div>
              <div
                className='text-2xl sm:text-3xl font-black'
                style={{ color: "#1A3A8F" }}
              >
                <FollowerCounter target={red.seguidores} inView={inView} />
              </div>
              <p
                className='text-xs font-medium mt-1'
                style={{ color: "#4A4A4A" }}
              >
                {red.nombre}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Grid publicaciones estilo Instagram */}
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12'>
          {publicaciones.map((pub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: pub.delay, duration: 0.4 }}
              className='relative group aspect-square rounded-2xl overflow-hidden cursor-pointer'
              style={{ background: gradients[i] }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Patrón decorativo */}
              <div className='absolute top-3 right-3 text-white/20 text-4xl font-black'>
                {pub.tema}
              </div>
              {/* Contenido base */}
              <div className='absolute bottom-0 left-0 right-0 p-4'>
                <div
                  className='w-9 h-9 rounded-xl flex items-center justify-center mb-2'
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <pub.Icon size={18} color='white' />
                </div>
                <p className='text-white font-bold text-sm leading-tight'>
                  {pub.subtema}
                </p>
                <span
                  className='text-xs font-semibold mt-1 inline-block px-2 py-0.5 rounded-full'
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                  }}
                >
                  #{pub.tema}
                </span>
              </div>
              {/* Overlay al hover */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered === i ? 1 : 0 }}
                className='absolute inset-0 flex items-center justify-center'
                style={{ background: "rgba(13,34,96,0.75)" }}
              >
                <a
                  href='#'
                  className='px-4 py-2 rounded-xl text-sm font-bold text-white border-2'
                  style={{ borderColor: "#00AEEF", color: "#00AEEF" }}
                >
                  Ver publicación
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Botones de redes */}
        <div className='flex flex-wrap justify-center gap-4'>
          {redes.map((red) => (
            <a
              key={red.nombre}
              href={red.url}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-3 px-5 py-3 rounded-xl bg-white font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg'
              style={{
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                color: "#1A3A8F",
              }}
            >
              <div
                className='w-7 h-7 rounded-lg flex items-center justify-center'
                style={{ background: `${red.color}18` }}
              >
                <red.Icon size={15} style={{ color: red.color }} />
              </div>
              <span>{red.nombre}</span>
              <span className='text-xs' style={{ color: "#4A4A4A" }}>
                {red.handle}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
