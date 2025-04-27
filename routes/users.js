var express = require('express');
var router = express.Router();
const poste = require('../model/poste.js');
const organisation = require('../model/organisation.js');
const userModel = require('../model/user.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
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

  console.log(req.query)
  console.log("date :",filters.date),
  console.log("location :", filters.location),
  console.log("jobType :",filters.jobType),
  console.log("company : ", filters.company),
  console.log("salaireMin :", filters.salaireMin),
  console.log("salaireMax :", filters.salaireMax);


  poste.filter(filters, (err, offres) => {
    if(err) return next(err);
    // console.log(offres);
    organisation.readall((errOrg, organisations) => {
      if(errOrg) return next(errOrg);
      // console.log(organisations);
      res.render('user', { offres, filters, organisations });
    });
});
});


/* creation user */
router.get('/createUser', function (req, res, next) {
  res.render('createUser', { title: 'création compte' });
});

router.post('/createUser', function (req, res, next) {
  // res.render('createUser', { title: 'création compte' });
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const email = req.body.email;
  const password = req.body.password;
  const tel = req.body.tel;

  // console.log("création de "+nom);
  result = userModel.createUser(nom, prenom, email, tel, password, function (result) {
    console.log(result)
    if (result) {
      console.log("création  utilisateur " + nom + "ok")
      res.send("user " + nom + " crée");
    }
    else {
      console.log("erreur création  utilisateur " + nom);
      return;
    }

  });
});


module.exports = router;
