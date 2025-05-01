// var db = require('./db.js');
var user = require('./user.js');
var organisation = require('./organisation.js');
var poste = require('./poste.js');

// user.readall(function (err, results) {
//     if (err) {
//         console.error('Error reading users:', err);
//         return;
//     }
//     console.log('Users:', results);
// });

// user.areValide('lucas.martin@example.com', 'hashedpassord3', function (err, isValid) {
//     if (err) {
//         console.error('Error validating user:', err);
//         return;
//     }
//     console.log('Is valid:', isValid);
// });

// user.create('test@gmail.com', 'testpassword', 'Test', 'User', '1234567890', '2023-10-01', 'actif', 'utilisateur', function (err) {
//     if (err) {
//         console.error('erreur création user:', err);
//         return;
//     }
//     console.log('User créé avec succès');
// });

// user.modifiedMdp('test@gmail.com', 'newpassword', function (err) {
//     if (err) {
//         console.error('Erreur modification mdp:', err);
//         return;
//     }
//     console.log('Mdp modifié avec succès');
// });

// user.modifiedOrganisation('test@gmail.com', 987654321, function (err) {
//     if (err) {
//         console.error('Erreur modification organisation:', err);
//         return;
//     }
//     console.log('Organisation modifiée avec succès');
// });

// user.modifiedRole('test@gmail.com', 'admin', function (err) {
//     if (err) {
//         console.error('Erreur modification rôle:', err);
//         return;
//     }
//     console.log('Rôle modifié avec succès');
// });

// user.modifiedStatut('test@gmail.com', 'inactif', function (err) {
//     if (err) {
//         console.error('Erreur modification statut:', err);
//         return;
//     }
//     console.log('Statut modifié avec succès');
// });

// user.readadmin(function (err, results) {
//     if (err) {
//         console.error('Error reading admin users:', err);
//         return;
//     }
//     console.log('Admin :', results);
// });

// user.readutilisateur(function (err, results) {
//     if (err) {
//         console.error('Error reading utilisateur users:', err);
//         return;
//     }
//     console.log('Utilisateur :', results);
// });

// user.readrecruteur(function (err, results) {
//     if (err) {
//         console.error('Error reading recruteur users:', err);
//         return;
//     }
//     console.log('Recruteur :', results);
// });

// organisation.readall(function (err, results) {
//     if (err) {
//         console.error('Error reading organisations:', err);
//         return;
//     }
//     console.log('Organisations:', results);
// });

// poste.readAll(function (err, results) {
//     if (err) {
//         console.error('Error reading postes:', err);
//         return;
//     }
//     console.log('Postes:', results);
// });

// organisation.create(112345678, 'Test Organisation', 'SARL', '123 Rue de Test', function (err) {
//     if (err) {
//         console.error('Error creating organisation:', err);
//         return;
//     }
//     console.log('Organisation created successfully');
// });

// poste.read(1, function (err, result) {
//     if (err) {
//         console.error('Error reading poste:', err);
//         return;
//     }
//     console.log('Poste:', result);
// });

// poste.createFicheDePoste(112345678, 'Développeur', 'Ouvert', 'John Doe', 'Temps plein', '50 000€', 'Description du poste', 'Paris', 'Informatique', function (err) {
//     if (err) {
//         console.error('Error creating fiche de poste:', err);
//         return;
//     }
//     console.log('Fiche de poste created successfully');
// });

// organisation.remove(112345678, function (err) {
//     if (err) {
//         console.error('Error deleting organisation:', err);
//         return;
//     }
//     console.log('Organisation deleted successfully');
// });

// user.modifiedInfo('jean.dupont@example.com', 'Dupond', 'Jeanne', '0987654321', function (err) {
//     if (err) {
//         console.error('Error modifying user info:', err);
//         return;
//     }
//     console.log('User info modified successfully');
// });

// organisation.modifiedName(112345678, 'Nouvelle Organisation', function (err) {
//     if (err) {
//         console.error('Error modifying organisation name:', err);
//         return;
//     }
//     console.log('Organisation name modified successfully');
// });

// organisation.modifiedSiege(112345678, '456 Rue de Test', function (err) {
//     if (err) {
//         console.error('Error modifying organisation siege:', err);
//         return;
//     }
//     console.log('Organisation siege modified successfully');
// });

// poste.createOffre(1, 'publié', '2023-12-31', 'CV, Lettre de motivation', 2, 'jean.dupont@example.com', function (err) {
//     if (err) {
//         console.error('Error creating offre:', err);
//         return;
//     }
//     console.log('Offre created successfully');
// });

// poste.readSortDate('2024-10-01', function (err, results) {
//     if (err) {
//         console.error('Error reading offres by date:', err);
//         return;
//     }
//     console.log('Offres sorted by date:', results);
// });

// poste.readSortOrganisation(123456789, function (err, results) {
//     if (err) {
//         console.error('Error reading offres by organisation:', err);
//         return;
//     }
//     console.log('Offres sorted by organisation:', results);
// });

// poste.readSortCity('Compi', function (err, results) {
//     if (err) {
//         console.error('Error reading offres by city:', err);
//         return;
//     }
//     console.log('Offres sorted by city:', results);
// });

poste.readSortSalaire('30000', '50000', function (err, results) {
    if (err) {
        console.error('Error reading offres by salary:', err);
        return;
    }
    console.log('Offres sorted by salary:', results);
});

poste.readAll((offres) => {
    console.log(JSON.stringify(offres, null, 2));
  });