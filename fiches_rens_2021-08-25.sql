-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 25 août 2021 à 14:36
-- Version du serveur :  10.4.18-MariaDB
-- Version de PHP : 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `fiches_rens`
--

-- --------------------------------------------------------

--
-- Structure de la table `binomes`
--

CREATE TABLE `binomes` (
  `id_eleve` int(11) NOT NULL,
  `id_binome` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `annee_scolaire` int(11) NOT NULL,
  `niveau` int(11) NOT NULL,
  `id_section` int(11) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `classes`
--

INSERT INTO `classes` (`id`, `annee_scolaire`, `niveau`, `id_section`, `order`) VALUES
(1, 2020, 4, 6, 1),
(2, 2020, 4, 7, 2);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `classes_view`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `classes_view` (
`id_classe` int(11)
,`id_section` int(11)
,`annee_scolaire` int(11)
,`classe` varchar(86)
,`niveau` int(11)
,`order` int(11)
,`section` varchar(128)
,`section_court` varchar(64)
);

-- --------------------------------------------------------

--
-- Structure de la table `eleves`
--

CREATE TABLE `eleves` (
  `id` int(11) NOT NULL,
  `nom_prenom` varchar(128) NOT NULL,
  `date_naiss` date NOT NULL,
  `genre` varchar(1) NOT NULL,
  `email` varchar(128) NOT NULL,
  `passe_temps` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `eleves`
--

INSERT INTO `eleves` (`id`, `nom_prenom`, `date_naiss`, `genre`, `email`, `passe_temps`) VALUES
(1, 'Abdou MANI', '2012-09-08', 'G', '', 'Jeux Vidéos'),
(2, 'Mohamed Anis MANI', '1975-06-28', 'G', 'manimohamed@gmail.com', 'Programmation');

-- --------------------------------------------------------

--
-- Structure de la table `eleves_classes`
--

CREATE TABLE `eleves_classes` (
  `id_eleve` int(11) NOT NULL,
  `id_classe` int(11) NOT NULL,
  `annee_scolaire` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `eleves_classes`
--

INSERT INTO `eleves_classes` (`id_eleve`, `id_classe`, `annee_scolaire`) VALUES
(1, 1, 2020),
(2, 2, 2020);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `eleves_classes_view`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `eleves_classes_view` (
`id_eleve` int(11)
,`id_classe` int(11)
,`id_section` int(11)
,`annee_scolaire` int(11)
,`niveau` int(11)
,`order` int(11)
,`nom_prenom` varchar(128)
,`date_naiss` date
,`genre` varchar(1)
,`email` varchar(128)
,`passe_temps` text
,`section` varchar(128)
,`section_court` varchar(64)
,`classe` varchar(86)
);

-- --------------------------------------------------------

--
-- Structure de la table `matieres`
--

CREATE TABLE `matieres` (
  `id` int(11) NOT NULL,
  `matiere` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `matieres`
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
-- Structure de la table `matieres_sections`
--

CREATE TABLE `matieres_sections` (
  `id_section` int(11) NOT NULL,
  `id_matiere` int(11) NOT NULL,
  `niveau` int(11) NOT NULL,
  `categorie` varchar(2) NOT NULL,
  `coef` double NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `matieres_sections`
--

INSERT INTO `matieres_sections` (`id_section`, `id_matiere`, `niveau`, `categorie`, `coef`) VALUES
(1, 1, 1, 'PR', 3),
(1, 2, 1, 'OB', 1),
(1, 4, 1, 'OB', 1),
(1, 5, 1, 'OB', 1.5),
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
(6, 1, 3, 'PR', 3),
(6, 2, 3, 'OB', 1),
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
(6, 17, 3, 'PR', 4),
(6, 19, 3, 'OB', 1);

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `matieres_sections_view`
-- (Voir ci-dessous la vue réelle)
--
CREATE TABLE `matieres_sections_view` (
`id_section` int(11)
,`id_matiere` int(11)
,`niveau` int(11)
,`categorie` varchar(2)
,`coef` double
,`matiere` varchar(128)
,`section` varchar(128)
,`section_court` varchar(64)
);

-- --------------------------------------------------------

--
-- Structure de la table `presences`
--

CREATE TABLE `presences` (
  `id_eleve` int(11) NOT NULL,
  `date_seance` datetime NOT NULL,
  `remarques` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `section` varchar(128) NOT NULL,
  `section_court` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `sections`
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
-- Structure de la vue `classes_view`
--
DROP TABLE IF EXISTS `classes_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `classes_view`  AS SELECT `cl`.`id` AS `id_classe`, `cl`.`id_section` AS `id_section`, `cl`.`annee_scolaire` AS `annee_scolaire`, concat(`cl`.`niveau`,`s`.`section_court`,`cl`.`order`) AS `classe`, `cl`.`niveau` AS `niveau`, `cl`.`order` AS `order`, `s`.`section` AS `section`, `s`.`section_court` AS `section_court` FROM (`classes` `cl` join `sections` `s` on(`cl`.`id_section` = `s`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure de la vue `eleves_classes_view`
--
DROP TABLE IF EXISTS `eleves_classes_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `eleves_classes_view`  AS SELECT `ec`.`id_eleve` AS `id_eleve`, `ec`.`id_classe` AS `id_classe`, `cl`.`id_section` AS `id_section`, `ec`.`annee_scolaire` AS `annee_scolaire`, `cl`.`niveau` AS `niveau`, `cl`.`order` AS `order`, `el`.`nom_prenom` AS `nom_prenom`, `el`.`date_naiss` AS `date_naiss`, `el`.`genre` AS `genre`, `el`.`email` AS `email`, `el`.`passe_temps` AS `passe_temps`, `se`.`section` AS `section`, `se`.`section_court` AS `section_court`, concat(`cl`.`niveau`,`se`.`section_court`,`cl`.`order`) AS `classe` FROM (((`eleves_classes` `ec` join `classes` `cl` on(`ec`.`id_classe` = `cl`.`id`)) join `eleves` `el` on(`ec`.`id_eleve` = `el`.`id`)) join `sections` `se` on(`cl`.`id_section` = `se`.`id`)) ;

-- --------------------------------------------------------

--
-- Structure de la vue `matieres_sections_view`
--
DROP TABLE IF EXISTS `matieres_sections_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `matieres_sections_view`  AS SELECT `ms`.`id_section` AS `id_section`, `ms`.`id_matiere` AS `id_matiere`, `ms`.`niveau` AS `niveau`, `ms`.`categorie` AS `categorie`, `ms`.`coef` AS `coef`, `m`.`matiere` AS `matiere`, `s`.`section` AS `section`, `s`.`section_court` AS `section_court` FROM ((`matieres_sections` `ms` join `matieres` `m` on(`ms`.`id_matiere` = `m`.`id`)) join `sections` `s` on(`ms`.`id_section` = `s`.`id`)) ;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `binomes`
--
ALTER TABLE `binomes`
  ADD PRIMARY KEY (`id_eleve`,`id_binome`);

--
-- Index pour la table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `eleves_classes`
--
ALTER TABLE `eleves_classes`
  ADD PRIMARY KEY (`id_eleve`,`id_classe`,`annee_scolaire`);

--
-- Index pour la table `matieres`
--
ALTER TABLE `matieres`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `matieres_sections`
--
ALTER TABLE `matieres_sections`
  ADD PRIMARY KEY (`id_section`,`id_matiere`,`niveau`);

--
-- Index pour la table `presences`
--
ALTER TABLE `presences`
  ADD PRIMARY KEY (`id_eleve`,`date_seance`);

--
-- Index pour la table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `eleves`
--
ALTER TABLE `eleves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `matieres`
--
ALTER TABLE `matieres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
