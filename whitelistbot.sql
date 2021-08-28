-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Czas generowania: 28 Sie 2021, 14:07
-- Wersja serwera: 5.7.34-0ubuntu0.18.04.1
-- Wersja PHP: 7.2.24-0ubuntu0.18.04.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `whitelistbot`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `whitelistbot`
--

CREATE TABLE `whitelistbot` (
  `id` int(11) NOT NULL,
  `userkey` varchar(255) NOT NULL,
  `discord_id` varchar(255) NOT NULL,
  `hwid` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `Blacklisted` varchar(255) NOT NULL,
  `Reason` varchar(255) NOT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `expire_at` varchar(255) DEFAULT NULL,
  `redeemed` varchar(255) NOT NULL,
  `change_ip` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `whitelistbot`
--
ALTER TABLE `whitelistbot`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `whitelistbot`
--
ALTER TABLE `whitelistbot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
