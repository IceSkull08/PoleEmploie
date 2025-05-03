const express = require('express');
const router = express.Router();
const org = require('../model/organisation.js');


// // afficher les organisations
// router.get('/', function(req, res, next) {
//     org.readAll( (err, listeOrg) => {
//     if (err) return next(err);
//     console.log(listeOrg);
//     res.render('organisation', { listeOrg });
//   });
// });

// var express = require('express');
// var router = express.Router();

/* GET login page. */
router.get('/', function (req, res, next) {

    org.readall((err, listeOrg) => {
        if (err) return next(err);
        console.log(listeOrg);
        res.render('organisation', { listeOrg });
    });


    // res.render('organisation', { listeOrg,title: 'organisation' });
});

module.exports = router;
