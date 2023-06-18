const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const Card = require('./card');

class List extends Model {};

List.init({
    // Définit un attribut 'name' de type TEXT, ne peut pas être null et a une valeur par défaut vide.
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ''
    },
    // Définit un attribut 'position' de type INTEGER, ne peut pas être null et a une valeur par défaut de 0.
    position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    // Nom de la table dans la base de données.
    tableName: "list",
    // Utilise des underscores plutôt que le camelCase pour les noms automatiquement générés.
    underscored: true
});

// Associations : Une liste peut avoir plusieurs cartes (déjà définies dans index.js).
List.hasMany(Card, { foreignKey: 'listId' });
Card.belongsTo(List, { foreignKey: 'listId' });

// Exporte le modèle List pour qu'il puisse être utilisé dans d'autres fichiers.
module.exports = List;
