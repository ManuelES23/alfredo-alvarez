import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { FiArrowRight, FiZap } from "react-icons/fi";

const NAVY = "#0A1128";
const BLUE = "#1656F5";
const AMBER = "#F5A623";

export default function NexumBanner() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className='py-16' style={{ background: "#F4F6F9" }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          ref={ref}
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className='relative overflow-hidden rounded-3xl p-8 sm:p-10 lg:p-12'
          style={{
            background: `linear-gradient(120deg, ${NAVY} 0%, ${BLUE} 140%)`,
          }}
        >
          <div className='absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 pointer-events-none bg-white' />

          <div className='relative z-10 flex flex-col lg:flex-row items-center gap-8'>
            <div className='flex-1 text-center lg:text-left'>
              <div
                className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4 border'
                style={{
                  background: "rgba(245,166,35,0.15)",
                  borderColor: "rgba(245,166,35,0.4)",
                  color: AMBER,
                }}
              >
                <FiZap size={12} /> UN PRODUCTO DE ALFREDO ÁLVAREZ
              </div>
              <img
                src='/img/logo/nexum-logo.png'
                alt='NEXUM'
                className='h-8 mx-auto lg:mx-0 mb-4'
              />
              <h2 className='text-2xl sm:text-3xl font-black text-white mb-3 leading-tight'>
                ¿Te quedas sin timbres{" "}
                <span style={{ color: AMBER }}>en cierre de mes?</span>
              </h2>
              <p className='text-white/65 text-base max-w-lg mx-auto lg:mx-0'>
                Facturación electrónica en la nube, CFDI 4.0, sin
                mensualidad y con recarga inmediata. Respaldado por un
                contador.
              </p>
            </div>

            <div className='shrink-0'>
              <Link
                to='/nexum-fiscal'
                className='inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-lg whitespace-nowrap'
                style={{ background: `linear-gradient(135deg, ${BLUE}, ${AMBER})` }}
              >
                Conoce NEXUM Fiscal <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
