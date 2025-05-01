var express = require('express');
const user = require('../model/user');
var router = express.Router();

router.get('/', function(req, res, next) {
    const filters = {
        element: req.query.filterType?.trim(),
    };
    if ( filters.element===undefined) {
        filters.element='all';
    }
    console.log("element :",filters);
    
    user.filterRead(filters, (err, liste) => {
        if(err) return next(err);
        console.log(liste);
        // res.render('admin', { liste, filters });
        // res.render('admin', { title: 'Liste des utilisateurs simples', users: result,selection });
        res.render('admin', { title: 'Liste des utilisateurs simples', users: liste, filters});
    });
});

module.exports = router;