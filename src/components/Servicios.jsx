import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { servicios } from "../data/servicios";
import {
  FiFileText,
  FiBriefcase,
  FiBarChart2,
  FiCreditCard,
  FiTarget,
  FiArrowRight,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const iconMap = {
  1: FiFileText,
  2: FiBriefcase,
  3: FiBarChart2,
  4: HiOutlineOfficeBuilding,
  5: FiCreditCard,
  6: FiTarget,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Servicios() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id='servicios' className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-16'>
          <p
            className='text-sm font-semibold uppercase tracking-widest mb-3'
            style={{ color: "#00AEEF" }}
          >
            Servicios Profesionales
          </p>
          <h2
            className='text-3xl sm:text-4xl lg:text-5xl font-black mb-4'
            style={{ color: "#1A3A8F" }}
          >
            Todo lo que necesitas
            <br />
            <span style={{ color: "#00AEEF" }}>
              para estar al día con el SAT
            </span>
          </h2>
          <div className='flex items-center justify-center gap-3 mt-6'>
            <div className='h-px w-12 bg-gray-200' />
            <div
              className='w-3 h-3 rounded-full'
              style={{ background: "#00AEEF" }}
            />
            <div className='h-px w-12 bg-gray-200' />
          </div>
          <p
            className='mt-4 text-base max-w-2xl mx-auto'
            style={{ color: "#4A4A4A" }}
          >
            Servicios contables y fiscales diseñados para mexicanos que quieren
            cumplir con el SAT sin estrés y optimizar su carga tributaria.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial='hidden'
          animate={inView ? "visible" : "hidden"}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          {servicios.map((servicio) => {
            const IconComp = iconMap[servicio.id];
            return (
              <motion.div
                key={servicio.id}
                variants={cardVariants}
                className='group relative bg-white rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer'
                style={{
                  boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                  borderLeft: "3px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderLeft = "3px solid #00AEEF";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(0,174,239,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderLeft = "3px solid transparent";
                  e.currentTarget.style.boxShadow =
                    "0 2px 16px rgba(0,0,0,0.08)";
                }}
              >
                {/* Icono */}
                <div
                  className='w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'
                  style={{ background: "#F4F6F9" }}
                >
                  {IconComp && (
                    <IconComp size={24} style={{ color: "#1A3A8F" }} />
                  )}
                </div>

                {/* Contenido */}
                <h3
                  className='text-lg font-bold mb-3 group-hover:text-azul-primario transition-colors'
                  style={{ color: "#0D2260" }}
                >
                  {servicio.titulo}
                </h3>
                <p
                  className='text-sm leading-relaxed mb-4'
                  style={{ color: "#4A4A4A" }}
                >
                  {servicio.descripcion}
                </p>

                {/* Tags */}
                <div className='flex flex-wrap gap-2'>
                  {servicio.tags.map((tag) => (
                    <span
                      key={tag}
                      className='px-2 py-1 rounded-md text-xs font-medium'
                      style={{
                        background: "rgba(0,174,239,0.1)",
                        color: "#1A3A8F",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div
                  className='mt-5 text-sm font-semibold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity'
                  style={{ color: "#00AEEF" }}
                >
                  Más información <FiArrowRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <div className='text-center mt-12'>
          <a
            href='#contacto'
            className='inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-lg'
            style={{ background: "linear-gradient(135deg, #1A3A8F, #00AEEF)" }}
          >
            Agendar consulta gratuita
            <FiArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
