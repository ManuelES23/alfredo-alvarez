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
