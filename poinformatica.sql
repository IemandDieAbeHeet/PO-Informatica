-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 18 dec 2020 om 23:44
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
  `userId` int(11) NOT NULL,
  `klasId` int(11) DEFAULT NULL,
  `userUsername` varchar(250) NOT NULL,
  `userEmail` varchar(535) NOT NULL,
  `userVolledigenaam` varchar(535) NOT NULL,
  `userPassword` varchar(535) NOT NULL,
  `userType` varchar(255) NOT NULL DEFAULT 'Leerling',
  `userScore` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`userId`, `klasId`, `userUsername`, `userEmail`, `userVolledigenaam`, `userPassword`, `userType`, `userScore`) VALUES
(2, 1, 'test', 'test@test.com', 'Henk Duits', '$2y$10$paOGAPstKYzZJU/I99NanOitDwJj/526SOc9H7veNrievMCOTGAHq', 'Leerling', 0),
(3, NULL, 'leraar', 'leraar@mail.com', 'Hans Nederlands', '$2y$10$wYpd1sXopswej4gtxhWRc.99wqOW2K.N9Sm.N9o5NIgrMaY2EXEAO', 'Leraar', 0),
(4, 1, 'test1', 'testen@mail.nl', 'Sjon Sjaak', '$2y$10$fkXkNxPv/KC/NVOBory5dOBefuLOD7fzT2lcB/9l89ewX1hwVBAsG', 'Leerling', 0),
(5, 1, 'test2', 'tes12t@test.com', 'Piet Paal', '$2y$10$tOkEPVM2T0qwSCancM3PAudf0syIE5xPidy4RIGN9ydF5GNK.5Qny', 'Leerling', 0);

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
  `woordOrigineel` varchar(535) NOT NULL,
  `woordVertaling` varchar(535) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `woordjes`
--

INSERT INTO `woordjes` (`woordenLijstId`, `userId`, `woordenLijstNaam`, `taalOrigineel`, `taalVertaald`, `woordenAantal`, `woordOrigineel`, `woordVertaling`) VALUES
(1, 1, 'Poep', 'Duits', 'Nederlands', 6, 'shid,rgr,rhh,h,hrhrh,t', 't,grgrghr,rh,hhrh,rh,t'),
(2, 1, 'HBRHRHHR', 'Nederlands', 'Duits', 1, 'RTN', 'RN'),
(3, 1, 'Duits', 'Nederlands', 'Duits', 18, 'Wonen,Blijven,Eten,Staan,Stoel,Met,Gaan,Zitten,Bed,Snelweg,Braadworst,Feest,Leider,Langlaufen,Ober,Poep,Bijverdienste,Verspreiden', 'Wohnen,Bleiben,Essen,Stehen,Stuhl,Mit,Gehen,Setzen,Bett,Autobahn,Bratwurst,Fest,Führer,Langlaufen,Ober,Scheiße,Schnabbel,Schwärmen'),
(4, 1, 'BEgeg', 'Nederlands', 'Nederlands', 1, 'BRB', 'bRE');

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
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT voor een tabel `woordjes`
--
ALTER TABLE `woordjes`
  MODIFY `woordenLijstId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
