-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2016 at 11:04 AM
-- Server version: 5.7.11-log
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `church`
--

-- --------------------------------------------------------

--
-- Table structure for table `buildings`
--

CREATE TABLE `buildings` (
  `BuildingID` int(11) NOT NULL,
  `BuildingName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buildings`
--

INSERT INTO `buildings` (`BuildingID`, `BuildingName`) VALUES
(1, 'Hall'),
(2, 'Church'),
(3, 'Way Inn');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `ItemID` int(11) NOT NULL,
  `ItemName` varchar(50) NOT NULL,
  `ItemDesc` varchar(200) NOT NULL,
  `Organisation` int(11) NOT NULL,
  `ItemNotes` varchar(200) NOT NULL,
  `Asset` tinyint(1) NOT NULL,
  `Value` float NOT NULL DEFAULT '0',
  `Storage` int(11) NOT NULL,
  `Ref` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`ItemID`, `ItemName`, `ItemDesc`, `Organisation`, `ItemNotes`, `Asset`, `Value`, `Storage`, `Ref`) VALUES
(1, 'Plastic Goals', 'Red Plastic Goals', 1, '', 0, 0, 2, ''),
(2, 'Table Tennis Table', 'Table Tennis Table', 1, '', 1, 100, 2, '');

-- --------------------------------------------------------

--
-- Table structure for table `organsations`
--

