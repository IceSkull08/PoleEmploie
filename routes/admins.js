var express = require('express');
const user = require('../model/user');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log("debug : routes/admins.js : GET /");
    let filtres;
    if(!req.session.filters) {
        filtres = {element: 'all', search: ''};
    } else {
        filtres = req.session.filters;
        delete req.session.filters;
    }
    console.log("debug : routes/admins.js : GET / filtres", filtres);


    const info = {
        nom : req.session.nom,
        prenom : req.session.prenom
      }
   
    console.log("routes/admin element :",filtres, " info",info);
    
    user.filterRead(filtres, (err, liste) => {
        if(err) return next(err);
        console.log("debug : routes/admins.js : GET / liste", liste);
        // res.render('admin', { liste, filters });
        // res.render('admin', { title: 'Liste des utilisateurs simples', users: result,selection });
        res.render('admin', { title: 'Liste des utilisateurs simples', users: liste, filters : filtres,info});
    });
});

router.post('/filter', (req, res, next) => {
    //routr post pour avoir les filtres du form post et les mettres dans la session pour les utiliser dans le get /
    const filters = {
        element: req.body.filterType?.trim() || 'all',
        search: req.body.search?.trim() || ''
    };

    req.session.filters = filters;
    console.log("debug : routes/admins.js : POST /filter filters", filters);
    res.redirect('/admins');
});

router.post("/updateAdmin", (req, res, next) => {
    // console.log("debug : routes/admins.js : POST /updateAdmin");
    if (req.body.accepter == "ok"){
        // console.log("debug : routes/admins.js : POST /updateAdmin accepter");
        user.accepterDemandeAdmin(req.body.email, (err, result) => {
            if (err) return next(err);
            res.redirect('/admins');
        });
    } else if (req.body.refuser == "refuse") {
        // console.log("debug : routes/admins.js : POST /updateAdmin refuser");
        user.supprimerDemandeAdmin(req.body.email, (err, result) => {
            if (err) return next(err);
            res.redirect('/admins');
        });
    } else if (req.body.retirer == "remove") {
        // console.log("debug : routes/admins.js : POST /updateAdmin retirer");
        user.modifiedRole(req.body.email, "utilisateur", (err, result) => {
            if (err) return next(err);
            res.redirect('/admins');
        });
    } else if (req.body.donner == "ok") {
        // console.log("debug : routes/admins.js : POST /updateAdmin donner");
        user.modifiedRole(req.body.email, "admin", (err, result) => {
            if (err) return next(err);
            res.redirect('/admins');
        });
    }
    // res.redirect('/admins');
});

router.post("/updateRecruiter", (req, res, next) => {
    // console.log("debug : routes/admins.js : POST /updateRecruiter");
    if (req.body.accepter == "ok"){
        // console.log("debug : routes/admins.js : POST /updateRecruiter accepter");
        user.accepterDemandeRecruteur(req.body.email, (err, result) => {
            if (err) return next(err);
            res.redirect('/admins');
        });
    } else if (req.body.refuser == "refuser") {
        // console.log("debug : routes/admins.js : POST /updateRecruiter refuser");
        user.supprimerDemandeRecruteur(req.body.email, (err, result) => {
            if (err) return next(err);
            res.redirect('/admins');
        });
    } else if (req.body.retirer == "remove") {
        // console.log("debug : routes/admins.js : POST /updateRecruiter retirer");
        // console.log("\n\ndebug : routes/admins.js : POST /updateRecruiter retirer\n\n");
        // console.log("\ndebug : routes/admins.js : POST /updateRecruiter retirer email", req.body.email);
        user.modifiedRole(req.body.email, "utilisateur", (err, result) => {
            user.modifiedOrganisation(req.body.email, null, (err, result) => {
                if (err) return next(err);
                res.redirect('/admins');
        });
    });
    }
    // res.redirect('/admins');
});

module.exports = router;