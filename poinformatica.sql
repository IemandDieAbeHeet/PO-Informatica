-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 30 dec 2020 om 23:54
-- Serverversie: 10.4.13-MariaDB
-- PHP-versie: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `poinformatica`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `klasId` int(11) DEFAULT NULL,
  `userUsername` varchar(250) NOT NULL,
  `userEmail` varchar(535) NOT NULL,
  `userVolledigenaam` varchar(535) NOT NULL,
  `userPassword` varchar(535) NOT NULL,
  `userType` varchar(255) NOT NULL DEFAULT 'Leerling',
  `userScore` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `woordjes`
--

CREATE TABLE `woordjes` (
  `woordenLijstId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `woordenLijstNaam` varchar(535) NOT NULL,
  `taalOrigineel` varchar(535) NOT NULL,
  `taalVertaald` varchar(535) NOT NULL,
  `woordenAantal` int(11) NOT NULL,
  `woordenArray` varchar(535) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexen voor tabel `woordjes`
--
ALTER TABLE `woordjes`
  ADD PRIMARY KEY (`woordenLijstId`),
  ADD KEY `userId` (`userId`) USING BTREE;

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `woordjes`
--
ALTER TABLE `woordjes`
  MODIFY `woordenLijstId` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
