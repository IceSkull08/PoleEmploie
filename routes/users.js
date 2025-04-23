var express = require('express');
var router = express.Router();
const poste = require('../model/poste.js');
const organisation = require('../model/organisation.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const filters = {
    date: req.query.date?.trim(),
    location: req.query.location?.trim(),
    jobType: req.query.jobType?.trim(),
    company: req.query.company?.trim(),
    intitule: req.query.search?.trim(),
    salaireMin: req.query.salaireMin,
    salaireMax: req.query.salaireMax,
  };
  // console.log("date :",filters.date),
  // console.log("location :", filters.location),
  // console.log("jobType :",filters.jobType),
  // console.log("company : ", filters.company),
  // console.log("salaireMin :", filters.salaireMin),
  // console.log("salaireMax :", filters.salaireMax);


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

module.exports = router;
