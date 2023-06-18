// Importation du modèle List depuis les modèles.
const List = require('../models/list');

// Definition de l'objet listController qui contient différentes méthodes.
const listController = {

  // getAllLists récupère toutes les listes dans la base de données.
  getAllLists: async (req, res) => {
    try {
      // Récupération des listes avec les cartes associées et leurs tags.
      const lists = await List.findAll({
        include: {
          association: 'cards',
          include: 'tags'
        },
        // Trier par position en ordre croissant et de même pour les cartes.
        order: [
          ['position', 'ASC'],
          ['cards', 'position', 'ASC']
        ]
      });

      // Envoi des listes sous forme de JSON.
      res.json(lists);

    } catch (error) {
      // En cas d'erreur, afficher une trace de la pile et renvoyer une réponse d'erreur.
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // getOneList récupère une liste spécifique en fonction de son ID.
  getOneList: async (req, res) => {
    try {
      // Récupération de l'ID de la liste depuis les paramètres de la requête.
      const listId = req.params.id;
      
      // Récupération de la liste avec l'ID spécifié.
      const list = await List.findByPk(listId, {
        include: {
          association: 'cards',
          include: 'tags'
        },
        order: [
          ['cards', 'position', 'ASC']
        ]
      });

      // Si la liste existe, envoie la liste, sinon envoie une erreur 404.
      if (list) {
        res.json(list);
      } else {
        res.status(404).json('Cant find list with id ' + listId);
      }

    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // createList crée une nouvelle liste avec les données fournies dans le corps de la requête.
  createList: async (req, res) => {
    try {
      const { name, position } = req.body;

      // Vérifie si le nom est présent.
      const bodyErrors = [];
      if (!name) {
        bodyErrors.push('name can not be empty');
      }

      // Si il y a des erreurs, envoie une réponse avec les erreurs.
      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);
      } else {
        // Crée la nouvelle liste et l'enregistre dans la base de données.
        let newList = List.build({
          name,
          position
        });
        await newList.save();
        res.json(newList);
      }

    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // modifyList modifie une liste existante avec les données fournies.
  modifyList: async (req, res) => {
    try {
      const listId = req.params.id;
      const list = await List.findByPk(listId);

      // Si la liste n'existe pas, renvoie une erreur 404.
      if (!list) {
        res.status(404).send('Cant find list with id ' + listId);
      } else {
        const { name, position } = req.body;
        
        // Modifie les attributs de la liste si ils sont présents dans le corps de la requête.
        if (name) {
          list.name = name;
        }
        if (position) {
          list.position = position;
        }

        // Enregistre les modifications dans la base de données.
        await list.save();
        res.json(list);
      }

    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // createOrModify crée ou modifie une liste en fonction de l'existence de l'ID.
  createOrModify: async (req, res) => {
    try {
      let list;
      if (req.params.id) {
        list = await List.findByPk(req.params.id);
      }
      if (list) {
        // Si la liste existe, modifie la liste.
        await listController.modifyList(req, res);
      } else {
        // Sinon, crée une nouvelle liste.
        await listController.createList(req, res);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  // deleteList supprime une liste existante en fonction de son ID.
  deleteList: async (req, res) => {
    try {
      const listId = req.params.id;
      const list = await List.findByPk(listId);
      await list.destroy();
      res.json('OK');
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  }
};

// Exporte listController pour pouvoir l'utiliser dans d'autres fichiers.
module.exports = listController;
