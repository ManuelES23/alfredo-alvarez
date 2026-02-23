import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiMic, FiClock } from "react-icons/fi";
import { FaSpotify, FaApple, FaYoutube, FaPodcast } from "react-icons/fa";
import { episodios, plataformas } from "../data/podcast";

const plataformaIconMap = {
  Spotify: FaSpotify,
  "Apple Podcasts": FaApple,
  YouTube: FaYoutube,
  "Google Podcasts": FaPodcast,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const categoriaBadgeColors = {
  RESICO: "#00AEEF",
  ISR: "#1A3A8F",
  CFDI: "#0D2260",
  SAT: "#00AEEF",
  Finanzas: "#1A3A8F",
};

export default function Podcast() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id='podcast'
      className='py-20 relative overflow-hidden'
      style={{ background: "#0D2260" }}
    >
      {/* Textura de fondo */}
      <div className='absolute inset-0 opacity-5 pointer-events-none'>
        <div
          className='absolute top-0 right-0 w-96 h-96 rounded-full'
          style={{
            background: "radial-gradient(circle, #00AEEF, transparent)",
          }}
        />
        <div
          className='absolute bottom-0 left-0 w-80 h-80 rounded-full'
          style={{
            background: "radial-gradient(circle, #1A3A8F, transparent)",
          }}
        />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className='text-center mb-14'
        >
          <div
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-5 border'
            style={{
              background: "rgba(0,174,239,0.15)",
              borderColor: "rgba(0,174,239,0.4)",
              color: "#00AEEF",
            }}
          >
            <FiMic size={12} /> PODCAST
          </div>
          <h2 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4'>
            La <span style={{ color: "#00AEEF" }}>Mesita</span> Fiscal
          </h2>
          <p className='text-base sm:text-lg text-white/65 max-w-2xl mx-auto leading-relaxed'>
            El podcast donde la fiscalidad mexicana se explica de forma clara,
            práctica y sin tecnicismos. Nuevos episodios cada semana.
          </p>
        </motion.div>

        {/* Grid episodios */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10'
        >
          {episodios.slice(0, 3).map((ep) => (
            <motion.div
              key={ep.id}
              variants={cardVariants}
              className='group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 cursor-pointer border'
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: "rgba(0,174,239,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,174,239,0.1)";
                e.currentTarget.style.borderColor = "rgba(0,174,239,0.5)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0,174,239,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(0,174,239,0.2)";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {/* Número y categoria */}
              <div className='flex items-center justify-between mb-4'>
                <span
                  className='text-3xl font-black opacity-40'
                  style={{ color: "#00AEEF" }}
                >
                  {ep.numero}
                </span>
                <span
                  className='px-2 py-1 rounded-lg text-xs font-bold'
                  style={{
                    background: "rgba(0,174,239,0.2)",
                    color: "#00AEEF",
                  }}
                >
                  {ep.categoria}
                </span>
              </div>

              {/* Título */}
              <h3 className='text-base font-bold text-white mb-2 leading-snug group-hover:text-azul-brillante transition-colors'>
                {ep.titulo}
              </h3>

              {/* Descripción */}
              <p className='text-xs leading-relaxed mb-5 text-white/55'>
                {ep.descripcion}
              </p>

              {/* Footer */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 text-xs text-white/40'>
                  <FiClock size={12} /> {ep.duracion}
                  <span>·</span>
                  <span>{ep.fecha}</span>
                </div>
                <a
                  href={ep.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105'
                  style={{
                    background: "#00AEEF",
                    color: "white",
                  }}
                >
                  <FiMic size={12} /> Escuchar
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Plataformas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className='flex flex-wrap items-center justify-center gap-4 mb-10'
        >
          <span className='text-white/40 text-sm font-medium'>
            Disponible en:
          </span>
          {plataformas.map((p) => (
            <a
              key={p.nombre}
              href={p.url}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 border'
              style={{
                background: "rgba(255,255,255,0.06)",
                borderColor: "rgba(255,255,255,0.12)",
                color: "white",
              }}
            >
              {(() => {
                const PIcon = plataformaIconMap[p.nombre];
                return PIcon ? (
                  <PIcon size={16} style={{ color: p.color }} />
                ) : null;
              })()}
              {p.nombre}
            </a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className='text-center'
        >
          <a
            href='#'
            className='inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white border-2 transition-all duration-200 hover:scale-105 hover:bg-white/10'
            style={{ borderColor: "#00AEEF", color: "#00AEEF" }}
          >
            Ver todos los episodios →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
