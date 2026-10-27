class AlarmClock {
  constructor() {
    // Коллекция звонков
    this.alarmCollection = [];
    // id таймера (без начального значения)
    this.intervalId = null;
  }

  // Добавление нового звонка
  addClock(time, callback) {
    // Проверка обязательных аргументов
    if (!time || !callback) {
      throw new Error('Отсутствуют обязательные аргументы');
    }

    // Проверка на дубликат по времени
    if (this.alarmCollection.some(alarm => alarm.time === time)) {
      console.warn('Уже присутствует звонок на это же время');
    }

    // Добавляем звонок в коллекцию
    this.alarmCollection.push({
      callback,
      time,
      canCall: true,
    });
  }

  // Удаление звонков на определённое время
  removeClock(time) {
    this.alarmCollection = this.alarmCollection.filter(
      alarm => alarm.time !== time
    );
  }

  // Текущее время в формате HH:MM
  getCurrentFormattedTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Запуск будильника
  start() {
    // Если интервал уже запущен — выходим
    if (this.intervalId !== null) {
      return;
    }

    this.intervalId = setInterval(() => {
      const currentTime = this.getCurrentFormattedTime();

      this.alarmCollection.forEach(alarm => {
        if (alarm.time === currentTime && alarm.canCall) {
          alarm.canCall = false;
          alarm.callback();
        }
      });
    }, 1000);
  }

  // Остановка будильника
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  // Сброс возможности запуска всех звонков
  resetAllCalls() {
    this.alarmCollection.forEach(alarm => {
      alarm.canCall = true;
    });
  }

  // Удаление всех звонков
  clearAlarms() {
    this.stop();
    this.alarmCollection = [];
  }
}