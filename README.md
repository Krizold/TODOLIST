# TODOLIST
Mon Tableau Kanban Personnalisé


## Introduction

TODOLIST est un outil de gestion de tâches personnalisé, inspiré par des applications de type tableau Kanban, comme Trello, qui facilite la catégorisation et le suivi de mes tâches en cours, en me permettant de créer des listes personnalisées, qui représentent généralement des phases ou des catégories de tâches, et d'y ajouter des cartes avec des détails spécifiques sur chaque tâche. 

Son but principal est de fournir un espace où je peux avoir une meilleur visibilité sur la charge de travail à fournir dans l'élaboration de mes dossiers pour le Titre Pro DWWM.

En développant cet outil, j'ai non seulement créé un moyen d'améliorer mon organisation personnelle mais j'ai également eu l'opportunité de mettre en pratique les compétences que j'ai acquises en programmation web, bases de données, et plus encore. Cela m'aide à présenter et faire valider mes compétences dans le cadre de la formation.


## Fonctionnalités

- Création de listes pour organiser les tâches.
- Ajout de cartes dans les listes pour représenter des tâches individuelles.
- Assignation de tags aux cartes pour catégoriser les tâches.
- Modification et suppression des listes, des cartes et des tags.
- Interface utilisateur responsive et intuitive.

## Technologies Utilisées

- **Node.js**: Plateforme de développement serveur pour l'exécution de code JavaScript côté serveur.
- **Express.js**: Framework web pour Node.js, utilisé pour créer l'API du serveur.
- **PostgreSQL**: Système de gestion de base de données relationnelle, utilisé pour stocker les données de l'application.
- **Sequelize**: ORM (Object-Relational Mapping) pour Node.js, permettant de communiquer avec la base de données PostgreSQL en utilisant des objets JavaScript.
- **Bulma**: Framework CSS basé sur Flexbox, utilisé pour créer une interface utilisateur responsive et élégante.
- **Dotenv**: Module permettant de charger des variables d'environnement à partir d'un fichier `.env` dans `process.env`.
- **Sanitizer**: Module pour nettoyer et échapper les entrées utilisateur afin de prévenir les injections XSS.
- **Webpack**: Outil de regroupement de modules JavaScript pour optimiser et regrouper le code client dans un fichier `bundle.js`.

## Compétences Travaillées

- **Gestion de Projet**: Utilisation d'un outil de type Kanban pour l'organisation et la planification des tâches.
- **Développement Backend**: Création d'une API REST avec Node.js et Express.js.
- **Manipulation de Bases de Données**: Conception et interaction avec une base de données PostgreSQL en utilisant Sequelize.
- **Sécurité**: Mise en place de pratiques de sécurité, telles que la sanitation des entrées utilisateur pour prévenir les attaques XSS.
- **Développement Frontend**: Création d'une interface utilisateur interactive et responsive avec HTML, CSS et JavaScript.
- **Utilisation de librairies et frameworks externes**: Intégration et utilisation de librairies et frameworks comme Bulma, Express, et Sequelize pour améliorer la fonctionnalité et l'esthétique de l'application.
- **Optimisation du Code**: Utilisation de Webpack pour optimiser et regrouper le code client.
- **Organisation du Code**: Architecture de l'application en séparant et structurant le code (controllers, models, routes).

## Installation et Utilisation

1. Clonez ce dépôt GitHub.

2. Naviguez vers le dossier du projet et exécutez `npm install` pour installer les dépendances.

3. Créez un fichier `.env` à la racine du projet et définissez les variables d'environnement nécessaires (par exemple, les informations de connexion à la base de données).

4. Démarrez la base de données PostgreSQL et exécutez les migrations de Sequelize pour configurer la base de données.

5. Exécutez la commande `npm start` pour démarrer l'application.

6. Ouvrez votre navigateur et accédez à `http://localhost:<PORT>` où `<PORT>` est le numéro de port sur lequel votre application s'exécute (par défaut 3000).
