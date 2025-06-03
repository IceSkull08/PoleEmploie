var db = require('./db.js');

module.exports = {
    createCandidature: function (email, numero_offre, callback){
        db.query('INSERT INTO CANDIDATURE (email, numero_offre) VALUES (?, ?)', [email, numero_offre], function (err) {
            if (err) {
                return callback(err);
            }
            // console.log("Candidature créée avec succès !");
            return callback(null);
        });
    }
};

