//Задача № 1
function cachingDecoratorNew(func) {
  let cache = [];

  function wrapper(...args) {
    const hash = md5(args); // получаем хеш аргументов через MD5
    let objectInCache = cache.find((item) => item.hash === hash); // ищем элемент с таким же хешем

    if (objectInCache) { // если элемент найден
      console.log("Из кеша: " + objectInCache.value);
      return "Из кеша: " + objectInCache.value;
    }

    let result = func(...args); // в кеше результата нет — придётся считать
    cache.push({ hash: hash, value: result }); // добавляем элемент с правильной структурой

    if (cache.length > 5) {
      cache.shift(); // если слишком много элементов в кеше, удаляем самый старый (первый)
    }

    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;
  }

  return wrapper;
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
  let timeoutId = null;
  let hasCalled = false;

  function wrapper(...args) {
    wrapper.allCount++;

    if (!hasCalled) {
      // Первый вызов — выполняем моментально
      func(...args);
      wrapper.count++;
      hasCalled = true;
    } else {
      // Все последующие — с задержкой
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        wrapper.count++;
      }, delay);
    }
  }

  wrapper.count = 0;
  wrapper.allCount = 0;

  return wrapper;
}
