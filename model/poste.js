var db = require('./db.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    // permet de lire toutes les offres d'emploi
    // chaque offre est reliée à une organisation par le SIREN
    // et à une fiche de poste par le numero_fiche
    readAll: function (callback) {
        db.query('SELECT * FROM OFFRE INNER JOIN FICHEDEPOSTE ON OFFRE.numero_fiche = FICHEDEPOSTE.numero_fiche INNER JOIN ORGANISATION ON FICHEDEPOSTE.siren_organisation = ORGANISATION.siren', [], function (err, results) {
            if (err) {
                return callback([]);
            }
            return callback(null, results);
        });
    },

    // permet de lire une offre d'emploi en utilisant son numero_offre
    // elle est reliée à une organisation par le SIREN
    // et à une fiche de poste par le numero_fiche
    read: function (id, callback) {
        db.query('SELECT * FROM OFFRE INNER JOIN FICHEDEPOSTE ON OFFRE.numero_fiche = FICHEDEPOSTE.numero_fiche INNER JOIN ORGANISATION ON FICHEDEPOSTE.siren_organisation = ORGANISATION.siren WHERE numero_offre = ?', [id], function (err, results) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, null);
            }
            return callback(null, results[0]);
        });
    },

    // permet de créer une fiche de poste
    // elle est reliée à une organisation par le SIREN
    createFicheDePoste: function (siren, intitule, statut_poste, responsable, rythme, salaire, description, lieu, typeMetier, callback) {
        db.query('INSERT INTO FICHEDEPOSTE (siren_organisation, intitule, statut_poste, responsable, rythme, salaire, description, lieu, typeMetier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [siren, intitule, statut_poste, responsable, rythme, salaire, description, lieu, typeMetier], function (err) {
            if (err) {
                return callback(err);
            }
            // console.log("Fiche de poste créée avec succès !");
            return callback(null);
        });
    },

    // permet de créer une offre d'emploi
    // elle est reliée a une fiche de poste par le numero_fiche
    // le recruteur est le mail de l'utilisateur qui a créé l'offre (a recuperer pendant la création de l'offre)
    // etat est dans le format 'publié', 'en cours', 'expiré'
    createOffre: function (numero_fiche, etat, date_fin, piece_demande, nbr_piece, recruteur, callback) {
        db.query('INSERT INTO OFFRE (numero_fiche, etat, date_validite, piece_demande, nombre_piece_demande, recruteur) VALUES (?, ?, ?, ?, ?, ?)', [numero_fiche, etat, date_fin, piece_demande, nbr_piece, recruteur], function (err) {
            if (err) {
                return callback(err);
            }
            // console.log("Offre créée avec succès !");
            return callback(null);
        });
    },

    // permet de supprimer une offre d'emploi
    deleteOffre: async function (id, callback) {
        try {
            const getCandidaturesQuery = 'SELECT email FROM CANDIDATURE WHERE numero_offre = ?';
            db.query(getCandidaturesQuery, [id], async (err, candidatures) => {
                if (err) return callback(err);
                for (const c of candidatures) {
                    try {
                        await module.exports.deleteFiles(c.email, id);
                    } catch (fileErr) {
                        console.log(`Erreur suppression fichiers pour ${c.email} / ${id} :`, fileErr.message);
                    }
                }

                db.query('DELETE FROM OFFRE WHERE numero_offre = ?', [id], function (err) {
                    if (err) return callback(err);
                    return callback(null);
                });
            });
        } catch (err) {
            return callback(err);
        }
    },

    //permet de supprimer les fiches de poste en supprimant les offres associées et les candidatures associées
    deleteFicheDePoste: async function (numero_fiche, callback) {
        try {
            const getCandidaturesQuery = `
                SELECT CANDIDATURE.email, CANDIDATURE.numero_offre
                FROM CANDIDATURE
                JOIN OFFRE ON CANDIDATURE.numero_offre = OFFRE.numero_offre
                WHERE OFFRE.numero_fiche = ?
            `;
            db.query(getCandidaturesQuery, [numero_fiche], async (err, candidatures) => {
                if (err) return callback(err);
                for (const candidature of candidatures) {
                    try {
                        await module.exports.deleteFiles(candidature.email, candidature.numero_offre);
                    } catch (fileErr) {
                        console.log(`Erreur suppression fichiers pour ${candidature.email} / ${candidature.numero_offre} :`, fileErr.message);
                    }
                }

                db.query('DELETE FROM FICHEDEPOSTE WHERE numero_fiche = ?', [numero_fiche], function (err) {
                    if (err) return callback(err);
                    return callback(null);
                });
            });
        } catch (err) {
            return callback(err);
        }
    },

   //permet de filtrer les offres
   filter: function(filters, callback) {
        let sql = `
            SELECT * 
            FROM OFFRE 
            INNER JOIN FICHEDEPOSTE ON OFFRE.numero_fiche = FICHEDEPOSTE.numero_fiche 
            INNER JOIN ORGANISATION ON FICHEDEPOSTE.siren_organisation = ORGANISATION.siren 
            WHERE 1=1
        `;
        const params = [];

        if (filters.date) {
            // console.log("date :",filters.date);
            sql += " AND date_validite <= ?";
            params.push(filters.date);
        }

        if (filters.location) {
            // console.log("location :", filters.location);
            sql += " AND FICHEDEPOSTE.lieu LIKE ?";
            params.push(`%${filters.location.toLowerCase()}%`);
        }

        if (filters.intitule) {
            // console.log("intitule :", filters.intitule);
            sql += " AND FICHEDEPOSTE.intitule LIKE ?";
            params.push(`%${filters.intitule.toLowerCase()}%`);
        }

        if (filters.jobType) {
            // console.log("jobType :",filters.jobType);
            sql += " AND FICHEDEPOSTE.typeMetier LIKE ?";
            params.push(`%${filters.jobType.toLowerCase()}%`);
        }

        if (filters.company) {
            // console.log("company : ", filters.company);
            sql += " AND ORGANISATION.siren = ?";
            params.push(filters.company);
        }

        if (filters.salaireMin && !isNaN(filters.salaireMin)) {
            // console.log("salaireMin :", filters.salaireMin);
            sql += " AND FICHEDEPOSTE.salaire >= ?";
            params.push(parseInt(filters.salaireMin));
        }

        if (filters.salaireMax && !isNaN(filters.salaireMax) && filters.salaireMax > 0) {
            // console.log("salaireMax :", filters.salaireMax);
            sql += " AND FICHEDEPOSTE.salaire <= ?";
            params.push(parseInt(filters.salaireMax));
        }

        db.query(sql, params, function (err, results) {
            if (err) return callback(err);
            return callback(null, results);
        });
},
    //permet le lister les offres d'un recruteur (recruteur est le mail de l'utilisateur qui a créé l'offre)
    readRecruiterOffre: function (recruteur, callback) {
        db.query('SELECT * FROM OFFRE INNER JOIN FICHEDEPOSTE ON OFFRE.numero_fiche = FICHEDEPOSTE.numero_fiche INNER JOIN ORGANISATION ON FICHEDEPOSTE.siren_organisation = ORGANISATION.siren WHERE recruteur = ?', [recruteur], function (err, results) {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },

    //permet de lister les fiches de poste d'une organisation
    readFicheDePosteOrg: function (siren, callback) {
        db.query('SELECT * FROM FICHEDEPOSTE WHERE siren_organisation = ?', [siren], function (err, results) {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },

    //permet de lister toutes  les fiches de poste 
    readAllPoste: function (callback) {
        db.query('SELECT * FROM FICHEDEPOSTE',  function (err, results) {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },


    filterCandidature: function(filters, org, callback) {
        if (!filters) {
            db.query('SELECT CANDIDATURE.numero_candidature, CANDIDATURE.email, CANDIDATURE.numero_offre, UTILISATEUR.nom, UTILISATEUR.prenom, UTILISATEUR.tel, OFFRE.date_validite, FICHEDEPOSTE.intitule, FICHEDEPOSTE.siren_organisation FROM CANDIDATURE inner join UTILISATEUR on CANDIDATURE.email = UTILISATEUR.email inner join OFFRE ON CANDIDATURE.numero_offre = OFFRE.numero_offre inner join FICHEDEPOSTE on OFFRE.numero_fiche = FICHEDEPOSTE.numero_fiche WHERE FICHEDEPOSTE.siren_organisation = ?', [org], function (err, results) {
                if (err) return callback(err);
                console.log("debug results", results);
                return callback(null, results);
            });
        } else {
            db.query('SELECT CANDIDATURE.numero_candidature, CANDIDATURE.email, CANDIDATURE.numero_offre, UTILISATEUR.nom, UTILISATEUR.prenom, UTILISATEUR.tel, OFFRE.date_validite, FICHEDEPOSTE.intitule FROM CANDIDATURE inner join UTILISATEUR on CANDIDATURE.email = UTILISATEUR.email inner join OFFRE ON CANDIDATURE.numero_offre = OFFRE.numero_offre inner join FICHEDEPOSTE on OFFRE.numero_fiche = FICHEDEPOSTE.numero_fiche WHERE CANDIDATURE.numero_offre = ?', [filters], function (err, results) {
                if (err) return callback(err);
                return callback(null, results);
            });
        }
    },

    deleteCandidature: async function (numero_candidature, email, numero_offre, callback) {
        console.log("debug deleteCandidature numero_candidature", numero_candidature);
        try{
            await this.deleteFiles(email, numero_offre);
        } catch (err) {
            console.error("Erreur lors de la suppression des fichiers :", err);
            return callback(err);
        }

        db.query('DELETE FROM CANDIDATURE WHERE numero_candidature = ?', [numero_candidature], function (err) {
            if (err) return callback(err);
            return callback(null);
        });
    },

    deleteFiles: function (email, numero_offre) {
    return new Promise((resolve, reject) => {
        const emailSafe = email.replace(/[@.]/g, '_');
        const dossierPath = path.join(__dirname, '..', 'uploads', emailSafe, numero_offre.toString());

        fs.rm(dossierPath, { recursive: true, force: true }, (err) => {
            if (err) {
                console.log(`Erreur suppression ${dossierPath} : ${err.message}`);
                return reject(err);
            }
            console.log(`Fichiers supprimés : ${dossierPath}`);
            resolve();
        });
    });
    }

};