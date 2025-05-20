var express = require('express');
// var session = require('express-session');
const session = require('../session');
const userModel = require('../model/user.js')

var router = express.Router();

// var session = require('./session');



/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'login' });
});



router.post('/', (req, res) => {
  console.log("app.post() todo // Vérification des informations d'identification de l'utilisateur")
  console.log(req.body)

  // areValide: function (email, password, callback) 
  userModel.areValide(req.body.email, req.body.password, (err, result) => {
    console.log('areValide error=')
    console.log(err);
    if (!err) {
      console.log(result[0].role_utilisateur);
      // Création d'une session utilisateur ou admin
      session.creatSession(req.session, req.body.email, result[0].role_utilisateur);
      console.log(req.session) 

      res.send(":Authentification réussie "+result[0].role_utilisateur)
      
    }
    else {
      console.log("err autentification")
      res.send('Nom d\'utilisateur ou mot de passe incorrect.');
    }

  });
  console.log("test")

});




module.exports = router;
