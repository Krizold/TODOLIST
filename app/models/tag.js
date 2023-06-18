const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

// Crée une classe Tag qui étend le modèle de base de Sequelize.
class Tag extends Model { };

Tag.init({
  // Définit un attribut 'name' de type TEXT, ne peut pas être null et a une valeur par défaut vide.
  name: {
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
  // Définit un attribut 'createdAt' pour stocker la date de création.
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP') //En utilisant sequelize.literal, on indique à Sequelize de ne pas essayer d'interpréter ou d'échapper CURRENT_TIMESTAMP, mais plutôt de l'insérer tel quel dans la requête SQL. Cela signifie que lorsque l'on crée un nouvel enregistrement et que l'on ne spécifie pas de valeur pour createdAt, la base de données insérera automatiquement le timestamp actuel comme valeur de cette colonne.
  },
  // Définit un attribut 'updatedAt' pour stocker la date de mise à jour.
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}, {
  sequelize,
  // Nom de la table dans la base de données.
  tableName: "tag",
  // Utilise des underscores plutôt que le camelCase pour les noms automatiquement générés.
  underscored: true
});

// Exporte le modèle Tag pour qu'il puisse être utilisé dans d'autres fichiers.
module.exports = Tag;
