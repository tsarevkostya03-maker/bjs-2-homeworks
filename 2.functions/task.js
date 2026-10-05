/**
 * Задача 1
 * Возвращает минимальное, максимальное и среднее арифметическое
 * переданных чисел.
 *
 * @param {...number} arr - Произвольное количество чисел.
 * @returns {{min: number, max: number, avg: number}}
 */
function getArrayParams(...arr) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  const sum = arr.reduce((acc, num) => acc + num, 0);
  const avg = Number((sum / arr.length).toFixed(2));

  return { min, max, avg };
}


/**
 * Задача 2
 * Насадка суммирования элементов.
 *
 * @param {...number} arr - Произвольное количество чисел.
 * @returns {number} Сумма элементов или 0, если аргументы не переданы.
 */
function summElementsWorker(...arr) {
  if (arr.length === 0) {
    return 0;
  }

  return arr.reduce((acc, num) => acc + num, 0);
}

/**
 * Насадка вычисления разницы максимального и минимального элементов.
 *
 * @param {...number} arr - Произвольное количество чисел.
 * @returns {number} Разница max - min или 0, если аргументы не переданы.
 */
function differenceMaxMinWorker(...arr) {
  if (arr.length === 0) {
    return 0;
  }

  const max = Math.max(...arr);
  const min = Math.min(...arr);

  return max - min;
}

/**
 * Насадка вычисления разницы сумм чётных и нечётных элементов.
 *
 * @param {...number} arr - Произвольное количество чисел.
 * @returns {number} Разница суммы чётных и суммы нечётных элементов.
 */
function differenceEvenOddWorker(...arr) {
  if (arr.length === 0) {
    return 0;
  }

  let sumEvenElement = 0;
  let sumOddElement = 0;

  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] % 2 === 0) {
      sumEvenElement += arr[i];
    } else {
      sumOddElement += arr[i];
    }
  }

  return sumEvenElement - sumOddElement;
}

/**
 * Насадка вычисления среднего значения чётных элементов.
 *
 * @param {...number} arr - Произвольное количество чисел.
 * @returns {number} Среднее арифметическое чётных элементов или 0,
 *                   если аргументы не переданы либо чётных элементов нет.
 */
function averageEvenElementsWorker(...arr) {
  if (arr.length === 0) {
    return 0;
  }

  let sumEvenElement = 0;
  let countEvenElement = 0;

  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] % 2 === 0) {
      sumEvenElement += arr[i];
      countEvenElement += 1;
    }
  }

  if (countEvenElement === 0) {
    return 0;
  }

  return sumEvenElement / countEvenElement;
}


/**
 * Задача 3
 * Агрегатор преобразований: применяет насадку к каждому массиву данных
 * и возвращает максимальный результат.
 *
 * @param {Array<Array<number>>} arrOfArr - Массив массивов с числами.
 * @param {Function} func - Функция-насадка (summElementsWorker и т.п.).
 * @returns {number} Максимальный результат работы насадки.
 */
function makeWork(arrOfArr, func) {
  let maxWorkerResult = -Infinity;

  for (let i = 0; i < arrOfArr.length; i += 1) {
    const workerResult = func(...arrOfArr[i]);

    if (workerResult > maxWorkerResult) {
      maxWorkerResult = workerResult;
    }
  }

  return maxWorkerResult;
}