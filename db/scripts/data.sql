-- Tabla car_condition:
INSERT INTO `car_api`.`car_condition` (`type`, `createdAt`, `updatedAt`) VALUES
("Mint", NOW(), NOW()),
("Excellent", NOW(), NOW()),
("Good", NOW(), NOW()),
("Fair", NOW(), NOW()),
("Needs repair or maintenance", NOW(), NOW());


-- Tabla color:
INSERT INTO `car_api`.`color` (`name`, `createdAt`, `updatedAt`) VALUES
('Alpine White', NOW(), NOW()),
('Beige', NOW(), NOW()),
('Black', NOW(), NOW()),
('Black Sapphire Metallic', NOW(), NOW()),
('Brown', NOW(), NOW()),
('Burgundy', NOW(), NOW()),
('Carbon Black Metallic', NOW(), NOW()),
('Champagne', NOW(), NOW()),
('Charcoal', NOW(), NOW()),
('Cognac', NOW(), NOW()),
('Copper', NOW(), NOW()),
('Coral Red Black', NOW(), NOW()),
('Cream', NOW(), NOW()),
('Dark Blue', NOW(), NOW()),
('Dark Graphite Metallic', NOW(), NOW()),
('Dark Green', NOW(), NOW()),
('Dark Grey', NOW(), NOW()),
('Dark Red', NOW(), NOW()),
('Glacier Silver Metallic', NOW(), NOW()),
('Gold', NOW(), NOW()),
('Gray', NOW(), NOW()),
('Ivory', NOW(), NOW()),
('Ivory White Black', NOW(), NOW()),
('Jet Black', NOW(), NOW()),
('Light Blue', NOW(), NOW()),
('Light Brown', NOW(), NOW()),
('Light Green', NOW(), NOW()),
('Light Grey', NOW(), NOW()),
('Light Gan', NOW(), NOW()),
('Lime', NOW(), NOW()),
('Magma Red', NOW(), NOW()),
('Medium Blue', NOW(), NOW()),
('Medium Brown', NOW(), NOW()),
('Medium Green', NOW(), NOW()),
('Medium Grey', NOW(), NOW()),
('Melbourne Red Metallic', NOW(), NOW()),
('Mineral Gray Metallic', NOW(), NOW()),
('Mineral White Metallic', NOW(), NOW()),
('Moonstone Metallic', NOW(), NOW()),
('Night Blue', NOW(), NOW()),
('Nightmist Blue', NOW(), NOW()),
('Olive', NOW(), NOW()),
('Oyster Black', NOW(), NOW()),
('Pink', NOW(), NOW()),
('Platinum Gray Metallic', NOW(), NOW()),
('Purple', NOW(), NOW()),
('Pyrite Brown Metallic', NOW(), NOW()),
('Red', NOW(), NOW()),
('Saddle Brown', NOW(), NOW()),
('Silver', NOW(), NOW()),
('Sophisto Gray Metallic', NOW(), NOW()),
('Sparkling Brown Metallic', NOW(), NOW()),
('Sunset Orange Metallic', NOW(), NOW()),
('Tan', NOW(), NOW()),
('Tanzanite Blue Metallic', NOW(), NOW()),
('Terra', NOW(), NOW()),
('Thunderbird Blue', NOW(), NOW()),
('Turquoise', NOW(), NOW()),
('Valencia Orange Metallic', NOW(), NOW()),
('White', NOW(), NOW());


-- Tabla schedule:
INSERT INTO `car_api`.`schedule` (`hour`, `createdAt`, `updatedAt`) VALUES
('8:00', NOW(), NOW()),
('8:30', NOW(), NOW()),
('9:00', NOW(), NOW()),
('9:30', NOW(), NOW()),
('10:00', NOW(), NOW()),
('10:30', NOW(), NOW()),
('11:00', NOW(), NOW()),
('11:30', NOW(), NOW()),
('12:00', NOW(), NOW()),
('12:30', NOW(), NOW()),
('13:00', NOW(), NOW()),
('13:30', NOW(), NOW()),
('14:00', NOW(), NOW()),
('14:30', NOW(), NOW()),
('15:00', NOW(), NOW()),
('15:30', NOW(), NOW()),
('16:00', NOW(), NOW()),
('16:30', NOW(), NOW()),
('17:00', NOW(), NOW());


