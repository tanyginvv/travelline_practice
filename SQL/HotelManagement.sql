use HotelManagement

--Часть 1
--Создание таблицы Rooms
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Rooms')
	CREATE TABLE dbo.Rooms(
	 room_id INT IDENTITY(1,1) NOT NULL,
	 room_number INT NOT NULL,
	 room_type NVARCHAR(50) NOT NULL,
	 price_per_night MONEY NOT NULL,
	 availability BIT NOT NULL,
	 CONSTRAINT PK_rooms_id_room PRIMARY KEY(room_id)
	)
--Создание таблицы Customers
IF NOT EXISTS ( SELECT * FROM sysobjects WHERE name ='Customers')
	CREATE TABLE dbo.Customers(
	 customer_id INT IDENTITY(1,1) NOT NULL,
	 first_name NVARCHAR(50) NOT NULL,
	 last_name NVARCHAR(50) NOT NULL,
	 email NVARCHAR(50) NOT NULL,
     phone_number NVARCHAR(50) NOT NULL,
	 CONSTRAINT PK_customers_id_customer PRIMARY KEY(customer_id)
	)
--Создание таблицы Bookings
IF NOT EXISTS ( SELECT * FROM sys.objects WHERE name ='Bookings')
	CREATE TABLE dbo.Bookings(
	 booking_id INT IDENTITY(1,1) NOT NULL,
	 customer_id INT NOT NULL,
	 room_id INT NOT NULL,
	 check_in_date DATE NOT NULL,
     check_out_date DATE NOT NULL,
	 CONSTRAINT PK_bookings_id_booking PRIMARY KEY(booking_id),
	 CONSTRAINT FK_bookings_id_customer
		FOREIGN KEY (customer_id) REFERENCES dbo.Customers (customer_id),
	 CONSTRAINT FK_bookings_id_room
		FOREIGN KEY (room_id) REFERENCES dbo.Rooms (room_id)
	)
--Создание таблицы Facilities
IF NOT EXISTS ( SELECT * FROM sysobjects WHERE name ='Facilities')
	CREATE TABLE dbo.Facilities(
	 facility_id INT IDENTITY(1,1) NOT NULL,
	 facility_name NVARCHAR(200) NOT NULL,
	 CONSTRAINT PK_facilities_id_facility PRIMARY KEY(facility_id)
	)
--Создание таблицы RoomToFacilities
IF NOT EXISTS ( SELECT * FROM sysobjects WHERE name ='RoomToFacilities')
	CREATE TABLE dbo.RoomToFacilities(
	 room_id INT NOT NULL,
	 facility_id INT NOT NULL,
	 CONSTRAINT PK_roomToFacilities_id_roomToFacilities PRIMARY KEY(room_id, facility_id),
	 CONSTRAINT FK_roomToFacilities_id_room
		FOREIGN KEY (room_id) REFERENCES dbo.Rooms(room_id),
	 CONSTRAINT FK_roomToFacilities_id_facilities
		FOREIGN KEY (facility_id) REFERENCES dbo.Facilities(facility_id)
	)

-- Добавление данных в таблицу "Rooms" availability 1-true доступен 0-false недоступен
INSERT INTO Rooms (room_number, room_type, price_per_night, availability)
VALUES
    (101, N'Одноместный', 50.00, 1),
    (102, N'Одноместный', 50.00, 1),
    (103, N'Двухместный', 80.00, 1),
    (104, N'Двухместный', 80.00, 1),
    (105, N'Студия', 100.00, 1),
    (106, N'Семейный', 120.00, 1),
    (107, N'Люкс', 150.00, 1),
    (108, N'Люкс', 150.00, 1),
    (109, N'Люкс', 150.00, 1),
    (110, N'Люкс', 150.00, 1),
    (111, N'Одноместный', 60.00, 0),
    (112, N'Двухместный', 90.00, 0),
    (113, N'Студия', 110.00, 0),
    (114, N'Семейный', 130.00, 0),
    (115, N'Люкс', 160.00, 0);

