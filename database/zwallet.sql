-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for zwallet
CREATE DATABASE IF NOT EXISTS `zwallet` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `zwallet`;

-- Dumping structure for table zwallet.post_image
CREATE TABLE IF NOT EXISTS `post_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table zwallet.post_image: ~0 rows (approximately)
/*!40000 ALTER TABLE `post_image` DISABLE KEYS */;
INSERT INTO `post_image` (`id`, `photo`) VALUES
	(1, 'http://localhost:3000/photo/photo-1607030285247.gif');
/*!40000 ALTER TABLE `post_image` ENABLE KEYS */;

-- Dumping structure for table zwallet.role
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table zwallet.role: ~2 rows (approximately)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`id`, `roleName`) VALUES
	(1, 'Admin'),
	(2, 'User');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- Dumping structure for table zwallet.topup
CREATE TABLE IF NOT EXISTS `topup` (
  `idTopUp` varchar(128) NOT NULL,
  `senderName` varchar(50) NOT NULL,
  `idReceiver` varchar(128) NOT NULL DEFAULT '',
  `amount` decimal(15,0) NOT NULL DEFAULT '0',
  `topUpDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text,
  PRIMARY KEY (`idTopUp`),
  KEY `topup-idReceiverToIdUser` (`idReceiver`),
  CONSTRAINT `topup-idReceiverToIdUser` FOREIGN KEY (`idReceiver`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table zwallet.topup: ~0 rows (approximately)
/*!40000 ALTER TABLE `topup` DISABLE KEYS */;
/*!40000 ALTER TABLE `topup` ENABLE KEYS */;

-- Dumping structure for table zwallet.transfers
CREATE TABLE IF NOT EXISTS `transfers` (
  `idTransfer` varchar(128) NOT NULL,
  `idSender` varchar(128) DEFAULT NULL,
  `idReceiver` varchar(128) DEFAULT NULL,
  `amount` decimal(15,0) DEFAULT '0',
  `transferDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `notes` text,
  PRIMARY KEY (`idTransfer`),
  KEY `transfers-receiverToIdUser` (`idReceiver`),
  KEY `transfers-senderToIdUser` (`idSender`),
  CONSTRAINT `transfers-receiverToIdUser` FOREIGN KEY (`idReceiver`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transfers-senderToIdUser` FOREIGN KEY (`idSender`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table zwallet.transfers: ~11 rows (approximately)
/*!40000 ALTER TABLE `transfers` DISABLE KEYS */;
INSERT INTO `transfers` (`idTransfer`, `idSender`, `idReceiver`, `amount`, `transferDate`, `notes`) VALUES
	('1b060385-fd4f-4a89-a4fd-d756a4d6d553', '558e8d40-046a-47b2-8adb-8141068104b5', 'fd66af09-f939-4b47-a52c-904450146fa2', 1232, '2021-02-01 04:10:08', 'qwe'),
	('2882c336-5499-4228-80cf-5e2dba6832f4', '558e8d40-046a-47b2-8adb-8141068104b5', 'fd66af09-f939-4b47-a52c-904450146fa2', 1233, '2021-02-01 04:09:04', 'q'),
	('2e8bca2d-6c73-4ddc-a874-7403fc3e2ca6', '558e8d40-046a-47b2-8adb-8141068104b5', 'fd66af09-f939-4b47-a52c-904450146fa2', 1000000, '2021-01-31 22:30:25', 'asd'),
	('62a712ca-c932-4c1e-a55f-8072b778f6f4', '558e8d40-046a-47b2-8adb-8141068104b5', 'fd66af09-f939-4b47-a52c-904450146fa2', 123123, '2021-01-31 22:29:08', 'wadaw'),
	('6a84a2ec-ceb4-40af-ad7f-76f7b5683910', 'f3e5a0f1-4922-4d73-bc71-d098c1722d4f', 'fd66af09-f939-4b47-a52c-904450146fa2', 213123, '2021-02-01 19:55:43', '2'),
	('7ace84d1-99ab-4595-8ce8-797a2fa4dac9', 'f3e5a0f1-4922-4d73-bc71-d098c1722d4f', 'fd66af09-f939-4b47-a52c-904450146fa2', 123, '2021-02-01 19:55:30', 'qwe'),
	('8e38804c-00d8-40c3-9174-d3e5c4e308cc', 'f3e5a0f1-4922-4d73-bc71-d098c1722d4f', 'fd66af09-f939-4b47-a52c-904450146fa2', 123, '2021-02-01 19:33:28', '123'),
	('9cea01e5-5da8-4454-a2f2-947204c0b8f3', 'f3e5a0f1-4922-4d73-bc71-d098c1722d4f', 'fd66af09-f939-4b47-a52c-904450146fa2', 12313, '2021-02-01 19:56:04', 'qweqwe'),
	('c66cff85-185c-44b2-9fcb-5be7413537c7', '558e8d40-046a-47b2-8adb-8141068104b5', 'fd66af09-f939-4b47-a52c-904450146fa2', 123312, '2021-01-31 21:08:03', 'qeqwe'),
	('cfd5b061-e6ee-4dc3-adee-d906a2b0f256', 'f3e5a0f1-4922-4d73-bc71-d098c1722d4f', 'fd66af09-f939-4b47-a52c-904450146fa2', 122, '2021-02-01 19:19:38', '123'),
	('d6251dfe-fda3-4801-a1e7-7980b9c40040', 'f3e5a0f1-4922-4d73-bc71-d098c1722d4f', 'fd66af09-f939-4b47-a52c-904450146fa2', 132, '2021-02-01 19:55:16', '123');
/*!40000 ALTER TABLE `transfers` ENABLE KEYS */;

-- Dumping structure for table zwallet.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(128) NOT NULL,
  `roleId` int(11) NOT NULL DEFAULT '2',
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) DEFAULT NULL,
  `email` varchar(25) NOT NULL,
  `emailStatus` int(11) DEFAULT '0',
  `photo` varchar(128) DEFAULT NULL,
  `password` varchar(128) NOT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `phoneNumberSecond` varchar(15) DEFAULT NULL,
  `balance` decimal(15,0) DEFAULT NULL,
  `pin` varchar(6) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `roleId` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table zwallet.users: ~3 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `roleId`, `firstName`, `lastName`, `email`, `emailStatus`, `photo`, `password`, `phoneNumber`, `phoneNumberSecond`, `balance`, `pin`, `createdAt`, `updatedAt`) VALUES
	('558e8d40-046a-47b2-8adb-8141068104b5', 2, 'gefy', 'aqiiLAH', 'gefyaqiilah2@gmail.com', 1, 'http://localhost:4000/photo/photo-1612100743399.png', '$2b$10$NHMJe718il/z9zk83hQH0.0PyxjoxXuFLqDIhwr72smk50lA5Jm6u', '306598498498498', NULL, 997535, '696969', '2020-12-14 02:12:14', '2021-01-31 20:45:01'),
	('f3e5a0f1-4922-4d73-bc71-d098c1722d4f', 2, 'haloweeee', 'awdawwwwwdawdawdawdawdawd', 'gefyaqiilah26@gmail.com', 1, 'http://localhost:4000/photo/photo-1612185402481.png', '$2b$10$ApHS5z8w9z2ccvYFMO4VXuL1cHc67ZN9cS.G.GxZdzhod1TLjsi1m', '123213123123', '123123123', 274064, '222222', '2021-02-01 15:17:58', '2021-02-02 06:46:03'),
	('fd66af09-f939-4b47-a52c-904450146fa2', 2, 'bullnerd', 'awd', 'gefybullnerd@gmail.com', 1, NULL, '$2b$10$7.ud1r/Dvx1YNKeobalhIOBNBpH.l8yGRbiA653wU1LZpBZXXDTVO', NULL, NULL, 3037725, '123321', '2020-12-09 11:14:31', '2020-12-13 21:27:48');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
