import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { articulos } from "../data/articulos";
import ArticuloCard from "./ArticuloCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
            Contenido actualizado sobre el RESICO, el CFDI y todo lo que
            necesitas saber para estar fiscalmente al día.
          </p>
        </div>

        {/* Slider de artículos */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className='mb-4'
        >
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            className='pb-12 blog-swiper'
          >
            {articulos.map((art) => (
              <SwiperSlide key={art.id} className='h-auto pb-1'>
                <ArticuloCard art={art} className='h-full' />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* CTA */}
        <div className='text-center'>
          <Link
            to='/blog'
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
          </Link>
        </div>
      </div>
    </section>
  );
}
