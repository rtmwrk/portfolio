// --- Класс "Будильник" ---
// В заданное время запускает заданную функцию.
//
// Поля класса:
// - alarmCollection - коллекция звонков;
// - this.intervalId - идентификатор активного периода запуска звонка.
//
// Коллекция звонков "alarmCollection" массив объектов:
// - addTime - время звонка;
// - callback - запускаемая функция;
// - canCall - признак возможности запуска функции.
//
// Методы:
// - addClock - добавить звонок в коллекцию;
// - removeClock - удалить звонок(ки) из коллекции;
// - resetAllCalls - выставить признак возможности запуска всех звонков; 
// - clearAlarms - остановить будильник, удалить все звонки;
// - start - запуск будильника;
// - stop - остановка будильника;
// - getCurrentFormattedTime - текущее время в формате "НН:ММ".
"use strict;"
 
class AlarmClock {
	// Поля класса
	alarmCollection;
	intervalId;

	// Конструктор класса
	constructor() {
		this.alarmCollection = [];
		this.intervalId = null;
	}

	// Метод добавляет новый звонок в коллекцию будильника
	addClock(addTime, funcCallback) {
		// Проверка наличия входных параметров
		if (addTime == null || funcCallback == null) {
			throw new Error("Отсутствуют обязательные аргументы");
		}

		// Проверека наличия другого звонка на заданное время:
		// - новый звонок допускаем, просто выводим предупреждение
		if (this.alarmCollection.find(item => item.time === addTime)) {
			console.warn("Уже присутствует звонок на это же время");	
		}

		// Формируем новый объект "Звонок" для добавления в коллекцию звонков
		const alarm = {time: addTime, callback: funcCallback, canCall: true};
		// Добавляем звонок в коллекцию
		this.alarmCollection.push(alarm);
	}

	// Метод удаляет звонок из коллекции будильника 
	removeClock(time) {
		// Ищем все звонки, кот. НЕ соответствуют искомому времени
		const newAlarmCollection = this.alarmCollection.filter(function (item) {
			return item.time != time;
		});
		// Оставляем в коллекции только звонки, не соответствующие искомому времени
		this.alarmCollection = newAlarmCollection;
	}

	// Метод возвращает текущее время в формате "HH:MM"
	getCurrentFormattedTime() {
		// Читаем текущее время
		const timeNow = new Date();
		// Читаем текущее значение часа + переводим значение в строку
		let h = "" + timeNow.getHours();
		// Читаем текущее значение минут + переводим значение в строку
		let m = "" + timeNow.getMinutes();
		// Дорабатываем значения часа и минут до 2-х символов
		return h.padStart(2, "0") + ":" + m.padStart(2, "0");
	}

	// Метод запускает будильник
	start() {
		// Проверка установленного интервала будильника
		if (this.intervalId != null) {
			return;
		}

		// Запускаем будильник, запоминаем идентификатор
		this.intervalId = setInterval(() => {  
			for (let i = 0; i < this.alarmCollection.length; i++) {
				if ((this.alarmCollection[i].time === this.getCurrentFormattedTime()) && (this.alarmCollection[i].canCall)) {
					this.alarmCollection[i].canCall = false;
					this.alarmCollection[i].callback();
				}
			}
		}, 1000);
	}

	// Метод останавливет будильник
	stop() {
		clearInterval(this.intervalId);
		this.intervalId = null;
	}

	// Метод сброса будильника по всем звонкам
	resetAllCalls() {
		this.alarmCollection.forEach((item) => item.canCall = true);
	}

	// Метод удаляет все звонки
	clearAlarms() {
		// Останавливаем интервал будильника
		this.stop();
		// Удаляем все звонки
		this.alarmCollection = [];
	}
}