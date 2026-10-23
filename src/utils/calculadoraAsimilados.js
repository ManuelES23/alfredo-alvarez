// Lógica de cálculo de ISR para asimilados a salarios (y sueldos).
// Tarifa mensual del Art. 96 LISR publicada en el Anexo 8 de la RMF 2026 y
// subsidio para el empleo según el decreto del DOF del 31-12-2025.

import { aNumeroPositivo } from "./calculadoraResico.js";

export const TARIFA_ISR_MENSUAL_2026 = [
  { limiteInferior: 0.01, cuotaFija: 0, tasa: 0.0192 },
  { limiteInferior: 844.6, cuotaFija: 16.22, tasa: 0.064 },
  { limiteInferior: 7168.52, cuotaFija: 420.95, tasa: 0.1088 },
  { limiteInferior: 12598.03, cuotaFija: 1011.68, tasa: 0.16 },
  { limiteInferior: 14644.65, cuotaFija: 1339.14, tasa: 0.1792 },
  { limiteInferior: 17533.65, cuotaFija: 1856.84, tasa: 0.2136 },
  { limiteInferior: 35362.84, cuotaFija: 5665.16, tasa: 0.2352 },
  { limiteInferior: 55736.69, cuotaFija: 10457.09, tasa: 0.3 },
  { limiteInferior: 106410.51, cuotaFija: 25659.23, tasa: 0.32 },
  { limiteInferior: 141880.67, cuotaFija: 37009.69, tasa: 0.34 },
  { limiteInferior: 425642.0, cuotaFija: 133488.54, tasa: 0.35 },
];

// 15.02% de la UMA mensual 2026 ($3,566.22), vigente de febrero a diciembre.
export const SUBSIDIO_EMPLEO_MENSUAL_2026 = 535.65;
export const LIMITE_INGRESO_SUBSIDIO_MENSUAL_2026 = 11492.66;

// Días de cada periodo de pago; un mes equivale a 30.4 días (Art. 96 LISR).
export const PERIODOS = {
  diario: { etiqueta: "diario", dias: 1 },
  semanal: { etiqueta: "semanal", dias: 7 },
  decenal: { etiqueta: "decenal", dias: 10 },
  quincenal: { etiqueta: "quincenal", dias: 15 },
  mensual: { etiqueta: "mensual", dias: 30.4 },
};

function factorDelPeriodo(periodo) {
  return (PERIODOS[periodo] ?? PERIODOS.mensual).dias / 30.4;
}

function resultadoVacio() {
  return {
    bruto: 0,
    limiteInferior: 0,
    excedente: 0,
    tasa: 0,
    impuestoMarginal: 0,
    cuotaFija: 0,
    isrDeterminado: 0,
    subsidio: 0,
    isrARetener: 0,
    neto: 0,
  };
}

/**
 * Calcula el ISR y el ingreso neto a partir del ingreso bruto del periodo.
 * La tarifa y el subsidio mensuales se escalan a días / 30.4 para periodos
 * distintos al mensual. El subsidio solo reduce el ISR: si es mayor, la
 * diferencia no se entrega en efectivo.
 * @param {{ ingreso: number|string, periodo: string, conSubsidio: boolean }} datos
 */
export function calcularBrutoANeto({ ingreso, periodo, conSubsidio }) {
  const bruto = aNumeroPositivo(ingreso);
  if (bruto <= 0) return resultadoVacio();

  const factor = factorDelPeriodo(periodo);
  const brutoMensual = bruto / factor;

  let renglon = TARIFA_ISR_MENSUAL_2026[0];
  for (const r of TARIFA_ISR_MENSUAL_2026) {
    if (brutoMensual >= r.limiteInferior) renglon = r;
    else break;
  }

  const limiteInferior = renglon.limiteInferior * factor;
  const cuotaFija = renglon.cuotaFija * factor;
  const excedente = bruto - limiteInferior;
  const impuestoMarginal = excedente * renglon.tasa;
  const isrDeterminado = impuestoMarginal + cuotaFija;

  const aplicaSubsidio =
    conSubsidio && brutoMensual <= LIMITE_INGRESO_SUBSIDIO_MENSUAL_2026;
  const subsidio = aplicaSubsidio
    ? Math.min(SUBSIDIO_EMPLEO_MENSUAL_2026 * factor, isrDeterminado)
    : 0;
  const isrARetener = isrDeterminado - subsidio;

  return {
    bruto,
    limiteInferior,
    excedente,
    tasa: renglon.tasa,
    impuestoMarginal,
    cuotaFija,
    isrDeterminado,
    subsidio,
    isrARetener,
    neto: bruto - isrARetener,
  };
}

// Busca por bisección el bruto en [bajo, alto] cuyo neto es el deseado.
// Requiere que el neto crezca de forma continua dentro del intervalo.
function buscarBruto(netoDeseado, bajo, alto, calcularNeto) {
  for (let i = 0; i < 100; i++) {
    const medio = (bajo + alto) / 2;
    if (calcularNeto(medio) < netoDeseado) bajo = medio;
    else alto = medio;
  }
  return alto;
}

/**
 * Calcula el ingreso bruto que hay que pagar para que el trabajador reciba
 * el neto indicado, y regresa el mismo desglose que calcularBrutoANeto.
 * @param {{ ingreso: number|string, periodo: string, conSubsidio: boolean }} datos
 */
export function calcularNetoABruto({ ingreso, periodo, conSubsidio }) {
  const netoDeseado = aNumeroPositivo(ingreso);
  if (netoDeseado <= 0) return resultadoVacio();

  const netoDe = (bruto, subsidio) =>
    calcularBrutoANeto({ ingreso: bruto, periodo, conSubsidio: subsidio }).neto;

  // Al rebasar el límite del subsidio el neto cae de golpe, así que se busca
  // primero dentro del tramo con subsidio, donde el neto es continuo.
  const limiteDelPeriodo =
    LIMITE_INGRESO_SUBSIDIO_MENSUAL_2026 * factorDelPeriodo(periodo);
  let bruto;
  if (conSubsidio && netoDe(limiteDelPeriodo, true) >= netoDeseado) {
    bruto = buscarBruto(netoDeseado, 0, limiteDelPeriodo, (b) => netoDe(b, true));
  } else {
    // La tasa efectiva nunca pasa del 35%, así que el neto es al menos el 65%
    // del bruto y este techo siempre alcanza.
    const alto = netoDeseado / 0.65 + 1;
    bruto = buscarBruto(netoDeseado, 0, alto, (b) => netoDe(b, false));
  }

  return calcularBrutoANeto({
    ingreso: Math.round(bruto * 100) / 100,
    periodo,
    conSubsidio,
  });
}
