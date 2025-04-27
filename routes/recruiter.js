var express = require('express');
var router = express.Router();
var poste = require('../model/poste.js');

router.get('/', function(req, res, next) {
  poste.readFicheDePosteOrg('123456789', (err, fiches) => { //req.session.user.siren
    if (err) return next(err);
    console.log(fiches);
    poste.readRecreuiterOffre('marie.lefevre@example.com', (err, offres) => { //req.session.user.email
      if (err) return next(err);
      console.log(offres);
      res.render('recruiter', { offres, fiches });
    });
  });
});

module.exports = router;