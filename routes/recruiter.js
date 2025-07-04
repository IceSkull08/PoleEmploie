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

  let searchTerm = '';

  if (req.session.recherche) {
    searchTerm = req.session.recherche;
    delete req.session.recherche; // Supprimer la recherche de la session après utilisation
  };

  const filters = req.query.offre?.trim();
    // console.log(candidatures);
    poste.readFicheDePosteOrg(req.session.org, (err, fiches) => {
        if (err) return next(err);
        // console.log(fiches);
        poste.readRecruiterOffre(req.session.userid, (err, offres) => {
          if (err) return next(err);
          // console.log(offres);
          if(searchTerm) {
            poste.searchCandidatures(searchTerm, req.session.org, (err, candidatures) => {
              if (err) return next(err);
              res.render('recruiter', { offres, fiches, candidatures, filters: searchTerm, info });
            });
          } else {
            poste.filterCandidature(filters, req.session.org, (err, candidatures) => {
            if (err) return next(err);
            res.render('recruiter', { offres, fiches, candidatures, filters, info });
            });
          }
        });
    });    
  });

//route pour la recherche dans la bar de recherche (les données sont stocké dans la session et seront récupérées puis supprimées de la session dans la route GET)
router.post('/search', function (req, res, next) {
  const searchTerm = req.body.recherche?.trim().toLowerCase();
  req.session.recherche = searchTerm; 
  res.redirect('/recruiter');
});





router.post('/add-fdp', function (req, res, next) {
  // const sirenTemp = "000000000";
  console.log(" debug router.post('/add-fdp' "+req.session)
  console.log(req.session)
  const sirenTemp = req.session.org;
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

router.post('/delete-candidature', (req, res, next) => {
  console.log("debug deleteCandidature id : ", req.body.numero_offre);
  const email = req.body.email.replace(/[@.]/g, '_');
  const numero_offre = req.body.numero_offre;
  
  poste.deleteCandidature(req.body.numero_candidature, email, numero_offre, (err) => {
    if (err) return next(err);
    res.redirect('/recruiter');
  });
});




module.exports = router;