-- Добавление данных в таблицу "Customers"
INSERT INTO Customers (first_name, last_name, email, phone_number)
VALUES
    (N'Иван', N'Иванов', N'ivan@example.com', '+7 912 345-67-89'),
    (N'Петр', N'Петров', N'petr@example.com', '+7 912 345-67-90'),
    (N'Мария', N'Сидорова', N'maria@example.com', '+7 912 345-67-91'),
    (N'Елена', N'Кузнецова', N'elena@example.com', '+7 912 345-67-92'),
    (N'Алексей', N'Смирнов', N'alexey@example.com', '+7 912 345-67-93'),
    (N'Анна', N'Морозова', N'anna@example.com', '+7 912 345-67-94'),
    (N'Дмитрий', N'Васильев', N'dmitry@example.com', '+7 912 345-67-95'),
    (N'Ольга', N'Петрова', N'olga@example.com', '+7 912 345-67-96'),
    (N'Сергей', N'Семенов', N'sergey@example.com', '+7 912 345-67-97'),
    (N'Наталья', N'Иванова', N'natalya@example.com', '+7 912 345-67-98');

-- Добавление данных в таблицу "Bookings"
INSERT INTO Bookings (customer_id, room_id, check_in_date, check_out_date)
VALUES
    (1, 1, '2024-04-05', '2024-04-07'),
    (2, 2, '2024-04-06', '2024-04-08'),
    (3, 3, '2024-04-07', '2024-04-09'),
    (4, 4, '2024-04-08', '2024-04-10'),
    (5, 5, '2024-04-09', '2024-04-11'),
    (6, 6, '2024-04-10', '2024-04-12'),
    (7, 7, '2024-04-11', '2024-04-13'),
    (8, 8, '2024-04-12', '2024-04-14'),
    (9, 9, '2024-04-13', '2024-04-15'),
    (10, 10, '2024-04-14', '2024-04-16');

-- Добавление данных в таблицу "Facilities"
INSERT INTO Facilities (facility_name)
VALUES
    (N'Wi-Fi'),
    (N'Кондиционер'),
    (N'Мини-бар'),
    (N'Телевизор'),
    (N'Фен'),
    (N'Халат и тапочки'),
    (N'Бесплатные напитки'),
    (N'Сейф'),
    (N'Утюг'),
    (N'Кофемашина');

-- Добавление данных в таблицу "RoomToFacilities"
INSERT INTO RoomToFacilities (room_id, facility_id)
VALUES
    (1, 1),
    (1, 4),
    (2, 1),
    (2, 4),
    (3, 1),
    (3, 2),
    (4, 1),
    (4, 2),
    (5, 1),
    (5, 2),
    (5, 3),
    (6, 1),
    (6, 2),
    (6, 3),
    (6, 4),
    (7, 1),
    (7, 2),
    (7, 3),
    (7, 4),
    (7, 5),
    (8, 1),
    (8, 2),
    (8, 3),
    (8, 4),
    (8, 5),
    (9, 1),
    (9, 2),
    (9, 3),
    (9, 4),
    (9, 5),
    (10, 1),
    (10, 2),
    (10, 3),
    (10, 4),
    (10, 5);

--ЧАСТЬ2
--Найдите все доступные номера для бронирования сегодня.
SELECT * FROM Rooms
WHERE room_id NOT IN (
    SELECT room_id FROM Bookings
    WHERE '2024-04-04' NOT BETWEEN check_in_date AND check_out_date 
) AND availability = 1;

--Найдите всех клиентов, чьи фамилии начинаются с буквы "S".
SELECT * FROM Customers
WHERE SUBSTRING(last_name, 1, 1) = 'S'

--Найдите все бронирования для определенного клиента (по имени или электронному адресу).
SELECT * FROM Bookings b
JOIN  Customers as c ON b.customer_id = c.customer_id
WHERE c.first_name = N'Иван'

SELECT * FROM Bookings b
JOIN  Customers as c ON b.customer_id = c.customer_id
WHERE c.email = 'dmitry@example.com'

--Найдите все бронирования для определенного номера.
SELECT * FROM Bookings b
JOIN Rooms r ON r.room_id = b.room_id
WHERE r.room_number = 113

--Найдите все номера, которые не забронированы на определенную дату.
SELECT * FROM Rooms r
JOIN Bookings b ON r.room_id = b.room_id
WHERE ('2024-04-16' NOT BETWEEN b.check_in_date AND b.check_out_date ) 
AND availability = 1

--Самостоятельно написал запрос на поиск удобств(facilities) в определённом номмере
SELECT * FROM Rooms r
JOIN RoomToFacilities rt ON rt.room_id = r.room_id
JOIN Facilities f ON rt.facility_id = f.facility_id
WHERE r.room_number = 101
