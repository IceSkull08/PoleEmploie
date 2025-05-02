var express = require('express');
var router = express.Router();
var poste = require('../model/poste.js');



router.post('/add-fdp', function (req, res, next) {
  const sirenTemp = "000000000";
  const { intitule, statutPoste, responsable, Rythme, salaire, description, lieu, typeMetier } = req.body;
  poste.createFicheDePoste(sirenTemp, intitule, statutPoste, responsable, Rythme, salaire, description, lieu, typeMetier, (err) => {
    if (err) return next(err);
    res.redirect('/recruiter');
  });
});

router.post('/add-offre', function (req, res, next) {
  const { intitule, piece, nbPiece, dateValidite } = req.body;
  const etat = "publié";
  const recruteurTemp = "marie.lefevre@example.com";
  console.log("intitule", intitule);
  console.log("piece", piece);
  console.log("nbPiece", nbPiece);
  console.log("dateValidite", dateValidite);
  console.log("etat", etat);
  console.log("recruteurTemp", recruteurTemp);
  poste.createOffre(intitule, etat, dateValidite, piece, nbPiece, recruteurTemp, (err) => {
    if (err) return next(err);
    res.redirect('/recruiter');
  });
});


// router.get('/', function(req, res, next) {
//   poste.readFicheDePosteOrg('000000000', (err, fiches) => { //req.session.user.siren
//     if (err) return next(err);
//     console.log(fiches);
//     poste.readRecreuiterOffre('marie.lefevre@example.com', (err, offres) => { //req.session.user.email
//       if (err) return next(err);
//       // console.log(offres);
//       res.render('recruiter', { offres, fiches });
//     });
//   });
// });

router.get('/', function (req, res, next) {
  // poste.readFicheDePosteOrg('000000000', (err, fiches) => { //req.session.user.siren
  poste.readAllPoste((err, fiches) => { //req.session.user.siren
    if (err) return next(err);
    console.log(fiches);
    poste.readRecreuiterOffre('marie.lefevre@example.com', (err, offres) => { //req.session.user.email
      if (err) return next(err);
      // console.log(offres);
      res.render('recruiter', { offres, fiches });
    });
  });
});


module.exports = router;