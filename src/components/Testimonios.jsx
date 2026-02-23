import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { testimonios } from "../data/testimonios";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Estrellas({ cantidad }) {
  return (
    <div className='flex gap-1 mb-3'>
      {Array.from({ length: cantidad }).map((_, i) => (
        <span key={i} className='text-yellow-400 text-base'>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonios() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id='testimonios'
      className='py-20 relative overflow-hidden'
      style={{ background: "#1A3A8F" }}
    >
      {/* Decoración */}
      <div
        className='absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2'
        style={{ background: "#00AEEF" }}
      />
      <div
        className='absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5 translate-x-1/3 translate-y-1/3'
        style={{ background: "#00AEEF" }}
      />

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <p
            className='text-sm font-semibold uppercase tracking-widest mb-3'
            style={{ color: "#00AEEF" }}
          >
            Testimonios
          </p>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3'>
            Lo que dicen <span style={{ color: "#00AEEF" }}>mis clientes</span>
          </h2>
          <p className='text-white/60 text-base max-w-xl mx-auto'>
            Más de 500 personas y empresas confían en Alfredo Álvarez para su
            contabilidad y planeación fiscal.
          </p>
        </motion.div>

        {/* Swiper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            loop
            className='pb-12'
          >
            {testimonios.map((t) => (
              <SwiperSlide key={t.id}>
                <div
                  className='rounded-2xl p-6 h-full border transition-all duration-300'
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    borderColor: "rgba(0,174,239,0.2)",
                  }}
                >
                  {/* Comillas */}
                  <div
                    className='text-4xl font-black leading-none mb-3'
                    style={{ color: "#00AEEF", opacity: 0.4 }}
                  >
                    "
                  </div>

                  {/* Comentario */}
                  <p className='text-white/80 text-sm leading-relaxed mb-5 italic'>
                    "{t.comentario}"
                  </p>

                  <Estrellas cantidad={t.estrellas} />

                  {/* Autor */}
                  <div className='flex items-center gap-3 mt-auto'>
                    <div
                      className='w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0'
                      style={{ background: "#0D2260" }}
                    >
                      {t.iniciales}
                    </div>
                    <div>
                      <p className='text-white text-sm font-bold'>{t.nombre}</p>
                      <p className='text-xs' style={{ color: "#00AEEF" }}>
                        {t.tipo}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
