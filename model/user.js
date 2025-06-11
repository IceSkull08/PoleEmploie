var db = require('./db.js');
const bcrypt = require('bcrypt');



function createUserSimple(email, nom, prenom, tel, mdp, callback) {
    // = sans hachage password => utiliser createUser


    let date_creation = new Date(Date.now());

    let role_utilisateur = "utilisateur";
    let statut_compte = "actif"; //doit être validé (=actif) par admin TODO:mettre demande_ser ou demande_admin

    console.log("debug model/user.js createUserSimple(): hash_mdp=", mdp)


    sql = `INSERT INTO UTILISATEUR ( 
    email , 
    mdp ,  
    nom , 
    prenom ,
    tel ,
    date_creation ,
    statut_compte ,
    
    role_utilisateur 
    ) 
    VALUES ( ?,?,?,?,?,?,?,?);`



    db.query(sql, [
        email,
        mdp,
        nom,
        prenom,
        tel,
        date_creation,
        statut_compte,
        role_utilisateur

    ],
        function (err, results) {
            if (err) {

                console.log('(model/user.js) createUser() 1erreur', err)

                callback(false)
                // throw err;
                // throw new Error("pb");// ne fonctionne pas, recapturé ici

            }
            else
                callback(true);
        }
    );
};




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
        console.log("debug areValide: verif pass=",password);
            
            db.query('SELECT * FROM UTILISATEUR WHERE email = ? ', [email], function (err, results) {
                if (err) {
                    return callback(err);
                }
                if (results.length === 0) {
                    return callback(true, null);
        
                }
                console.log("result=",results);
                passHash = results[0]["mdp"];
                console.log("passHaché=",passHash);
                bcrypt.compare(password,passHash).then((isOk)=>{
                    console.log("authentification ok (fonctionne aussi avec pass en clair !!!");
                    results[0]["mdp"]='masqué';
                    return callback(false, results);    
                }).catch(err=> {
                    console.log(err);
                    return callback(err);
                });
                
        
            })
 
    },

    NONareValide: function (email, password, callback) {
        const saltRounds = 5;
        bcrypt.hash(password, saltRounds).then((res) => {
            hashMdp = res;
            console.log("debug: verif hash=",hashMdp);
            db.query('SELECT * FROM UTILISATEUR WHERE email = ? AND mdp = ?', [email, hashMdp], function (err, results) {
                if (err) {
                    return callback(err);
                }
                if (results.length === 0) {
                    return callback(true, null);
                }
                return callback(false, results);
                // return callback(null, true);
            })
        }).catch((err)=>{console.log("areValide() catch err :",err)});
    },

    areValideSimplePassword: function (email, password, callback) {
        // pass non haché
        db.query('SELECT * FROM UTILISATEUR WHERE email = ? AND mdp = ?', [email, password], function (err, results) {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(true, null);
            }
            return callback(false, results);
            // return callback(null, true);
        });
    },

    OLD_create: function (email, password, nom, prenom, tel, date_creation, statut_compte, role_utilisateur, callback) {
        //ATTENTION !!!!!!!!!! OBSOLETTE : UTILISER CREATEUSER !!!!!
        db.query('INSERT INTO UTILISATEUR (email, mdp, nom, prenom, tel, date_creation, statut_compte, role_utilisateur) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [email, password, nom, prenom, tel, date_creation, statut_compte, role_utilisateur], function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    modifiedMdp: function (email, password, callback) {
        console.log("debug modifiedMdp TODO: hash pass"); //TODO : hash pass
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
            console.log("\n\ndebug model/user.js modifiedOrganisation() organisation=",organisation);
            console.log("debug model/user.js modifiedOrganisation() email=",email);
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    modifiedRole: function (email, role_utilisateur, callback) {
        db.query('UPDATE UTILISATEUR SET role_utilisateur = ? WHERE email = ?', [role_utilisateur, email], function (err) {
            console.log("\n\ndebug model/user.js modifiedRole() role_utilisateur=",role_utilisateur);
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
        if (filters.element) {
            if (filters.element === 'all') {
                this.readall((err, users) => {
                    if (err) return callback(err);
                    return callback(null, users);
                });
            }
            else if (filters.element === 'admin') {
                this.readadmin((err, users) => {
                    if (err) return callback(err);
                    return callback(null, users);
                });
            }
            else if (filters.element === 'users') {
                this.readutilisateur((err, users) => {
                    if (err) return callback(err);
                    return callback(null, users);
                });
            }
            else if (filters.element === 'recruiter') {
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

    createUser: function (email, nom, prenom, tel, mdp, callback) {
        const saltRounds = 5;
        bcrypt.hash(mdp, saltRounds).then((res) => {
            hashMdp = res;
            createUserSimple(email, nom, prenom, tel, hashMdp, callback);
        }).catch((err) => {
            console.log(err);
        });
    },
  
    demandeRecruteur: function (email, siren, callback) {
        sql = `UPDATE UTILISATEUR SET demande = 'recruteur', organisation = ? WHERE email = ?;`;
        db.query(sql, [siren, email], function (err) {
            if (err) {
                // console.log(err);
                return callback(err);
            }
            return callback(null);
        });
    },
    supprimerDemandeRecruteur: function (email, callback) {
        sql = `UPDATE UTILISATEUR SET demande = NULL, organisation = NULL WHERE email = ?;`;
        db.query(sql, [email], function (err) {
            if (err) {
                // console.log(err);
                return callback(err);
            }
            return callback(null);
        });
    },
    accepterDemandeRecruteur: function (email, callback) {
        sql = `UPDATE UTILISATEUR SET role_utilisateur = 'recruteur', demande = NULL WHERE email = ?;`;
        db.query(sql, [email], function (err) {
            if (err) {
                // console.log(err);
                return callback(err);
            }
            return callback(null);
        });
    },
    demandeAdmin: function (email, callback) {
        sql = `UPDATE UTILISATEUR SET organisation = NULL, demande = 'admin' WHERE email = ?;`;
        // console.log("debug : demande admin pour " + email);
        db.query(sql, [email], function (err) {
            if (err) {
                // console.log(err);
                return callback(err);
            }
            return callback(null);
        });
    },
    accepterDemandeAdmin: function (email, callback) {
        sql = `UPDATE UTILISATEUR SET role_utilisateur = 'admin', demande = NULL WHERE email = ?;`;
        db.query(sql, [email], function (err) {
            if (err) {
                // console.log(err);
                return callback(err);
            }
            return callback(null);
        });
    },
    supprimerDemandeAdmin: function (email, callback) {
        sql = `UPDATE UTILISATEUR SET demande = NULL WHERE email = ?;`;
        db.query(sql, [email], function (err) {
            if (err) {
                // console.log(err);
                return callback(err);
            }
            return callback(null);
      });
    }
}