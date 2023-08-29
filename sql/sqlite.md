# ![](../assets/img/sqlite.png) Диалект SQLite


### 1. Определение данных (DDL)


**1.1. Создание БД:**
```
CREATE DATABASE class;
```

**1.2. Удаление БД:**
```
DROP DATABASE class;
```

**1.3. Создание таблицы:**
```
CREATE TABLE IF NOT EXISTS pupils (id	INTEGER PRIMARY KEY AUTOINCREMENT,
                                   name 	TEXT NOT NULL,
                                   fname	TEXT NOT NULL,
                                   lname	TEXT NOT NULL,
                                   fdate	TEXT NOT NULL,
                                   weight	REAL,
                                   phone	TEXT UNIQUE,
                                   notes	TEXT);
```

**1.4. Добавить столбец:**
```
ALTER TABLE pupils ADD COLUMN prim_disc TEXT;
```

**1.5. Переименовать столбец:**
```
ALTER TABLE pupils RENAME COLUMN prim_disc TO pd;
```

**1.6. Удалить столбец:**
```
ALTER TABLE pupils DROP COLUMN pd;
```

**1.7. Установить на поле ограничение «NOT NULL»:**
```
ALTER TABLE pupils ALTER COLUMN name SET NOT NULL;
```

**1.8. Переименование таблицы:**
```
ALTER TABLE IF EXIST pupils RENAME TO students;
```

**1.9. Удаление таблицы:**
```
DROP TABLE pupils;
```

...

___


### 2. Манипуляция с данными (DML)

**2.1. Вставка новых данных в строку таблицы:**
```
INSERT INTO pupils (name, fname, lname, bdate, weight, phone, notes) 
       VALUES ("Светлана", "Иванова", "Владимировна", "20.05.2012", 40.150, "7(989)5087240", "Хорошая ученица");
```

**2.2. Изменение данных в строке таблицы:**
```
UPDATE pupils SET weight = weight - 0.250;

UPDATE pupils SET weight = weight + 0.250 WHERE id 2;
```

**2.3. Удаление данных в строке таблицы:**
```
DELETE FROM pupils WHERE name = 'Ирина';
```

**2.4. Вывод всех строк таблицы:**
```
SELECT * FROM pupils;
```

**2.5. Вывод поля «id» всех строк таблицы:**
```
SELECT id FROM pupils;
```

**2.6. Вывод полей таблицы с заменой заголовков столбцов:**
```
SELECT name AS 'Имя',
       fname AS 'Фамилия',
       lname AS 'Отчество',
       bdate AS 'Дата рождения',
       weight AS 'Вес, кг',
       phone AS 'Номер телефона',
       notes AS 'Примечания'
       FROM pupils;
```

**2.7. Вывод всех строк таблицы + сортировка по полю:**

//-- По возрастанию значения
```
SELECT * FROM pupils ORDER BY name ASC;
```

//-- По убыванию значения
```
SELECT * FROM pupils ORDER BY name DESC;
```

//-- По нескольким полям
```
SELECT * FROM pupils ORDER BY name, fname;
```

**2.8. Вывод 2 строк таблицы, начиная со 2-й:**
```
SELECT * FROM pupils ORDER BY name LIMIT 2 OFFSET 1;
```

**2.9. Вывод строк таблицы с условиями:**
```
SELECT * FROM pupils WHERE weight 44 AND weight < 45;

SELECT * FROM pupils WHERE weight BETWEEN 44 AND 45;

SELECT * FROM pupils WHERE name IN (‘Мария’,’Елена’);
```

**2.10. Вывод строк таблицы с группировкой:**

//-- Группируем по именам
```
SELECT name FROM pupils GROUP BY name;
```

//-- Группируем по именам и подсчитываем количество учеников с каждым именем
```
SELECT \*, count() FROM pupils GROUP BY name;
```

//-- Тоже, что и предыдущее выражение, но берем только учеников с уникальными именами
```
SELECT \*, count() FROM pupils GROUP BY name HAVING count() = 1;
```

**2.11. Вывод строк таблицы с «хорошими» регулярными выражениями:**

//-- Значение поля = «История»
```
SELECT * FROM discipline WHERE name_disc LIKE 'История' ORDER BY code_disc;
```

//-- Значения поля начинаются на букву «И»
```
SELECT * FROM discipline WHERE name_disc LIKE 'И%' ORDER BY code_disc;
```

//-- Значения поля содержит букву «Т»
```
SELECT * FROM discipline WHERE name_disc LIKE '%T%' ORDER BY code_disc;
```

**2.12. Вывод строк таблицы с «плохими», сложными для вычисления  регулярными выражениями:**

//-- Значение поля fname = «\*ко»
```
SELECT * FROM pupils WHERE fname GLOB '*ко';
```

**2.13. Вывод строк таблицы с со значениями «NULL»:**
```
SELECT * FROM pupils WHERE notes IS NOT NULL;
```

**2.14 Вывод строк таблицы с подзапросом:**
```
SELECT * FROM pupils WHERE weight (SELECT avg(weight) FROM pupils);
```

**2.15 Вывод строк таблицы с форматированием даты из “yyyy-mm-dd” в дату “dd.mm.yyyy”:**
```
SELECT strftime('%d.%m.%Y', bdate) FROM pupils;
```

**2.16. Выборка с объединением таблиц (JOIN):**

//-- Внутренний-джоин – объединение строк, которые есть и в 1-й, и во 2-й таблице
```
SELECT pupils.fname, pupils.name, pupils.lname, exam.exdate 
       FROM pupils 
       INNER JOIN exam ON pupils.id = exam.idpu;
```

...

___       
***SQLite v. 3.5.9***