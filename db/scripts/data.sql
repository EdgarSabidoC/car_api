-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-05-2023 a las 02:57:10
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


-- CREAR LAS TABLAS SQL:
		-- Se crea la Base de Datos:
DROP DATABASE IF EXISTS car_api;
CREATE DATABASE IF NOT EXISTS car_api; USE
		car_api;

SET FOREIGN_KEY_CHECKS=0;

		-- Se borran las tablas si existen: 20
DROP TABLE IF EXISTS car_api.session; -- Es sólo para almacenar la sesión del backend.
DROP TABLE IF EXISTS car_api.sell;	-- FALTAN modelos y demás
DROP TABLE IF EXISTS car_api.employee; -- FALTAN modelos y demás
DROP TABLE IF EXISTS car_api.maintenance; -- S
DROP TABLE IF EXISTS car_api.appointment; -- S
DROP TABLE IF EXISTS car_api.car; -- S
DROP TABLE IF EXISTS car_api.log; -- FALTAN modelos y demás
DROP TABLE IF EXISTS car_api.user; -- FALTAN modelos y demás
DROP TABLE IF EXISTS car_api.car_model; -- S
DROP TABLE IF EXISTS car_api.dealership; -- S
DROP TABLE IF EXISTS car_api.postal_code; -- S
DROP TABLE IF EXISTS car_api.state; -- S
DROP TABLE IF EXISTS car_api.transmission; -- S
DROP TABLE IF EXISTS car_api.car_condition; -- S
DROP TABLE IF EXISTS car_api.price; -- S
DROP TABLE IF EXISTS car_api.color; -- S
DROP TABLE IF EXISTS car_api.maker; -- S
DROP TABLE IF EXISTS car_api.car_category; -- S
DROP TABLE IF EXISTS car_api.schedule; -- S
DROP TABLE IF EXISTS car_api.maintenance_type; -- S
DROP TABLE IF EXISTS car_api.role; -- S

SET FOREIGN_KEY_CHECKS=1;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `car_api`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `customer_firstname` varchar(80) NOT NULL,
  `customer_lastname_1` varchar(80) NOT NULL,
  `customer_lastname_2` varchar(80) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `dealership` int(11) NOT NULL,
  `car` varchar(17) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `appointment`
--

