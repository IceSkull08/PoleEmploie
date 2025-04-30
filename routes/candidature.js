var express = require('express');
var router = express.Router();
var poste = require('../model/poste.js');

router.get('/', function(req, res, next) {
    console.log("id =", req.query.id);
    poste.read(req.query.id, (err, offre) => {
        if (err) return next(err);
        console.log(offre);
        res.render('candidature', { offre });
    });
}
);

module.exports = router;