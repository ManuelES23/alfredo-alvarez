import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiMail,
  FiMapPin,
  FiClock,
  FiPhone,
  FiCheckCircle,
  FiFileText,
  FiBriefcase,
  FiBarChart2,
  FiArrowRight,
} from "react-icons/fi";
import { MdOutlineCalculate, MdReceiptLong } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const iconosFlotantes = [
  { Icon: MdOutlineCalculate, x: "5%", y: "20%", delay: 0 },
  { Icon: FiFileText, x: "90%", y: "15%", delay: 0.3 },
  { Icon: FiBriefcase, x: "8%", y: "75%", delay: 0.6 },
  { Icon: MdReceiptLong, x: "88%", y: "70%", delay: 0.9 },
  { Icon: FiBarChart2, x: "50%", y: "5%", delay: 0.2 },
  { Icon: HiOutlineOfficeBuilding, x: "45%", y: "90%", delay: 0.5 },
];

const contactInfo = [
  { Icon: FiMail, label: "contacto@alfredotucontador.mx" },
  { Icon: FiMapPin, label: "Ciudad de México, México" },
  { Icon: FiClock, label: "Lun - Vie: 9am - 6pm CST" },
];

export default function ContactoCTA() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [form, setForm] = useState({ nombre: "", email: "", whatsapp: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);
    setForm({ nombre: "", email: "", whatsapp: "" });
  };

  return (
    <section
      id='contacto'
      className='py-20 relative overflow-hidden'
      style={{
        background:
          "linear-gradient(135deg, #0D2260 0%, #1A3A8F 50%, #0D2260 100%)",
      }}
    >
      {/* Iconos flotantes decorativos */}
      {iconosFlotantes.map((item, i) => (
        <motion.div
          key={i}
          className='absolute pointer-events-none select-none'
          style={{ left: item.x, top: item.y, opacity: 0.1 }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <item.Icon size={28} color='#00AEEF' />
        </motion.div>
      ))}

      {/* Gradiente circular decorativo */}
      <div
        className='absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl'
        style={{ background: "#00AEEF" }}
      />
      <div
        className='absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl'
        style={{ background: "#00AEEF" }}
      />

      <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          ref={ref}
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className='text-center mb-12'
        >
          <div
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 border'
            style={{
              background: "rgba(0,174,239,0.15)",
              borderColor: "rgba(0,174,239,0.4)",
              color: "#00AEEF",
            }}
          >
            <FiPhone size={12} /> CONTACTO DIRECTO
          </div>
          <h2 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight'>
            ¿Tienes dudas <span style={{ color: "#00AEEF" }}>fiscales?</span>
          </h2>
          <p className='text-lg text-white/65 max-w-xl mx-auto'>
            Agenda una consulta y resolvemos todo juntos. Sin compromisos, con
            toda la claridad que necesitas.
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-5 gap-8 items-center'>
          {/* Formulario */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className='lg:col-span-3'
          >
            <div
              className='rounded-3xl p-8 border'
              style={{
                background: "rgba(255,255,255,0.06)",
                borderColor: "rgba(0,174,239,0.2)",
              }}
            >
              <h3 className='text-white text-xl font-bold mb-6'>
                Déjame tus datos
              </h3>
              {enviado ? (
                <div
                  className='rounded-2xl p-6 text-center border'
                  style={{
                    background: "rgba(0,174,239,0.15)",
                    borderColor: "#00AEEF",
                  }}
                >
                  <FiCheckCircle
                    size={36}
                    style={{ color: "#00AEEF", margin: "0 auto 12px" }}
                  />
                  <p className='text-white font-bold'>¡Mensaje enviado!</p>
                  <p className='text-white/70 text-sm mt-1'>
                    Te contactaré en menos de 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div>
                    <label className='text-xs font-semibold text-white/60 block mb-1'>
                      Nombre completo
                    </label>
                    <input
                      type='text'
                      name='nombre'
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      placeholder='Tu nombre'
                      className='w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/40 outline-none transition-all border focus:border-azul-brillante'
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        borderColor: "rgba(255,255,255,0.15)",
                      }}
                    />
                  </div>
                  <div>
                    <label className='text-xs font-semibold text-white/60 block mb-1'>
                      Correo electrónico
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder='tucorreo@email.com'
                      className='w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/40 outline-none transition-all border focus:border-azul-brillante'
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        borderColor: "rgba(255,255,255,0.15)",
                      }}
                    />
                  </div>
                  <div>
                    <label className='text-xs font-semibold text-white/60 block mb-1'>
                      WhatsApp
                    </label>
                    <input
                      type='tel'
                      name='whatsapp'
                      value={form.whatsapp}
                      onChange={handleChange}
                      required
                      placeholder='+52 55 0000 0000'
                      className='w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/40 outline-none transition-all border focus:border-azul-brillante'
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        borderColor: "rgba(255,255,255,0.15)",
                      }}
                    />
                  </div>
                  <button
                    type='submit'
                    className='w-full py-4 rounded-xl font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-xl mt-2'
                    style={{
                      background: "linear-gradient(135deg, #00AEEF, #1A3A8F)",
                    }}
                  >
                    Solicitar consulta gratuita →
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* WhatsApp y datos */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className='lg:col-span-2 space-y-4 text-center lg:text-left'
          >
            <p className='text-white/60 text-sm font-medium'>
              O contáctame directamente:
            </p>

            <a
              href='https://wa.me/5212345678901'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-center lg:justify-start gap-3 px-5 py-4 rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-lg'
              style={{ background: "#25D366" }}
            >
              <FaWhatsapp size={24} />
              <div className='text-left'>
                <p className='text-sm font-black'>WhatsApp Directo</p>
                <p className='text-xs opacity-80'>Respuesta en minutos</p>
              </div>
            </a>

            <div className='space-y-3 pt-4'>
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className='flex items-center justify-center lg:justify-start gap-3 text-sm'
                >
                  <item.Icon
                    size={15}
                    style={{ color: "#00AEEF", flexShrink: 0 }}
                  />
                  <span className='text-white/70'>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
