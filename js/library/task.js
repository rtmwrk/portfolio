// --- Учет печатных изданий - мини-библиотека ---

// --- Базовый класс - издание ---
class PrintEditionItem {
	// Поля класса
	name;				// название издания
	releaseDate;			// дата выхода
	pagesCount;			// кол-во страниц
	_state;				// состояние (поле защищено set/get)
	type;				// тип издания

	// Конструктор класса
	constructor(name, releaseDate, pagesCount) {
		this.name = name;
		this.releaseDate = releaseDate;
		this.pagesCount = pagesCount;
		this.state = 100;
		this.type = null;
	}

	// Метод установки состояния издания 
	set state(value) {
		this._state = (value < 0) ? 0 : (value > 100) ? 100 : value;
	}

	// Метод чтения состояния издания
	get state() {
		return this._state;
	}
	
	// Метод восстановления (ремонта) издания
	fix() {
	 	this.state *= 1.5;
	} 	
}

// --- Классы различных видов изданий ---
// --- Класс - журнал ---
class Magazine extends PrintEditionItem {
	// Конструктор класса
	constructor(name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.type = "magazine";
	}
}

// --- Класс - книга ---
class Book extends PrintEditionItem {
	// Поля класса
	author;				// автор издания

	// Конструктор класса
	constructor(author, name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.author = author;
		this.type = "book";
	}
}

// --- Классы различных видов книг ---
// --- Класс - фантастика ---
class FantasticBook extends Book {
	// Конструктор класса
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "fantastic";
	}	
}

// --- Класс - роман ---
class NovelBook extends Book {
	// Конструктор класса
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "novel";
	}	
}

// --- Класс - детектив ---
class DetectiveBook extends Book {
	// Конструктор класса
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "detective";
	}	
}

// --- Класс библиотека ---
class Library {
	// Поля класса
	name;
	books;

	// Конструктор класса
	constructor(name) {
		this.name = name;
		this.books = [];
	}

	// Метод добавления издания в библиотеку
	addBook(book) {
		if (book.state > 30) {
			this.books.push(book);
		}
	}

	// Метод поиска издания
	findBookBy(type, value) {
		// Находим первое совпадение и завершаем метод
		for (let i = 0; i < this.books.length; i++) {
			if (this.books[i][type] === value) {
				return this.books[i];
			}
		}
		return null;
	}

	// --- Метод выдачи издания читателю ---
	giveBookByName(bookName) {
		if (this.findBookBy("name", bookName) === null) {
			return null;
		} else {
			// Определяем индекс книги на выдачу в массиве - библиотека
			const indexDelete = this.books.findIndex(book => book.name === bookName);
			// Удаляем книгу из библиотеки и возвращаем ее
			return this.books.splice(indexDelete, 1)[0];
		}
	}
}