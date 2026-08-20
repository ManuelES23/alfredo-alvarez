import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSEO } from "../hooks/useSEO";
import { articulos } from "../data/articulos";
import ArticuloCard from "../components/ArticuloCard";

export default function BlogIndex() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useSEO({
    title: "Blog Fiscal | Artículos sobre RESICO, CFDI y más | Alfredo Álvarez",
    description:
      "Todos los artículos del blog fiscal de Alfredo Álvarez: RESICO, CFDI 4.0, deducciones, fiscalización digital y todo lo que necesitas saber para estar al día con tus obligaciones fiscales.",
    path: "/blog",
  });

  return (
    <>
      {/* Encabezado */}
      <section className='pt-36 pb-16' style={{ background: "#0D2260" }}>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <p
            className='text-sm font-semibold uppercase tracking-widest mb-3'
            style={{ color: "#00AEEF" }}
          >
            Blog Fiscal
          </p>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black mb-4 text-white'>
            Artículos que te ayudan a
            <br />
            <span style={{ color: "#00AEEF" }}>pagar menos impuestos</span>{" "}
            (legalmente)
          </h1>
          <p
            className='mt-4 text-base max-w-2xl mx-auto'
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Contenido actualizado sobre el RESICO, el CFDI y todo lo que
            necesitas saber para estar fiscalmente al día.
          </p>
        </div>
      </section>

      {/* Grilla de artículos */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div
            ref={ref}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          >
            {articulos.map((art, i) => (
              <motion.div
                key={art.id}
                initial={{ y: 30, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              >
                <ArticuloCard art={art} className='h-full' />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
