var db = require('./db.js');

module.exports = {
    read: function (siren, callback) {
        db.query('SELECT * FROM ORGANISATION WHERE siren = ?', [siren], function (err, results) {
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
        db.query('SELECT * FROM ORGANISATION', [], function (err, results) {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        });
    },
    create: function (siren, nom, type_entreprise, siege_social, callback) {
        db.query('INSERT INTO ORGANISATION (siren, nom, type_entreprise, siege_social) VALUES (?, ?, ?, ?)', [siren, nom, type_entreprise, siege_social], function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    delete: function (siren, callback) {
        db.query('DELETE FROM ORGANISATION WHERE siren = ?', [siren], function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    modifiedName: function (siren, nom, callback) {
        db.query('UPDATE ORGANISATION SET nom = ? WHERE siren = ?', [nom, siren], function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    },
    modifiedSiege: function (siren, siege_social, callback) {
        db.query('UPDATE ORGANISATION SET siege_social = ? WHERE siren = ?', [siege_social, siren], function (err) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    }
};