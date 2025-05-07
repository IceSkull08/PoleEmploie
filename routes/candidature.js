const express = require('express');
const router = express.Router();
const poste = require('../model/poste.js');
const path = require('path');
const fs = require('fs');
const { formidable } = require('formidable');
const candidature = require('../model/candidature.js');

// GET : affiche l'offre
router.get('/', function (req, res, next) {
  const id = req.query.id;
  poste.read(id, (err, offre) => {
    if (err) return next(err);
    res.render('candidature', { offre });
  });
});

// POST : traite le formulaire de candidature
router.post('/', (req, res, next) => {
  const id = req.query.id;

  poste.read(id, (err, offre) => {
    if (err) return next(err);

    const maxFiles = offre.nombre_piece_demande;
    const uploadDir = path.join(__dirname, '..', 'uploads'); // dossier temporaire

    const form = formidable({
      multiples: true,
      maxFiles: maxFiles,
      uploadDir: uploadDir, // dossier temporaire
      keepExtensions: true
    });

    form.parse(req, (err, fields, files) => {
      if (err) return next(err);

      const email = fields.email || 'marie.lefevre@example.com';
      const emailSafe = email.replace(/[@.]/g, '_');
      const candidatureId = id;

      const targetDir = path.join(uploadDir, emailSafe, candidatureId);
      fs.mkdirSync(targetDir, { recursive: true });

      const uploadedFiles = Array.isArray(files.fichiers) ? files.fichiers : [files.fichiers];

      if (uploadedFiles.length !== maxFiles) {
        uploadedFiles.forEach(file => fs.unlinkSync(file.filepath)); // supprimer les fichiers temporaires en cas d'erreur
        return res.status(400).send(`Vous devez envoyer exactement ${maxFiles} fichier(s).`);
      }

      // déplace et renomme les fichiers
      uploadedFiles.forEach(file => {
        const ext = path.extname(file.originalFilename);
        const base = path.basename(file.originalFilename, ext);
        const newName = `${base}_${Date.now()}${ext}`;
        const destPath = path.join(targetDir, newName);

        fs.renameSync(file.filepath, destPath);
        console.log(`Fichier sauvegardé : ${destPath}`);
      });

      candidature.createCandidature(email, candidatureId, (err) => {
        if (err) {
          return res.status(500).send('Erreur lors de la création de la candidature.');
        }
        console.log("Candidature créée avec succès !");
        res.send('Fichiers envoyés avec succès, et candidature créée !');
      });
    });
  });
});

module.exports = router;
