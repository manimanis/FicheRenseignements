-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 27, 2021 at 08:35 AM
-- Server version: 8.0.20
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fiches_rens`
--

-- --------------------------------------------------------

--
-- Table structure for table `binomes`
--

CREATE TABLE `binomes` (
  `id_eleve` int NOT NULL,
  `id_binome` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int NOT NULL,
  `annee_scolaire` int NOT NULL,
  `niveau` int NOT NULL,
  `id_section` int NOT NULL,
  `order` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `annee_scolaire`, `niveau`, `id_section`, `order`) VALUES
(1, 2020, 4, 6, 1),
(2, 2020, 4, 7, 2);

-- --------------------------------------------------------

--
-- Stand-in structure for view `classes_view`
-- (See below for the actual view)
--
CREATE TABLE `classes_view` (
`id_classe` int
,`id_section` int
,`annee_scolaire` int
,`classe` varchar(86)
,`niveau` int
,`order` int
,`section` varchar(128)
,`section_court` varchar(64)
);

-- --------------------------------------------------------

--
-- Table structure for table `eleves`
--

CREATE TABLE `eleves` (
  `id` int NOT NULL,
  `nom_prenom` varchar(128) NOT NULL,
  `date_naiss` date NOT NULL,
  `genre` varchar(1) NOT NULL,
  `email` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `eleves`
--

INSERT INTO `eleves` (`id`, `nom_prenom`, `date_naiss`, `genre`, `email`) VALUES
(1, 'Abdou MANI', '2012-09-08', 'G', ''),
(2, 'Mohamed Anis MANI', '1975-06-28', 'G', 'manimohamed@gmail.com'),
(14, 'nom prénom', '1999-01-02', 'G', 'mmmm@yahoo.fr');

-- --------------------------------------------------------

--
-- Table structure for table `eleves_classes`
--

CREATE TABLE `eleves_classes` (
  `id_eleve` int NOT NULL,
  `id_classe` int NOT NULL,
  `annee_scolaire` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `eleves_classes`
--

INSERT INTO `eleves_classes` (`id_eleve`, `id_classe`, `annee_scolaire`) VALUES
(1, 1, 2020),
(2, 2, 2020),
(14, 1, 2020);

-- --------------------------------------------------------

--
-- Stand-in structure for view `eleves_classes_view`
-- (See below for the actual view)
--
CREATE TABLE `eleves_classes_view` (
`id_eleve` int
,`id_classe` int
,`id_section` int
,`annee_scolaire` int
,`niveau` int
,`order` int
,`nom_prenom` varchar(128)
,`date_naiss` date
,`genre` varchar(1)
,`email` varchar(128)
,`section` varchar(128)
,`section_court` varchar(64)
,`classe` varchar(86)
);

-- --------------------------------------------------------

--
-- Table structure for table `fiches_renseignements`
--

CREATE TABLE `fiches_renseignements` (
  `id` int NOT NULL,
  `id_eleve` int NOT NULL,
  `id_classe` int NOT NULL,
  `annee_scolaire` int NOT NULL,
  `date_remp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `remote_host` varchar(128) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fiches_renseignements`
--

INSERT INTO `fiches_renseignements` (`id`, `id_eleve`, `id_classe`, `annee_scolaire`, `date_remp`, `remote_host`) VALUES
(12, 14, 1, 2020, '2021-08-27 08:33:15', '127.0.0.1');

-- --------------------------------------------------------

--
-- Table structure for table `infos_eleves`
--

CREATE TABLE `infos_eleves` (
  `id` int NOT NULL,
  `id_eleve` int NOT NULL,
  `titre_info` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `date_ins` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `info` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `infos_eleves`
--

INSERT INTO `infos_eleves` (`id`, `id_eleve`, `titre_info`, `date_ins`, `info`) VALUES
(31, 14, 'Adresse Postale', '2021-08-27 07:33:11', 'Route de la plage - Hammam-Sousse'),
(32, 14, 'Passe Temps', '2021-08-27 07:33:11', 'Programmation'),
(33, 14, 'Qualités', '2021-08-27 07:33:11', 'Aucune'),
(34, 14, 'Défauts', '2021-08-27 07:33:11', 'Beaucoup'),
(35, 14, 'Classe de l\'année dernière', '2021-08-27 07:33:11', '3EXP1'),
(36, 14, 'Classe', '2021-08-27 07:33:11', '4EXP1'),
(37, 14, 'Moyenne Annuelle', '2021-08-27 07:33:11', '13.20'),
(38, 14, 'Note Français', '2021-08-27 07:33:11', '12'),
(39, 14, 'Note Informatique', '2021-08-27 07:33:11', '18.5'),
(40, 14, 'Note Mathématiques', '2021-08-27 07:33:11', '14');

-- --------------------------------------------------------

--
-- Table structure for table `matieres`
--

CREATE TABLE `matieres` (
  `id` int NOT NULL,
  `matiere` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `matieres`
--

INSERT INTO `matieres` (`id`, `matiere`) VALUES
(1, 'Mathématiques'),
(2, 'Informatique'),
(3, 'Arabe'),
(4, 'Français'),
(5, 'Anglais'),
(6, 'Algorithmique et Programmation'),
(7, 'Base de données'),
(8, 'Systèmes d\'exploitation et Réseaux'),
(9, 'Sciences et Technologies de l\'Internet'),
(10, 'Philosophie'),
(11, 'Pensée Islamique'),
(12, 'Economie'),
(13, 'Gestion'),
(14, 'Histoire & Géographie'),
(15, 'Education Civique'),
(16, 'Physique'),
(17, 'Sciences de la vie et de la terre'),
(18, 'Technologie'),
(19, 'Education Physique'),
(20, 'Education Artistique'),
(21, 'Education Musicale'),
(22, 'Espagnol'),
(23, 'Allemand'),
(24, 'Italien'),
(25, 'Turc'),
(26, 'Chinois');

-- --------------------------------------------------------

--
-- Table structure for table `matieres_sections`
--

CREATE TABLE `matieres_sections` (
  `id_section` int NOT NULL,
  `id_matiere` int NOT NULL,
  `niveau` int NOT NULL,
  `categorie` varchar(2) NOT NULL,
  `coef` double NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `matieres_sections`
--

INSERT INTO `matieres_sections` (`id_section`, `id_matiere`, `niveau`, `categorie`, `coef`) VALUES
(1, 1, 1, 'PR', 3),
(1, 2, 1, 'OB', 1),
(1, 4, 1, 'OB', 1),
(1, 5, 1, 'OB', 1.5),
(2, 1, 2, 'OB', 1),
(2, 2, 2, 'OB', 1),
(2, 2, 3, 'OB', 1),
(2, 2, 4, 'OB', 1),
(2, 3, 2, 'PR', 4),
(2, 3, 3, 'PR', 4),
(2, 3, 4, 'PR', 4),
(2, 4, 2, 'PR', 4),
(2, 4, 3, 'PR', 3),
(2, 4, 4, 'PR', 3),
(2, 5, 2, 'OB', 3),
(2, 5, 3, 'OB', 3),
(2, 5, 4, 'PR', 3),
(2, 10, 3, 'OB', 1),
(2, 10, 4, 'PR', 4),
(2, 11, 2, 'OB', 1),
(2, 11, 3, 'OB', 1),
(2, 11, 4, 'OB', 1),
(2, 14, 2, 'OB', 3),
(2, 14, 3, 'OB', 3),
(2, 14, 4, 'OB', 3),
(2, 15, 2, 'OB', 1),
(2, 15, 3, 'OB', 1),
(2, 17, 2, 'OB', 1),
(2, 19, 2, 'OB', 1),
(2, 19, 3, 'OB', 1),
(2, 19, 4, 'OB', 1),
(3, 1, 2, 'PR', 4),
(3, 2, 2, 'OB', 1.5),
(3, 3, 2, 'OB', 2),
(3, 4, 2, 'OB', 2),
(3, 5, 2, 'OB', 2),
(3, 11, 2, 'OB', 1),
(3, 14, 2, 'OB', 2),
(3, 15, 2, 'OB', 1),
(3, 16, 2, 'PR', 4),
(3, 17, 2, 'OB', 2),
(3, 18, 2, 'OB', 2),
(3, 19, 2, 'OB', 1),
(4, 1, 2, 'PR', 2.5),
(4, 2, 2, 'OB', 1),
(4, 3, 2, 'OB', 2),
(4, 4, 2, 'OB', 2),
(4, 5, 2, 'OB', 2),
(4, 11, 2, 'OB', 1),
(4, 12, 2, 'PR', 3),
(4, 13, 2, 'PR', 3),
(4, 14, 2, 'OB', 3),
(4, 15, 2, 'OB', 1),
(4, 17, 2, 'OB', 1),
(4, 19, 2, 'OB', 1),
(5, 1, 2, 'PR', 4),
(5, 2, 2, 'PR', 3),
(5, 3, 2, 'OB', 2),
(5, 4, 2, 'OB', 2),
(5, 5, 2, 'OB', 2),
(5, 11, 2, 'OB', 1),
(5, 14, 2, 'OB', 2),
(5, 15, 2, 'OB', 1),
(5, 16, 2, 'OB', 3),
(5, 18, 2, 'OB', 2),
(5, 19, 2, 'OB', 1),
(6, 1, 3, 'PR', 3),
(6, 1, 4, 'PR', 3),
(6, 2, 3, 'OB', 1),
(6, 2, 4, 'OB', 1),
(6, 3, 3, 'OB', 2),
(6, 3, 4, 'OB', 1),
(6, 4, 3, 'OB', 2),
(6, 4, 4, 'OB', 1),
(6, 5, 3, 'OB', 2),
(6, 5, 4, 'OB', 1),
(6, 10, 3, 'OB', 1),
(6, 10, 4, 'OB', 1),
(6, 11, 3, 'OB', 1),
(6, 14, 3, 'OB', 2),
(6, 16, 3, 'PR', 4),
(6, 16, 4, 'PR', 4),
(6, 17, 3, 'PR', 4),
(6, 17, 4, 'PR', 4),
(6, 19, 3, 'OB', 1),
(6, 19, 4, 'OB', 1),
(7, 1, 3, 'PR', 4),
(7, 1, 4, 'PR', 4),
(7, 2, 3, 'OB', 1),
(7, 2, 4, 'OB', 1),
(7, 3, 3, 'OB', 2),
(7, 3, 4, 'OB', 2),
(7, 4, 3, 'OB', 2),
(7, 4, 4, 'OB', 2),
(7, 5, 3, 'OB', 2),
(7, 5, 4, 'OB', 2),
(7, 10, 3, 'OB', 1),
(7, 10, 4, 'OB', 1),
(7, 11, 3, 'OB', 1),
(7, 14, 3, 'OB', 2),
(7, 16, 3, 'PR', 4),
(7, 16, 4, 'PR', 4),
(7, 17, 3, 'OB', 1.5),
(7, 17, 4, 'OB', 1.5),
(7, 18, 3, 'OB', 2),
(7, 18, 4, 'OB', 2),
(7, 19, 3, 'OB', 1),
(7, 19, 4, 'OB', 1),
(8, 1, 3, 'PR', 4),
(8, 1, 4, 'PR', 4),
(8, 2, 3, 'OB', 1.5),
(8, 2, 4, 'OB', 1.5),
(8, 3, 3, 'OB', 1),
(8, 3, 4, 'OB', 1),
(8, 4, 3, 'OB', 2),
(8, 4, 4, 'OB', 1),
(8, 5, 3, 'OB', 2),
(8, 5, 4, 'OB', 1),
(8, 10, 3, 'OB', 1),
(8, 10, 4, 'OB', 1),
(8, 14, 3, 'OB', 2),
(8, 16, 3, 'PR', 4),
(8, 16, 4, 'PR', 4),
(8, 18, 3, 'PR', 4),
(8, 18, 4, 'PR', 4),
(8, 19, 3, 'OB', 1),
(8, 19, 4, 'OB', 1),
(9, 1, 3, 'PR', 2.5),
(9, 1, 4, 'PR', 2.5),
(9, 2, 3, 'OB', 1),
(9, 2, 4, 'OB', 1),
(9, 3, 3, 'OB', 2),
(9, 3, 4, 'OB', 1),
(9, 4, 3, 'OB', 2),
(9, 4, 4, 'OB', 1),
(9, 5, 3, 'OB', 2),
(9, 5, 4, 'OB', 1),
(9, 10, 3, 'OB', 1),
(9, 10, 4, 'OB', 1),
(9, 12, 3, 'PR', 4),
(9, 12, 4, 'PR', 4),
(9, 13, 3, 'PR', 4),
(9, 13, 4, 'PR', 4),
(9, 14, 3, 'OB', 3),
(9, 14, 4, 'OB', 3),
(9, 17, 3, 'OB', 1),
(9, 17, 4, 'OB', 1),
(9, 19, 3, 'OB', 1),
(9, 19, 4, 'OB', 1),
(11, 1, 3, 'PR', 4),
(11, 1, 4, 'PR', 4),
(11, 3, 3, 'OB', 2),
(11, 3, 4, 'OB', 2),
(11, 4, 3, 'OB', 2),
(11, 4, 4, 'OB', 2),
(11, 5, 3, 'OB', 2),
(11, 5, 4, 'OB', 2),
(11, 6, 3, 'PR', 3),
(11, 6, 4, 'PR', 3),
(11, 9, 3, 'PR', 3),
(11, 9, 4, 'PR', 3),
(11, 14, 3, 'OB', 2),
(11, 16, 3, 'OB', 3),
(11, 16, 4, 'OB', 3),
(11, 18, 3, 'OB', 2),
(11, 18, 4, 'OB', 2),
(11, 19, 3, 'OB', 1),
(11, 19, 4, 'OB', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `matieres_sections_view`
-- (See below for the actual view)
--
CREATE TABLE `matieres_sections_view` (
`id_section` int
,`id_matiere` int
,`niveau` int
,`categorie` varchar(2)
,`coef` double
,`matiere` varchar(128)
,`section` varchar(128)
,`section_court` varchar(64)
);

-- --------------------------------------------------------

--
-- Table structure for table `presences`
--

CREATE TABLE `presences` (
  `id_eleve` int NOT NULL,
  `date_seance` datetime NOT NULL,
  `remarques` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` int NOT NULL,
  `section` varchar(128) NOT NULL,
  `section_court` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `section`, `section_court`) VALUES
