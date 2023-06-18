// Importation des modèles nécessaires
const { List, Card } = require('../models');

const cardController = {
  // Récupérer toutes les cartes d'une liste spécifique
  getCardsInList: async (req, res) => {
    try {
      // Extraire l'ID de la liste de la requête
      const listId = req.params.id;
      
      // Récupérer toutes les cartes qui appartiennent à cette liste
      const cards = await Card.findAll({
        where: {
          list_id: listId // Filtrer les cartes par l'ID de la liste
        },
        include: 'tags', // Inclure les tags associés aux cartes
        order: [
          ['position', 'ASC'] // Trier par position en ordre croissant
        ]
      });

      // Si aucune carte trouvée, renvoyer une erreur 404
      if (!cards) {
        res.status(404).json('Cant find cards with list_id ' + listId);
      } else {
        // Sinon, renvoyer les cartes en format JSON
        res.json(cards);
      }

    } catch (error) {
      // Log d'erreur et renvoie d'une réponse d'erreur 500
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // Récupérer une seule carte par son ID
  getOneCard: async (req, res) => {
    try {
      // Extraire l'ID de la carte de la requête
      const cardId = req.params.id;
      
      // Récupérer la carte par son ID
      const card = await Card.findByPk(cardId, {
        include: 'tags', // Inclure les tags associés à la carte
        order: [
          ['position', 'ASC']
        ]
      });
      
      // Si la carte n'est pas trouvée, renvoyer une erreur 404
      if (!card) {
        res.status(404).json('Cant find card with id ' + cardId);
      } else {
        // Sinon, renvoyer la carte en format JSON
        res.json(card);
      }
    } catch (error) {
      // Renvoyer une réponse d'erreur 500
      res.status(500).json(error);
    }
  },

  // Créer une nouvelle carte
  createCard: async (req, res) => {
    try {
      // Extraire les données de la requête
      const { content, color, list_id } = req.body;

      // Vérifier les erreurs dans les données reçues
      let bodyErrors = [];
      if (!content) {
        bodyErrors.push(`content can not be empty`);
      }
      if (!list_id) {
        bodyErrors.push(`list_id can not be empty`);
      }

      // Si des erreurs sont trouvées, renvoyer une réponse d'erreur 400
      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
      } else {
        // Sinon, créer une nouvelle carte
        let newCard = Card.build({ content, listId: list_id });
        if (color) {
          newCard.color = color;
        }
        // Sauvegarder la nouvelle carte dans la base de données
        await newCard.save();
        // Renvoyer la nouvelle carte en format JSON
        res.json(newCard);
      }

    } catch (error) {
      // Log d'erreur et renvoie d'une réponse d'erreur 500
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // Modifier une carte existante
  modifyCard: async (req, res) => {
    try {
      // Extraire l'ID de la carte et les données de la requête
      const cardId = req.params.id;
      const { content, color, list_id, position } = req.body;

      // Récupérer la carte par son ID
      let card = await Card.findByPk(cardId, {
        include: ['tags'] // Inclure les tags associés à la carte
      });
      
      // Si la carte n'est pas trouvée, renvoyer une erreur 404
      if (!card) {
        res.status(404).json(`Cant find card with id ${cardId}`);
      } else {
        // Mettre à jour les champs de la carte avec les données reçues
        if (content) {
          card.content = content;
        }
        if (list_id) {
          card.list_id = list_id;
        }
        if (color) {
          card.color = color;
        }
        if (position) {
          card.position = position;
        }
        // Sauvegarder les modifications dans la base de données
        await card.save();
        // Renvoyer la carte mise à jour en format JSON
        res.json(card);
      }

    } catch (error) {
      // Log d'erreur et renvoie d'une réponse d'erreur 500
      console.trace(error);
      res.status(500).json(error);
    }
  },

  // Créer ou modifier une carte
  createOrModify: async (req, res) => {
    try {
      let card;
      if (req.params.id) {
        card = await Card.findByPk(req.params.id);
      }
      // Si la carte existe, la modifier, sinon en créer une nouvelle
      if (card) {
        await cardController.modifyCard(req, res);
      } else {
        await cardController.createCard(req, res);
      }
    } catch (error) {
      // Log d'erreur et renvoie d'une réponse d'erreur 500
      console.trace(error);
      res.status(500).send(error);
    }
  },

  // Supprimer une carte
  deleteCard: async (req, res) => {
    try {
      // Extraire l'ID de la carte de la requête
      const cardId = req.params.id;
      
      // Récupérer la carte par son ID
      let card = await Card.findByPk(cardId);
      
      // Si la carte n'est pas trouvée, renvoyer une erreur 404
      if (!card) {
        res.status(404).json(`Cant find card with id ${cardId}`);
      } else {
        // Supprimer la carte de la base de données
        await card.destroy();
        // Renvoyer une réponse de succès
        res.json('ok');
      }

    } catch (error) {
      // Log d'erreur et renvoie d'une réponse d'erreur 500
      console.trace(error);
      res.status(500).json(error);
    }
  }
};

// Exporter le contrôleur
module.exports = cardController;