-- Tabla maker:
INSERT INTO `car_api`.`maker` (`name`, `createdAt`, `updatedAt`) VALUES
('Acura', NOW(), NOW()),
('Alfa-Romeo', NOW(), NOW()),
('Aston-Martin', NOW(), NOW()),
('Audi', NOW(), NOW()),
('Bentley', NOW(), NOW()),
('BMW', NOW(), NOW()),
('Bugatti', NOW(), NOW()),
('Buick', NOW(), NOW()),
('Cadillac', NOW(), NOW()),
('Chevrolet', NOW(), NOW()),
('Chrysler', NOW(), NOW()),
('Dodge', NOW(), NOW()),
('Ferrari', NOW(), NOW()),
('Fiat', NOW(), NOW()),
('Ford', NOW(), NOW()),
('Genesis', NOW(), NOW()),
('GMC', NOW(), NOW()),
('Honda', NOW(), NOW()),
('Hyundai', NOW(), NOW()),
('Infiniti', NOW(), NOW()),
('Jaguar', NOW(), NOW()),
('Jeep', NOW(), NOW()),
('Lexus', NOW(), NOW()),
('Lincoln', NOW(), NOW()),
('Lotus', NOW(), NOW()),
('Maserati', NOW(), NOW()),
('Mazda', NOW(), NOW()),
('McLaren', NOW(), NOW()),
('Mercedes-Benz', NOW(), NOW()),
('Mini', NOW(), NOW()),
('Mitsubishi', NOW(), NOW()),
('Nissan', NOW(), NOW()),
('Opel', NOW(), NOW()),
('Pagani', NOW(), NOW()),
('Peugeot', NOW(), NOW()),
('Porsche', NOW(), NOW()),
('RAM', NOW(), NOW()),
('Renault', NOW(), NOW()),
('Rolls-Royce', NOW(), NOW()),
('Seat', NOW(), NOW()),
('Smart', NOW(), NOW()),
('Subaru', NOW(), NOW()),
('Suzuki', NOW(), NOW()),
('Tesla', NOW(), NOW()),
('Toyota', NOW(), NOW());


-- Tabla transmission:
INSERT INTO `car_api`.`transmission` (`type`, `createdAt`, `updatedAt`) VALUES
('Manual', NOW(), NOW()),
('Automatic', NOW(), NOW());


-- Tabla state:
INSERT INTO `car_api`.`state` (`name`, `createdAt`, `updatedAt`) VALUES
('Aguascalientes', NOW(), NOW()),
('Baja California', NOW(), NOW()),
('Baja California Sur', NOW(), NOW()),
('Campeche', NOW(), NOW()),
('CdMx', NOW(), NOW()),
('Chiapas', NOW(), NOW()),
('Chihuahua', NOW(), NOW()),
('Coahuila', NOW(), NOW()),
('Colima', NOW(), NOW()),
('Durango', NOW(), NOW()),
('Estado de México', NOW(), NOW()),
('Guanajuato', NOW(), NOW()),
('Guerrero', NOW(), NOW()),
('Hidalgo', NOW(), NOW()),
('Jalisco', NOW(), NOW()),
('Michoacán', NOW(), NOW()),
('Morelos', NOW(), NOW()),
('Nayarit', NOW(), NOW()),
('Nuevo León', NOW(), NOW()),
('Oaxaca', NOW(), NOW()),
('Puebla', NOW(), NOW()),
('Querétaro', NOW(), NOW()),
('Quintana Roo', NOW(), NOW()),
('San Luis Potosí', NOW(), NOW()),
('Sinaloa', NOW(), NOW()),
('Sonora', NOW(), NOW()),
('Tabasco', NOW(), NOW()),
('Tamaulipas', NOW(), NOW()),
('Tlaxcala', NOW(), NOW()),
('Veracruz', NOW(), NOW()),
('Yucatán', NOW(), NOW()),
('Zacatecas', NOW(), NOW());


-- Tabla postal_code
INSERT INTO `car_api`.`postal_code` (`code`, `state`, `createdAt`, `updatedAt`) VALUES
("20000", 1, NOW(), NOW()),
("21000", 2, NOW(), NOW()),
("23000", 3, NOW(), NOW()),
("24000", 4, NOW(), NOW()),
("01000 ", 5, NOW(), NOW());


-- Tabla car_category:
INSERT INTO `car_api`.`car_category` (`name`, `createdAt`, `updatedAt`) VALUES
("Convertible",NOW(),NOW()),
("Coupe",NOW(),NOW()),
("Hatchback",NOW(),NOW()),
("Minivan",NOW(),NOW()),
("Pickup",NOW(),NOW()),
("Sedan",NOW(),NOW()),
("Sport",NOW(),NOW()),
("SUV",NOW(),NOW()),
("Van",NOW(),NOW()),
("Wagon",NOW(),NOW());