CREATE TABLE `organsations` (
  `OrganisationID` int(11) NOT NULL,
  `OrganisationName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `organsations`
--

INSERT INTO `organsations` (`OrganisationID`, `OrganisationName`) VALUES
(1, 'Boys Brigade'),
(2, 'Girls Brigade');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `RoomID` int(11) NOT NULL,
  `RoomName` varchar(20) NOT NULL,
  `Building` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`RoomID`, `RoomName`, `Building`) VALUES
(1, 'Hall', 1),
(2, 'G1', 1),
(3, 'G2', 1),
(4, 'G3', 1),
(5, 'G4 Under 5''s', 1),
(6, 'Lounge', 1),
(7, 'Shutter store', 1),
(8, 'Entrance', 1),
(9, 'Upstairs', 1),
(10, 'L1', 1),
(11, 'L2', 1),
(12, 'L3 Comfy chairs', 1),
(13, 'Prayer room', 1),
(14, 'Office', 1),
(15, 'Boiler room', 1),
(16, 'Reception', 2),
(17, 'Lounge', 2),
(18, 'Church', 2),
(19, 'Music room', 2),
(20, 'Vestry', 2),
(21, 'Kitchen', 2),
(22, 'Boiler room', 2),
(23, 'Vault 1', 2),
(24, 'Vault 2', 2),
(25, 'Vault 3', 2),
(26, 'Vault 4', 2),
(27, 'Prayer Room', 2);

-- --------------------------------------------------------

--
-- Table structure for table `storage`
--

CREATE TABLE `storage` (
  `StorageID` int(11) NOT NULL,
  `StorageName` varchar(20) NOT NULL,
  `MainContents` varchar(100) NOT NULL,
  `Room` int(11) NOT NULL,
  `Notes` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `storage`
--

INSERT INTO `storage` (`StorageID`, `StorageName`, `MainContents`, `Room`, `Notes`) VALUES
(1, 'AV Cupboard', 'AV Equipment', 1, ''),
(2, 'Room', 'Large Games', 2, ''),
(3, 'Left', 'Cleaner', 2, ''),
(4, 'Middle Bottom', '', 2, ''),
(5, 'Middle Top', '', 2, ''),
(6, 'Right Bottom', '', 2, ''),
(7, 'Right Top', '', 2, ''),
(8, 'Room', '', 3, ''),
(9, 'Left', 'Tables', 3, ''),
(10, 'Middle Left', 'Chairs', 3, ''),
(11, 'Right Bottom', 'GB', 3, ''),
(12, 'Right Top', 'GB', 3, ''),
(13, 'Middle Right Bottom', 'Fusion', 3, ''),
(14, 'Middle Right Top', 'Fusion', 3, ''),
(15, 'Room', '', 4, ''),
(16, 'Left', 'Small Tables', 4, ''),
(17, 'Middle Left', 'Chairs', 4, ''),
(18, 'Right Bottom', '?', 4, ''),
(19, 'Right Top', '', 4, ''),
(20, 'Middle Right Bottom', 'Bubbles & Busy Bees', 4, ''),
(21, 'Middle Right Top', '', 4, ''),
(22, 'Room', '', 5, ''),
(23, 'Left', 'Playgroup', 5, ''),
(24, 'Middle Bottom', 'Playgroup', 5, ''),
(25, 'Middle Top', 'Playgroup', 5, ''),
(26, 'Right Bottom', 'Playgroup', 5, ''),
(27, 'Right Top', 'Playgroup', 5, ''),
(28, 'Below', 'All Aboard', 7, ''),
(29, 'Above', '', 7, ''),
(30, 'FMT Cupboard', 'FMT items for courses', 18, ''),
(31, 'Cleaners cupboard', 'Cleaners Items plus AV equipment', 18, ''),
(32, 'Loft Space', '', 27, ''),
(33, 'Top Left', 'Chreche', 17, ''),
(34, 'Bottom Left', 'Chairs', 17, ''),
(35, 'Bottom Right', 'Creche', 17, ''),
(36, 'Top Right', 'Creche', 17, ''),
(37, 'Wall cupboard', 'Cards etc', 16, ''),
(38, 'Room', 'Church Musical equipment', 19, '');

-- --------------------------------------------------------

--
-- Stand-in structure for view `vitems`
--
CREATE TABLE `vitems` (
`BuildingName` varchar(20)
,`RoomName` varchar(20)
,`StorageName` varchar(20)
,`OrganisationName` varchar(50)
,`ItemName` varchar(50)
,`ItemDesc` varchar(200)
,`Asset` varchar(1)
,`Value` float
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vstorage`
--
CREATE TABLE `vstorage` (
`StorageID` int(11)
,`BuildingName` varchar(20)
,`RoomName` varchar(20)
,`StorageName` varchar(20)
,`MainContents` varchar(100)
);

-- --------------------------------------------------------

--
-- Structure for view `vitems`
--
DROP TABLE IF EXISTS `vitems`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vitems`  AS  select `buildings`.`BuildingName` AS `BuildingName`,`rooms`.`RoomName` AS `RoomName`,`storage`.`StorageName` AS `StorageName`,`organsations`.`OrganisationName` AS `OrganisationName`,`items`.`ItemName` AS `ItemName`,`items`.`ItemDesc` AS `ItemDesc`,(select (case `items`.`Asset` when 1 then 'Y' else 'N' end)) AS `Asset`,`items`.`Value` AS `Value` from ((((`buildings` join `storage`) join `rooms`) join `organsations`) join `items`) where ((`buildings`.`BuildingID` = `rooms`.`Building`) and (`rooms`.`RoomID` = `storage`.`Room`) and (`storage`.`StorageID` = `items`.`Storage`) and (`items`.`Organisation` = `organsations`.`OrganisationID`)) ;

-- --------------------------------------------------------

--
-- Structure for view `vstorage`
--
DROP TABLE IF EXISTS `vstorage`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vstorage`  AS  select `storage`.`StorageID` AS `StorageID`,`buildings`.`BuildingName` AS `BuildingName`,`rooms`.`RoomName` AS `RoomName`,`storage`.`StorageName` AS `StorageName`,`storage`.`MainContents` AS `MainContents` from ((`storage` join `buildings`) join `rooms`) where ((`storage`.`Room` = `rooms`.`RoomID`) and (`buildings`.`BuildingID` = `rooms`.`Building`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buildings`
--
ALTER TABLE `buildings`
  ADD UNIQUE KEY `id_building` (`BuildingID`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD UNIQUE KEY `ItemID` (`ItemID`);

--
-- Indexes for table `organsations`
--
ALTER TABLE `organsations`
  ADD UNIQUE KEY `OrganisationID` (`OrganisationID`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`RoomID`);

--
-- Indexes for table `storage`
--
ALTER TABLE `storage`
  ADD PRIMARY KEY (`StorageID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
