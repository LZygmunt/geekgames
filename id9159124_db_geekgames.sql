-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 05 Maj 2019, 10:38
-- Wersja serwera: 10.3.12-MariaDB
-- Wersja PHP: 7.2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `id9159124_db_geekgames`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `content` text COLLATE utf8_polish_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `connections_with_games`
--

CREATE TABLE `connections_with_games` (
  `id_game` int(11) NOT NULL,
  `id_user` int(11) NOT NULL COMMENT 'kto dodał gre, post lub komentarz',
  `id_post` int(11) DEFAULT NULL,
  `id_comment` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `event_followers`
--

CREATE TABLE `event_followers` (
  `id_event` int(11) NOT NULL,
  `id_user` int(11) NOT NULL COMMENT 'obserwujący wydarzenie'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `game`
--

CREATE TABLE `game` (
  `id` int(11) NOT NULL,
  `title` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `content` text COLLATE utf8_polish_ci NOT NULL,
  `background_img` text COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `game_followers`
--

CREATE TABLE `game_followers` (
  `id_game` int(11) NOT NULL,
  `id_user` int(11) NOT NULL COMMENT 'obserwujący gre'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` varchar(100) COLLATE utf8_polish_ci NOT NULL,
  `content` text COLLATE utf8_polish_ci NOT NULL,
  `date` date NOT NULL,
  `place` text COLLATE utf8_polish_ci DEFAULT NULL,
  `is_event` tinyint(1) NOT NULL,
  `background_img` text COLLATE utf8_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nick` varchar(30) COLLATE utf8_polish_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `password` varchar(70) COLLATE utf8_polish_ci NOT NULL,
  `content` text COLLATE utf8_polish_ci DEFAULT NULL,
  `avatar_img` text COLLATE utf8_polish_ci DEFAULT NULL,
  `city` varchar(70) COLLATE utf8_polish_ci NOT NULL,
  `theme` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `connections_with_games`
--
ALTER TABLE `connections_with_games`
  ADD KEY `link_to_game` (`id_game`),
  ADD KEY `link_to_user` (`id_user`),
  ADD KEY `lnik_to_post` (`id_post`),
  ADD KEY `lnik_to_comment` (`id_comment`);

--
-- Indeksy dla tabeli `event_followers`
--
ALTER TABLE `event_followers`
  ADD KEY `lnik_to_event` (`id_event`),
  ADD KEY `lnik_to_user` (`id_user`);

--
-- Indeksy dla tabeli `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `game_followers`
--
ALTER TABLE `game_followers`
  ADD KEY `lnik_to_game` (`id_game`),
  ADD KEY `lnik_to_user` (`id_user`);

--
-- Indeksy dla tabeli `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `game`
--
ALTER TABLE `game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`id`) REFERENCES `connections_with_games` (`id_comment`);

--
-- Ograniczenia dla tabeli `game`
--
ALTER TABLE `game`
  ADD CONSTRAINT `game_ibfk_1` FOREIGN KEY (`id`) REFERENCES `connections_with_games` (`id_game`),
  ADD CONSTRAINT `game_ibfk_2` FOREIGN KEY (`id`) REFERENCES `game_followers` (`id_game`);

--
-- Ograniczenia dla tabeli `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`id`) REFERENCES `connections_with_games` (`id_post`),
  ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`id`) REFERENCES `event_followers` (`id_event`);

--
-- Ograniczenia dla tabeli `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id`) REFERENCES `connections_with_games` (`id_user`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`id`) REFERENCES `event_followers` (`id_user`),
  ADD CONSTRAINT `user_ibfk_3` FOREIGN KEY (`id`) REFERENCES `game_followers` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
