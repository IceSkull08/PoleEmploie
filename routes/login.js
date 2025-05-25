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
      console.log("resultat arevalide : ", result[0]);

      // Création d'une session utilisateur ou admin
      session.creatSession(req.session, req.body.email, result[0]);

      console.log("req session : ", req.session) 

      // res.send(":Authentification réussie "+result[0].role_utilisateur)
      res.status(200);
      res.redirect('/users'); 
      
    }
    else {
      console.log("err autentification")
      res.send('Nom d\'utilisateur ou mot de passe incorrect.');
    }

  });

});




module.exports = router;
