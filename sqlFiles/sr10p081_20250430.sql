-- phpMyAdmin SQL Dump
-- version 5.2.1deb1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 30 avr. 2025 à 09:14
-- Version du serveur : 10.11.6-MariaDB-0+deb12u1
-- Version de PHP : 8.2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sr10p081`
--

-- --------------------------------------------------------

--
-- Structure de la table `CANDIDATURE`
--

CREATE TABLE `CANDIDATURE` (
  `numero_candidature` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `numero_offre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `CANDIDATURE`
--

INSERT INTO `CANDIDATURE` (`numero_candidature`, `email`, `numero_offre`) VALUES
(1, 'jean.dupont@example.com', 1),
(2, 'marie.lefevre@example.com', 2),
(3, 'lucas.martin@example.com', 3);

-- --------------------------------------------------------

--
-- Structure de la table `FICHEDEPOSTE`
--

CREATE TABLE `FICHEDEPOSTE` (
  `numero_fiche` int(11) NOT NULL,
  `siren_organisation` varchar(9) NOT NULL,
  `intitule` varchar(255) NOT NULL,
  `statut_poste` varchar(20) NOT NULL,
  `responsable` varchar(50) DEFAULT NULL,
  `rythme` varchar(50) DEFAULT NULL,
  `salaire` int(9) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `lieu` varchar(255) DEFAULT NULL,
  `TypeMetier` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `FICHEDEPOSTE`
--

INSERT INTO `FICHEDEPOSTE` (`numero_fiche`, `siren_organisation`, `intitule`, `statut_poste`, `responsable`, `rythme`, `salaire`, `description`, `lieu`, `TypeMetier`) VALUES
(1, '123456789', 'Développeur Full Stack', 'Cadre', 'Jean Dupont', 'temps plein', 45000, 'Développement d\'applications web et mobile.', 'Paris', NULL),
(2, '987654321', 'Chef de Cuisine', 'Cadre', 'Marie Lefevre', 'temps partiel', 25000, 'Responsable de la cuisine dans un restaurant gastronomique.', 'Paris', NULL),
(3, '112233445', 'Chargé de Mission Environnement', 'ETAM', 'Lucas Martin', 'temps plein', 40000, 'Gestion des projets environnementaux et développement durable.', 'Compiegne', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `OFFRE`
--

CREATE TABLE `OFFRE` (
  `numero_offre` int(11) NOT NULL,
  `numero_fiche` int(11) NOT NULL,
  `etat` enum('publié','en cours','expiré') NOT NULL,
  `date_validite` date NOT NULL,
  `piece_demande` varchar(255) NOT NULL,
  `nombre_piece_demande` int(11) NOT NULL,
  `recruteur` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `OFFRE`
--

INSERT INTO `OFFRE` (`numero_offre`, `numero_fiche`, `etat`, `date_validite`, `piece_demande`, `nombre_piece_demande`, `recruteur`) VALUES
(1, 1, 'publié', '2025-03-31', 'CV, lettre de motivation', 2, 'marie.lefevre@example.com'),
(2, 2, 'expiré', '2025-02-28', 'CV', 1, 'marie.lefevre@example.com'),
(3, 3, 'en cours', '2025-04-15', 'CV, lettre de motivation, portfolio', 3, 'lucas.martin@example.com'),
(4, 1, 'publié', '2023-12-31', 'CV, Lettre de motivation', 2, 'jean.dupont@example.com');

-- --------------------------------------------------------

--
-- Structure de la table `ORGANISATION`
--

CREATE TABLE `ORGANISATION` (
  `siren` varchar(9) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `type_entreprise` varchar(50) NOT NULL,
  `siege_social` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ORGANISATION`
--

INSERT INTO `ORGANISATION` (`siren`, `nom`, `type_entreprise`, `siege_social`) VALUES
('0', 'TestOrg', 'TestTypeOrg', '11 rue du test, Paris'),
('112233445', 'EcoSolutions', 'Environnement', '8 Rue des Écologistes, Marseille'),
('112345678', 'Nouvelle Organisation', 'SARL', '456 Rue de Test'),
('123456789', 'TechCorp', 'Technologie', '15 Rue des Innovateurs, Paris'),
('987654321', 'Foodies', 'Restauration', '24 Boulevard du Gourmet, Lyon');

-- --------------------------------------------------------

--
-- Structure de la table `PIECE`
--

CREATE TABLE `PIECE` (
  `numero_piece` int(11) NOT NULL,
  `type_piece` varchar(50) NOT NULL,
  `numero_candidature` int(11) NOT NULL,
  `nom_fichier` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `PIECE`
--

INSERT INTO `PIECE` (`numero_piece`, `type_piece`, `numero_candidature`, `nom_fichier`) VALUES
(7, 'CV', 1, ''),
(8, 'lettre de motivation', 1, ''),
(9, 'CV', 2, ''),
(10, 'CV', 3, ''),
(11, 'lettre de motivation', 3, ''),
(12, 'portfolio', 3, '');

-- --------------------------------------------------------

--
-- Structure de la table `UTILISATEUR`
--

CREATE TABLE `UTILISATEUR` (
  `email` varchar(50) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `date_creation` date NOT NULL,
  `statut_compte` enum('actif','inactif') NOT NULL,
  `organisation` varchar(9) DEFAULT NULL,
  `role_utilisateur` enum('utilisateur','recruteur','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `UTILISATEUR`
--

INSERT INTO `UTILISATEUR` (`email`, `mdp`, `nom`, `prenom`, `tel`, `date_creation`, `statut_compte`, `organisation`, `role_utilisateur`) VALUES
('jean.dupont@example.com', 'hashedpassword1', 'Dupond', 'Jeanne', '0987654321', '2025-01-01', 'actif', '123456789', 'utilisateur'),
('lucas.martin@example.com', 'hashedpassword3', 'Martin', 'Lucas', '0612345680', '2025-01-03', 'inactif', '112233445', 'admin'),
('marie.lefevre@example.com', 'hashedpassword2', 'Lefevre', 'Marie', '0612345679', '2025-01-02', 'actif', '987654321', 'recruteur'),
('test@test.fr', '123', 'test', 'toto', '1234567890', '2023-10-01', 'inactif', '987654321', 'utilisateur'),
('test@gmail.com', 'newpassword', 'Test', 'User', '1234567890', '2023-10-01', 'inactif', '987654321', 'admin');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `CANDIDATURE`
--
ALTER TABLE `CANDIDATURE`
  ADD PRIMARY KEY (`numero_candidature`),
  ADD KEY `email` (`email`),
  ADD KEY `numero_offre` (`numero_offre`);

--
-- Index pour la table `FICHEDEPOSTE`
--
ALTER TABLE `FICHEDEPOSTE`
  ADD PRIMARY KEY (`numero_fiche`),
  ADD KEY `siren_organisation` (`siren_organisation`);

--
-- Index pour la table `OFFRE`
--
ALTER TABLE `OFFRE`
  ADD PRIMARY KEY (`numero_offre`),
  ADD KEY `numero_fiche` (`numero_fiche`),
  ADD KEY `recruteur` (`recruteur`);

--
-- Index pour la table `ORGANISATION`
--
ALTER TABLE `ORGANISATION`
  ADD PRIMARY KEY (`siren`);

--
-- Index pour la table `PIECE`
--
ALTER TABLE `PIECE`
  ADD PRIMARY KEY (`numero_piece`),
  ADD KEY `numero_candidature` (`numero_candidature`);

--
-- Index pour la table `UTILISATEUR`
--
ALTER TABLE `UTILISATEUR`
  ADD PRIMARY KEY (`email`),
  ADD KEY `organisation` (`organisation`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `CANDIDATURE`
--
ALTER TABLE `CANDIDATURE`
  MODIFY `numero_candidature` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `FICHEDEPOSTE`
--
ALTER TABLE `FICHEDEPOSTE`
  MODIFY `numero_fiche` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `OFFRE`
--
ALTER TABLE `OFFRE`
  MODIFY `numero_offre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `PIECE`
--
ALTER TABLE `PIECE`
  MODIFY `numero_piece` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `CANDIDATURE`
--
ALTER TABLE `CANDIDATURE`
  ADD CONSTRAINT `CANDIDATURE_ibfk_1` FOREIGN KEY (`email`) REFERENCES `UTILISATEUR` (`email`) ON DELETE CASCADE,
  ADD CONSTRAINT `CANDIDATURE_ibfk_2` FOREIGN KEY (`numero_offre`) REFERENCES `OFFRE` (`numero_offre`) ON DELETE CASCADE;

--
-- Contraintes pour la table `FICHEDEPOSTE`
--
ALTER TABLE `FICHEDEPOSTE`
  ADD CONSTRAINT `FICHEDEPOSTE_ibfk_1` FOREIGN KEY (`siren_organisation`) REFERENCES `ORGANISATION` (`siren`);

--
-- Contraintes pour la table `OFFRE`
--
ALTER TABLE `OFFRE`
  ADD CONSTRAINT `OFFRE_ibfk_1` FOREIGN KEY (`numero_fiche`) REFERENCES `FICHEDEPOSTE` (`numero_fiche`) ON DELETE CASCADE,
  ADD CONSTRAINT `OFFRE_ibfk_2` FOREIGN KEY (`recruteur`) REFERENCES `UTILISATEUR` (`email`);

--
-- Contraintes pour la table `PIECE`
--
ALTER TABLE `PIECE`
  ADD CONSTRAINT `PIECE_ibfk_1` FOREIGN KEY (`numero_candidature`) REFERENCES `CANDIDATURE` (`numero_candidature`);

--
-- Contraintes pour la table `UTILISATEUR`
--
ALTER TABLE `UTILISATEUR`
  ADD CONSTRAINT `UTILISATEUR_ibfk_1` FOREIGN KEY (`organisation`) REFERENCES `ORGANISATION` (`siren`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
