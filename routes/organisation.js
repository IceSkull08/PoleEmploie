const express = require('express');
const router = express.Router();
const org = require('../model/organisation.js');
const userModel = require('../model/user.js');



router.get('/', function (req, res, next) {
    const info = {
    nom : req.session.nom,
    prenom : req.session.prenom
  }

    const searchTerm = req.session.searchTerm;
    delete req.session.searchTerm;
    if (searchTerm) {
        console.log("Recherche d'organisation avec le terme : " + searchTerm);
        org.search(searchTerm, (err, results) => {
            if (err) return next(err);
            console.log("Résultats de la recherche :", results);
            res.render('organisation', { listeOrg: results, info });
        });
    } else {
        org.readall((err, listeOrg) => {
            if (err) return next(err);
            console.log(listeOrg);
            res.render('organisation', { listeOrg, info });
        });
    }
});

router.post('/add-org', function (req, res, next) {
  const siren = req.body.siren;
  const nom = req.body.nom;
  const type = req.body.type;
  const siege = req.body.siege;
  const etat = 0;
  console.log("debug : Création organisation : ");
  console.log("siren : " + siren);
  console.log("nom : " + nom);
  console.log("type : " + type);
  console.log("siege : " + siege);
  console.log("etat : " + etat);
  org.create(siren, nom, type, siege,etat, (err) => {
    if (err) return next(err);
    res.redirect('/organisation');
  });
});

router.post('/search', function (req, res, next) {
  const searchTerm = req.body.searchBar.trim();
  if (!searchTerm) {
    return res.redirect('/organisation'); // Redirige vers la page d'organisation si le terme de recherche est vide
  }
  console.log("Recherche d'organisation avec le terme : " + searchTerm);
  
  org.search(searchTerm, (err, results) => {
    if (err) return next(err);
    req.session.searchTerm = searchTerm; // Stocke le terme de recherche dans la session
    console.log("Résultats de la recherche :", results);
    res.redirect('/organisation');
  });
});

router.post('/add-recruteur', function (req, res, next) {
  const siren = req.body.sirenDemandeRecruteur;
  const email = req.session.userid;
  console.log("debug : Création recruteur : ");
  console.log("siren : " + siren);
  console.log("email : " + email);
  userModel.demandeRecruteur(email, siren, (err) => {
    if (err) return next(err);
    res.redirect('/organisation');
  });
});

module.exports = router;
