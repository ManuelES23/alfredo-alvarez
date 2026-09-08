# Calculadora de ISR + IVA RESICO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar una calculadora pública de ISR e IVA mensual de RESICO Persona Física en `/calculadora-isr`, integrada al sitio existente.

**Architecture:** Lógica de cálculo pura y sin dependencias en `src/utils/calculadoraResico.js` (verificada con `node:test`, el test runner nativo de Node — no se agrega ninguna dependencia nueva), consumida por una página React (`src/pages/CalculadoraISR.jsx`) que sigue el patrón visual de `ServiciosPage.jsx`. La página se integra a la navegación existente (ruta, Navbar, Footer).

**Tech Stack:** React 19, react-router-dom 7, Tailwind CSS 4, framer-motion, react-icons/fi, Node.js 22 (`node:test` + `node:assert/strict` para verificar la lógica de cálculo).

**Spec:** [docs/superpowers/specs/2026-09-07-calculadora-isr-design.md](../specs/2026-09-07-calculadora-isr-design.md)

## Global Constraints

- Calculadora de un solo mes: sin acumulado anual, sin control del límite de $3,500,000 RESICO.
- Sin captura de CFDI/bitácoras/PPD-REP, sin persistencia de datos (todo el cálculo ocurre en el cliente).
- Tasas y constantes exactas (fuente: hoja "Tabla ISR RESICO" y "Datos del Contribuyente" del Excel): tabla ISR mensual de 5 rangos (1.00%–2.50%), retención ISR persona moral 1.25%, retención IVA persona moral 10.6667% (`0.106667`), tasa general IVA 16%.
- Entradas vacías/negativas/no numéricas se tratan como 0, sin mensajes de error (igual que el Excel).
- Ningún resultado "a cargo" puede ser negativo (truncar en 0).
- Cálculo en vivo (sin botón "Calcular"): se recalcula en cada cambio de input.
- Paleta de marca obligatoria: `#0D2260` (azul oscuro), `#1A3A8F` (azul primario), `#00AEEF` (azul brillante), `#4A4A4A` (texto), `#F4F6F9` (gris claro) — definidos en `src/index.css`.
- Seguir el patrón visual y de código de `src/pages/ServiciosPage.jsx` (hero azul oscuro + sección blanca, `useSEO`, CTA final con `goToSection`).
- No se agrega ningún framework de testing nuevo (Vitest/Jest); la verificación de lógica usa `node:test`, ya incluido en Node 22.

---

### Task 1: Lógica de cálculo ISR/IVA RESICO

**Files:**
- Create: `src/utils/calculadoraResico.js`
- Test: `src/utils/calculadoraResico.test.js`

**Interfaces:**
- Consumes: nada (módulo puro, sin dependencias externas).
- Produces (usado por Task 2):
  - `TABLA_ISR_RESICO_MENSUAL`: `Array<{ limiteInferior: number, limiteSuperior: number, tasa: number }>`
  - `TASA_RETENCION_ISR_MORAL = 0.0125`
  - `TASA_RETENCION_IVA_MORAL = 0.106667`
  - `TASA_IVA = 0.16`
  - `obtenerTasaISR(ingresoMensual: number|string) => number`
  - `calcularISR({ ingresoMensual, esPersonaMoral }) => { tasa: number, isrCausado: number, isrRetenido: number, isrACargo: number }`
  - `calcularIVA({ ingresoMensual, esPersonaMoral, ivaAcreditable }) => { ivaTrasladado: number, ivaRetenido: number, ivaACargo: number }`

- [ ] **Step 1: Escribir el test que falla**

Crea `src/utils/calculadoraResico.test.js`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  obtenerTasaISR,
  calcularISR,
  calcularIVA,
} from "./calculadoraResico.js";

function cercaDe(actual, esperado, tolerancia = 0.01) {
  assert.ok(
    Math.abs(actual - esperado) < tolerancia,
    `esperado ~${esperado}, recibido ${actual}`
  );
}

test("obtenerTasaISR: ingreso vacío, cero o negativo da tasa 0", () => {
  assert.equal(obtenerTasaISR(""), 0);
  assert.equal(obtenerTasaISR(0), 0);
  assert.equal(obtenerTasaISR(-500), 0);
});

test("obtenerTasaISR: respeta los 5 rangos del Art. 113-E LISR", () => {
  assert.equal(obtenerTasaISR(25000), 0.01); // límite superior del rango 1
  assert.equal(obtenerTasaISR(25000.01), 0.011); // arranca rango 2
  assert.equal(obtenerTasaISR(50000), 0.011); // límite superior del rango 2
  assert.equal(obtenerTasaISR(50000.01), 0.015); // arranca rango 3
  assert.equal(obtenerTasaISR(83333.33), 0.015); // límite superior del rango 3
  assert.equal(obtenerTasaISR(83333.34), 0.02); // arranca rango 4
  assert.equal(obtenerTasaISR(208333.33), 0.02); // límite superior del rango 4
  assert.equal(obtenerTasaISR(208333.34), 0.025); // arranca rango 5
  assert.equal(obtenerTasaISR(5000000), 0.025); // por encima de la tabla, se queda en el último rango
});

