// Importe le module "sanitizer" qui est utilisé pour nettoyer les chaînes de caractères.
const sanitizer = require('sanitizer');

// Crée un middleware qui sera utilisé pour nettoyer les données reçues dans le corps de la requête.
const bodySanitizer = (req, res, next) => {
  // Vérifie si le corps de la requête contient des données.
  if (req.body) {
    // Parcourt chaque propriété de l'objet req.body.
    for (let propName in req.body) {
      // Échappe les caractères spéciaux dans la valeur de chaque propriété,
      // pour éviter les attaques par injection (comme les injections XSS).
      // Cela remplace les caractères potentiellement dangereux par des séquences d'échappement.
      req.body[propName] = sanitizer.escape( req.body[propName] );
    }
  }
  // Passe à la prochaine fonction middleware ou au gestionnaire de route.
  next();
};

// Exporte le middleware pour qu'il puisse être utilisé dans d'autres parties de l'application.
module.exports = bodySanitizer;
