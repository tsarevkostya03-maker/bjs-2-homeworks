"use strict";

/**
 * Задача №1. Решение квадратного уравнения ax² + bx + c = 0.
 *
 * @param {number} a - коэффициент при x²
 * @param {number} b - коэффициент при x
 * @param {number} c - свободный член
 * @returns {number[]} массив корней (0, 1 или 2 элемента)
 */
function solveEquation(a, b, c) {
  const d = b ** 2 - 4 * a * c;

  if (d < 0) {
    return [];
  }

  if (d === 0) {
    const x = -b / (2 * a);
    return [x];
  }

  const sqrtD = Math.sqrt(d);
  const x1 = (-b + sqrtD) / (2 * a);
  const x2 = (-b - sqrtD) / (2 * a);
  return [x1, x2];
}

/**
 * Задача №2. Ипотечный калькулятор.
 *
 * @param {number|string} percent - процентная ставка (0..100)
 * @param {number|string} contribution - первоначальный взнос
 * @param {number|string} amount - сумма кредита
 * @param {number|string} countMonths - срок кредита в месяцах
 * @returns {number|false} общая сумма выплат или false
 */
function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  const p = Number(percent);
  const c = Number(contribution);
  const a = Number(amount);
  const n = Number(countMonths);

  if ([p, c, a, n].some((v) => Number.isNaN(v))) {
    return false;
  }

  const monthlyPercent = p / 100 / 12;
  const creditBody = a - c;

  if (creditBody <= 0) {
    return 0;
  }

  const monthlyPayment =
    creditBody *
    (monthlyPercent +
      monthlyPercent / ((1 + monthlyPercent) ** n - 1));

  return Number((monthlyPayment * n).toFixed(2));
}