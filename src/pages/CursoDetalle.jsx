import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link, useParams, Navigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { cursos } from "../data/cursos";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiArrowLeft,
  FiCheckCircle,
  FiTag,
  FiUsers,
  FiPhone,
  FiMessageCircle,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

function RevealBlock({ children, className, style, delay = 0 }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ y: 24, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default function CursoDetalle() {
  const { slug } = useParams();
  const curso = cursos.find((c) => c.slug === slug);

  useSEO({
    title: curso
      ? `${curso.titulo} | Cursos | Alfredo Álvarez`
      : "Curso no encontrado | Alfredo Álvarez",
    description: curso?.resumen,
    path: `/cursos/${slug}`,
  });

  if (!curso) {
    return <Navigate to='/cursos' replace />;
  }

  const esProximo = curso.estado === "proximo";
  const whatsappHref = curso.whatsapp
    ? `https://wa.me/${curso.whatsapp}?text=${encodeURIComponent(
        `Hola Alfredo, quiero reservar mi lugar en "${curso.titulo}" del ${curso.fechaLegible}.`
      )}`
    : null;

  return (
    <>
      {/* Hero */}
      <section
        className='relative pt-36 pb-14 overflow-hidden'
        style={{ background: "#0D2260" }}
      >
        <div
          className='absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 translate-x-1/3 -translate-y-1/3'
          style={{ background: "#00AEEF" }}
        />
        <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <Link
            to='/cursos'
            className='inline-flex items-center gap-2 text-sm font-semibold mb-6 transition-opacity hover:opacity-80'
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            <FiArrowLeft size={16} />
            Volver a cursos
          </Link>

          <div className='flex flex-wrap items-center gap-2 mb-4'>
            <span
              className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white'
              style={{ background: esProximo ? "#00AEEF" : "rgba(255,255,255,0.15)" }}
            >
              {esProximo ? "Próximo curso" : "Curso pasado"}
            </span>
            {curso.modalidad && (
              <span
                className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white'
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <FiTag size={12} />
                {curso.modalidad}
              </span>
            )}
            {curso.cupoLimitado && esProximo && (
              <span
                className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold'
                style={{ background: "#F4F6F9", color: "#0D2260" }}
              >
                <FiUsers size={12} />
                Cupo limitado
              </span>
            )}
          </div>

          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight'>
            {curso.titulo}
          </h1>
          <p className='text-base max-w-2xl' style={{ color: "rgba(255,255,255,0.75)" }}>
            {curso.resumen}
          </p>
        </div>
      </section>

      {/* Imagen (póster del evento, se muestra completo sin recortar) */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 flex justify-center'>
        <div
          className='rounded-2xl overflow-hidden w-full max-w-[280px] sm:max-w-xs'
          style={{ boxShadow: "0 8px 32px rgba(13,34,96,0.25)" }}
        >
          <img
            src={curso.imagen}
            alt={curso.titulo}
            className='w-full h-auto block'
          />
        </div>
      </div>

      {/* Contenido */}
      <section className='py-16 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10'>
          {/* Columna principal */}
          <div className='lg:col-span-2 space-y-8'>
            <RevealBlock>
              {curso.descripcion.map((p, i) => (
                <p
                  key={i}
                  className='text-base leading-relaxed mb-4'
                  style={{ color: "#4A4A4A" }}
                >
                  {p}
                </p>
              ))}
            </RevealBlock>

            {curso.temario?.length > 0 && (
              <RevealBlock
                delay={0.1}
                className='rounded-2xl p-6'
                style={{ background: "#F4F6F9" }}
              >
                <h2
                  className='text-lg font-bold mb-4'
                  style={{ color: "#0D2260" }}
                >
                  Qué vamos a ver
                </h2>
                <ul className='space-y-3'>
                  {curso.temario.map((item, i) => (
                    <li key={i} className='flex items-start gap-3'>
                      <FiCheckCircle
                        size={18}
                        className='shrink-0 mt-0.5'
                        style={{ color: "#00AEEF" }}
                      />
                      <span className='text-sm' style={{ color: "#4A4A4A" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </RevealBlock>
            )}

            {!esProximo && curso.video && (
              <RevealBlock delay={0.15}>
                <h2
                  className='text-lg font-bold mb-4'
                  style={{ color: "#0D2260" }}
                >
                  Grabación del evento
                </h2>
                <div
                  className='relative rounded-2xl overflow-hidden'
                  style={{ paddingTop: "56.25%" }}
                >
                  <iframe
                    src={curso.video}
                    title={`Grabación: ${curso.titulo}`}
                    className='absolute inset-0 w-full h-full'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </div>
              </RevealBlock>
            )}
          </div>

          {/* Ficha / CTA */}
          <div className='lg:col-span-1'>
            <RevealBlock delay={0.1} className='lg:sticky lg:top-24'>
              <div
                className='rounded-2xl p-6'
                style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.1)" }}
              >
                <h2
                  className='text-sm font-bold uppercase tracking-widest mb-5'
                  style={{ color: "#00AEEF" }}
                >
                  Detalles del evento
                </h2>

                <div className='space-y-4 mb-6'>
                  <div className='flex items-start gap-3'>
                    <FiCalendar size={18} className='shrink-0 mt-0.5' style={{ color: "#1A3A8F" }} />
                    <div>
                      <p className='text-sm font-bold' style={{ color: "#0D2260" }}>
                        {curso.fechaLegible}
                      </p>
                      <p className='text-xs' style={{ color: "#4A4A4A" }}>
                        Fecha
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <FiClock size={18} className='shrink-0 mt-0.5' style={{ color: "#1A3A8F" }} />
                    <div>
                      <p className='text-sm font-bold' style={{ color: "#0D2260" }}>
                        {curso.hora}
                      </p>
                      <p className='text-xs' style={{ color: "#4A4A4A" }}>
                        Hora
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <FiMapPin size={18} className='shrink-0 mt-0.5' style={{ color: "#1A3A8F" }} />
                    <div>
                      <p className='text-sm font-bold' style={{ color: "#0D2260" }}>
                        {curso.lugar}
                      </p>
                      <p className='text-xs' style={{ color: "#4A4A4A" }}>
                        {curso.direccion}
                      </p>
                    </div>
                  </div>
                  {curso.cuota && (
                    <div className='flex items-start gap-3'>
                      <FiTag size={18} className='shrink-0 mt-0.5' style={{ color: "#1A3A8F" }} />
                      <div>
                        <p className='text-sm font-bold' style={{ color: "#0D2260" }}>
                          {curso.cuota}
                        </p>
                        <p className='text-xs' style={{ color: "#4A4A4A" }}>
                          Cuota
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {esProximo ? (
                  <div className='space-y-3'>
                    {whatsappHref && (
                      <a
                        href={whatsappHref}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'
                        style={{ background: "#25D366" }}
                      >
                        <FaWhatsapp size={18} />
                        Reservar mi lugar
                      </a>
                    )}
                    {curso.telefono && (
                      <a
                        href={`tel:+52${curso.telefono.replace(/\s/g, "")}`}
                        className='w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02]'
                        style={{
                          background: "#F4F6F9",
                          color: "#0D2260",
                        }}
                      >
                        <FiPhone size={16} />
                        {curso.telefono}
                      </a>
                    )}
                    {curso.cupoLimitado && (
                      <p className='text-xs text-center' style={{ color: "#4A4A4A" }}>
                        Cupo limitado — reserva tu lugar con anticipación.
                      </p>
                    )}
                  </div>
                ) : (
                  <Link
                    to='/#contacto'
                    className='w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'
                    style={{ background: "linear-gradient(135deg, #1A3A8F, #00AEEF)" }}
                  >
                    <FiMessageCircle size={16} />
                    Preguntar por el próximo curso
                  </Link>
                )}
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>
    </>
  );
}
