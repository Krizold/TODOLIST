// Importe des dépendances nécessaires de sequelize.
const { DataTypes, Model } = require('sequelize');
// Importe la configuration de la base de données.
const sequelize = require('../db');

// Crée une classe Card qui étend le modèle de base de Sequelize.
class Card extends Model {};

// Initialise le modèle avec ses attributs et configuration.
Card.init({
    // Définit un attribut 'content' de type TEXT, ne peut pas être null et a une valeur par défaut vide.
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ''
    },
    // Définit un attribut 'color' de type TEXT, ne peut pas être null et a une valeur par défaut blanche.
    color: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '#FFF'
    },
    // Définit un attribut 'position' de type INTEGER, ne peut pas être null et a une valeur par défaut de 0.
    position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    // Définit un attribut 'listId' qui représente l'ID de la liste associée. Ne peut pas être null.
    listId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'list_id'
    },
    // Définit un attribut 'createdAt' pour stocker la date de création.
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    // Définit un attribut 'updatedAt' pour stocker la date de mise à jour.
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
    }
}, {
    sequelize,
    // Nom de la table dans la base de données.
    tableName: "card",
    // Utilise des underscores plutôt que le camelCase pour les noms automatiquement générés.
    underscored: true
});

// Exporte le modèle Card pour qu'il puisse être utilisé dans d'autres fichiers.
module.exports = Card;
