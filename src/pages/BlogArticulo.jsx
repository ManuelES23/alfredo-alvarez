import { useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiArrowLeft,
  FiMail,
  FiList,
} from "react-icons/fi";
import { useSEO } from "../hooks/useSEO";
import { articulos } from "../data/articulos";

const NAVY = "#0D2260";
const BLUE = "#1A3A8F";
const CYAN = "#00AEEF";

// "1. De lo presencial a lo digital" -> { numero: "1", texto: "De lo..." }
function partirNumero(texto) {
  const m = texto.match(/^(\d+)\.\s*(.+)$/);
  return m ? { numero: m[1], texto: m[2] } : { numero: null, texto };
}

function slugificar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function RevealBlock({ children, className, style, id }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ y: 24, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function Bloque({ bloque }) {
  switch (bloque.tipo) {
    case "titulo": {
      const { numero, texto } = partirNumero(bloque.texto);
      return (
        <RevealBlock
          id={slugificar(texto)}
          className='flex items-center gap-4 mt-14 mb-5 scroll-mt-28'
        >
          {numero && (
            <span
              className='shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-base font-black text-white'
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${CYAN})` }}
            >
              {numero}
            </span>
          )}
          <h2
            className='text-xl sm:text-2xl font-black leading-snug'
            style={{ color: NAVY }}
          >
            {texto}
          </h2>
        </RevealBlock>
      );
    }
    case "subtitulo":
      return (
        <RevealBlock className='mt-8 mb-3'>
          <h3
            className='pl-4 text-base sm:text-lg font-bold leading-snug border-l-4'
            style={{ color: BLUE, borderColor: CYAN }}
          >
            {bloque.texto}
          </h3>
        </RevealBlock>
      );
    case "lista":
      return (
        <RevealBlock className='my-6'>
          <ul
            className='space-y-3 rounded-2xl p-5'
            style={{ background: "#F4F6F9" }}
          >
            {bloque.items.map((item, i) => (
              <motion.li
                key={item}
                initial={{ x: -12, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className='flex gap-3'
              >
                <span
                  className='mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white'
                  style={{ background: CYAN }}
                >
                  ✓
                </span>
                <span
                  className='text-base leading-relaxed'
                  style={{ color: "#374151" }}
                >
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </RevealBlock>
      );
    case "parrafo":
    default:
      return (
        <p
          className='text-base leading-[1.75] mb-4'
          style={{ color: "#4A4A4A" }}
        >
          {bloque.texto}
        </p>
      );
  }
}

export default function BlogArticulo() {
  const { slug } = useParams();
  const articulo = articulos.find((a) => a.slug === slug);
  const contentRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"],
  });
  const progreso = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useSEO({
    title: articulo
      ? `${articulo.titulo} | Blog Fiscal | Alfredo Álvarez`
      : "Artículo no encontrado | Alfredo Álvarez",
    description: articulo?.extracto,
    path: `/blog/${slug}`,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!articulo || !articulo.contenido) {
    return <Navigate to='/' replace />;
  }

  const secciones = articulo.contenido
    .filter((b) => b.tipo === "titulo")
    .map((b) => partirNumero(b.texto))
    .map((s) => ({ ...s, id: slugificar(s.texto) }));

  return (
    <>
      {/* Barra de progreso de lectura */}
      <motion.div
        className='fixed top-16 left-0 right-0 h-1 origin-left z-40'
        style={{
          scaleX: progreso,
          background: `linear-gradient(90deg, ${CYAN}, ${BLUE})`,
        }}
      />

      {/* Portada: imagen a pantalla completa con el título superpuesto */}
      <section className='relative overflow-hidden pt-16'>
        <div className='relative h-[420px] sm:h-[480px] lg:h-[560px]'>
          <motion.img
            src={articulo.imagenPortada || articulo.imagen}
            alt=''
            aria-hidden='true'
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='absolute inset-0 w-full h-full object-cover'
          />
          {/* Degradado para legibilidad del texto */}
          <div
            className='absolute inset-0'
            style={{
              background: `linear-gradient(180deg, rgba(13,34,96,0.6) 0%, rgba(13,34,96,0.5) 35%, ${NAVY} 92%)`,
            }}
          />
          {/* Formas decorativas, consistentes con el Hero del sitio */}
          <div className='absolute inset-0 pointer-events-none overflow-hidden'>
            <div
              className='absolute w-72 h-72 rounded-full opacity-10 -top-16 -right-16'
              style={{ background: "radial-gradient(circle, #00AEEF, transparent)" }}
            />
            <div className='absolute w-24 h-24 border border-white/10 rotate-45 bottom-24 left-1/3' />
          </div>

          <div className='relative h-full flex flex-col justify-between max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to='/#blog'
                className='inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white transition-colors'
              >
                <FiArrowLeft size={14} /> Volver al blog
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='pb-2'
            >
              <div className='flex items-center gap-2 mb-4'>
                <span
                  className='px-3 py-1 rounded-full text-xs font-bold text-white'
                  style={{ background: CYAN }}
                >
                  {articulo.categoria}
                </span>
                {articulo.autor && (
                  <span
                    className='px-3 py-1 rounded-full text-xs font-bold text-white border'
                    style={{ borderColor: "rgba(255,255,255,0.4)" }}
                  >
                    Artículo de invitado
                  </span>
                )}
              </div>

              <h1 className='text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-5 max-w-2xl'>
                {articulo.titulo}
              </h1>

              <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70'>
                <span className='flex items-center gap-1.5'>
                  <FiCalendar size={14} /> {articulo.fecha}
                </span>
                <span className='flex items-center gap-1.5'>
                  <FiClock size={14} /> {articulo.tiempoLectura} de lectura
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cuerpo del artículo */}
      <section className='py-16 bg-white' ref={contentRef}>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Índice rápido */}
          {secciones.length > 1 && (
            <RevealBlock
              className='mb-10 rounded-2xl p-5 border'
              style={{ background: "white", borderColor: "#E5E7EB", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
            >
              <div
                className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3'
                style={{ color: BLUE }}
              >
                <FiList size={14} /> En este artículo
              </div>
              <div className='flex flex-wrap gap-2'>
                {secciones.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className='px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:text-white'
                    style={{ background: "#F4F6F9", color: "#4A4A4A" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = CYAN;
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#F4F6F9";
                      e.currentTarget.style.color = "#4A4A4A";
                    }}
                  >
                    {s.numero}. {s.texto}
                  </a>
                ))}
              </div>
            </RevealBlock>
          )}

          <article>
            {articulo.contenido.map((bloque, i) => (
              <Bloque key={i} bloque={bloque} />
            ))}
          </article>

          {/* Autor */}
          {articulo.autor && (
            <RevealBlock
              className='mt-12 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 border'
              style={{ background: "#F4F6F9", borderColor: "#E5E7EB" }}
            >
              <div
                className='shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white'
                style={{ background: BLUE }}
              >
                <FiUser size={20} />
              </div>
              <div>
                <p className='text-sm font-bold' style={{ color: NAVY }}>
                  {articulo.autor.nombre}
                </p>
                <p className='text-sm' style={{ color: "#4A4A4A" }}>
                  {articulo.autor.cargo}
                </p>
                {articulo.autor.correo && (
                  <a
                    href={`mailto:${articulo.autor.correo}`}
                    className='inline-flex items-center gap-1.5 text-xs font-semibold mt-1 hover:opacity-80'
                    style={{ color: CYAN }}
                  >
                    <FiMail size={12} /> {articulo.autor.correo}
                  </a>
                )}
              </div>
            </RevealBlock>
          )}

          {/* CTA */}
          <RevealBlock className='text-center mt-14'>
            <Link
              to='/#contacto'
              className='inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-lg'
              style={{
                background: `linear-gradient(135deg, ${BLUE}, ${CYAN})`,
              }}
            >
              Agendar consulta gratuita
            </Link>
          </RevealBlock>
        </div>
      </section>
    </>
  );
}
