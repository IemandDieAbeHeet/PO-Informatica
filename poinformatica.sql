-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 06 dec 2020 om 01:58
-- Serverversie: 10.4.14-MariaDB
-- PHP-versie: 7.4.9

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
  `id` int(11) NOT NULL,
  `username` varchar(250) NOT NULL,
  `email` varchar(535) NOT NULL,
  `password` varchar(535) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'Test', 'test@mail.com', '$2y$10$kaUT2FwKD0PEJDnQgsMvGucLiojHIq2SBhowQ6w8aUEDRBkNlmoDy'),

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
  `woordOrigineel` varchar(535) NOT NULL,
  `woordVertaling` varchar(535) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `woordjes`
--

INSERT INTO `woordjes` (`woordenLijstId`, `userId`, `woordenLijstNaam`, `taalOrigineel`, `taalVertaald`, `woordOrigineel`, `woordVertaling`) VALUES
(2, 1, 'Shid', 'Nederlands', 'Nederlands', 'Poep', 'Shit'),
(3, 2, 'Shid', 'Nederlands', 'Nederlands', 'Test', 'test'),
(4, 2, 'Shid', 'Nederlands', 'Nederlands', 'Test', 'test'),
(5, 2, 'Vv', 'Nederlands', 'Nederlands', 'Test', 'test'),
(6, 2, 'BTR', 'Nederlands', 'Nederlands', 'Test', 'test'),
(7, 2, 'uk', 'Nederlands', 'Nederlands', 'Test', 'test'),
(8, 2, 'Poep', 'Nederlands', 'Nederlands', 'HasHpePRaalHPeo', 'plaspROGotoeFGv'),
(9, 2, 'HTHBEB', 'Nederlands', 'Nederlands', ', nbtent, nbtyr, bter', 'nteqnbtrrbt'),
(10, 2, 'Tanno', 'Nederlands', 'Nederlands', 'Tanno', 'tanno'),
(11, 2, 'Tanno', 'Nederlands', 'Nederlands', 'Tanno,Tanno', 'tanno,tanno'),
(12, 2, 'Tanno', 'Nederlands', 'Nederlands', 'Tanno,Tanno,b', 'tanno,tanno,b');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT voor een tabel `woordjes`
--
ALTER TABLE `woordjes`
  MODIFY `woordenLijstId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
