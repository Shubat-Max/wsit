-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2017 at 11:22 PM
-- Server version: 5.5.25
-- PHP Version: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `wsit_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE IF NOT EXISTS `payments` (
  `worker_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `toPay` int(11) NOT NULL DEFAULT '1',
  `bonus` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`worker_id`,`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`worker_id`, `date`, `toPay`, `bonus`) VALUES
(1, '2017-04-20', 1, 0),
(1, '2017-05-05', 1, 300),
(2, '2017-04-10', 1, 0),
(2, '2017-05-05', 1, 300),
(3, '2017-05-05', 1, 300),
(15, '2017-05-07', 1, 0),
(16, '2017-05-07', 1, 0),
(17, '2017-05-07', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `professions`
--

CREATE TABLE IF NOT EXISTS `professions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `professions`
--

INSERT INTO `professions` (`id`, `name`) VALUES
(1, 'Manager'),
(2, 'Accountant'),
(3, 'Courier');

-- --------------------------------------------------------

--
-- Table structure for table `workers`
--

CREATE TABLE IF NOT EXISTS `workers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `f_name` text NOT NULL,
  `s_name` text NOT NULL,
  `prof_id` int(11) NOT NULL,
  `salary` double NOT NULL,
  `portrait` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `workers`
--

INSERT INTO `workers` (`id`, `f_name`, `s_name`, `prof_id`, `salary`, `portrait`) VALUES
(1, 'Scott', 'Howard', 1, 2024, '41.jpg'),
(2, 'Derek', 'Ray', 1, 2675, '36.jpg'),
(3, 'Jeremiah', 'Campbell', 1, 2301, '80.jpg'),
(4, 'Terry', 'Spencer', 2, 2481, '11.jpg'),
(5, 'Melanie', 'Coleman', 2, 1503, '21.jpg'),
(6, 'Cathy', 'Holland', 2, 1069, '55.jpg'),
(7, 'Franklin', 'Richardson', 3, 920, '17.jpg'),
(8, 'Genesis', 'White', 3, 994, '66.jpg'),
(9, 'Brandie', 'Smith', 3, 711, '60.jpg'),
(15, 'Samantha', 'Courwell', 2, 1600, '1494124496812.jpg'),
(16, 'Klementine', 'Drake', 1, 3000, '14941249873763.jpg'),
(17, 'Another', 'Person', 2, 300, '1494125888175.jpg');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
