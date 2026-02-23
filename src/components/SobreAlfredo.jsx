import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const credenciales = [
  "Contador Público Certificado",
  "Especialista en régimen fiscal mexicano",
  "Creador de contenido @alfredotucontador",
  'Conductor de "La Mesita Fiscal"',
];

export default function SobreAlfredo() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id='sobre' className='py-20' style={{ background: "#F4F6F9" }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div ref={ref} className='grid lg:grid-cols-2 gap-16 items-center'>
          {/* Foto izquierda */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className='relative flex justify-center'
          >
            <div className='relative'>
              {/* Círculo exterior decorativo */}
              <div
                className='absolute -inset-5 rounded-full border-2 opacity-20'
                style={{ borderColor: "#00AEEF" }}
              />
              <div
                className='absolute -inset-10 rounded-full border opacity-10'
                style={{ borderColor: "#1A3A8F" }}
              />
              {/* Punto decorativo */}
              <div
                className='absolute top-4 -right-4 w-8 h-8 rounded-full z-20'
                style={{ background: "#00AEEF" }}
              />
              <div
                className='absolute -bottom-4 -left-4 w-5 h-5 rounded-full z-20 opacity-60'
                style={{ background: "#1A3A8F" }}
              />
              {/* Foto */}
              <div
                className='relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden'
                style={{ boxShadow: "0 20px 60px rgba(13,34,96,0.25)" }}
              >
                <img
                  src='/img/material/alfredo.jpeg'
                  alt='Alfredo Álvarez - Contador Público Mexicano'
                  className='w-full h-full object-cover object-top'
                />
                {/* Overlay gradiente */}
                <div
                  className='absolute bottom-0 left-0 right-0 h-24'
                  style={{
                    background:
                      "linear-gradient(transparent, rgba(13,34,96,0.6))",
                  }}
                />
              </div>
              {/* Badge sobre foto */}
              <div
                className='absolute bottom-4 left-4 right-4 px-4 py-2 rounded-xl backdrop-blur-sm border z-10'
                style={{
                  background: "rgba(13,34,96,0.7)",
                  borderColor: "rgba(0,174,239,0.3)",
                }}
              >
                <p className='text-white text-sm font-bold'>Alfredo Álvarez</p>
                <p style={{ color: "#00AEEF" }} className='text-xs'>
                  CP Certificado · IMCP
                </p>
              </div>
            </div>
          </motion.div>

          {/* Texto derecha */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <p
              className='text-sm font-semibold uppercase tracking-widest mb-3'
              style={{ color: "#00AEEF" }}
            >
              ¿Quién es Alfredo?
            </p>
            <h2
              className='text-3xl sm:text-4xl font-black mb-6 leading-tight'
              style={{ color: "#1A3A8F" }}
            >
              Un contador que{" "}
              <span style={{ color: "#00AEEF" }}>habla claro</span>
            </h2>
            <p
              className='text-base leading-relaxed mb-6'
              style={{ color: "#4A4A4A" }}
            >
              Soy Alfredo Álvarez, Contador Público con más de 8 años ayudando a
              mexicanos a entender y optimizar su situación fiscal. Creo que
              todos merecen un contador que hable claro, sin tecnicismos
              innecesarios y siempre de tu lado.
            </p>
            <p
              className='text-base leading-relaxed mb-8'
              style={{ color: "#4A4A4A" }}
            >
              Además de atender a mis clientes, comparto contenido fiscal en
              redes sociales y conduzco el podcast{" "}
              <strong style={{ color: "#1A3A8F" }}>"La Mesita Fiscal"</strong>,
              donde explicamos el SAT, el RESICO, los CFDIs y todo lo que
              necesitas saber para no pagar más de lo que debes.
            </p>

            {/* Credenciales */}
            <ul className='space-y-3 mb-8'>
              {credenciales.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ x: 20, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  className='flex items-center gap-3 text-sm font-medium'
                  style={{ color: "#4A4A4A" }}
                >
                  <div
                    className='w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0'
                    style={{ background: "#00AEEF" }}
                  >
                    ✓
                  </div>
                  {c}
                </motion.li>
              ))}
            </ul>

            <a
              href='#contacto'
              className='inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg'
              style={{
                background: "linear-gradient(135deg, #1A3A8F, #00AEEF)",
              }}
            >
              Conoce mi historia completa →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
