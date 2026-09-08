# Calculadora de ISR + IVA RESICO — Diseño

## Contexto

El sitio de Alfredo Álvarez (React 19 + Vite + Tailwind + react-router-dom) no
tiene hoy ninguna herramienta interactiva. El usuario compartió un papel de
trabajo en Excel ("Papel de Trabajo - RESICO Persona Física 2026.xlsx") que
automatiza el cálculo mensual de ISR e IVA para personas físicas en el
Régimen Simplificado de Confianza (RESICO), y pidió llevar ese cálculo a una
calculadora pública en la página web, como herramienta de marketing /
lead magnet (no como sistema de control fiscal para el despacho).

Fuente normativa replicada del Excel:
- Art. 113-E LISR — tabla de tasas de pagos mensuales definitivos de ISR
  (1.00% a 2.50%), sin deducción alguna, sobre el ingreso efectivamente
  cobrado del mes.
- Art. 113-F LISR — retención de ISR del 1.25% que deben efectuar las
  personas morales sobre el pago sin IVA, acreditable contra el pago mensual.
- Art. 1-A y 5 LIVA — retención de IVA por personas morales del 10.6667%
  (2/3 partes del IVA trasladado).
- Tasa general de IVA: 16%.

## Alcance

Calculadora de **un solo mes** (no acumula ejercicio, no controla el límite
anual de $3,500,000 de RESICO — eso queda fuera de alcance). Cubre **ISR e
IVA** del mismo mes, no solo ISR.

Fuera de alcance explícito:
- Captura de CFDI, bitácoras, PPD/REP, conciliaciones.
- Acumulado anual / verificación de límite RESICO.
- Persistencia de datos (no hay backend; todo es cálculo en el cliente).
- Tests automatizados (el repo no tiene test runner configurado).

## Componentes

### 1. `src/utils/calculadoraResico.js` (lógica pura, sin React)

