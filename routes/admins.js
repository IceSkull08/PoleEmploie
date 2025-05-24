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

    const info = {
        nom : req.session.nom,
        prenom : req.session.prenom
      }
    
    console.log("routes/admin element :",filters, " info",info);
    
    user.filterRead(filters, (err, liste) => {
        if(err) return next(err);
        // console.log(liste);
        // res.render('admin', { liste, filters });
        // res.render('admin', { title: 'Liste des utilisateurs simples', users: result,selection });
        res.render('admin', { title: 'Liste des utilisateurs simples', users: liste, filters,info});
    });
});

module.exports = router;