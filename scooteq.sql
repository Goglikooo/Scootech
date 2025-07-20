-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 20. Jul 2025 um 12:29
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `scooteq`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pricing`
--

CREATE TABLE `pricing` (
  `id` int(11) NOT NULL,
  `startingFee` decimal(5,2) NOT NULL,
  `price_per_km` decimal(5,2) DEFAULT NULL,
  `price_per_minute` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `pricing`
--

INSERT INTO `pricing` (`id`, `startingFee`, `price_per_km`, `price_per_minute`) VALUES
(1, 1.00, 0.75, 0.25);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `rides`
--

CREATE TABLE `rides` (
  `id` int(11) NOT NULL,
  `start_punkt` varchar(100) DEFAULT NULL,
  `end_punkt` varchar(100) DEFAULT NULL,
  `datum` date DEFAULT NULL,
  `zeit` time DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `calculation_results` decimal(5,2) DEFAULT NULL,
  `pricing_type` enum('per_km','per_minute') NOT NULL,
  `distance_km` decimal(5,2) DEFAULT NULL,
  `pricing_id` int(11) DEFAULT NULL,
  `scooter_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `rides`
--

INSERT INTO `rides` (`id`, `start_punkt`, `end_punkt`, `datum`, `zeit`, `duration`, `calculation_results`, `pricing_type`, `distance_km`, `pricing_id`, `scooter_id`) VALUES
(33, 'Hamburg', 'Hannover', '2025-07-20', '11:24:30', 6, 1.03, 'per_km', 200.00, 1, 3),
(34, 'HH', 'Köln', '2025-07-20', '11:25:40', 1, 1.01, 'per_minute', 0.00, 1, 2),
(37, 'Hamburg', 'Kiel', '2025-07-20', '11:57:10', 9, 1.04, 'per_minute', 0.00, 1, 2),
(38, 'Köln', 'Hamburg', '2025-07-20', '12:00:24', 8, 1.03, 'per_km', 10.00, 1, 1),
(41, 'Kiel', 'Köln', '2025-07-20', '12:18:33', 3, 1.01, 'per_km', 20.00, 1, 3),
(42, 'rtz', 'rthjrth', '2025-07-20', '12:19:49', 5, 1.02, 'per_minute', 0.00, 1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `scooters`
--

CREATE TABLE `scooters` (
  `id` int(11) NOT NULL,
  `scooter_number` varchar(50) NOT NULL,
  `pricing_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `scooters`
--

INSERT INTO `scooters` (`id`, `scooter_number`, `pricing_id`) VALUES
(1, 'SCOOT-001', 1),
(2, 'SCOOT-002', 1),
(3, 'SCOOT-003', 1);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `pricing`
--
ALTER TABLE `pricing`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `rides`
--
ALTER TABLE `rides`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rides_pricing` (`pricing_id`),
  ADD KEY `fk_rides_scooter` (`scooter_id`);

--
-- Indizes für die Tabelle `scooters`
--
ALTER TABLE `scooters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pricing_id` (`pricing_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `pricing`
--
ALTER TABLE `pricing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `rides`
--
ALTER TABLE `rides`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT für Tabelle `scooters`
--
ALTER TABLE `scooters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `rides`
--
ALTER TABLE `rides`
  ADD CONSTRAINT `fk_rides_pricing` FOREIGN KEY (`pricing_id`) REFERENCES `pricing` (`id`),
  ADD CONSTRAINT `fk_rides_scooter` FOREIGN KEY (`scooter_id`) REFERENCES `scooters` (`id`);

--
-- Constraints der Tabelle `scooters`
--
ALTER TABLE `scooters`
  ADD CONSTRAINT `scooters_ibfk_1` FOREIGN KEY (`pricing_id`) REFERENCES `pricing` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