-- Tabla dealserhip:
INSERT INTO `car_api`.`dealership` (`name`, `description`, `street`, `exterior_number`, `neighborhood`, `postal_code`, `createdAt`, `updatedAt`) VALUES
( 'Donut-Motors Cars Emporium', "", "Calle Morelos", "123", "Centro", 1, NOW(), NOW()),
( 'Donut-Motors Vintage Auto Gallery', "", "Calle Juárez", "456", "Zona Centro", 2, NOW(), NOW()),
( 'Donut-Motors Automobile Dealership', "", "Calle Hidalgo", "789", "San José Viejo", 3, NOW(), NOW()),
( 'Donut-Motors Retro Ride Showroom', "", "Calle Reforma", "101", "San Francisco", 4, NOW(), NOW()),
( 'Donut-Motors Timeless Car Boutique', "", "Calle Insurgentes", "112", "Roma Norte", 5, NOW(), NOW()),
( 'Donut-Motors Headquarters', "Headquarters of Donut-Motors company", "Calle Insurgentes", "112", "Roma Norte", 5, NOW(), NOW());

-- Tabla role:
INSERT INTO `car_api`.`role` (`name`, `permissions`, `createdAt`, `updatedAt`) VALUES
('admin', 'r-w-d', NOW(), NOW()),
('capturist', 'r-w-d', NOW(), NOW());


-- Tabla user:
INSERT INTO `car_api`.`user` (`googleId`, `first_name`, `last_name_1`, `last_name_2`, `email`, `dealership`, `user_role`, `createdAt`, `updatedAt`) VALUES
('100262865461402723367', 'Edgar', 'Sabido', 'Cortés', 'edgar.sabido17@gmail.com', 6, 1, NOW(), NOW()),
('1', 'Admin', 'Donut', 'Motors', 'donutmotors.4dm1n@gmail.com', 6, 1, NOW(), NOW()),
('2', 'Capturist', 'Donut', 'Motors', 'donutmotors.c4ptur15t@gmail.com', 6, 2, NOW(), NOW());


-- Tabla car_model:
INSERT INTO `car_api`.`car_model` (`name`, `year`, `factory_price`, `transmission`, `color`, `category`, `maker`, `createdAt`, `updatedAt`) VALUES
( 'Corvette Sting Ray', 1966, 75551.63, 1, 47, 2, 10, NOW(), NOW()),
( 'Mustang', 1967, 47459.71, 1, 40, 1, 15, NOW(), NOW()),
( 'Thunderbird', 1955, 51786.43, 2, 56, 1, 15, NOW(), NOW());


-- Tabla car:
INSERT INTO `car_api`.`car` (`vin`, `mileage`, `description`, `purchase_price`, `sale_price`, `maintenance_cost`, `model`, `ccondition`, `interior_color`, `exterior_color`, `dealership`, `sold`, `car_image`, `createdAt`, `updatedAt`) VALUES
('1G1YY3D70G5100001', 558233, 'This Thunderbird is said to have received a body-off restoration some six years ago. The car is reportedly finished to original specifications, and all components are either numbers-matching original, correct coded replacements, or quality reproduction.', 350000.00, 499999.99, 0, 1, 1, 1, 2, 5, false, 'car_photos\2023041801.webp', NOW(), NOW()),
('1ZVHT80N775372738', 143272, 'Restored to resemble a Shelby G.T.500, this 1967 Ford Mustang Convertible was reportedly built in 2007, with additional major mechanical work performed between 2012-17, including the engine and transmission. They include a 428 V8 engine backed by a Tremec five-speed manual transmission.', 450000.00, 599999.99, 0, 2, 1, 1, 2, 5, false, 'car_photos\866420230.webp', NOW(), NOW()),
('H9YH1611001925430', 113267, 'Extra-cost equipment that was chosen includes the 390-horsepower 427 engine, transistorized ignition, a four-speed manual transmission, a Positraction rear differential (with 4.11:1 gears per the seller), the aforementioned side-mounted exhaust, and tinted glass.', 550000.00, 799999.99, 0, 3, 1, 1, 2, 5, false,'car_photos\9905480702.webp', NOW(), NOW());



-- Tabla :