INSERT INTO `appointment` (`id`, `customer_firstname`, `customer_lastname_1`, `customer_lastname_2`, `email`, `telephone`, `appointment_date`, `appointment_time`, `dealership`, `car`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
(1, 'Juan', 'Rodriguez', 'Cárdenas', 'example@email.com', '9996381234', '2023-05-24', '12:00:00', 1, '1G1YY3D70G5100001', '2023-05-22 02:46:08', '2023-05-22 02:46:08', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `car`
--

CREATE TABLE `car` (
  `vin` varchar(17) NOT NULL,
  `mileage` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `purchase_price` decimal(10,0) NOT NULL,
  `sale_price` decimal(10,0) DEFAULT NULL,
  `maintenance_cost` decimal(10,0) DEFAULT 0,
  `model` int(11) NOT NULL,
  `ccondition` int(11) NOT NULL,
  `interior_color` int(11) NOT NULL,
  `exterior_color` int(11) NOT NULL,
  `dealership` int(11) NOT NULL,
  `sold` tinyint(1) DEFAULT 0,
  `car_image` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `car`
--

INSERT INTO `car` (`vin`, `mileage`, `description`, `purchase_price`, `sale_price`, `maintenance_cost`, `model`, `ccondition`, `interior_color`, `exterior_color`, `dealership`, `sold`, `car_image`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
('1G1YY3D70G5100001', 558233, 'This Thunderbird is said to have received a body-off restoration some six years ago. The car is reportedly finished to original specifications, and all components are either numbers-matching original, correct coded replacements, or quality reproduction.', '350000', '500000', '0', 3, 1, 1, 2, 5, 0, '1G1YY3D70G5100001.webp', '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL),
('1ZVHT80N775372738', 143272, 'Restored to resemble a Shelby G.T.500, this 1967 Ford Mustang Convertible was reportedly built in 2007, with additional major mechanical work performed between 2012-17, including the engine and transmission. They include a 428 V8 engine backed by a Tremec five-speed manual transmission.', '450000', '600000', '0', 2, 1, 1, 2, 5, 0, '1ZVHT80N775372738.webp', '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL),
('H9YH1611001925430', 113267, 'Extra-cost equipment that was chosen includes the 390-horsepower 427 engine, transistorized ignition, a four-speed manual transmission, a Positraction rear differential (with 4.11:1 gears per the seller), the aforementioned side-mounted exhaust, and tinted glass.', '550000', '800000', '0', 1, 1, 1, 2, 5, 0, 'H9YH1611001925430.webp', '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `car_category`
--

CREATE TABLE `car_category` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `car_category`
--

INSERT INTO `car_category` (`id`, `name`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
(1, 'Convertible', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(2, 'Coupe', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(3, 'Hatchback', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(4, 'Minivan', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(5, 'Pickup', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(6, 'Sedan', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(7, 'Sport', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(8, 'SUV', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(9, 'Van', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(10, 'Wagon', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `car_condition`
--

CREATE TABLE `car_condition` (
  `id` int(11) NOT NULL,
  `type` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `car_condition`
--

INSERT INTO `car_condition` (`id`, `type`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
(1, 'Mint', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(2, 'Excellent', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(3, 'Good', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(4, 'Fair', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(5, 'Needs repair or maintenance', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `car_model`
--

CREATE TABLE `car_model` (
  `id` int(11) NOT NULL,
  `name` varchar(75) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `factory_price` decimal(10,0) DEFAULT NULL,
  `transmission` int(11) NOT NULL,
  `color` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `maker` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `car_model`
--

INSERT INTO `car_model` (`id`, `name`, `year`, `factory_price`, `transmission`, `color`, `category`, `maker`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
(1, 'Corvette Sting Ray', 1966, '75552', 1, 47, 2, 10, '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL),
(2, 'Mustang', 1967, '47460', 1, 40, 1, 15, '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL),
(3, 'Thunderbird', 1955, '51786', 2, 56, 1, 15, '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `color`
--

CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `color`
--

INSERT INTO `color` (`id`, `name`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
(1, 'Alpine White', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(2, 'Beige', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(3, 'Black', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(4, 'Black Sapphire Metallic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(5, 'Brown', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(6, 'Burgundy', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(7, 'Carbon Black Metallic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(8, 'Champagne', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(9, 'Charcoal', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(10, 'Cognac', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(11, 'Copper', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(12, 'Coral Red Black', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(13, 'Cream', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(14, 'Dark Blue', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(15, 'Dark Graphite Metallic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(16, 'Dark Green', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(17, 'Dark Grey', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(18, 'Dark Red', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(19, 'Glacier Silver Metallic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(20, 'Gold', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(21, 'Gray', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(22, 'Ivory', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(23, 'Ivory White Black', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(24, 'Jet Black', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(25, 'Light Blue', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(26, 'Light Brown', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(27, 'Light Green', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(28, 'Light Grey', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(29, 'Light Gan', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(30, 'Lime', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(31, 'Magma Red', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(32, 'Medium Blue', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(33, 'Medium Brown', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(34, 'Medium Green', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(35, 'Medium Grey', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(36, 'Melbourne Red Metallic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(37, 'Mineral Gray Metallic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(38, 'Mineral White Metallic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(39, 'Moonstone Metallic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(40, 'Night Blue', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(41, 'Nightmist Blue', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(42, 'Olive', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(43, 'Oyster Black', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(44, 'Pink', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(45, 'Platinum Gray Metallic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(46, 'Purple', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(47, 'Pyrite Brown Metallic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(48, 'Red', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(49, 'Saddle Brown', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(50, 'Silver', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(51, 'Sophisto Gray Metallic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(52, 'Sparkling Brown Metallic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(53, 'Sunset Orange Metallic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(54, 'Tan', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(55, 'Tanzanite Blue Metallic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(56, 'Terra', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(57, 'Thunderbird Blue', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(58, 'Turquoise', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(59, 'Valencia Orange Metallic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(60, 'White', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dealership`
--

CREATE TABLE `dealership` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `street` varchar(50) NOT NULL,
  `exterior_number` varchar(10) NOT NULL,
  `neighborhood` varchar(50) NOT NULL,
  `postal_code` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `dealership`
--

INSERT INTO `dealership` (`id`, `name`, `description`, `street`, `exterior_number`, `neighborhood`, `postal_code`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
(1, 'Donut-Motors Cars Emporium', '', 'Calle Morelos', '123', 'Centro', 1, '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL),
(2, 'Donut-Motors Vintage Auto Gallery', '', 'Calle Juárez', '456', 'Zona Centro', 2, '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL),
(3, 'Donut-Motors Automobile Dealership', '', 'Calle Hidalgo', '789', 'San José Viejo', 3, '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL),
(4, 'Donut-Motors Retro Ride Showroom', '', 'Calle Reforma', '101', 'San Francisco', 4, '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL),
(5, 'Donut-Motors Timeless Car Boutique', '', 'Calle Insurgentes', '112', 'Roma Norte', 5, '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL),
(6, 'Donut-Motors Headquarters', 'Headquarters of Donut-Motors company', 'Calle Insurgentes', '112', 'Roma Norte', 5, '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `first_name` varchar(75) NOT NULL,
  `last_name_1` varchar(75) NOT NULL,
  `last_name_2` varchar(75) DEFAULT NULL,
  `dealership` int(11) NOT NULL,
  `email` varchar(80) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `employee`
--

INSERT INTO `employee` (`id`, `first_name`, `last_name_1`, `last_name_2`, `dealership`, `email`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
(1, 'Carlos', 'Ruiz', 'Domínguez', 1, 'cardtpp@gmail.com', '2023-05-22 02:42:50', '2023-05-22 02:42:50', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `ip` varchar(80) NOT NULL,
  `event` text DEFAULT NULL,
  `method` text DEFAULT NULL,
  `observation` text DEFAULT NULL,
  `url` text DEFAULT NULL,
  `body` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maintenance`
--

CREATE TABLE `maintenance` (
  `maintenance_type` int(11) NOT NULL,
  `car` varchar(17) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maintenance_type`
--

CREATE TABLE `maintenance_type` (
  `id` int(11) NOT NULL,
  `concept` varchar(100) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maker`
--

CREATE TABLE `maker` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `maker`
--

INSERT INTO `maker` (`id`, `name`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
(1, 'Acura', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(2, 'Alfa-Romeo', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(3, 'Aston-Martin', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(4, 'Audi', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(5, 'Bentley', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(6, 'BMW', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(7, 'Bugatti', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(8, 'Buick', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(9, 'Cadillac', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(10, 'Chevrolet', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(11, 'Chrysler', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(12, 'Dodge', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(13, 'Ferrari', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(14, 'Fiat', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(15, 'Ford', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(16, 'Genesis', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(17, 'GMC', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(18, 'Honda', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(19, 'Hyundai', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(20, 'Infiniti', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(21, 'Jaguar', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(22, 'Jeep', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(23, 'Lexus', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(24, 'Lincoln', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(25, 'Lotus', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(26, 'Maserati', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(27, 'Mazda', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(28, 'McLaren', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(29, 'Mercedes-Benz', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(30, 'Mini', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(31, 'Mitsubishi', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(32, 'Nissan', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(33, 'Opel', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(34, 'Pagani', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(35, 'Peugeot', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(36, 'Porsche', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(37, 'RAM', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(38, 'Renault', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(39, 'Rolls-Royce', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(40, 'Seat', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(41, 'Smart', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(42, 'Subaru', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(43, 'Suzuki', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(44, 'Tesla', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(45, 'Toyota', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postal_code`
--

CREATE TABLE `postal_code` (
  `id` int(11) NOT NULL,
  `code` varchar(15) NOT NULL,
  `state` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `postal_code`
--

INSERT INTO `postal_code` (`id`, `code`, `state`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
(1, '20000', 1, '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(2, '21000', 2, '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(3, '23000', 3, '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(4, '24000', 4, '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(5, '01000 ', 5, '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `price`
--

CREATE TABLE `price` (
  `id` int(11) NOT NULL,
  `concept` varchar(350) NOT NULL,
  `percentage` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `price`
--

INSERT INTO `price` (`id`, `concept`, `percentage`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
(1, '4 doors', 2, '2023-05-22 02:44:09', '2023-05-22 02:44:09', 0, NULL),
(2, '2 doors', 4, '2023-05-22 02:44:39', '2023-05-22 02:44:39', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `permissions` varchar(10) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `role` (`id`, `name`, `permissions`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
(1, 'admin', 'r-w-d', '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL),
(2, 'capturist', 'r-w-d', '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `hour` time NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ;

--
-- Volcado de datos para la tabla `schedule`
--

INSERT INTO `schedule` (`id`, `hour`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
(1, '08:00:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(2, '08:30:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(3, '09:00:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(4, '09:30:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(5, '10:00:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(6, '10:30:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(7, '11:00:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(8, '11:30:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(9, '12:00:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(10, '12:30:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(11, '13:00:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(12, '13:30:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(13, '14:00:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(14, '14:30:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(15, '15:00:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(16, '15:30:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(17, '16:00:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(18, '16:30:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(19, '17:00:00', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sell`
--

CREATE TABLE `sell` (
  `appointment` int(11) NOT NULL,
  `employee` int(11) NOT NULL,
  `final_sale_price` decimal(10,0) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sell`
--

INSERT INTO `sell` (`appointment`, `employee`, `final_sale_price`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
(1, 1, '750000', '2023-05-22 02:47:58', '2023-05-22 02:47:58', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `session`
--

CREATE TABLE `session` (
  `sid` varchar(40) NOT NULL,
  `expires` date DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `session`
--

INSERT INTO `session` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('2NyPHaL4vWhIRwa2uzkCga988Z0pKup3', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:40:23.369Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:40:23', '2023-05-21 22:40:23'),
('aYJTJl1fea_9pCgOZIzRfdaKAwTd_MpI', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:40:22.461Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:40:22', '2023-05-21 22:40:22'),
('BL0PKpIyS7cIMxm4OKNBg3NPwMpTaoLW', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:39:18.936Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:39:18', '2023-05-21 22:39:18'),
('CQV4wJ1fpXGjMGN96GRcmjSbnYmmxSrj', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:39:18.914Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:39:18', '2023-05-21 22:39:18'),
('CTjfbJhkdhctsnT5VDAcbNXrm8AJP1pN', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:39:18.925Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:39:18', '2023-05-21 22:39:18'),
('C_PcV0pCcitYhmEtXHmSYG95C-Otn9T8', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:40:22.469Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:40:23', '2023-05-21 22:40:23'),
('goW9dwX7PTS35oMrw3gy1cumTMiz1p4I', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:40:22.448Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:40:22', '2023-05-21 22:40:22'),
('h_JvlZYTZvZ9Le2agJcB8VbCXTgvGQwW', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:39:18.928Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:39:18', '2023-05-21 22:39:18'),
('jhOQIZCPgsfk4tQALHcmfD2U2ea6ewZw', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:39:18.911Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:39:18', '2023-05-21 22:39:18'),
('litQcgSk5hZ7hBWPSoDuAA2_jxgngqgh', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:39:19.227Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:39:19', '2023-05-21 22:39:19'),
('NknwfZHofZ4Sin60zKlNznob-Vbhp0NM', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:40:22.453Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:40:22', '2023-05-21 22:40:22'),
('O5hpBdHtkw9Iweks2pW7kjX35Bfifr0H', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:39:18.923Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:39:18', '2023-05-21 22:39:18'),
('oty_i25AsKzvUlL7Bd69ZgiX2l2wcgFC', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:39:18.957Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:39:19', '2023-05-21 22:39:19'),
('ThjfljzclwxXTHHN29Qy622HRBRGekvk', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:40:23.368Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:40:23', '2023-05-21 22:40:23'),
('TSlMRPkJ9_amFABj8pb6aAfoJj1hDmVh', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:39:18.934Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:39:18', '2023-05-21 22:39:18'),
('x_STkb2Bx_WWHYdZB6DEI6q6JBVg3ITm', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:39:18.938Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:39:18', '2023-05-21 22:39:18'),
('ylIurEkDtyubgBL8ojaimWPmWfhgq2cA', '2023-05-22', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-22T01:56:32.286Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-22 00:56:32', '2023-05-22 00:56:51'),
('YvDxyabYeCGoYPjwxL6F-DnX-ZCZAqxk', '2023-05-21', '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2023-05-21T23:40:22.467Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}', '2023-05-21 22:40:23', '2023-05-21 22:40:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `state`
--

CREATE TABLE `state` (
  `id` int(11) NOT NULL,
  `name` varchar(35) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `state`
--

INSERT INTO `state` (`id`, `name`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
(1, 'Aguascalientes', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(2, 'Baja California', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(3, 'Baja California Sur', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(4, 'Campeche', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(5, 'CdMx', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(6, 'Chiapas', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(7, 'Chihuahua', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(8, 'Coahuila', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(9, 'Colima', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(10, 'Durango', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(11, 'Estado de México', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(12, 'Guanajuato', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(13, 'Guerrero', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(14, 'Hidalgo', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(15, 'Jalisco', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(16, 'Michoacán', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(17, 'Morelos', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(18, 'Nayarit', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(19, 'Nuevo León', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(20, 'Oaxaca', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(21, 'Puebla', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(22, 'Querétaro', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(23, 'Quintana Roo', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(24, 'San Luis Potosí', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(25, 'Sinaloa', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(26, 'Sonora', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(27, 'Tabasco', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(28, 'Tamaulipas', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(29, 'Tlaxcala', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(30, 'Veracruz', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(31, 'Yucatán', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(32, 'Zacatecas', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transmission`
--

CREATE TABLE `transmission` (
  `id` int(11) NOT NULL,
  `type` varchar(15) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `transmission`
--

INSERT INTO `transmission` (`id`, `type`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
(1, 'Manual', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL),
(2, 'Automatic', '2023-05-21 16:39:12', '2023-05-21 16:39:12', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `googleId` varchar(255) DEFAULT NULL,
  `first_name` varchar(75) NOT NULL,
  `last_name_1` varchar(75) NOT NULL,
  `last_name_2` varchar(75) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `dealership` int(11) DEFAULT NULL,
  `user_role` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`googleId`, `first_name`, `last_name_1`, `last_name_2`, `email`, `dealership`, `user_role`, `createdAt`, `updatedAt`, `deleted`, `deletedAt`) VALUES
('1', 'Admin', 'Donut', 'Motors', 'donutmotors.4dm1n@gmail.com', 6, 1, '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL),
('2', 'Capturist', 'Donut', 'Motors', 'donutmotors.c4ptur15t@gmail.com', 6, 2, '2023-05-21 16:39:13', '2023-05-21 16:39:13', 0, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_firstname` (`customer_firstname`) USING BTREE,
  ADD KEY `customer_lastname_1` (`customer_lastname_1`) USING BTREE,
  ADD KEY `customer_lastname_2` (`customer_lastname_2`) USING BTREE,
  ADD KEY `email` (`email`) USING BTREE,
  ADD KEY `telephone` (`telephone`) USING BTREE,
  ADD KEY `appointment_date` (`appointment_date`) USING BTREE,
  ADD KEY `dealership` (`dealership`) USING BTREE,
  ADD KEY `car` (`car`) USING BTREE;

--
-- Indices de la tabla `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`vin`),
  ADD KEY `purchase_price` (`purchase_price`) USING BTREE,
  ADD KEY `sale_price` (`sale_price`) USING BTREE,
  ADD KEY `maintenance_cost` (`maintenance_cost`) USING BTREE,
  ADD KEY `model` (`model`) USING BTREE,
  ADD KEY `car_image` (`car_image`(768)) USING BTREE,
  ADD KEY `ccondition` (`ccondition`) USING BTREE,
  ADD KEY `interior_color` (`interior_color`) USING BTREE,
  ADD KEY `exterior_color` (`exterior_color`) USING BTREE,
  ADD KEY `dealership` (`dealership`) USING BTREE,
  ADD KEY `sold` (`sold`) USING BTREE,
  ADD KEY `mileage` (`mileage`) USING BTREE,
  ADD KEY `createdAt` (`createdAt`) USING BTREE;

--
-- Indices de la tabla `car_category`
--
ALTER TABLE `car_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`) USING BTREE;

--
-- Indices de la tabla `car_condition`
--
ALTER TABLE `car_condition`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type` (`type`) USING BTREE;

--
-- Indices de la tabla `car_model`
--
ALTER TABLE `car_model`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`) USING BTREE,
  ADD KEY `transmission` (`transmission`) USING BTREE,
  ADD KEY `color` (`color`) USING BTREE,
  ADD KEY `category` (`category`) USING BTREE,
  ADD KEY `maker` (`maker`) USING BTREE,
  ADD KEY `factory_price` (`factory_price`) USING BTREE,
  ADD KEY `year` (`year`) USING BTREE;

--
-- Indices de la tabla `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`) USING BTREE;

--
-- Indices de la tabla `dealership`
--
ALTER TABLE `dealership`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`) USING BTREE,
  ADD KEY `postal_code` (`postal_code`) USING BTREE;

--
-- Indices de la tabla `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dealership` (`dealership`) USING BTREE,
  ADD KEY `first_name` (`first_name`) USING BTREE,
  ADD KEY `last_name_1` (`last_name_1`) USING BTREE,
  ADD KEY `last_name_2` (`last_name_2`) USING BTREE,
  ADD KEY `createdAt` (`createdAt`) USING BTREE;

--
-- Indices de la tabla `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ip` (`ip`) USING BTREE,
  ADD KEY `method` (`method`(768)) USING BTREE,
  ADD KEY `createdAt` (`createdAt`) USING BTREE;

--
-- Indices de la tabla `maintenance`
--
ALTER TABLE `maintenance`
  ADD PRIMARY KEY (`maintenance_type`,`car`),
  ADD KEY `fk_car_2` (`car`);

--
-- Indices de la tabla `maintenance_type`
--
ALTER TABLE `maintenance_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `concept` (`concept`) USING BTREE;

--
-- Indices de la tabla `maker`
--
ALTER TABLE `maker`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`) USING BTREE;

--
-- Indices de la tabla `postal_code`
--
ALTER TABLE `postal_code`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_state_1` (`state`),
  ADD KEY `code` (`code`) USING BTREE;

--
-- Indices de la tabla `price`
--
ALTER TABLE `price`
  ADD PRIMARY KEY (`id`),
  ADD KEY `percentage` (`percentage`) USING BTREE,
  ADD KEY `concept` (`concept`) USING BTREE;

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`) USING BTREE;

--
-- Indices de la tabla `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `hour` (`hour`);

--
-- Indices de la tabla `sell`
--
ALTER TABLE `sell`
  ADD PRIMARY KEY (`appointment`,`employee`),
  ADD KEY `fk_employee` (`employee`),
  ADD KEY `createdAt` (`createdAt`) USING BTREE;

--
-- Indices de la tabla `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`sid`);

--
-- Indices de la tabla `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`) USING BTREE;

--
-- Indices de la tabla `transmission`
--
ALTER TABLE `transmission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type` (`type`) USING BTREE;

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `googleId` (`googleId`),
  ADD KEY `fk_dealership` (`dealership`),
  ADD KEY `first_name` (`first_name`) USING BTREE,
  ADD KEY `last_name_1` (`last_name_1`) USING BTREE,
  ADD KEY `last_name_2` (`last_name_2`) USING BTREE,
  ADD KEY `user_role` (`user_role`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `car_category`
--
ALTER TABLE `car_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `car_condition`
--
ALTER TABLE `car_condition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `car_model`
--
ALTER TABLE `car_model`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `color`
--
ALTER TABLE `color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `dealership`
--
ALTER TABLE `dealership`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `maintenance_type`
--
ALTER TABLE `maintenance_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `maker`
--
ALTER TABLE `maker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `postal_code`
--
ALTER TABLE `postal_code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `price`
--
ALTER TABLE `price`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `state`
--
ALTER TABLE `state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `transmission`
--
ALTER TABLE `transmission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `fk_car` FOREIGN KEY (`car`) REFERENCES `car` (`vin`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_dealership_3` FOREIGN KEY (`dealership`) REFERENCES `dealership` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `fk_ccondition` FOREIGN KEY (`ccondition`) REFERENCES `car_condition` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_dealership_2` FOREIGN KEY (`dealership`) REFERENCES `dealership` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_exterior_color` FOREIGN KEY (`exterior_color`) REFERENCES `color` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_interior_color` FOREIGN KEY (`interior_color`) REFERENCES `color` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_model` FOREIGN KEY (`model`) REFERENCES `car_model` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `car_model`
--
ALTER TABLE `car_model`
  ADD CONSTRAINT `fk_category` FOREIGN KEY (`category`) REFERENCES `car_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_color` FOREIGN KEY (`color`) REFERENCES `color` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_maker` FOREIGN KEY (`maker`) REFERENCES `maker` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_transmission` FOREIGN KEY (`transmission`) REFERENCES `transmission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `dealership`
--
ALTER TABLE `dealership`
  ADD CONSTRAINT `fk_postal_code` FOREIGN KEY (`postal_code`) REFERENCES `postal_code` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `fk_dealership_4` FOREIGN KEY (`dealership`) REFERENCES `dealership` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `maintenance`
--
ALTER TABLE `maintenance`
  ADD CONSTRAINT `fk_car_2` FOREIGN KEY (`car`) REFERENCES `car` (`vin`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_maintenance_type` FOREIGN KEY (`maintenance_type`) REFERENCES `maintenance_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `postal_code`
--
ALTER TABLE `postal_code`
  ADD CONSTRAINT `fk_state_1` FOREIGN KEY (`state`) REFERENCES `state` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sell`
--
ALTER TABLE `sell`
  ADD CONSTRAINT `fk_appointment` FOREIGN KEY (`appointment`) REFERENCES `appointment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_employee` FOREIGN KEY (`employee`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_dealership` FOREIGN KEY (`dealership`) REFERENCES `dealership` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_role` FOREIGN KEY (`user_role`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
