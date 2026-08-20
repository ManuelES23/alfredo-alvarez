import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { cursos } from "../data/cursos";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiArrowRight,
  FiVideo,
  FiTag,
} from "react-icons/fi";

function CursoCard({ curso, i }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
    >
      <Link
        to={`/cursos/${curso.slug}`}
        className='group block rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1'
        style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}
      >
        <div className='relative aspect-[16/9] overflow-hidden'>
          <img
            src={curso.imagen}
            alt={curso.titulo}
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
          <div
            className='absolute inset-0'
            style={{
              background:
                "linear-gradient(180deg, rgba(13,34,96,0) 50%, rgba(13,34,96,0.75) 100%)",
            }}
          />
          <span
            className='absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white'
            style={{
              background:
                curso.estado === "proximo" ? "#00AEEF" : "rgba(255,255,255,0.2)",
            }}
          >
            {curso.estado === "proximo" ? "Próximo curso" : "Curso pasado"}
          </span>
          {curso.modalidad && (
            <span
              className='absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white'
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)" }}
            >
              <FiTag size={12} />
              {curso.modalidad}
            </span>
          )}
        </div>

        <div className='p-6'>
          <h3
            className='text-lg font-bold mb-3 leading-snug transition-colors duration-200 group-hover:text-[#00AEEF]'
            style={{ color: "#0D2260" }}
          >
            {curso.titulo}
          </h3>

          <div className='space-y-2 mb-4'>
            <div className='flex items-center gap-2 text-sm' style={{ color: "#4A4A4A" }}>
              <FiCalendar size={15} style={{ color: "#00AEEF" }} />
              {curso.fechaLegible}
            </div>
            <div className='flex items-center gap-2 text-sm' style={{ color: "#4A4A4A" }}>
              <FiClock size={15} style={{ color: "#00AEEF" }} />
              {curso.hora}
            </div>
            <div className='flex items-center gap-2 text-sm' style={{ color: "#4A4A4A" }}>
              <FiMapPin size={15} style={{ color: "#00AEEF" }} />
              {curso.lugar}, {curso.direccion}
            </div>
          </div>

          <span
            className='inline-flex items-center gap-1.5 text-sm font-bold'
            style={{ color: "#1A3A8F" }}
          >
            Ver detalle e inscribirme
            <FiArrowRight
              size={14}
              className='transition-transform duration-200 group-hover:translate-x-1'
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Cursos() {
  const { ref: refPasados, inView: inViewPasados } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useSEO({
    title: "Cursos y Eventos Fiscales | Alfredo Álvarez Contador",
    description:
      "Cursos, talleres y eventos fiscales presenciales de Alfredo Álvarez. Conoce las próximas fechas, inscríbete y consulta las grabaciones de eventos pasados.",
    path: "/cursos",
  });

  const proximos = cursos.filter((c) => c.estado === "proximo");
  const pasados = cursos.filter((c) => c.estado === "pasado");

  return (
    <>
      {/* Encabezado */}
      <section className='pt-36 pb-16' style={{ background: "#0D2260" }}>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <p
            className='text-sm font-semibold uppercase tracking-widest mb-3'
            style={{ color: "#00AEEF" }}
          >
            Cursos y Eventos
          </p>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black mb-4 text-white'>
            Aprende fiscal
            <br />
            <span style={{ color: "#00AEEF" }}>en persona</span>
          </h1>
          <p
            className='mt-4 text-base max-w-2xl mx-auto'
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Talleres y eventos presenciales para resolver tus dudas fiscales
            directamente conmigo. Aquí encontrarás las próximas fechas y las
            grabaciones de los eventos pasados.
          </p>
        </div>
      </section>

      {/* Próximos cursos */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mb-10'>
            <p
              className='text-sm font-semibold uppercase tracking-widest mb-2'
              style={{ color: "#00AEEF" }}
            >
              Agenda
            </p>
            <h2 className='text-2xl sm:text-3xl font-black' style={{ color: "#0D2260" }}>
              Próximos cursos
            </h2>
          </div>

          {proximos.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {proximos.map((c, i) => (
                <CursoCard key={c.id} curso={c} i={i} />
              ))}
            </div>
          ) : (
            <div
              className='text-center py-16 rounded-2xl'
              style={{ background: "#F4F6F9" }}
            >
              <p style={{ color: "#4A4A4A" }}>
                Por ahora no hay cursos programados. Muy pronto anunciaremos la
                siguiente fecha.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Cursos pasados */}
      <section className='py-20' style={{ background: "#F4F6F9" }}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mb-10'>
            <p
              className='text-sm font-semibold uppercase tracking-widest mb-2'
              style={{ color: "#00AEEF" }}
            >
              Historial
            </p>
            <h2 className='text-2xl sm:text-3xl font-black' style={{ color: "#0D2260" }}>
              Cursos pasados
            </h2>
          </div>

          {pasados.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {pasados.map((c, i) => (
                <CursoCard key={c.id} curso={c} i={i} />
              ))}
            </div>
          ) : (
            <motion.div
              ref={refPasados}
              initial={{ opacity: 0, y: 20 }}
              animate={inViewPasados ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className='text-center py-16 rounded-2xl bg-white'
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
            >
              <div
                className='w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4'
                style={{ background: "#F4F6F9" }}
              >
                <FiVideo size={24} style={{ color: "#00AEEF" }} />
              </div>
              <p
                className='font-bold mb-1'
                style={{ color: "#0D2260" }}
              >
                Aún no hay cursos pasados
              </p>
              <p className='text-sm max-w-md mx-auto' style={{ color: "#4A4A4A" }}>
                Cuando concluya nuestro primer evento, aquí encontrarás la
                grabación para que puedas verlo cuando quieras.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
