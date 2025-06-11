var express = require('express');
var router = express.Router();
var poste = require('../model/poste.js');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

router.get('/', function (req, res, next) {
  const info = {
    nom : req.session.nom,
    prenom : req.session.prenom
  }
  const filters = req.query.offre?.trim();
  poste.filterCandidature(filters, req.session.org, (err, candidatures) => {
    if (err) return next(err);
    // console.log(candidatures);
    poste.readFicheDePosteOrg(req.session.org, (err, fiches) => {
        if (err) return next(err);
        // console.log(fiches);
        poste.readRecruiterOffre(req.session.userid, (err, offres) => {
          if (err) return next(err);
          // console.log(offres);
          res.render('recruiter', { offres, fiches, candidatures, filters, info });
        });
    });    
  });
});


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
  const recruteur = req.session.userid;
  // console.log("recruteur", recruteur);
  // console.log("intitule", intitule);
  // console.log("piece", piece);
  // console.log("nbPiece", nbPiece);
  // console.log("dateValidite", dateValidite);
  // console.log("etat", etat);
  // console.log("recruteurTemp", recruteurTemp);
  poste.createOffre(intitule, etat, dateValidite, piece, nbPiece, recruteur, (err) => {
    if (err) return next(err);
    res.redirect('/recruiter');
  });
});

router.post('/delete-fdp', function (req, res, next) {
  const numeroFiche = req.body.numero_fiche;
  poste.deleteFicheDePoste(numeroFiche, (err) => {
    console.log("debug deleteFdp");
    if (err) return next(err);
    res.redirect('/recruiter');
  });
});

router.post('/delete-offre', function (req, res, next) {
  console.log("debug deleteOffre id : ", req.body.numero_offre);
  const id = req.body.numero_offre;
  poste.deleteOffre(id, (err) => {
    if (err) return next(err);
    res.redirect('/recruiter');
  });
});


// dl les fichier de candidature dans un fichier zip 
router.get('/download/:email/:id', (req, res, next) => {
  const email = req.params.email.replace(/[@.]/g, '_');
  const id = req.params.id;
  const dossierPath = path.join(__dirname, '..', 'uploads', email, id);

  // Vérifie si le dossier existe
  if (!fs.existsSync(dossierPath)) {
      return res.status(404).send("Dossier introuvable.");
  }

  // Nom du zip
  const zipName = `candidature_${email}_${id}.zip`;

  res.setHeader('Content-Disposition', `attachment; filename=${zipName}`);
  res.setHeader('Content-Type', 'application/zip');

  const archive = archiver('zip', {
      zlib: { level: 9 }
  });

  archive.on('error', err => next(err));
  archive.pipe(res);
  archive.directory(dossierPath, false);
  archive.finalize();
});


module.exports = router;