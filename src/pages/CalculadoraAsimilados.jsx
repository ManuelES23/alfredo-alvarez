import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiInfo } from "react-icons/fi";
import { useSEO } from "../hooks/useSEO";
import { goToSection } from "../utils/scrollNav";
import {
  PERIODOS,
  calcularBrutoANeto,
  calcularNetoABruto,
} from "../utils/calculadoraAsimilados";

const formatoMonto = new Intl.NumberFormat("es-MX", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatoMoneda = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

const estiloCampo = {
  background: "#F4F6F9",
  borderColor: "#E2E8F0",
  color: "#0D2260",
};

function Renglon({ operador, concepto, monto, destacado = false }) {
  return (
    <div
      className={`flex items-baseline gap-3 ${destacado ? "border-t pt-3" : ""}`}
      style={destacado ? { borderColor: "#E2E8F0" } : undefined}
    >
      <span
        className='w-4 shrink-0 text-center font-semibold'
        style={{ color: "#00AEEF" }}
      >
        {operador}
      </span>
      <dt
        className={`flex-1 ${destacado ? "font-bold" : ""}`}
        style={{ color: destacado ? "#0D2260" : "#4A4A4A" }}
      >
        {concepto}
      </dt>
      <dd
        className={destacado ? "font-bold" : "font-semibold"}
        style={{ color: "#0D2260" }}
      >
        {monto}
      </dd>
    </div>
  );
}

export default function CalculadoraAsimilados() {
  const location = useLocation();
  const navigate = useNavigate();

  useSEO({
    title: "Calculadora de Asimilados a Salarios 2026 | Alfredo Álvarez Contador",
    description:
      "Calcula el ISR y el ingreso neto de asimilados a salarios con la tarifa 2026 del Art. 96 LISR, o cuánto pagar en bruto para que llegue el neto que buscas.",
    path: "/calculadora-asimilados",
  });

  const [ingreso, setIngreso] = useState("");
  const [periodo, setPeriodo] = useState("mensual");
  const [conSubsidio, setConSubsidio] = useState(false);
  const [modo, setModo] = useState("brutoANeto");

  const datos = { ingreso, periodo, conSubsidio };
  const r =
    modo === "brutoANeto" ? calcularBrutoANeto(datos) : calcularNetoABruto(datos);

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
            Calculadora de
            <br />
            <span style={{ color: "#00AEEF" }}>Asimilados a Salarios 2026</span>
          </h1>
          <p
            className='mt-4 text-base max-w-2xl mx-auto'
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Descubre cuánto ISR se retiene y cuánto recibes en neto, o cuánto
            hay que pagar en bruto para que te llegue la cantidad que buscas.
          </p>
        </div>
      </section>

      {/* Calculadora */}
      <section className='py-20 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 grid-cols-1 lg:grid-cols-2 items-start'>
          {/* Formulario */}
          <div
            className='rounded-2xl p-6 sm:p-8'
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}
          >
            <h2 className='text-lg font-bold mb-6' style={{ color: "#0D2260" }}>
              Datos del pago
            </h2>

            <div
              className='grid grid-cols-2 gap-2 p-1 rounded-xl mb-5'
              style={{ background: "#F4F6F9" }}
              role='radiogroup'
              aria-label='Tipo de cálculo'
            >
              {[
                { valor: "brutoANeto", etiqueta: "Bruto → Neto" },
                { valor: "netoABruto", etiqueta: "Neto → Bruto" },
              ].map((opcion) => (
                <button
                  key={opcion.valor}
                  type='button'
                  role='radio'
                  aria-checked={modo === opcion.valor}
                  onClick={() => setModo(opcion.valor)}
                  className='py-2 rounded-lg text-sm font-semibold transition-all'
                  style={
                    modo === opcion.valor
                      ? { background: "#0D2260", color: "#FFFFFF" }
                      : { background: "transparent", color: "#4A4A4A" }
                  }
                >
                  {opcion.etiqueta}
                </button>
              ))}
            </div>

            <label
              htmlFor='ingreso'
              className='text-xs font-semibold block mb-1'
              style={{ color: "#4A4A4A" }}
            >
              {modo === "brutoANeto"
                ? "Ingreso bruto"
                : "Ingreso neto que quieres recibir"}
            </label>
            <div className='flex gap-2 mb-5'>
              <input
                id='ingreso'
                type='number'
                min='0'
                inputMode='decimal'
                placeholder='Ej. 15000'
                value={ingreso}
                onChange={(e) => setIngreso(e.target.value)}
                className='flex-1 min-w-0 px-4 py-3 rounded-xl text-sm outline-none transition-all border'
                style={estiloCampo}
              />
              <select
                aria-label='Periodo de pago'
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className='px-3 py-3 rounded-xl text-sm outline-none border'
                style={estiloCampo}
              >
                {Object.entries(PERIODOS).map(([valor, { etiqueta }]) => (
                  <option key={valor} value={valor}>
                    {etiqueta}
                  </option>
                ))}
              </select>
            </div>

            <label className='flex items-start gap-3 cursor-pointer select-none'>
              <input
                type='checkbox'
                checked={conSubsidio}
                onChange={(e) => setConSubsidio(e.target.checked)}
                className='w-5 h-5 mt-0.5 shrink-0 accent-[#00AEEF]'
              />
              <span className='text-sm' style={{ color: "#4A4A4A" }}>
                Incluir subsidio para el empleo
                <span className='block text-xs mt-1' style={{ color: "#8A8A8A" }}>
                  Aplica a sueldos y salarios con ingresos de hasta $11,492.66
                  al mes, no a asimilados. Solo reduce el ISR; nunca se paga en
                  efectivo.
                </span>
              </span>
            </label>
          </div>

          {/* Resultado */}
          <motion.div
            key={`${modo}-${ingreso}-${periodo}-${conSubsidio}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='rounded-2xl p-6 sm:p-8'
            style={{ background: "#F4F6F9" }}
          >
            <h2 className='text-lg font-bold mb-6' style={{ color: "#0D2260" }}>
              Desglose del ISR
            </h2>

            <dl className='space-y-3 text-sm'>
              <Renglon concepto='Ingreso bruto' monto={formatoMonto.format(r.bruto)} />
              <Renglon
                operador='−'
                concepto='Límite inferior'
                monto={formatoMonto.format(r.limiteInferior)}
              />
              <Renglon
                operador='='
                concepto='Excedente del límite inferior'
                monto={formatoMonto.format(r.excedente)}
              />
              <Renglon
                operador='×'
                concepto='% sobre excedente'
                monto={`${formatoMonto.format(r.tasa * 100)}%`}
              />
              <Renglon
                operador='='
                concepto='Impuesto marginal'
                monto={formatoMonto.format(r.impuestoMarginal)}
              />
              <Renglon
                operador='+'
                concepto='Cuota fija'
                monto={formatoMonto.format(r.cuotaFija)}
              />
              <Renglon
                operador='='
                concepto='ISR determinado'
                monto={formatoMonto.format(r.isrDeterminado)}
                destacado
              />
              {conSubsidio && (
                <>
                  <Renglon
                    operador='−'
                    concepto='Subsidio para el empleo'
                    monto={formatoMonto.format(r.subsidio)}
                  />
                  <Renglon
                    operador='='
                    concepto='ISR a retener'
                    monto={formatoMonto.format(r.isrARetener)}
                    destacado
                  />
                </>
              )}
            </dl>

            <div
              className='mt-6 rounded-xl p-4 text-center'
              style={{ background: "linear-gradient(135deg, #1A3A8F, #00AEEF)" }}
            >
              <p className='text-xs font-semibold text-white/80 uppercase tracking-wide'>
                {modo === "brutoANeto"
                  ? `Ingreso neto ${PERIODOS[periodo].etiqueta}`
                  : `Ingreso bruto a pagar (${PERIODOS[periodo].etiqueta})`}
              </p>
              <p className='text-2xl font-black text-white'>
                {formatoMoneda.format(modo === "brutoANeto" ? r.neto : r.bruto)}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8'>
          <p
            className='flex items-start gap-2 text-xs leading-relaxed'
            style={{ color: "#8A8A8A" }}
          >
            <FiInfo className='shrink-0 mt-0.5' />
            Esta calculadora es una estimación de apoyo con fines
            informativos, basada en la tarifa mensual del Art. 96 LISR (Anexo
            8 de la RMF 2026) y en el decreto del subsidio para el empleo
            vigente. Para periodos distintos al mensual, la tarifa se ajusta a
            los días del periodo entre 30.4. No incluye cuotas del IMSS ni el
            cálculo anual. No sustituye una asesoría fiscal personalizada.
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
