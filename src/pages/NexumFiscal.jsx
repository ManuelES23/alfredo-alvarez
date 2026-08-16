import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiMail,
  FiMapPin,
  FiZap,
  FiRefreshCw,
  FiDollarSign,
  FiFileText,
} from "react-icons/fi";
import { FaWhatsapp, FaPuzzlePiece } from "react-icons/fa";
import {
  dolores,
  soluciones,
  paquetes,
  contactoNexum,
  nexumWhatsapp,
} from "../data/nexum";

// Paleta propia de NEXUM (distinta al cyan del resto del sitio)
const NAVY = "#0A1128";
const NAVY_2 = "#111B3F";
const BLUE = "#1656F5";
const BLUE_LIGHT = "#3B7BFF";
const AMBER = "#F5A623";

const solucionIconMap = {
  zap: FiZap,
  refresh: FiRefreshCw,
  puzzle: FaPuzzlePiece,
  dollar: FiDollarSign,
};

const confianza = ["CFDI 4.0", "Sin mensualidad", "Respaldo contable"];

export default function NexumFiscal() {
  const { ref: doloresRef, inView: doloresInView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });
  const { ref: solucionesRef, inView: solucionesInView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });
  const { ref: preciosRef, inView: preciosInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <>
      {/* Hero */}
      <section
        className='relative overflow-hidden pt-32 pb-24'
        style={{
          background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_2} 55%, ${BLUE} 160%)`,
        }}
      >
        {/* Decoración de fondo */}
        <div className='absolute inset-0 pointer-events-none'>
          <div
            className='absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full opacity-20 blur-3xl'
            style={{ background: BLUE }}
          />
          <div
            className='absolute bottom-0 -left-24 w-80 h-80 rounded-full opacity-10 blur-3xl'
            style={{ background: AMBER }}
          />
          <div
            className='absolute top-1/3 right-1/4 w-56 h-56 rounded-full border opacity-10'
            style={{ borderColor: BLUE_LIGHT }}
          />
        </div>

        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-14 items-center'>
            {/* Texto izquierda */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className='text-center lg:text-left'
            >
              <img
                src='/img/logo/nexum-logo.png'
                alt='NEXUM'
                className='h-9 mx-auto lg:mx-0 mb-6'
              />
              <div
                className='inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-5 border'
                style={{
                  background: "rgba(59,123,255,0.15)",
                  borderColor: "rgba(59,123,255,0.4)",
                  color: BLUE_LIGHT,
                }}
              >
                <FiZap size={12} /> TIMBRES DIGITALES / FOLIOS FISCALES
              </div>
              <h1 className='text-4xl sm:text-5xl font-black mb-5 text-white leading-tight'>
                Nunca vuelvas a quedarte
                <br />
                sin timbres{" "}
                <span style={{ color: AMBER }}>en cierre de mes.</span>
              </h1>
              <p className='text-base sm:text-lg text-white/65 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0'>
                Facturación electrónica en la nube, CFDI 4.0, respaldada por
                un contador certificado. Paquetes de timbrado sin
                mensualidad, sin vencimiento y con recarga inmediata.
              </p>

              <div className='flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-9'>
                <a
                  href={nexumWhatsapp}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-lg'
                  style={{
                    background: `linear-gradient(135deg, ${BLUE}, ${AMBER})`,
                  }}
                >
                  Empieza a facturar sin sustos <FiArrowRight size={16} />
                </a>
                <a
                  href='#paquetes'
                  className='px-7 py-4 rounded-2xl font-bold text-sm text-white border-2 transition-all duration-200 hover:bg-white/10 hover:scale-105'
                  style={{ borderColor: "rgba(59,123,255,0.5)" }}
                >
                  Ver paquetes
                </a>
              </div>

              {/* Badges de confianza */}
              <div className='flex flex-wrap items-center justify-center lg:justify-start gap-3'>
                {confianza.map((label) => (
                  <div
                    key={label}
                    className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border'
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderColor: "rgba(59,123,255,0.3)",
                      color: "white",
                    }}
                  >
                    <FiCheckCircle size={12} style={{ color: AMBER }} />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mockup de factura, derecha */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className='relative flex justify-center'
            >
              <div className='relative w-full max-w-sm'>
                {/* Anillo decorativo */}
                <div
                  className='absolute -inset-6 rounded-[2rem] border opacity-20'
                  style={{ borderColor: BLUE_LIGHT }}
                />

                {/* Tarjeta de folio */}
                <div
                  className='relative overflow-hidden rounded-3xl p-6 rotate-2'
                  style={{
                    background: "white",
                    boxShadow: "0 30px 70px rgba(10,17,40,0.5)",
                  }}
                >
                  {/* Marca de agua NEXUM, centrada */}
                  <img
                    src='/img/logo/nexum-logo.png'
                    alt=''
                    aria-hidden='true'
                    className='absolute top-1/2 left-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 opacity-[0.18] pointer-events-none select-none'
                  />

                  <div className='relative flex items-center justify-between mb-5'>
                    <img
                      src='/img/logo/nexum-logo.png'
                      alt='NEXUM'
                      className='h-4'
                    />
                    <span
                      className='px-2 py-1 rounded-md text-[10px] font-bold'
                      style={{ background: "#EAF0FF", color: BLUE }}
                    >
                      CFDI 4.0
                    </span>
                  </div>

                  <div className='relative flex items-center gap-3 mb-5'>
                    <div
                      className='w-11 h-11 rounded-xl flex items-center justify-center shrink-0'
                      style={{ background: "#EAF0FF" }}
                    >
                      <FiFileText size={20} style={{ color: BLUE }} />
                    </div>
                    <div className='flex-1'>
                      <div className='h-2.5 w-28 rounded-full bg-gray-200 mb-1.5' />
                      <div className='h-2 w-20 rounded-full bg-gray-100' />
                    </div>
                  </div>

                  <div className='relative space-y-2 mb-5'>
                    <div className='h-2 w-full rounded-full bg-gray-100' />
                    <div className='h-2 w-5/6 rounded-full bg-gray-100' />
                    <div className='h-2 w-2/3 rounded-full bg-gray-100' />
                  </div>

                  <div
                    className='relative flex items-center gap-2 rounded-xl px-3 py-2.5'
                    style={{ background: "rgba(37,211,102,0.1)" }}
                  >
                    <FiCheckCircle size={16} style={{ color: "#25D366" }} />
                    <span className='text-xs font-bold' style={{ color: "#0A8A3E" }}>
                      Factura timbrada correctamente
                    </span>
                  </div>
                </div>

                {/* Chip flotante: precio por timbre */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className='absolute -left-14 -top-12 flex items-center gap-2 rounded-2xl px-4 py-3 border'
                  style={{
                    background: NAVY_2,
                    borderColor: "rgba(245,166,35,0.4)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                  }}
                >
                  <FiDollarSign size={16} style={{ color: AMBER }} />
                  <div>
                    <p className='text-white text-sm font-black leading-none'>
                      Hasta $9
                    </p>
                    <p className='text-[10px] text-white/50'>por timbre</p>
                  </div>
                </motion.div>

                {/* Chip flotante: recarga instantánea */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className='absolute -right-6 -bottom-6 flex items-center gap-2 rounded-2xl px-4 py-3 border'
                  style={{
                    background: NAVY_2,
                    borderColor: "rgba(59,123,255,0.4)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                  }}
                >
                  <FiZap size={16} style={{ color: BLUE_LIGHT }} />
                  <p className='text-white text-xs font-bold'>
                    Recarga
                    <br />
                    instantánea
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* El dolor que ya conoces */}
      <section className='py-20 bg-white'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <p
            className='text-sm font-semibold uppercase tracking-widest mb-10 text-center'
            style={{ color: BLUE }}
          >
            El dolor que ya conoces
          </p>
          <div
            ref={doloresRef}
            className='grid grid-cols-1 md:grid-cols-3 gap-6'
          >
            {dolores.map((d, i) => (
              <motion.div
                key={d.numero}
                initial={{ y: 30, opacity: 0 }}
                animate={doloresInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className='rounded-2xl p-6'
                style={{ background: "#F4F6F9" }}
              >
                <div
                  className='w-9 h-9 rounded-lg flex items-center justify-center text-sm font-black text-white mb-4'
                  style={{ background: NAVY }}
                >
                  {d.numero}
                </div>
                <h3
                  className='text-base font-bold mb-2'
                  style={{ color: NAVY }}
                >
                  {d.titulo}
                </h3>
                <p className='text-sm leading-relaxed text-gray-500'>
                  {d.texto}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXUM lo resuelve de raíz */}
      <section className='py-20' style={{ background: NAVY }}>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-2xl sm:text-3xl font-black text-white mb-10 text-center'>
            NEXUM lo resuelve de raíz
          </h2>
          <div
            ref={solucionesRef}
            className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12'
          >
            {soluciones.map((s, i) => {
              const IconComp = solucionIconMap[s.icono];
              return (
              <motion.div
                key={s.titulo}
                initial={{ y: 20, opacity: 0 }}
                animate={solucionesInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className='flex items-start gap-4 rounded-2xl p-5 border'
                style={{
                  background: NAVY_2,
                  borderColor: "rgba(59,123,255,0.25)",
                }}
              >
                <div
                  className='shrink-0 w-11 h-11 rounded-xl flex items-center justify-center'
                  style={{ background: "rgba(59,123,255,0.15)" }}
                >
                  {IconComp && <IconComp size={18} style={{ color: BLUE_LIGHT }} />}
                </div>
                <div>
                  <h3 className='text-white font-bold text-sm mb-1'>
                    {s.titulo}
                  </h3>
                  <p className='text-white/60 text-sm leading-relaxed'>
                    {s.texto}
                  </p>
                </div>
              </motion.div>
              );
            })}
          </div>

          {/* Sello contador certificado */}
          <div
            className='flex flex-col sm:flex-row items-center gap-5 rounded-2xl p-6 border'
            style={{
              background: "rgba(59,123,255,0.1)",
              borderColor: "rgba(59,123,255,0.3)",
            }}
          >
            <div
              className='shrink-0 w-14 h-14 rounded-full flex items-center justify-center font-black text-sm'
              style={{ background: AMBER, color: NAVY }}
            >
              L.C.
            </div>
            <div className='text-center sm:text-left'>
              <p className='text-white font-bold text-base mb-1'>
                La diferencia NEXUM: respaldo de un contador certificado
              </p>
              <p className='text-white/65 text-sm leading-relaxed'>
                No es solo software. Detrás de NEXUM hay un despacho
                fiscal-contable que entiende tu operación, tus obligaciones y
                tus cierres. Facturas con la tranquilidad de saber que quien
                construyó el sistema factura todos los días, igual que tú.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Paquetes de precios */}
      <section id='paquetes' className='py-20 bg-white scroll-mt-20'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <p
              className='text-sm font-semibold uppercase tracking-widest mb-3'
              style={{ color: BLUE }}
            >
              Paquetes de timbres
            </p>
            <h2
              className='text-3xl sm:text-4xl font-black mb-4'
              style={{ color: NAVY }}
            >
              Elige el paquete a tu ritmo de facturación
            </h2>
            <p className='text-base max-w-xl mx-auto text-gray-500'>
              Sin mensualidad. Sin vencimiento. Solo pagas por los timbres que
              necesitas. Entre más volumen, mejor precio por folio.
            </p>
          </div>

          <div
            ref={preciosRef}
            className='grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch'
          >
            {paquetes.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ y: 30, opacity: 0 }}
                animate={preciosInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className='relative rounded-2xl p-7 flex flex-col border-2'
                style={{
                  borderColor: p.destacado ? BLUE : "#E5E7EB",
                  background: p.destacado ? "#F4F8FF" : "white",
                  boxShadow: p.destacado
                    ? "0 12px 40px rgba(22,86,245,0.15)"
                    : "0 2px 16px rgba(0,0,0,0.06)",
                }}
              >
                {p.badge && (
                  <span
                    className='absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap'
                    style={{ background: BLUE }}
                  >
                    {p.badge}
                  </span>
                )}
                <h3
                  className='text-lg font-bold mb-3'
                  style={{ color: NAVY }}
                >
                  {p.nombre}
                </h3>
                <div className='mb-1'>
                  <span
                    className='text-4xl font-black'
                    style={{ color: NAVY }}
                  >
                    ${p.precio}
                  </span>{" "}
                  <span className='text-sm text-gray-500'>MXN</span>
                </div>
                <p className='text-sm font-semibold mb-4' style={{ color: BLUE }}>
                  ${p.precioPorTimbre} por timbre · {p.timbres} timbres
                </p>
                <p className='text-sm text-gray-500 leading-relaxed mb-5'>
                  {p.descripcion}
                </p>
                <ul className='space-y-2.5 mb-6'>
                  {p.incluye.map((item) => (
                    <li
                      key={item}
                      className='flex items-center gap-2 text-sm'
                      style={{ color: "#4A4A4A" }}
                    >
                      <FiCheck
                        size={15}
                        style={{ color: BLUE, flexShrink: 0 }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                {p.ahorra && (
                  <p
                    className='text-xs font-bold mb-4'
                    style={{ color: AMBER }}
                  >
                    {p.ahorra}
                  </p>
                )}
                <a
                  href={nexumWhatsapp}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-auto inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-[1.02]'
                  style={{
                    background: p.destacado ? BLUE : "#F4F6F9",
                    color: p.destacado ? "white" : NAVY,
                  }}
                >
                  Quiero este paquete <FiArrowRight size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final + contacto */}
      <section className='py-20' style={{ background: NAVY }}>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-2xl sm:text-3xl font-black text-white mb-3'>
            Empieza a facturar sin sustos hoy mismo
          </h2>
          <p className='text-white/60 text-base mb-8'>
            Escríbenos "TIMBRES" y te armamos el paquete ideal según tu
            volumen mensual.
          </p>
          <a
            href={nexumWhatsapp}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-lg mb-10'
            style={{ background: "#25D366" }}
          >
            <FaWhatsapp size={20} />
            WhatsApp · {contactoNexum.whatsapp}
          </a>
          <div className='flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/60'>
            <span className='flex items-center gap-2'>
              <FiMail size={14} style={{ color: BLUE_LIGHT }} />
              {contactoNexum.correo}
            </span>
            <span className='flex items-center gap-2'>
              <FiMapPin size={14} style={{ color: BLUE_LIGHT }} />
              {contactoNexum.ubicacion}
            </span>
          </div>
        </div>
      </section>

      {/* Barra inferior */}
      <div
        className='py-4 text-center text-xs'
        style={{ background: NAVY_2, color: "rgba(255,255,255,0.4)" }}
      >
        NEXUM FISCAL — Sistema de facturación en la nube · Respaldado por
        Corporativo AA · Los Mochis, Sinaloa
      </div>
    </>
  );
}
