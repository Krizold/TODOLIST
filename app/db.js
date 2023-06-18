const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,      // Nom de la base de données
    process.env.DB_USER,      // Utilisateur de la base de données
    process.env.DB_PASSWORD,  // Mot de passe de la base de données
    {
        host: process.env.DB_HOST,  // Hôte de la base de données
        dialect: 'postgres'            // Type de base de données que nous utilisons
    }
);

module.exports = sequelize;