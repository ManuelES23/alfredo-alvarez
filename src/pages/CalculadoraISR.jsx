import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPercent, FiArrowRight, FiInfo } from "react-icons/fi";
import { useSEO } from "../hooks/useSEO";
import { goToSection } from "../utils/scrollNav";
import { calcularISR, calcularIVA, aNumeroPositivo } from "../utils/calculadoraResico";

const formatoMoneda = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

function formatoPorcentaje(tasa) {
  return `${(tasa * 100).toLocaleString("es-MX", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  })}%`;
}

export default function CalculadoraISR() {
  const location = useLocation();
  const navigate = useNavigate();

  useSEO({
    title: "Calculadora de ISR e IVA RESICO 2026 | Alfredo Álvarez Contador",
    description:
      "Calcula en segundos el ISR e IVA mensual que debes pagar en RESICO como persona física, según las tasas vigentes del Art. 113-E LISR.",
    path: "/calculadora-isr",
  });

  const [ingresoMensual, setIngresoMensual] = useState("");
  const [esPersonaMoral, setEsPersonaMoral] = useState(false);
  const [ivaAcreditable, setIvaAcreditable] = useState("");

  const isr = calcularISR({ ingresoMensual, esPersonaMoral });
  const iva = calcularIVA({ ingresoMensual, esPersonaMoral, ivaAcreditable });
  const totalAPagar = isr.isrACargo + iva.ivaACargo;

  return (
    <>
      {/* Encabezado */}
      <section className='pt-36 pb-16' style={{ background: "#0D2260" }}>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <p
            className='text-sm font-semibold uppercase tracking-widest mb-3'
            style={{ color: "#00AEEF" }}
          >
            Herramienta gratuita
          </p>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black mb-4 text-white'>
            Calculadora de ISR e IVA
            <br />
            <span style={{ color: "#00AEEF" }}>RESICO Persona Física</span>
          </h1>
          <p
            className='mt-4 text-base max-w-2xl mx-auto'
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Captura tu ingreso del mes y descubre cuánto ISR e IVA te
            corresponde pagar bajo el Régimen Simplificado de Confianza.
          </p>
        </div>
      </section>

      {/* Calculadora */}
      <section className='py-20 bg-white'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2 items-start'>
          {/* Formulario */}
          <div
            className='rounded-2xl p-6 sm:p-8'
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}
          >
            <h2 className='text-lg font-bold mb-6' style={{ color: "#0D2260" }}>
              Datos del mes
            </h2>

            <label
              className='text-xs font-semibold block mb-1'
              style={{ color: "#4A4A4A" }}
            >
              Ingreso cobrado en el mes (sin IVA)
            </label>
            <input
              type='number'
              min='0'
              inputMode='decimal'
              placeholder='Ej. 35000'
              value={ingresoMensual}
              onChange={(e) => setIngresoMensual(e.target.value)}
              className='w-full px-4 py-3 rounded-xl text-sm outline-none transition-all border mb-5'
              style={{
                background: "#F4F6F9",
                borderColor: "#E2E8F0",
                color: "#0D2260",
              }}
            />

            <label className='flex items-center gap-3 mb-5 cursor-pointer select-none'>
              <input
                type='checkbox'
                checked={esPersonaMoral}
                onChange={(e) => setEsPersonaMoral(e.target.checked)}
                className='w-5 h-5 accent-[#00AEEF]'
              />
              <span className='text-sm' style={{ color: "#4A4A4A" }}>
                ¿Quién te pagó es una persona moral (empresa)?
              </span>
            </label>

            <label
              className='text-xs font-semibold block mb-1'
              style={{ color: "#4A4A4A" }}
            >
              IVA acreditable de tus gastos del mes
            </label>
            <input
              type='number'
              min='0'
              inputMode='decimal'
              placeholder='Ej. 3200'
              value={ivaAcreditable}
              onChange={(e) => setIvaAcreditable(e.target.value)}
              className='w-full px-4 py-3 rounded-xl text-sm outline-none transition-all border'
              style={{
                background: "#F4F6F9",
                borderColor: "#E2E8F0",
                color: "#0D2260",
              }}
            />
          </div>

          {/* Resultado */}
          <motion.div
            key={`${ingresoMensual}-${esPersonaMoral}-${ivaAcreditable}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='rounded-2xl p-6 sm:p-8'
            style={{ background: "#F4F6F9" }}
          >
            <div className='flex items-center gap-2 mb-6'>
              <FiPercent style={{ color: "#00AEEF" }} />
              <h2 className='text-lg font-bold' style={{ color: "#0D2260" }}>
                Tasa aplicable: {formatoPorcentaje(isr.tasa)}
              </h2>
            </div>

            <dl className='space-y-3 text-sm'>
              <div className='flex justify-between'>
                <dt style={{ color: "#4A4A4A" }}>ISR causado</dt>
                <dd className='font-semibold' style={{ color: "#0D2260" }}>
                  {formatoMoneda.format(isr.isrCausado)}
                </dd>
              </div>
              <div className='flex justify-between'>
                <dt style={{ color: "#4A4A4A" }}>ISR retenido (1.25%)</dt>
                <dd className='font-semibold' style={{ color: "#0D2260" }}>
                  {formatoMoneda.format(isr.isrRetenido)}
                </dd>
              </div>
              <div
                className='flex justify-between border-t pt-3'
                style={{ borderColor: "#E2E8F0" }}
              >
                <dt className='font-bold' style={{ color: "#0D2260" }}>
                  ISR a cargo
                </dt>
                <dd className='font-bold' style={{ color: "#0D2260" }}>
                  {formatoMoneda.format(isr.isrACargo)}
                </dd>
              </div>

              <div className='flex justify-between pt-4'>
                <dt style={{ color: "#4A4A4A" }}>IVA trasladado (16%)</dt>
                <dd className='font-semibold' style={{ color: "#0D2260" }}>
                  {formatoMoneda.format(iva.ivaTrasladado)}
                </dd>
              </div>
              <div className='flex justify-between'>
                <dt style={{ color: "#4A4A4A" }}>IVA retenido (10.6667%)</dt>
                <dd className='font-semibold' style={{ color: "#0D2260" }}>
                  {formatoMoneda.format(iva.ivaRetenido)}
                </dd>
              </div>
              <div className='flex justify-between'>
                <dt style={{ color: "#4A4A4A" }}>IVA acreditable</dt>
                <dd className='font-semibold' style={{ color: "#0D2260" }}>
                  {formatoMoneda.format(aNumeroPositivo(ivaAcreditable))}
                </dd>
              </div>
              <div
                className='flex justify-between border-t pt-3'
                style={{ borderColor: "#E2E8F0" }}
              >
                <dt className='font-bold' style={{ color: "#0D2260" }}>
                  IVA a cargo
                </dt>
                <dd className='font-bold' style={{ color: "#0D2260" }}>
                  {formatoMoneda.format(iva.ivaACargo)}
                </dd>
              </div>
            </dl>

            <div
              className='mt-6 rounded-xl p-4 text-center'
              style={{ background: "linear-gradient(135deg, #1A3A8F, #00AEEF)" }}
            >
              <p className='text-xs font-semibold text-white/80 uppercase tracking-wide'>
                Total estimado a pagar este mes
              </p>
              <p className='text-2xl font-black text-white'>
                {formatoMoneda.format(totalAPagar)}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8'>
          <p
            className='flex items-start gap-2 text-xs leading-relaxed'
            style={{ color: "#8A8A8A" }}
          >
            <FiInfo className='shrink-0 mt-0.5' />
            Esta calculadora es una estimación de apoyo con fines
            informativos, basada en las tasas vigentes del Art. 113-E, 113-F
            LISR y Art. 1-A LIVA. No sustituye una asesoría fiscal
            personalizada; verifica siempre la vigencia de tasas y límites
            con tu contador antes de presentar cualquier declaración.
          </p>
        </div>

        {/* CTA final */}
        <div className='text-center mt-10'>
          <a
            href='#contacto'
            onClick={(e) => {
              e.preventDefault();
              goToSection(navigate, location.pathname, "contacto");
            }}
            className='inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-lg'
            style={{ background: "linear-gradient(135deg, #1A3A8F, #00AEEF)" }}
          >
            Agendar consulta gratuita
            <FiArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
