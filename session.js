var sessions = require("express-session");

module.exports = {
    init: () => {
        // console.log("session.js.init()")
        return sessions({
            secret: "unSecretPourTester",
            saveUninitialized: true,
            cookie: { maxAge: 3600 * 1000 }, // 60 minutes
            resave: false,
        });
    },
    creatSession: function (session, mail, result) {
        session.userid = result.email;
        session.role = result.role_utilisateur;
        session.org = result.organisation;
        session.nom = result.nom;
        session.prenom = result.prenom;
        session.save(function (err) {
            // console.log(err);
        });
        return session;
    },
    isConnected: (session, role) => {
        // console.log(session) //debug
        if (session=== undefined) {
            // console.log("pas de session ")
            return false;
        }
        if (session.userid === undefined || !session.userid ) return false;
        if (role && session.role !== role) return false;
        return true;
    },
    deleteSession: function (session) {
        session.destroy();
    },
};