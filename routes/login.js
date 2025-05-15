var express = require('express');
// var session = require('express-session');
var router = express.Router();

// var session = require('./session');



/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'login' });
});




/* POST */

// router.post('/', (req, res) => {
//   console.log("todo // Vérification des informations d'identification de l'utilisateur")
//   // if (req.body.username === 'user' && req.body.password === pwd) {

//   if (true) {
//     // Création d'une session utilisateur
//     session.user

//     console.log(req.session) //BUG req.session non def 
//     req.session.user = req.body.username;


//     // Ajouter le rôle aussi dans la session
//     req.session.role = 'user';
//     res.send('Authentification réussie !');
//   } else {
//     res.send('Nom d\'utilisateur ou mot de passe incorrect.');
//   }
// });




module.exports = router;