test("calcularISR: caso Enero del papel de trabajo (35,000, sin retención)", () => {
  const r = calcularISR({ ingresoMensual: 35000, esPersonaMoral: false });
  assert.equal(r.tasa, 0.011);
  cercaDe(r.isrCausado, 385);
  assert.equal(r.isrRetenido, 0);
  cercaDe(r.isrACargo, 385);
});

test("calcularISR: caso Febrero del papel de trabajo (60,000, persona moral)", () => {
  const r = calcularISR({ ingresoMensual: 60000, esPersonaMoral: true });
  assert.equal(r.tasa, 0.015);
  cercaDe(r.isrCausado, 900);
  cercaDe(r.isrRetenido, 750);
  cercaDe(r.isrACargo, 150);
});

test("calcularISR: la retención nunca deja el ISR a cargo negativo", () => {
  const r = calcularISR({ ingresoMensual: 1000, esPersonaMoral: true });
  assert.ok(r.isrACargo >= 0);
});

test("calcularIVA: caso Enero del papel de trabajo (35,000, sin retención, sin acreditable)", () => {
  const r = calcularIVA({
    ingresoMensual: 35000,
    esPersonaMoral: false,
    ivaAcreditable: 0,
  });
  cercaDe(r.ivaTrasladado, 5600);
  assert.equal(r.ivaRetenido, 0);
  cercaDe(r.ivaACargo, 5600);
});

test("calcularIVA: caso Febrero del papel de trabajo (60,000, persona moral)", () => {
  const r = calcularIVA({
    ingresoMensual: 60000,
    esPersonaMoral: true,
    ivaAcreditable: 0,
  });
  cercaDe(r.ivaTrasladado, 9600);
  cercaDe(r.ivaRetenido, 6400.02);
  cercaDe(r.ivaACargo, 3199.98);
});

test("calcularIVA: el acreditable nunca deja el IVA a cargo negativo", () => {
  const r = calcularIVA({
    ingresoMensual: 10000,
    esPersonaMoral: false,
    ivaAcreditable: 999999,
  });
  assert.equal(r.ivaACargo, 0);
});

test("calcularISR y calcularIVA: entradas vacías o no numéricas se tratan como 0", () => {
  const isr = calcularISR({ ingresoMensual: "", esPersonaMoral: false });
  const iva = calcularIVA({
    ingresoMensual: "",
    esPersonaMoral: false,
    ivaAcreditable: "",
  });
  assert.deepEqual(isr, { tasa: 0, isrCausado: 0, isrRetenido: 0, isrACargo: 0 });
  assert.deepEqual(iva, { ivaTrasladado: 0, ivaRetenido: 0, ivaACargo: 0 });
});
```

- [ ] **Step 2: Ejecutar el test y verificar que falla**

Run: `node --test src/utils/calculadoraResico.test.js`
Expected: FAIL (error tipo "Cannot find module './calculadoraResico.js'").

- [ ] **Step 3: Implementar la lógica mínima**

Crea `src/utils/calculadoraResico.js`:

```js
// Lógica de cálculo de ISR e IVA mensual para RESICO Persona Física.
// Replica las fórmulas del papel de trabajo (hojas "Tabla ISR RESICO" y
// "Datos del Contribuyente"): Art. 113-E, 113-F LISR y Art. 1-A LIVA.

export const TABLA_ISR_RESICO_MENSUAL = [
  { limiteInferior: 0.01, limiteSuperior: 25000, tasa: 0.01 },
  { limiteInferior: 25000.01, limiteSuperior: 50000, tasa: 0.011 },
  { limiteInferior: 50000.01, limiteSuperior: 83333.33, tasa: 0.015 },
  { limiteInferior: 83333.34, limiteSuperior: 208333.33, tasa: 0.02 },
  { limiteInferior: 208333.34, limiteSuperior: 3500000, tasa: 0.025 },
];

export const TASA_RETENCION_ISR_MORAL = 0.0125; // Art. 113-F LISR
export const TASA_RETENCION_IVA_MORAL = 0.106667; // Art. 1-A LIVA (2/3 del IVA trasladado)
export const TASA_IVA = 0.16;

function aNumeroPositivo(valor) {
  const numero = Number(valor);
  if (!Number.isFinite(numero) || numero <= 0) return 0;
  return numero;
}

