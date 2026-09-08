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
