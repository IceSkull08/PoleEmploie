var express = require('express');
var router = express.Router();
const poste = require('../model/poste.js');
const organisation = require('../model/organisation.js');
const userModel = require('../model/user.js')

/* GET users listing. */
router.get('/', function (req, res, next) {
  const filters = {
    date: req.query.date?.trim(),
    location: req.query.location?.trim(),
    jobType: req.query.jobType?.trim(),
    company: req.query.company?.trim(), // pourquoi '?'  => trim() uniquement si company defined
    // company: req.query.company.trim(),

    intitule: req.query.search?.trim(),
    salaireMin: req.query.salaireMin,
    salaireMax: req.query.salaireMax,
  };

  const info = {
    nom: req.session.nom,
    prenom: req.session.prenom
  }

  console.log(req.query)
  console.log("date :", filters.date),
    console.log("location :", filters.location),
    console.log("jobType :", filters.jobType),
    console.log("company : ", filters.company),
    console.log("salaireMin :", filters.salaireMin),
    console.log("salaireMax :", filters.salaireMax);
  console.log("info", info);


  poste.filter(filters, (err, offres) => {
    if (err) return next(err);
    // console.log(offres);
    organisation.readall((errOrg, organisations) => {
      if (errOrg) return next(errOrg);
      // console.log(organisations);
      res.render('user', { offres, filters, organisations, info });
    });
  });
});


/* creation user */
router.get('/createUser', function (req, res, next) {
  res.render('createUser', { title: 'création compte' });
});

router.post('/login', function (req, res, next) {
  const email = String(req.body.email);
  const password = String(req.body.password);
  console.log("login : " + email);
  console.log("password : " + password);
  result = userModel.areValide(email, password, function (err, result) {
    if (err) return next(err);
    if (result) {
      console.log("login de " + email + " ok")
      res.send("user " + email + " connecté");
    }
    else {
      console.log("erreur login de " + email);
      return;
    }
  });
});

router.post('/createUser', function (req, res, next) {
  // res.render('createUser', { title: 'création compte' });
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const email = req.body.email;
  const password = req.body.password;
  const tel = req.body.tel;

  // console.log("création de "+nom);
  // createUser: function (email, nom, prenom, tel, mdp,  callback) {
  try {
    result = userModel.createUser(email, nom, prenom, tel, password, function (result) {
      console.log('(routes/users.js) result=', result)
      if (result) {
        console.log("(routes/users.js) création  utilisateur " + nom + "ok")
        res.send("user " + nom + " crée");
      }
      else {
        console.log("(routes/users.js) erreur création  utilisateur " + nom);
        res.send("erreur création utilisateur (déjà existant)");
        // return;
      }
    });
  } catch (e) { //ne fonctionne pas : erreur traitée dans db.query
    console.log('catch erreur ', e)
    res.send("erreur, utilisateur déjà existant")
    // return
  }

});


module.exports = router;
