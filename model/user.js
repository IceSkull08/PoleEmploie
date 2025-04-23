var db = require('./db.js');

module.exports = {
    read: function (email, callback) {
        db.query('SELECT * FROM UTILISATEUR WHERE email = ?', [email], function (err, results) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, null);
            }
            return callback(null, results[0]);
        });
    },
    readall: function (callback) {
        db.query('SELECT * FROM UTILISATEUR', [], function (err, results) {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },
    areValide: function (email, password, callback) {
        db.query('SELECT * FROM UTILISATEUR WHERE email = ? AND mdp = ?', [email, password], function (err, results) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, false);
            }
            return callback(null, true);
        });
    },
    create: function (email, password, nom, prenom, tel, date_creation, statut_compte, role_utilisateur, callback) {
        db.query('INSERT INTO UTILISATEUR (email, mdp, nom, prenom, tel, date_creation, statut_compte, role_utilisateur) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [email, password, nom, prenom, tel, date_creation, statut_compte, role_utilisateur], function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    modifiedMdp: function (email, password, callback) {
        db.query('UPDATE UTILISATEUR SET mdp = ? WHERE email = ?', [password, email], function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    modifiedInfo: function (email, nom, prenom, tel, callback) {
        db.query('UPDATE UTILISATEUR SET nom = ?, prenom = ?, tel = ? WHERE email = ?', [nom, prenom, tel, email], function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    modifiedStatut: function (email, statut_compte, callback) {
        db.query('UPDATE UTILISATEUR SET statut_compte = ? WHERE email = ?', [statut_compte, email], function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    modifiedOrganisation: function (email, organisation, callback) {
        db.query('UPDATE UTILISATEUR SET organisation = ? WHERE email = ?', [organisation, email], function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    modifiedRole: function (email, role_utilisateur, callback) {
        db.query('UPDATE UTILISATEUR SET role_utilisateur = ? WHERE email = ?', [role_utilisateur, email], function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    delete: function (email, callback) {
        db.query('DELETE FROM UTILISATEUR WHERE email = ?', [email], function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    readadmin: function (callback) {
        db.query('SELECT * FROM UTILISATEUR WHERE role_utilisateur = "admin"', [], function (err, results) {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },
    readutilisateur: function (callback) {
        db.query('SELECT * FROM UTILISATEUR WHERE role_utilisateur = "utilisateur"', [], function (err, results) {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },
    readrecruteur: function (callback) {
        db.query('SELECT * FROM UTILISATEUR WHERE role_utilisateur = "recruteur"', [], function (err, results) {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },

    filterRead: function (filters, callback) {
        if (filters.element){
            if (filters.element === 'all'){
                this.readall((err, users) => {
                    if (err) return callback(err);
                    return callback(null, users);
                });
            }
            else if (filters.element === 'admin'){
                this.readadmin((err, users) => {
                    if (err) return callback(err);
                    return callback(null, users);
                });
            }
            else if (filters.element === 'users'){
                this.readutilisateur((err, users) => {
                    if (err) return callback(err);
                    return callback(null, users);
                });
            }
            else if (filters.element === 'recruiter'){
                this.readrecruteur((err, users) => {
                    if (err) return callback(err);
                    return callback(null, users);
                });
            }
            // else if (filters.element === 'recruiterDemand'){
            //     this.readrecruteur((err, users) => {
            //         if (err) return callback(err);
            //         return callback(null, users);
            //     });
            // }
        }
    },
}