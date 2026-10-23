import { test } from "node:test";
import assert from "node:assert/strict";
import {
  TARIFA_ISR_MENSUAL_2026,
  calcularBrutoANeto,
  calcularNetoABruto,
} from "./calculadoraAsimilados.js";

function cercaDe(actual, esperado, tolerancia = 0.01) {
  assert.ok(
    Math.abs(actual - esperado) < tolerancia,
    `esperado ~${esperado}, recibido ${actual}`
  );
}

test("la tarifa mensual es continua: cada cuota fija sale del renglón anterior", () => {
  for (let i = 1; i < TARIFA_ISR_MENSUAL_2026.length; i++) {
    const anterior = TARIFA_ISR_MENSUAL_2026[i - 1];
    const actual = TARIFA_ISR_MENSUAL_2026[i];
    const cuotaEsperada =
      anterior.cuotaFija +
      (actual.limiteInferior - anterior.limiteInferior) * anterior.tasa;
    cercaDe(actual.cuotaFija, cuotaEsperada, 0.02);
  }
});

test("bruto vacío, cero o negativo da todo en 0", () => {
  for (const ingreso of ["", 0, -500, "abc"]) {
    const r = calcularBrutoANeto({ ingreso, periodo: "mensual", conSubsidio: true });
    assert.equal(r.bruto, 0);
    assert.equal(r.isrDeterminado, 0);
    assert.equal(r.neto, 0);
  }
});

test("1,600 mensual sin subsidio replica el desglose de la tarifa del Art. 96", () => {
  const r = calcularBrutoANeto({ ingreso: 1600, periodo: "mensual", conSubsidio: false });
  cercaDe(r.limiteInferior, 844.6);
  cercaDe(r.excedente, 755.4);
  assert.equal(r.tasa, 0.064);
  cercaDe(r.impuestoMarginal, 48.35);
  cercaDe(r.cuotaFija, 16.22);
  cercaDe(r.isrDeterminado, 64.57);
  assert.equal(r.subsidio, 0);
  cercaDe(r.isrARetener, 64.57);
  cercaDe(r.neto, 1535.43);
});

test("el subsidio solo reduce el ISR: nunca se entrega en efectivo", () => {
  const r = calcularBrutoANeto({ ingreso: 1600, periodo: "mensual", conSubsidio: true });
  cercaDe(r.subsidio, 64.57);
  assert.equal(r.isrARetener, 0);
  cercaDe(r.neto, 1600);
});

test("10,000 mensual con subsidio aplica los 535.65 completos", () => {
  const r = calcularBrutoANeto({ ingreso: 10000, periodo: "mensual", conSubsidio: true });
  cercaDe(r.isrDeterminado, 729.02);
  cercaDe(r.subsidio, 535.65);
  cercaDe(r.isrARetener, 193.37);
  cercaDe(r.neto, 9806.63);
});

test("arriba de 11,492.66 mensuales ya no hay subsidio", () => {
  const dentro = calcularBrutoANeto({ ingreso: 11492.66, periodo: "mensual", conSubsidio: true });
  assert.ok(dentro.subsidio > 0);
  const fuera = calcularBrutoANeto({ ingreso: 12000, periodo: "mensual", conSubsidio: true });
  assert.equal(fuera.subsidio, 0);
  cercaDe(fuera.isrDeterminado, 946.62);
  cercaDe(fuera.neto, 11053.39);
});

test("periodos menores a un mes escalan la tarifa y el subsidio entre 30.4 días", () => {
  const r = calcularBrutoANeto({ ingreso: 5000, periodo: "quincenal", conSubsidio: true });
  cercaDe(r.limiteInferior, 7168.52 * (15 / 30.4));
  cercaDe(r.cuotaFija, 420.95 * (15 / 30.4));
  cercaDe(r.isrDeterminado, 366.87);
  cercaDe(r.subsidio, 264.3);
  cercaDe(r.isrARetener, 102.57);
});

test("el último renglón de la tarifa no tiene límite superior", () => {
  const r = calcularBrutoANeto({ ingreso: 1000000, periodo: "mensual", conSubsidio: false });
  assert.equal(r.tasa, 0.35);
  cercaDe(r.isrDeterminado, 133488.54 + (1000000 - 425642) * 0.35);
});

test("neto vacío, cero o negativo da todo en 0", () => {
  const r = calcularNetoABruto({ ingreso: "", periodo: "mensual", conSubsidio: true });
  assert.equal(r.bruto, 0);
  assert.equal(r.neto, 0);
});

test("neto → bruto es el inverso de bruto → neto", () => {
  const casos = [
    { ingreso: 1535.43, periodo: "mensual", conSubsidio: false },
    { ingreso: 1600, periodo: "mensual", conSubsidio: true },
    { ingreso: 9806.63, periodo: "mensual", conSubsidio: true },
    { ingreso: 11053.39, periodo: "mensual", conSubsidio: true },
    { ingreso: 50000, periodo: "mensual", conSubsidio: false },
    { ingreso: 4000, periodo: "quincenal", conSubsidio: true },
    { ingreso: 300, periodo: "diario", conSubsidio: false },
  ];
  for (const caso of casos) {
    const r = calcularNetoABruto(caso);
    cercaDe(r.neto, caso.ingreso);
  }
});

test("neto → bruto con subsidio regresa el bruto más bajo posible", () => {
  // 1,600 netos se logran pagando 1,600 brutos: el subsidio cubre todo el ISR.
  const r = calcularNetoABruto({ ingreso: 1600, periodo: "mensual", conSubsidio: true });
  cercaDe(r.bruto, 1600);
});
