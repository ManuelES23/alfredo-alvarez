import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiCalendar, FiClock } from "react-icons/fi";
import { articulos } from "../data/articulos";

export default function Blog() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id='blog' className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-14'>
          <p
            className='text-sm font-semibold uppercase tracking-widest mb-3'
            style={{ color: "#00AEEF" }}
          >
            Blog Fiscal
          </p>
          <h2
            className='text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight'
            style={{ color: "#1A3A8F" }}
          >
            Artículos que te ayudan a <br className='hidden sm:block' />
            <span style={{ color: "#00AEEF" }}>pagar menos impuestos</span>{" "}
            (legalmente)
          </h2>
          <p
            className='text-base max-w-xl mx-auto'
            style={{ color: "#4A4A4A" }}
          >
            Contenido actualizado sobre el SAT, el RESICO, el CFDI y todo lo que
            necesitas saber para estar fiscalmente al día.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'
        >
          {articulos.map((art, i) => (
            <motion.article
              key={art.id}
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
              className='group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer'
              style={{
                boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 12px 40px rgba(0,174,239,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.08)";
              }}
            >
              {/* Imagen de portada */}
              <div
                className='relative h-44 overflow-hidden'
                style={{
                  background: art.gradiente
                    .replace("from-", "")
                    .replace("to-", "")
                    .replace(/\[|\]/g, ""),
                }}
              >
                <div
                  className='w-full h-full'
                  style={{
                    background: `linear-gradient(135deg, ${
                      art.gradiente.includes("#1A3A8F") ? "#1A3A8F" : "#0D2260"
                    }, ${
                      art.gradiente.includes("#00AEEF") ? "#00AEEF" : "#1A3A8F"
                    })`,
                  }}
                />
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='text-white/20 text-6xl font-black'>
                    {art.categoria}
                  </div>
                </div>
                <div className='absolute top-4 left-4'>
                  <span
                    className='px-3 py-1 rounded-full text-xs font-bold text-white'
                    style={{ background: "rgba(0,174,239,0.8)" }}
                  >
                    {art.categoria}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className='p-6 bg-white'>
                <h3
                  className='text-base font-bold leading-snug mb-2 group-hover:text-azul-brillante transition-colors'
                  style={{ color: "#1A3A8F" }}
                >
                  {art.titulo}
                </h3>
                <p className='text-sm leading-relaxed mb-5 text-gray-500 line-clamp-3'>
                  {art.extracto}
                </p>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3 text-xs text-gray-400'>
                    <span className='flex items-center gap-1'>
                      <FiCalendar size={11} /> {art.fecha}
                    </span>
                    <span>·</span>
                    <span className='flex items-center gap-1'>
                      <FiClock size={11} /> {art.tiempoLectura}
                    </span>
                  </div>
                  <a
                    href={art.url}
                    className='text-xs font-bold transition-colors hover:opacity-80 flex items-center gap-1'
                    style={{ color: "#00AEEF" }}
                  >
                    Leer más →
                  </a>
                </div>
                {/* Línea cyan inferior */}
                <div
                  className='mt-5 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500'
                  style={{ background: "#00AEEF" }}
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <div className='text-center'>
          <a
            href='#'
            className='inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg'
            style={{
              borderColor: "#1A3A8F",
              color: "#1A3A8F",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1A3A8F";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#1A3A8F";
            }}
          >
            Ver todos los artículos →
          </a>
        </div>
      </div>
    </section>
  );
}