/**
 * Regresa la tasa de ISR mensual aplicable a un ingreso, según la tabla de
 * rangos del Art. 113-E LISR. Equivalente al INDEX/MATCH aproximado del
 * Excel: si el ingreso excede el último rango, se queda en la tasa más alta.
 */
export function obtenerTasaISR(ingresoMensual) {
  const ingreso = aNumeroPositivo(ingresoMensual);
  if (ingreso <= 0) return 0;

  let tasa = 0;
  for (const rango of TABLA_ISR_RESICO_MENSUAL) {
    if (ingreso >= rango.limiteInferior) {
      tasa = rango.tasa;
    } else {
      break;
    }
  }
  return tasa;
}

/**
 * Calcula el ISR mensual definitivo de RESICO.
 * @param {{ ingresoMensual: number|string, esPersonaMoral: boolean }} datos
 */
export function calcularISR({ ingresoMensual, esPersonaMoral }) {
  const ingreso = aNumeroPositivo(ingresoMensual);
  const tasa = obtenerTasaISR(ingreso);
  const isrCausado = ingreso * tasa;
  const isrRetenido = esPersonaMoral ? ingreso * TASA_RETENCION_ISR_MORAL : 0;
  const isrACargo = Math.max(isrCausado - isrRetenido, 0);
  return { tasa, isrCausado, isrRetenido, isrACargo };
}

/**
 * Calcula el IVA mensual de RESICO.
 * @param {{ ingresoMensual: number|string, esPersonaMoral: boolean, ivaAcreditable: number|string }} datos
 */
export function calcularIVA({ ingresoMensual, esPersonaMoral, ivaAcreditable }) {
  const ingreso = aNumeroPositivo(ingresoMensual);
  const acreditable = aNumeroPositivo(ivaAcreditable);
  const ivaTrasladado = ingreso * TASA_IVA;
  const ivaRetenido = esPersonaMoral ? ingreso * TASA_RETENCION_IVA_MORAL : 0;
  const ivaACargo = Math.max(ivaTrasladado - ivaRetenido - acreditable, 0);
  return { ivaTrasladado, ivaRetenido, ivaACargo };
}
```

- [ ] **Step 4: Ejecutar el test y verificar que pasa**

Run: `node --test src/utils/calculadoraResico.test.js`
Expected: PASS — todos los tests en verde (0 failing).

- [ ] **Step 5: Commit**

```bash
git add src/utils/calculadoraResico.js src/utils/calculadoraResico.test.js
git commit -m "feat: agrega lógica de cálculo ISR/IVA RESICO con tests

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: Página CalculadoraISR + ruta

**Files:**
- Create: `src/pages/CalculadoraISR.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `calcularISR`, `calcularIVA` de `../utils/calculadoraResico.js` (Task 1); `useSEO` de `../hooks/useSEO.js`; `goToSection` de `../utils/scrollNav.js`.
- Produces (usado por Task 3): componente `CalculadoraISR` exportado por default desde `src/pages/CalculadoraISR.jsx`, montado en la ruta `/calculadora-isr`.

- [ ] **Step 1: Crear la página**

Crea `src/pages/CalculadoraISR.jsx`:

```jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPercent, FiArrowRight, FiInfo } from "react-icons/fi";
import { useSEO } from "../hooks/useSEO";
import { goToSection } from "../utils/scrollNav";
import { calcularISR, calcularIVA } from "../utils/calculadoraResico";

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
                  {formatoMoneda.format(Number(ivaAcreditable) || 0)}
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
```

- [ ] **Step 2: Registrar la ruta en App.jsx**

En `src/App.jsx`, agrega el import junto a los demás (después de la línea `import CursoDetalle from "./pages/CursoDetalle";`):

```js
import CalculadoraISR from "./pages/CalculadoraISR";
```

Y agrega la ruta dentro de `<Routes>`, después de `<Route path='/cursos/:slug' element={<CursoDetalle />} />`:

```jsx
<Route path='/calculadora-isr' element={<CalculadoraISR />} />
```

- [ ] **Step 3: Verificar manualmente en el navegador**

Ejecuta `npm run dev`, abre `http://localhost:5173/calculadora-isr` y confirma:
- Ingreso `35000`, checkbox sin marcar, IVA acreditable vacío → ISR a cargo `$385.00`, IVA a cargo `$5,600.00` (caso Enero del Excel).
- Ingreso `60000`, checkbox marcado, IVA acreditable vacío → ISR a cargo `$150.00`, IVA a cargo `$3,199.98` (caso Febrero del Excel).
- Ingreso vacío → todos los montos en `$0.00`, sin errores en consola.

- [ ] **Step 4: Commit**

