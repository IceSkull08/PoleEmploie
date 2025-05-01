const express = require('express');
const router = express.Router();
const poste = require('../model/poste.js');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// CONFIGURATION DE MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const email = req.body.email || "marie.lefevre@example.com";
    const emailSafe = email.replace(/[@.]/g, "_");
    const candidatureId = req.query.id;
    const dir = path.join('uploads', emailSafe, candidatureId);

    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const ext = path.extname(originalName);
    const base = path.basename(originalName, ext);
    const timestamp = Date.now();
    cb(null, `${base}_${timestamp}${ext}`);
  }
});

// afficher la fiche d'offre
router.get('/', function(req, res, next) {
  console.log("id =", req.query.id);
  poste.read(req.query.id, (err, offre) => {
    if (err) return next(err);
    console.log(offre);
    res.render('candidature', { offre });
  });
});

// route pour le traitement du formulaire d'envoi de fichiers
router.post('/', function(req, res, next) {
  const offreId = req.query.id;

  poste.read(offreId, (err, offre) => {
    if (err) return next(err);

    const maxFiles = offre.nombre_piece_demande;
    const dynamicUpload = multer({
      storage: storage,
      limits: { files: maxFiles }
    }).array('fichiers', maxFiles);

    dynamicUpload(req, res, function (err) {
      if (err) {
        console.error("Erreur Multer :", err);
        return res.status(400).send("Erreur d'envoi de fichiers : " + err.message);
      }

      const files = req.files;
      const { email, numero_candidature } = req.body;

      if (!files || files.length === 0) {
        return res.status(400).send("Aucun fichier envoyé.");
      }

      if (files.length !== maxFiles) {
        return res.status(400).send(`Vous devez envoyer exactement ${maxFiles} fichier(s).`);
      }

      console.log(`Fichiers reçus pour ${email}, candidature n°${numero_candidature}:`);
      files.forEach(file => console.log(file.path));

      return res.send('Fichiers envoyés avec succès');
    });
  });
});

module.exports = router;
