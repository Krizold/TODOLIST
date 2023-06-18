// Importation des modèles Tag et Card depuis les modèles.
const { Tag, Card } = require('../models');

// Définition de l'objet tagController qui contient différentes méthodes.
const tagController = {
  // getAllTags récupère tous les tags dans la base de données.
  getAllTags: async (req, res) => {
    try {
      const tags = await Tag.findAll();
      res.json(tags);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // createTag crée un nouveau tag avec les données fournies dans le corps de la requête.
  createTag: async (req, res) => {
    try {
      const { name, color } = req.body;
      let bodyErrors = [];
      // Vérifie si le nom et la couleur sont présents.
      if (!name) {
        bodyErrors.push('name can not be empty');
      }
      if (!color) {
        bodyErrors.push('color can not be empty');
      }

      // Si il y a des erreurs, envoie une réponse avec les erreurs.
      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
      } else {
        // Crée le nouveau tag et l'enregistre dans la base de données.
        let newTag = Tag.build({ name, color });
        await newTag.save();
        res.json(newTag);
      }

    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // modifyTag modifie un tag existant avec les données fournies.
  modifyTag: async (req, res) => {
    try {
      const tagId = req.params.id;
      const { name, color } = req.body;

      let tag = await Tag.findByPk(tagId);
      // Si le tag n'existe pas, renvoie une erreur 404.
      if (!tag) {
        res.status(404).json('Can not find tag with id ' + tagId);
      } else {
        // Modifie les attributs du tag si ils sont présents dans le corps de la requête.
        if (name) {
          tag.name = name;
        }
        if (color) {
          tag.color = color;
        }
        // Enregistre les modifications dans la base de données.
        await tag.save();
        res.json(tag);
      }

    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // createOrModify crée ou modifie un tag en fonction de l'existence de l'ID.
  createOrModify: async (req, res) => {
    try {
      let tag;
      if (req.params.id) {
        tag = await Tag.findByPk(req.params.id);
      }
      if (tag) {
        // Si le tag existe, modifie le tag.
        await tagController.modifyTag(req, res);
      } else {
        // Sinon, crée un nouveau tag.
        await tagController.createTag(req, res);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // deleteTag supprime un tag existant en fonction de son ID.
  deleteTag: async (req, res) => {
    try {
      const tagId = req.params.id;
      let tag = await Tag.findByPk(tagId);
      if (!tag) {
        res.status(404).json('Can not find tag with id ' + tagId);
      } else {
        // Supprime le tag de la base de données.
        await tag.destroy();
        res.json('OK');
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // associateTagToCard associe un tag à une carte spécifiée.
  associateTagToCard: async (req, res) => {
    try {
      const cardId = req.params.id;
      const tagId = req.body.tag_id;

      let card = await Card.findByPk(cardId, {
        include: ['tags']
      });

      // Vérifie si la carte existe.
      if (!card) {
        return res.status(404).json('Can not find card with id ' + cardId);
      }

      // Vérifie si le tag existe.
      let tag = await Tag.findByPk(tagId);
      if (!tag) {
        return res.status(404).json('Can not find tag with id ' + tagId);
      }

      // Associe le tag à la carte.
      await card.addTag(tag);
      
      // Récupère les informations mises à jour de la carte.
      card = await Card.findByPk(cardId, {
        include: ['tags']
      });
      res.json(card);

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  // removeTagFromCard désassocie un tag d'une carte spécifiée.
  removeTagFromCard: async (req, res) => {
    try {
      const { cardId, tagId } = req.params;

      let card = await Card.findByPk(cardId);

      // Vérifie si la carte existe.
      if (!card) {
        return res.status(404).json('Can not find card with id ' + cardId);
      }

      // Vérifie si le tag existe.
      let tag = await Tag.findByPk(tagId);
      if (!tag) {
        return res.status(404).json('Can not find tag with id ' + tagId);
      }

      // Désassocie le tag de la carte.
      await card.removeTag(tag);
      
      // Récupère les informations mises à jour de la carte.
      card = await Card.findByPk(cardId, {
        include: ['tags']
      });
      res.json(card);

    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  }
};

// Exporte tagController pour pouvoir l'utiliser dans d'autres fichiers.
module.exports = tagController;
