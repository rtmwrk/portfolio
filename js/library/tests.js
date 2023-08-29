describe('Класс «Библиотека» - добавление, поиск, выдача и ремонт печатного издания', () => {

  describe('Блок операций с изданием', () => {
    let printItem;

    beforeEach(function(){
      printItem = new PrintEditionItem('Типовой школьный журнал', 2019, 102);
    });

    it('создание печатного издания', () => {
      expect(printItem).toBeDefined();
      expect(printItem.name).toEqual('Типовой школьный журнал');
      expect(printItem.releaseDate).toEqual(2019);
      expect(printItem.pagesCount).toEqual(102);
      expect(printItem.state).toEqual(100);
      expect(printItem.type).toEqual(null);
    });

    it('починка почти целого печатного издания (ограничение сеттером state)', () => {
      printItem.state = 90;
      printItem.fix();
      expect(printItem.state).toEqual(100);
    });

    it('починка печатного издания', () => {
      printItem.state = 50;
      printItem.fix();
      expect(printItem.state).toEqual(75);
    });

    it('геттер для свойства state', () => {
      printItem.state = 10;
      const spy = spyOnProperty(printItem, 'state', 'get').and.returnValue(10);
      expect(printItem.state).toBe(10);
      expect(spy).toHaveBeenCalled();
    });
    
    it('сеттер для свойства state', () => {
      const spy = spyOnProperty(printItem, 'state', 'set');
      printItem.state = 10;
      expect(spy).toHaveBeenCalled();
    });

    it('создание объекта Magazine', () => {
      printItem = new Magazine('Forbes', 2020, 180);
      expect(printItem.type).toEqual("magazine");
    });
    
    it('создание объекта Book', () => {
      printItem = new Book('А. Сапковский', 'Меч Предназначения', 1992, 384);
      expect(printItem.author).toEqual('А. Сапковский');
      expect(printItem.name).toEqual('Меч Предназначения');
      expect(printItem.releaseDate).toEqual(1992);
      expect(printItem.pagesCount).toEqual(384);
      expect(printItem.type).toEqual('book');
    });

    it('создание объекта NovelBook', () => {
      printItem = new NovelBook('А. Сапковский', 'Меч Предназначения', 1992, 384);
      expect(printItem.author).toEqual('А. Сапковский');
      expect(printItem.type).toEqual('novel');
    });
    
    it('создание объекта FantasticBook', () => {
      printItem = new FantasticBook('Джон Толкин', 'Властелин колец', 1954, 2093);
      expect(printItem.author).toEqual('Джон Толкин');
      expect(printItem.type).toEqual('fantastic');
    });
    
    it('создание объекта DetectiveBook', () => {
      printItem = new DetectiveBook('Агата Кристи', 'Десять негритят', 2019, 256);
      expect(printItem.author).toEqual('Агата Кристи');
      expect(printItem.type).toEqual('detective');
    });
  });

  describe('Блок операция с библиотекой', () => {
    let library, printItem;
  
    beforeEach(function(){
      library = new Library('Библиотека имени Ленина');
      printItem = new PrintEditionItem('Типовой школьный журнал', 2019, 102);
    });

    it('создание библиотеки', () => {
      expect(library).toBeDefined();
      expect(library.name).toEqual('Библиотека имени Ленина');
      expect(library.books).toEqual(jasmine.any(Array));
    });
    
    it('добавление книги', () => {
      library.addBook(printItem);
      expect(library.books[0].name).toEqual('Типовой школьный журнал');
      expect(library.books.length).toEqual(1);
    });
    
    it('поиск книги', () => {
      const printItemAdditional = new PrintEditionItem('Блокнот для заметок', 2021, 100);
      library.addBook(printItemAdditional);
      library.addBook(printItem);
      const firstBook = library.findBookBy("releaseDate", 2019);
      expect(firstBook.name).toEqual('Типовой школьный журнал');
      const secondBook = library.findBookBy("releaseDate", 2154);
      expect(secondBook).toEqual(null);
    });
    
    it('выдача книги', () => {
      library.addBook(printItem);
      const firstBook = library.giveBookByName('Типовой школьный журнал');
      expect(firstBook.name).toEqual('Типовой школьный журнал');
      expect(library.books.length).toEqual(0);
      const secondBook = library.giveBookByName('Судовой журнал');
      expect(secondBook).toEqual(null);
    });
  })


  describe('Дополнительные тесты', () => {
    let library, printItem;
  
    beforeEach(function(){
      library = new Library('Библиотека имени Ленина');
      printItem1 = new PrintEditionItem('Типовой школьный журнал', 2019, 102);
      printItem2 = new PrintEditionItem('Полное собрание рассказов о Шерлоке Холмсе', 1919, 1008);
      printItem3 = new PrintEditionItem('Машина времени', 1895, 138);
      printItem4 = new PrintEditionItem('Мурзилка', 1934, 25);
    });

    it('создание библиотеки', () => {
      expect(library).toBeDefined();
      expect(library.name).toEqual('Библиотека имени Ленина');
      expect(library.books).toEqual(jasmine.any(Array));
    });

    it('добавление книг', () => {
      library.addBook(printItem1);
      library.addBook(printItem2);
      library.addBook(printItem3);
      library.addBook(printItem4);
      expect(library.books[0].name).toEqual('Типовой школьный журнал');
      expect(library.books[1].name).toEqual('Полное собрание рассказов о Шерлоке Холмсе');
      expect(library.books[2].name).toEqual('Машина времени');
      expect(library.books[3].name).toEqual('Мурзилка');
      expect(library.books.length).toEqual(4);
    });

     it('поиск книги', () => {
      library.addBook(printItem1);
      library.addBook(printItem2);
      library.addBook(printItem3);
      library.addBook(printItem4);      
      const firstBook = library.findBookBy("releaseDate", 1919);
      expect(firstBook.name).toEqual('Полное собрание рассказов о Шерлоке Холмсе');
      const secondBook = library.findBookBy("releaseDate", 2154);
      expect(secondBook).toEqual(null);
    });
    
     it('выдача книги', () => {
      library.addBook(printItem1);
      library.addBook(printItem2);
      library.addBook(printItem3);
      library.addBook(printItem4);
      const firstBook = library.giveBookByName('Полное собрание рассказов о Шерлоке Холмсе');
      expect(firstBook.name).toEqual('Полное собрание рассказов о Шерлоке Холмсе');
      expect(library.books.length).toEqual(3);
    });
   
   it('повреждаем, восстанавливаем и возвращаем выданную книгу', () => {
      library.addBook(printItem1);
      library.addBook(printItem2);
      const badBook = library.giveBookByName('Полное собрание рассказов о Шерлоке Холмсе');
      expect(badBook.name).toEqual('Полное собрание рассказов о Шерлоке Холмсе');
      expect(library.books.length).toEqual(1);
      badBook.state = 25;
      expect(badBook.state).toEqual(25);
      badBook.state = 60;
      expect(badBook.state).toEqual(60);
      library.addBook(badBook);
      const returnBook = library.findBookBy("releaseDate", 1919);
      expect(returnBook.name).toEqual('Полное собрание рассказов о Шерлоке Холмсе');
      expect(library.books.length).toEqual(2);
    });
  });
});