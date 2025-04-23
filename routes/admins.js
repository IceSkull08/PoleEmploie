var express = require('express');
const user = require('../model/user');
var router = express.Router();

router.get('/', function(req, res, next) {
    const filters = {
        element: req.query.filterType?.trim(),
    };
    console.log("element :",filters),
    user.filterRead(filters, (err, liste) => {
        if(err) return next(err);
        console.log(liste);
        res.render('admin', { liste, filters });
    });
});

module.exports = router;