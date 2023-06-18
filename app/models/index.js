const Card = require('./card');
const List = require('./list');
const Tag = require('./tag');

// Définit les associations entre les modèles.

// Une carte peut avoir plusieurs tags (relation plusieurs à plusieurs).
Card.belongsToMany(Tag, {
    as: 'tags',
    through: 'card_has_tag', // table de jointure
    foreignKey: 'card_id',
    otherKey: 'tag_id',
    timestamps: false // pas de timestamps dans la table de jointure
});

// Un tag peut être associé à plusieurs cartes (relation plusieurs à plusieurs).
Tag.belongsToMany(Card, {
    as: 'cards',
    through: 'card_has_tag', // table de jointure
    foreignKey: 'tag_id',
    otherKey: 'card_id',
    timestamps: false // pas de timestamps dans la table de jointure
});

// Une liste peut avoir plusieurs cartes (relation un à plusieurs).
List.hasMany(Card, {
    as: 'cards',
    foreignKey: 'list_id'
});

// Une carte appartient à une seule liste (relation plusieurs à un).
Card.belongsTo(List, {
    as: 'list',
    foreignKey: 'list_id'
});

// Exporte les modèles pour qu'ils puissent être utilisés dans d'autres fichiers.
module.exports = {Card, List, Tag};
