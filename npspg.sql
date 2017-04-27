-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 27, 2017 at 11:33 AM
-- Server version: 5.5.54-0+deb8u1
-- PHP Version: 5.6.29-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `npspg`
--

-- --------------------------------------------------------

--
-- Table structure for table `absen`
--

CREATE TABLE IF NOT EXISTS `absen` (
`id` int(11) NOT NULL,
  `kode_absen` varchar(15) NOT NULL,
  `kode_spg` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `jam_masuk` time DEFAULT NULL,
  `lokasi_masuk` varchar(255) DEFAULT NULL,
  `jam_pulang` time DEFAULT NULL,
  `lokasi_pulang` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `absen`
--

INSERT INTO `absen` (`id`, `kode_absen`, `kode_spg`, `tanggal`, `jam_masuk`, `lokasi_masuk`, `jam_pulang`, `lokasi_pulang`) VALUES
(1, 'ABS-00000000001', 'SPG-0001', '2017-04-23', '22:43:30', 'JAKARTA', '23:14:50', 'JAKARTA'),
(2, 'ABS-00000000002', 'SPG-0002', '2017-04-23', '23:44:29', 'BALI', NULL, NULL),
(3, 'ABS-00000000003', 'SPG-0003', '2017-04-24', '00:54:18', 'PAPUA', '01:16:51', 'PAPUA'),
(4, 'ABS-00000000004', 'SPG-0003', '2017-04-23', '23:56:32', 'PAPUA', NULL, NULL),
(5, 'ABS-00000000005', 'SPG-0002', '2017-04-24', '20:24:47', 'Jakarata', '20:25:07', 'Jalan Haji Saidi Guru II No.28-29, Gandaria Utara, Kebayoran Baru, Kota Jakarta Selatan, DKI Jakarta 12140');

-- --------------------------------------------------------

--
-- Stand-in structure for view `Absen_Report`
--
CREATE TABLE IF NOT EXISTS `Absen_Report` (
`kode_absen` varchar(15)
,`kode_spg` varchar(10)
,`nama_spg` varchar(50)
,`nama_toko` varchar(50)
,`depot` varchar(50)
,`tanggal` varchar(10)
,`jam_masuk` varchar(8)
,`lokasi_masuk` varchar(255)
,`jam_pulang` varchar(8)
,`lokasi_pulang` varchar(255)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `Daily_Product_Report`
--
CREATE TABLE IF NOT EXISTS `Daily_Product_Report` (
`kode_laporan` varchar(15)
,`kode_spg` varchar(10)
,`nama_spg` varchar(50)
,`nama_toko` varchar(50)
,`depot` varchar(50)
,`tanggal` date
,`ELASTEX` double(19,2)
,`WTB_RM` double(19,2)
,`MATEX_CAT_GENTENG_CCM` double(19,2)
,`MM_PRIMER` double(19,2)
,`STONESHIELD` double(19,2)
,`VINILEX_TINTING` double(19,2)
,`SPOT_LESS` double(19,2)
,`MM_CLEAR` double(19,2)
,`SPORTSKOTE_CCM` double(19,2)
,`WTB_SOLAREFLECT` double(19,2)
,`FLAW_LESS` double(19,2)
,`ROOF_COATING_RM` double(19,2)
,`TIMBERFINISH_RM` double(19,2)
,`BODELAC_2IN1_ANTI_KARAT` double(19,2)
,`VINILEX_RM` double(19,2)
,`MM_TOP_COAT` double(19,2)
,`NIPPON_9000` double(19,2)
,`SEALER_SERIES` double(19,2)
,`BW_SERIES` double(19,2)
,`WTB_CCM` double(19,2)
,`NIPPON_WOOD_STAIN` double(19,2)
,`SATIN_GLO` double(19,2)
,`VPRO_PPRO_MATEX_KIMEX_TINTING` double(19,2)
,`PLATONE_800_or_BEE_BRAND_1000` double(19,2)
,`NP_ZINC_CHROMATE_GREEN_or_BODELAC_8000_ZINC_CHROMATE` double(19,2)
,`ccm` int(11)
,`rm` int(11)
);
-- --------------------------------------------------------

--
-- Table structure for table `daily_report`
--

CREATE TABLE IF NOT EXISTS `daily_report` (
`id` int(11) NOT NULL,
  `kode_laporan` varchar(15) NOT NULL,
  `kode_spg` varchar(10) NOT NULL,
  `tanggal` date NOT NULL,
  `ccm` int(11) DEFAULT NULL,
  `rm` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `daily_report`
--

INSERT INTO `daily_report` (`id`, `kode_laporan`, `kode_spg`, `tanggal`, `ccm`, `rm`) VALUES
(1, 'LPD-00000000001', 'SPG-0005', '2017-04-23', 400000, 500000),
(2, 'LPD-00000000002', 'SPG-0005', '2017-04-24', 345000, 455000),
(3, 'LPD-00000000003', 'SPG-0003', '2017-04-27', 2300000, 3000000);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
`id` int(11) NOT NULL,
  `kode_spg` varchar(10) NOT NULL,
  `password` varchar(100) NOT NULL,
  `hak_akses` int(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `kode_spg`, `password`, `hak_akses`) VALUES
(1, 'SPG-0001', '5d6ef352e2f827c793dff20aecffc0c1', 3),
(2, 'SPG-0002', '88b837d69465f099300deec9d9686eb6', 1),
(3, 'SPG-0003', '5f4dcc3b5aa765d61d8327deb882cf99', 1),
(4, 'SPG-0004', '995c23fda1c9ba3318f63736cf5fe7ae', 1),
(5, 'SPG-0005', 'c6d47a284d273b143eacd3997804ef8c', 1),
(6, 'SPG-0006', 'ec79b3c1a465e560af81d7721ed09114', 1),
(7, 'SPG-0007', 'df00c10b4d7e36ba8ad5c36e11015201', 1),
(8, 'SPG-0008', '55b93a9c721ea27a367f0824bbf82670', 1),
(9, 'SPG-0009', 'aa1be52aae2440a28a80a180228377bc', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
`id` int(11) NOT NULL,
  `kode_product` varchar(10) NOT NULL,
  `nama_product` varchar(50) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `kode_product`, `nama_product`, `status`) VALUES
(1, 'PRD-0001', 'NP ZINC CHROMATE GREEN/BODELAC 8000 ZINC CHROMATE', 1),
(2, 'PRD-0002', 'ELASTEX', 1),
(3, 'PRD-0003', 'WTB RM', 1),
(4, 'PRD-0004', 'MATEX CAT GENTENG CCM', 1),
(5, 'PRD-0005', 'PLATONE 800/BEE BRAND 1000', 1),
(6, 'PRD-0006', 'MM PRIMER', 1),
(7, 'PRD-0007', 'STONESHIELD', 1),
(8, 'PRD-0008', 'VINILEX TINTING', 1),
(9, 'PRD-0009', 'SPOT LESS', 1),
(10, 'PRD-0010', 'MM CLEAR', 1),
(11, 'PRD-0011', 'SPORTSKOTE CCM', 1),
(12, 'PRD-0012', 'WTB SOLAREFLECT', 1),
(13, 'PRD-0013', 'VPRO/PPRO/MATEX/KIMEX TINTING', 1),
(14, 'PRD-0014', 'FLAW LESS', 1),
(15, 'PRD-0015', 'ROOF COATING RM', 1),
(16, 'PRD-0016', 'TIMBERFINISH RM', 1),
(17, 'PRD-0017', 'BODELAC 2IN1 ANTI KARAT', 1),
(18, 'PRD-0018', 'VINILEX RM', 1),
(19, 'PRD-0019', 'MM TOP COAT', 1),
(20, 'PRD-0020', 'NIPPON 9000', 1),
(21, 'PRD-0021', 'SEALER SERIES', 1),
(22, 'PRD-0022', 'BW SERIES', 1),
(23, 'PRD-0023', 'WTB CCM', 1),
(24, 'PRD-0024', 'NIPPON WOOD STAIN', 1),
(25, 'PRD-0025', 'SATIN GLO', 1),
(26, 'PRD-0026', 'TIMBERSHADE', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_report`
--

CREATE TABLE IF NOT EXISTS `product_report` (
`id` int(11) NOT NULL,
  `kode_spg` varchar(10) NOT NULL,
  `kode_product` varchar(15) NOT NULL,
  `tanggal` date NOT NULL,
  `volume` double(10,2) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_report`
--

INSERT INTO `product_report` (`id`, `kode_spg`, `kode_product`, `tanggal`, `volume`) VALUES
(1, 'SPG-0005', 'PRD-0006', '2017-04-23', 23.40),
(2, 'SPG-0005', 'PRD-0002', '2017-04-24', 13.60),
(3, 'SPG-0003', 'PRD-0016', '2017-04-27', 2.70),
(4, 'SPG-0003', 'PRD-0021', '2017-04-27', 22.00),
(5, 'SPG-0003', 'PRD-0017', '2017-04-27', 2.50),
(6, 'SPG-0003', 'PRD-0024', '2017-04-27', 22.50),
(7, 'SPG-0003', 'PRD-0019', '2017-04-27', 6.34);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`id` int(11) NOT NULL,
  `kode_spg` varchar(10) NOT NULL,
  `nama_spg` varchar(50) NOT NULL,
  `nama_toko` varchar(50) NOT NULL,
  `depot` varchar(50) NOT NULL,
  `zona` int(1) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `kode_spg`, `nama_spg`, `nama_toko`, `depot`, `zona`, `status`) VALUES
(1, 'SPG-0001', 'SYUKRON', 'NIPPON PAINT', 'ADMIN', 1, 1),
(2, 'SPG-0002', 'RIZQI', 'TOKO RIZQI', 'TEST', 2, 0),
(3, 'SPG-0003', 'ARDHI', 'TOKO ARDHI', 'TEST', 3, 1),
(4, 'SPG-0004', 'IRSYAD', 'TOKO IRSYAD', 'TEST', 2, 1),
(5, 'SPG-0005', 'MULYA', 'MULYA TOKO', 'TEST', 2, 1),
(6, 'SPG-0006', 'HANTO', 'HANTO TOKO', 'TEST', 3, 1),
(7, 'SPG-0007', 'MUSTADJA', 'MUSTADJA TOKO', 'TEST', 1, 1),
(8, 'SPG-0008', 'SUBHI', 'SUBHI TOKO', 'TEST', 1, 1),
(9, 'SPG-0009', 'HADI', 'HADI TOKO', 'TEST', 2, 1);

-- --------------------------------------------------------

--
-- Structure for view `Absen_Report`
--
DROP TABLE IF EXISTS `Absen_Report`;

CREATE ALGORITHM=UNDEFINED DEFINER=`syuria`@`%` SQL SECURITY DEFINER VIEW `Absen_Report` AS (select `a`.`kode_absen` AS `kode_absen`,`a`.`kode_spg` AS `kode_spg`,coalesce(`u`.`nama_spg`,' ') AS `nama_spg`,coalesce(`u`.`nama_toko`,' ') AS `nama_toko`,coalesce(`u`.`depot`,' ') AS `depot`,date_format(`a`.`tanggal`,'%d-%m-%Y') AS `tanggal`,cast(coalesce(`a`.`jam_masuk`,' ') as char charset utf8mb4) AS `jam_masuk`,coalesce(`a`.`lokasi_masuk`,' ') AS `lokasi_masuk`,cast(coalesce(`a`.`jam_pulang`,' ') as char charset utf8mb4) AS `jam_pulang`,coalesce(`a`.`lokasi_pulang`,' ') AS `lokasi_pulang` from (`absen` `a` left join `user` `u` on((`a`.`kode_spg` = `u`.`kode_spg`))));

-- --------------------------------------------------------

--
-- Structure for view `Daily_Product_Report`
--
DROP TABLE IF EXISTS `Daily_Product_Report`;

CREATE ALGORITHM=UNDEFINED DEFINER=`syuria`@`%` SQL SECURITY DEFINER VIEW `Daily_Product_Report` AS (select `dr`.`kode_laporan` AS `kode_laporan`,`dr`.`kode_spg` AS `kode_spg`,`u`.`nama_spg` AS `nama_spg`,`u`.`nama_toko` AS `nama_toko`,`u`.`depot` AS `depot`,`dr`.`tanggal` AS `tanggal`,sum((case when (`pr`.`kode_product` = 'PRD-0002') then `pr`.`volume` else 0 end)) AS `ELASTEX`,sum((case when (`pr`.`kode_product` = 'PRD-0003') then `pr`.`volume` else 0 end)) AS `WTB_RM`,sum((case when (`pr`.`kode_product` = 'PRD-0004') then `pr`.`volume` else 0 end)) AS `MATEX_CAT_GENTENG_CCM`,sum((case when (`pr`.`kode_product` = 'PRD-0006') then `pr`.`volume` else 0 end)) AS `MM_PRIMER`,sum((case when (`pr`.`kode_product` = 'PRD-0007') then `pr`.`volume` else 0 end)) AS `STONESHIELD`,sum((case when (`pr`.`kode_product` = 'PRD-0008') then `pr`.`volume` else 0 end)) AS `VINILEX_TINTING`,sum((case when (`pr`.`kode_product` = 'PRD-0009') then `pr`.`volume` else 0 end)) AS `SPOT_LESS`,sum((case when (`pr`.`kode_product` = 'PRD-0010') then `pr`.`volume` else 0 end)) AS `MM_CLEAR`,sum((case when (`pr`.`kode_product` = 'PRD-0011') then `pr`.`volume` else 0 end)) AS `SPORTSKOTE_CCM`,sum((case when (`pr`.`kode_product` = 'PRD-0012') then `pr`.`volume` else 0 end)) AS `WTB_SOLAREFLECT`,sum((case when (`pr`.`kode_product` = 'PRD-0014') then `pr`.`volume` else 0 end)) AS `FLAW_LESS`,sum((case when (`pr`.`kode_product` = 'PRD-0015') then `pr`.`volume` else 0 end)) AS `ROOF_COATING_RM`,sum((case when (`pr`.`kode_product` = 'PRD-0016') then `pr`.`volume` else 0 end)) AS `TIMBERFINISH_RM`,sum((case when (`pr`.`kode_product` = 'PRD-0017') then `pr`.`volume` else 0 end)) AS `BODELAC_2IN1_ANTI_KARAT`,sum((case when (`pr`.`kode_product` = 'PRD-0018') then `pr`.`volume` else 0 end)) AS `VINILEX_RM`,sum((case when (`pr`.`kode_product` = 'PRD-0019') then `pr`.`volume` else 0 end)) AS `MM_TOP_COAT`,sum((case when (`pr`.`kode_product` = 'PRD-0020') then `pr`.`volume` else 0 end)) AS `NIPPON_9000`,sum((case when (`pr`.`kode_product` = 'PRD-0021') then `pr`.`volume` else 0 end)) AS `SEALER_SERIES`,sum((case when (`pr`.`kode_product` = 'PRD-0022') then `pr`.`volume` else 0 end)) AS `BW_SERIES`,sum((case when (`pr`.`kode_product` = 'PRD-0023') then `pr`.`volume` else 0 end)) AS `WTB_CCM`,sum((case when (`pr`.`kode_product` = 'PRD-0024') then `pr`.`volume` else 0 end)) AS `NIPPON_WOOD_STAIN`,sum((case when (`pr`.`kode_product` = 'PRD-0025') then `pr`.`volume` else 0 end)) AS `SATIN_GLO`,sum((case when (`pr`.`kode_product` = 'PRD-0013') then `pr`.`volume` else 0 end)) AS `VPRO_PPRO_MATEX_KIMEX_TINTING`,sum((case when (`pr`.`kode_product` = 'PRD-0005') then `pr`.`volume` else 0 end)) AS `PLATONE_800_or_BEE_BRAND_1000`,sum((case when (`pr`.`kode_product` = 'PRD-0001') then `pr`.`volume` else 0 end)) AS `NP_ZINC_CHROMATE_GREEN_or_BODELAC_8000_ZINC_CHROMATE`,`dr`.`ccm` AS `ccm`,`dr`.`rm` AS `rm` from ((`daily_report` `dr` left join `product_report` `pr` on(((`dr`.`kode_spg` = `pr`.`kode_spg`) and (`dr`.`tanggal` = `pr`.`tanggal`)))) left join `user` `u` on((`dr`.`kode_spg` = `u`.`kode_spg`))) group by `dr`.`kode_spg`,`dr`.`tanggal`);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absen`
--
ALTER TABLE `absen`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_user` (`kode_spg`);

--
-- Indexes for table `daily_report`
--
ALTER TABLE `daily_report`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_user` (`kode_spg`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_user` (`kode_spg`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
 ADD PRIMARY KEY (`id`), ADD KEY `kode_product` (`kode_product`);

--
-- Indexes for table `product_report`
--
ALTER TABLE `product_report`
 ADD PRIMARY KEY (`id`), ADD KEY `fk_user` (`kode_spg`), ADD KEY `fk_product` (`kode_product`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`id`), ADD KEY `kode_spg` (`kode_spg`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absen`
--
ALTER TABLE `absen`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `daily_report`
--
ALTER TABLE `daily_report`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `product_report`
--
ALTER TABLE `product_report`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `absen`
--
ALTER TABLE `absen`
ADD CONSTRAINT `absen_ibfk_1` FOREIGN KEY (`kode_spg`) REFERENCES `user` (`kode_spg`) ON UPDATE CASCADE;

--
-- Constraints for table `daily_report`
--
ALTER TABLE `daily_report`
ADD CONSTRAINT `daily_report_ibfk_1` FOREIGN KEY (`kode_spg`) REFERENCES `user` (`kode_spg`) ON UPDATE CASCADE;

--
-- Constraints for table `login`
--
ALTER TABLE `login`
ADD CONSTRAINT `login_ibfk_1` FOREIGN KEY (`kode_spg`) REFERENCES `user` (`kode_spg`) ON UPDATE CASCADE;

--
-- Constraints for table `product_report`
--
ALTER TABLE `product_report`
ADD CONSTRAINT `product_report_ibfk_1` FOREIGN KEY (`kode_spg`) REFERENCES `user` (`kode_spg`) ON UPDATE CASCADE,
ADD CONSTRAINT `product_report_ibfk_2` FOREIGN KEY (`kode_product`) REFERENCES `product` (`kode_product`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