(1, 'Secondaire', 'S'),
(2, 'Lettres', 'L'),
(3, 'Sciences', 'SC'),
(4, 'Economie et Services', 'ES'),
(5, 'Technologies de l\'Informatique', 'TI'),
(6, 'Sciences Expérimentales', 'EXP'),
(7, 'Mathématiques', 'M'),
(8, 'Techniques', 'T'),
(9, 'Economie et Gestion', 'ECO'),
(10, 'Sport', 'EP'),
(11, 'Sciences de l\'Informatique', 'SI');

-- --------------------------------------------------------

--
-- Structure for view `classes_view`
--
DROP TABLE IF EXISTS `classes_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `classes_view`  AS  select `cl`.`id` AS `id_classe`,`cl`.`id_section` AS `id_section`,`cl`.`annee_scolaire` AS `annee_scolaire`,concat(`cl`.`niveau`,`s`.`section_court`,`cl`.`order`) AS `classe`,`cl`.`niveau` AS `niveau`,`cl`.`order` AS `order`,`s`.`section` AS `section`,`s`.`section_court` AS `section_court` from (`classes` `cl` join `sections` `s` on((`cl`.`id_section` = `s`.`id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `eleves_classes_view`
--
DROP TABLE IF EXISTS `eleves_classes_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `eleves_classes_view`  AS  select `ec`.`id_eleve` AS `id_eleve`,`ec`.`id_classe` AS `id_classe`,`cl`.`id_section` AS `id_section`,`ec`.`annee_scolaire` AS `annee_scolaire`,`cl`.`niveau` AS `niveau`,`cl`.`order` AS `order`,`el`.`nom_prenom` AS `nom_prenom`,`el`.`date_naiss` AS `date_naiss`,`el`.`genre` AS `genre`,`el`.`email` AS `email`,`se`.`section` AS `section`,`se`.`section_court` AS `section_court`,concat(`cl`.`niveau`,`se`.`section_court`,`cl`.`order`) AS `classe` from (((`eleves_classes` `ec` join `classes` `cl` on((`ec`.`id_classe` = `cl`.`id`))) join `eleves` `el` on((`ec`.`id_eleve` = `el`.`id`))) join `sections` `se` on((`cl`.`id_section` = `se`.`id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `matieres_sections_view`
--
DROP TABLE IF EXISTS `matieres_sections_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `matieres_sections_view`  AS  select `ms`.`id_section` AS `id_section`,`ms`.`id_matiere` AS `id_matiere`,`ms`.`niveau` AS `niveau`,`ms`.`categorie` AS `categorie`,`ms`.`coef` AS `coef`,`m`.`matiere` AS `matiere`,`s`.`section` AS `section`,`s`.`section_court` AS `section_court` from ((`matieres_sections` `ms` join `matieres` `m` on((`ms`.`id_matiere` = `m`.`id`))) join `sections` `s` on((`ms`.`id_section` = `s`.`id`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `binomes`
--
ALTER TABLE `binomes`
  ADD PRIMARY KEY (`id_eleve`,`id_binome`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `eleves`
--
ALTER TABLE `eleves`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `eleves_classes`
--
ALTER TABLE `eleves_classes`
  ADD PRIMARY KEY (`id_eleve`,`id_classe`,`annee_scolaire`);

--
-- Indexes for table `fiches_renseignements`
--
ALTER TABLE `fiches_renseignements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `infos_eleves`
--
ALTER TABLE `infos_eleves`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `matieres`
--
ALTER TABLE `matieres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `matieres_sections`
--
ALTER TABLE `matieres_sections`
  ADD PRIMARY KEY (`id_section`,`id_matiere`,`niveau`);

--
-- Indexes for table `presences`
--
ALTER TABLE `presences`
  ADD PRIMARY KEY (`id_eleve`,`date_seance`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `eleves`
--
ALTER TABLE `eleves`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `fiches_renseignements`
--
ALTER TABLE `fiches_renseignements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `infos_eleves`
--
ALTER TABLE `infos_eleves`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `matieres`
--
ALTER TABLE `matieres`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
