-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 31 dec 2020 om 00:04
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
-- Tabelstructuur voor tabel `klassen`
--

CREATE TABLE `klassen` (
  `klasId` int(11) NOT NULL,
  `klasNaam` varchar(255) NOT NULL,
  `klasNiveau` varchar(255) NOT NULL,
  `klasJaar` int(11) NOT NULL,
  `klasScore` int(11) NOT NULL,
  `klasDocentId` int(11) NOT NULL,
  `klasDocentNaam` varchar(535) NOT NULL,
  `klasCharacterData` text NOT NULL DEFAULT '[   {     "id": 0,     "type": "hoed",     "imageLocation": "url(\\"http://localhost/PO-Informatica/img/character/hoed/hoed1.png\\")",     "x": "73",     "y": "1"   },   {     "id": 1,     "type": "gezicht",     "imageLocation": "url(\\"http://localhost/PO-Informatica/img/character/gezicht/gezicht0.png\\")",     "x": "100",     "y": "20"   },   {     "id": 2,     "type": "buik",     "imageLocation": "url(\\"http://localhost/PO-Informatica/img/character/buik/buik0.png\\")",     "x": "102",     "y": "135"   },   {     "id": 3,     "type": "broek",     "imageLocation": "url(\\"http://localhost/PO-Informatica/img/character/broek/broek0.png\\")",     "x": "112",     "y": "195"   },   {     "id": 4,     "type": "schoenen",     "imageLocation": "url(\\"http://localhost/PO-Informatica/img/character/schoenen/schoen0.png\\")",     "x": "87",     "y": "273"   } ]',
  `klasCharacterUnlocksData` text NOT NULL DEFAULT '[{"id":"0","unlocked":true},{"id":"1","unlocked":false},{"id":"2","unlocked":false},{"id":"3","unlocked":true},{"id":"4","unlocked":false},{"id":"5","unlocked":false}, {"id":"6","unlocked":false} ]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `klassen`
--

INSERT INTO `klassen` (`klasId`, `klasNaam`, `klasNiveau`, `klasJaar`, `klasScore`, `klasDocentId`, `klasDocentNaam`, `klasCharacterData`, `klasCharacterUnlocksData`) VALUES
(1, 'v6du1', 'VWO', 6, 971, 3, 'Hesselberth', '[{\"id\":\"0\",\"type\":\"hoed\",\"imageLocation\":\"url(\\\"http:\\/\\/localhost\\/PO-Informatica\\/img\\/character\\/hoed\\/hoed0.png\\\")\",\"x\":\"73\",\"y\":\"1\"},{\"id\":\"1\",\"type\":\"gezicht\",\"imageLocation\":\"url(\\\"http:\\/\\/localhost\\/PO-Informatica\\/img\\/character\\/gezicht\\/gezicht0.png\\\")\",\"x\":\"100\",\"y\":\"20\"},{\"id\":\"3\",\"type\":\"buik\",\"imageLocation\":\"url(\\\"http:\\/\\/localhost\\/PO-Informatica\\/img\\/character\\/buik\\/buik0.png\\\")\",\"x\":\"102\",\"y\":\"135\"},{\"id\":\"3\",\"type\":\"broek\",\"imageLocation\":\"url(\\\"http:\\/\\/localhost\\/PO-Informatica\\/img\\/character\\/broek\\/broek0.png\\\")\",\"x\":\"112\",\"y\":\"195\"},{\"id\":\"4\",\"type\":\"schoenen\",\"imageLocation\":\"url(\\\"http:\\/\\/localhost\\/PO-Informatica\\/img\\/character\\/schoenen\\/schoen0.png\\\")\",\"x\":\"87\",\"y\":\"273\"}]', '[{\"id\":\"0\",\"unlocked\":true},{\"id\":\"1\",\"unlocked\":true},{\"id\":\"2\",\"unlocked\":true},{\"id\":\"3\",\"unlocked\":false},{\"id\":\"4\",\"unlocked\":false},{\"id\":\"5\",\"unlocked\":false},{\"id\":\"6\",\"unlocked\":false}]');

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
(1, 1, 'test', 'test@test.com', 'Abe Vriens', '$2y$10$paOGAPstKYzZJU/I99NanOitDwJj/526SOc9H7veNrievMCOTGAHq', 'Leerling', 1900),
(3, NULL, 'leraar', 'leraar@mail.com', 'Abe Leraar', '$2y$10$wYpd1sXopswej4gtxhWRc.99wqOW2K.N9Sm.N9o5NIgrMaY2EXEAO', 'Leraar', 300),
(4, 1, 'test1', 'yourick@mail.nl', 'Sjon Sjaak', '$2y$10$fkXkNxPv/KC/NVOBory5dOBefuLOD7fzT2lcB/9l89ewX1hwVBAsG', 'Leerling', 0),
(5, 1, 'test2', 'tes12t@test.com', 'Hans Hans', '$2y$10$tOkEPVM2T0qwSCancM3PAudf0syIE5xPidy4RIGN9ydF5GNK.5Qny', 'Leerling', 0);

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
-- Gegevens worden geëxporteerd voor tabel `woordjes`
--

INSERT INTO `woordjes` (`woordenLijstId`, `userId`, `woordenLijstNaam`, `taalOrigineel`, `taalVertaald`, `woordenAantal`, `woordenArray`) VALUES
(1, 1, 'Poep', 'Duits', 'Nederlands', 7, '[[\"hetijo\",\"oijoij\"],[\"iojjio\",\"ijoioj\"],[\"ijoioj\",\"iojiojjio\"],[\"iojjio\",\"oijjiooigtiorjeoirtge\"],[\"joioijj\",\"oijjio\"],[\"jiojiojoi\",\"iojjio\"],[\"ijojiojio\",\"jiojio\"]]'),
(3, 1, 'Duits', 'Nederlands', 'Duits', 11, '[[\"Gehen\",\"Gaan\"],[\"Laten\",\"Lassen\"],[\"Lopen\",\"Laufen\"],[\"Langlaufen\",\"Langlaufen\"],[\"Zitten\",\"Setzen\"],[\"Staan\",\"Stehen\"],[\"Springen\",\"Springen\"],[\"Liggen\",\"Liegen\"],[\"Drinken\",\"Trinken\"],[\"Eten\",\"Essen\"],[\"Braadworst\",\"Bratwurst\"]]'),
(27, 2, 'Duits woordjes', 'Nederlands', 'Duits', 2, '[[\"Gaan\",\"Gehen\"],[\"Proberen\",\"Probieren\"]]'),
(28, 1, 'ryu7i78o78', 'Nederlands', 'Duits', 2, '[[\"hyttyjtu\",\"jtyuktu\"],[\"gtju\",\"ghjkj\"]]'),
(29, 3, 'test', 'Nederlands', 'Duits', 1, '[[\"test\",\"test\"]]'),
(30, 1, 'test', 'Nederlands', 'Duits', 1, '[[\"test\",\"test\"]]');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `klassen`
--
ALTER TABLE `klassen`
  ADD PRIMARY KEY (`klasId`);

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
-- AUTO_INCREMENT voor een tabel `klassen`
--
ALTER TABLE `klassen`
  MODIFY `klasId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT voor een tabel `woordjes`
--
ALTER TABLE `woordjes`
  MODIFY `woordenLijstId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
