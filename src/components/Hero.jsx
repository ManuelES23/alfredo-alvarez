import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

const badges = [
  { label: "Personas Físicas", delay: 0.8 },
  { label: "Personas Morales", delay: 0.9 },
  { label: "Agapes", delay: 1.0 },
  { label: "Autotransporte", delay: 1.1 },
  { label: "Plataformas Tecnológicas", delay: 1.2 },
  { label: "Constructoras", delay: 1.3 },
];

const words = ["Tu", "contador,", "tu", "estratega", "fiscal"];

export default function Hero() {
  const shapesRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    // GSAP: animación flotante de formas geométricas
    if (shapesRef.current) {
      const shapes = shapesRef.current.querySelectorAll(".geo-shape");
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          y: "random(-30, 30)",
          x: "random(-15, 15)",
          rotation: "random(-20, 20)",
          duration: "random(6, 10)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });
    }

    // GSAP: palabras del headline aparecen una por una
    if (wordsRef.current.length > 0) {
      gsap.fromTo(
        wordsRef.current.filter(Boolean),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.4,
        },
      );
    }
  }, []);

  return (
    <section
      id='inicio'
      className='relative flex items-center overflow-hidden pt-16'
      style={{
        minHeight: "100svh",
        background:
          "linear-gradient(135deg, #0D2260 0%, #1A3A8F 60%, #0D2260 100%)",
      }}
    >
      {/* Formas geométricas decorativas */}
      <div
        ref={shapesRef}
        className='absolute inset-0 pointer-events-none overflow-hidden'
      >
        <div
          className='geo-shape absolute w-64 h-64 rounded-full opacity-10 top-10 right-20'
          style={{
            background: "radial-gradient(circle, #00AEEF, transparent)",
          }}
        />
        <div className='geo-shape absolute w-44 h-44 border-2 border-azul-brillante/20 rounded-full top-32 left-16' />
        <div className='geo-shape absolute w-32 h-32 border border-white/10 rotate-45 bottom-32 left-32' />
        <div className='geo-shape absolute w-20 h-20 border-2 border-azul-brillante/30 rotate-12 top-1/2 left-1/3' />
        <div
          className='geo-shape absolute w-80 h-80 rounded-full opacity-5 -bottom-20 -left-20'
          style={{ background: "#00AEEF" }}
        />
        <div className='geo-shape absolute w-48 h-48 border border-white/5 rounded-full top-20 left-1/2' />
        <div className='geo-shape absolute w-16 h-16 bg-azul-brillante/10 rounded-lg rotate-45 top-40 right-1/3' />
        <div className='geo-shape absolute w-24 h-24 border-2 border-azul-brillante/15 rotate-12 bottom-40 right-20' />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div className='grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)] py-16'>
          {/* Texto izquierda */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='order-2 lg:order-1'
          >
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className='inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 border'
              style={{
                background: "rgba(0, 174, 239, 0.15)",
                borderColor: "rgba(0, 174, 239, 0.4)",
                color: "#00AEEF",
              }}
            >
              <span className='w-2 h-2 rounded-full bg-azul-brillante animate-pulse' />
              Contador Público Certificado 🇲🇽
            </motion.div>

            {/* Headline con palabras animadas por GSAP */}
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6'>
              {words.map((word, i) => (
                <span
                  key={i}
                  ref={(el) => (wordsRef.current[i] = el)}
                  className='inline-block mr-3 opacity-0'
                  style={{
                    color: word === "estratega" ? "#00AEEF" : "white",
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className='text-base sm:text-lg text-white/75 leading-relaxed mb-8 max-w-lg'
            >
              Asesoría contable y fiscal personalizada para personas físicas y
              personas morales en México. Te ayudamos a optimizar tu carga
              tributaria de forma legal, regularizar tu situación fiscal y
              gestionar tu negocio con total paz mental.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className='flex flex-wrap gap-4 mb-10'
            >
              <a
                href='#contacto'
                className='flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-lg'
                style={{ background: "white", color: "#1A3A8F" }}
              >
                Agendar consulta <FiArrowRight size={14} />
              </a>
              <a
                href='#servicios'
                className='px-6 py-3 rounded-xl font-bold text-sm text-white border-2 transition-all duration-200 hover:bg-azul-brillante/15 hover:scale-105'
                style={{ borderColor: "#00AEEF", color: "#00AEEF" }}
              >
                Conoce mis servicios
              </a>
            </motion.div>

            {/* Badges flotantes */}
            <div className='flex flex-wrap gap-3'>
              {badges.map((badge) => (
                <motion.div
                  key={badge.label}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: badge.delay,
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                  className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border'
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(0, 174, 239, 0.4)",
                    color: "white",
                  }}
                >
                  <FiCheckCircle size={12} style={{ color: "#00AEEF" }} />
                  {badge.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Foto derecha */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className='order-1 lg:order-2 flex justify-center'
          >
            <div className='relative'>
              {/* Círculo exterior (cyan) */}
              <div
                className='absolute -inset-5 rounded-full border-2 opacity-30 animate-[spin_25s_linear_infinite]'
                style={{ borderColor: "#00AEEF" }}
              />
              {/* Círculo interior (azul) */}
              <div
                className='absolute -inset-2 rounded-full border-4 opacity-40'
                style={{
                  borderColor: "#1A3A8F",
                  background: "rgba(26,58,143,0.2)",
                }}
              />
              {/* Punto decorativo superior */}
              <div
                className='absolute -top-2 -right-2 w-6 h-6 rounded-full z-20'
                style={{ background: "#00AEEF" }}
              />
              {/* Punto decorativo inferior */}
              <div
                className='absolute -bottom-2 -left-2 w-4 h-4 rounded-full z-20 opacity-70'
                style={{ background: "#00AEEF" }}
              />
              {/* Foto */}
              <div
                className='relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4'
                style={{
                  borderColor: "#00AEEF",
                  background: "linear-gradient(160deg, #1A3A8F, #00AEEF)",
                }}
              >
                <img
                  src='/img/material/alfredo.png'
                  alt='Alfredo Álvarez - Contador Público'
                  className='w-full h-full object-cover object-bottom'
                  style={{ transform: "scale(1.55)", transformOrigin: "top center" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave inferior */}
      <div className='absolute left-0 right-0' style={{ bottom: "-2px" }}>
        <svg
          viewBox='0 0 1440 60'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M0 60H1440V30C1200 60 960 0 720 30C480 60 240 0 0 30V60Z'
            fill='white'
          />
        </svg>
      </div>
    </section>
  );
}