```bash
git add src/pages/CalculadoraISR.jsx src/App.jsx
git commit -m "feat: agrega página y ruta de la calculadora ISR/IVA RESICO

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: Enlace en el Navbar

**Files:**
- Modify: `src/components/Navbar.jsx:212-234` (menú desktop, después del link "Cursos")
- Modify: `src/components/Navbar.jsx:461-480` (menú mobile, después del link "Cursos")

**Interfaces:**
- Consumes: ruta `/calculadora-isr` (Task 2).
- Produces: nada consumido por otras tasks.

- [ ] **Step 1: Agregar el link en el menú desktop**

En `src/components/Navbar.jsx`, dentro del `<ul>` del menú desktop, inserta este bloque inmediatamente después del `<li>` que contiene el `<Link to='/cursos'>` (justo antes de `{links.slice(3).map((l) => (`):

```jsx
          <li>
            <Link
              to='/calculadora-isr'
              onClick={() => setOpen(false)}
              style={{
                padding: "8px 12px",
                fontSize: "14px",
                fontWeight: 500,
                color: scrolled ? "#4A4A4A" : "rgba(255,255,255,0.9)",
                textDecoration: "none",
                borderRadius: "8px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#00AEEF")}
              onMouseLeave={(e) =>
                (e.target.style.color = scrolled
                  ? "#4A4A4A"
                  : "rgba(255,255,255,0.9)")
              }
            >
              Calculadora ISR
            </Link>
          </li>
```

- [ ] **Step 2: Agregar el link en el menú mobile**

En el mismo archivo, dentro del bloque `{open && (...)}` del menú mobile, inserta este bloque inmediatamente después del `<Link to='/cursos'>` (justo antes de `{links.slice(3).map((l) => (`):

```jsx
          <Link
            to='/calculadora-isr'
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              padding: "14px 16px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#4A4A4A",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F4F6F9")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            Calculadora ISR
          </Link>
```

- [ ] **Step 3: Verificar manualmente en el navegador**

Con `npm run dev` corriendo:
- En viewport desktop (>= 1024px), confirma que "Calculadora ISR" aparece en el menú horizontal entre "Cursos" y "Contacto", y que al hacer clic navega a `/calculadora-isr`.
- En viewport mobile (< 1024px), abre el menú hamburguesa y confirma que "Calculadora ISR" aparece entre "Cursos" y "Contacto", y que al hacer clic navega y cierra el menú.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: agrega link de Calculadora ISR al navbar

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: Enlace en el Footer

**Files:**
- Modify: `src/components/Footer.jsx:143-160`

**Interfaces:**
- Consumes: ruta `/calculadora-isr` (Task 2); `Link` de `react-router-dom` (ya importado en el archivo).
- Produces: nada consumido por otras tasks.

El Footer ya tiene el texto "Calculadora ISR" listado como uno de los ítems de la columna "Recursos" (en la constante `columnas`), pero se renderiza como un `<a href='#'>` sin destino real, igual que el resto de los ítems placeholder de esa columna. Esta task lo convierte en un link real a `/calculadora-isr`, sin tocar los demás ítems (que siguen siendo placeholders intencionales).

- [ ] **Step 1: Reemplazar el renderizado de la columna Recursos**

En `src/components/Footer.jsx`, reemplaza este bloque:

```jsx
          {/* Columnas de links */}
          {Object.entries(columnas).map(([titulo, items]) => (
            <div key={titulo}>
              <h4 className='text-white font-bold text-sm mb-4'>{titulo}</h4>
              <ul className='space-y-2'>
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href='#'
                      className='text-xs transition-colors hover:text-azul-brillante'
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
```

por:

```jsx
          {/* Columnas de links */}
          {Object.entries(columnas).map(([titulo, items]) => (
            <div key={titulo}>
              <h4 className='text-white font-bold text-sm mb-4'>{titulo}</h4>
              <ul className='space-y-2'>
                {items.map((item) =>
                  item === "Calculadora ISR" ? (
                    <li key={item}>
                      <Link
                        to='/calculadora-isr'
                        className='text-xs transition-colors hover:text-azul-brillante'
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {item}
                      </Link>
                    </li>
                  ) : (
                    <li key={item}>
                      <a
                        href='#'
                        className='text-xs transition-colors hover:text-azul-brillante'
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
```

- [ ] **Step 2: Verificar manualmente en el navegador**

Con `npm run dev` corriendo, baja hasta el Footer en cualquier página, confirma que "Calculadora ISR" (columna "Recursos") es un link real y que al hacer clic navega a `/calculadora-isr`; confirma que los demás ítems de "Recursos" y "Redes" siguen siendo `<a href='#'>` sin cambios visuales.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: enlaza Calculadora ISR del footer a /calculadora-isr

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```