Constante con la tabla de tasas mensuales (idéntica a la hoja "Tabla ISR
RESICO", filas 5-9):

```js
export const TABLA_ISR_RESICO_MENSUAL = [
  { limiteInferior: 0.01, limiteSuperior: 25000, tasa: 0.01 },
  { limiteInferior: 25000.01, limiteSuperior: 50000, tasa: 0.011 },
  { limiteInferior: 50000.01, limiteSuperior: 83333.33, tasa: 0.015 },
  { limiteInferior: 83333.34, limiteSuperior: 208333.33, tasa: 0.02 },
  { limiteInferior: 208333.34, limiteSuperior: 3500000, tasa: 0.025 },
];

export const TASA_RETENCION_ISR_MORAL = 0.0125; // Art. 113-F LISR
export const TASA_RETENCION_IVA_MORAL = 0.106667; // Art. 1-A LIVA (2/3 del IVA)
export const TASA_IVA = 0.16;
```

Funciones exportadas:

- `obtenerTasaISR(ingresoMensual)` → recorre la tabla y regresa la tasa del
  rango donde cae `ingresoMensual` (equivalente al `INDEX/MATCH` del Excel,
  usando `>=` sobre `limiteInferior` como el `MATCH` aproximado). Regresa 0
  si `ingresoMensual <= 0`.
- `calcularISR({ ingresoMensual, esPersonaMoral })` → objeto:
  `{ tasa, isrCausado, isrRetenido, isrACargo }`.
  - `isrCausado = ingresoMensual * tasa`
  - `isrRetenido = esPersonaMoral ? ingresoMensual * TASA_RETENCION_ISR_MORAL : 0`
  - `isrACargo = Math.max(isrCausado - isrRetenido, 0)`
- `calcularIVA({ ingresoMensual, esPersonaMoral, ivaAcreditable })` → objeto:
  `{ ivaTrasladado, ivaRetenido, ivaACargo }`.
  - `ivaTrasladado = ingresoMensual * TASA_IVA`
  - `ivaRetenido = esPersonaMoral ? ingresoMensual * TASA_RETENCION_IVA_MORAL : 0`
  - `ivaACargo = Math.max(ivaTrasladado - ivaRetenido - (ivaAcreditable || 0), 0)`

Todas las funciones tratan entradas vacías/negativas/no numéricas como 0
(mismo comportamiento que `IF(B4<=0,0,...)` en el Excel).

**Casos de verificación manual** (tomados directamente de la hoja "Cálculo
ISR Mensual" / "Cálculo IVA Mensual" del Excel, con datos de ejemplo):

| Mes | Ingreso | ¿Persona moral? | ISR causado | ISR retenido | ISR a cargo | IVA trasladado | IVA retenido |
|---|---|---|---|---|---|---|---|
| Ene | 35,000 | No | 385 | 0 | 385 | 5,600 | 0 |
| Feb | 60,000 | Sí | 900 | 750 | 150 | 9,600 | 6,400.02 |

### 2. `src/pages/CalculadoraISR.jsx`

Sigue el patrón visual de `ServiciosPage.jsx`:

- Hero: fondo `#0D2260`, texto blanco, acento `#00AEEF`, título tipo
  "Calculadora de ISR e IVA — RESICO Persona Física".
- Formulario controlado (estado local `useState`):
  - `ingresoMensual` (input numérico).
  - `esPersonaMoral` (toggle/checkbox "¿Quién te pagó es una persona moral
    (empresa)?").
  - `ivaAcreditable` (input numérico, "IVA acreditable de tus gastos del
    mes").
- Cálculo **en vivo**: cada cambio de input recalcula con
  `calcularISR`/`calcularIVA` (sin botón "Calcular"; se siente como
  calculadora, no como formulario que se envía).
- Resultado: tarjeta con desglose (tasa aplicable, ISR causado/retenido/a
  cargo, IVA trasladado/retenido/acreditable/a cargo) + un total combinado
  destacado "Total estimado a pagar este mes" (ISR a cargo + IVA a cargo).
- `useSEO` con título/descripción propios y `path: "/calculadora-isr"`.
- Disclaimer bajo el resultado (tono de la hoja "Portada" del Excel):
  estimación de apoyo, no sustituye asesoría fiscal, verificar vigencia de
  tasas.
- CTA final "Agendar consulta gratuita" usando
  `goToSection(navigate, location.pathname, "contacto")`, igual que en
  `ServiciosPage.jsx`.

### 3. Integración al sitio

- `App.jsx`: nueva `<Route path='/calculadora-isr' element={<CalculadoraISR />} />`.
- `Navbar.jsx`: nuevo link "Calculadora ISR" en el menú desktop y en el
  menú mobile, junto a los links existentes de Servicios/Nexum
  Fiscal/Blog/Cursos.
- `Footer.jsx`: nuevo link en la sección de enlaces correspondiente.

## Manejo de casos límite

- Ingreso vacío, 0 o negativo → todos los resultados en 0, sin mensaje de
  error (igual que el Excel).
- IVA a cargo nunca negativo (se trunca en 0 con `Math.max`).
- No se valida ni se advierte sobre el límite anual de RESICO
  ($3,500,000) — está fuera de alcance de esta calculadora mensual.
- Inputs no numéricos se tratan como 0 (no se bloquea la escritura, pero
  el cálculo ignora valores inválidos).

## Testing

El repo no tiene test runner configurado (no hay Vitest/Jest en
`package.json`). La verificación será manual:

1. Correr `npm run dev` / previsualizar la página.
2. Capturar los dos casos de la tabla de verificación manual (Ene y Feb)
   y confirmar que la calculadora arroja los mismos montos que el Excel.
3. Probar casos límite: ingreso vacío, ingreso 0, ingreso negativo, cada
   rango de la tabla de tasas (25,000 / 50,000 / 83,333.33 / 208,333.33 y
   un valor por encima).
