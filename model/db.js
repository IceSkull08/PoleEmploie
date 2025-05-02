var mysql = require('mysql2');

var pool = mysql.createPool({
    host: "tuxa.sme.utc",
    user: "sr10p081",
    password: "un8cIXySY82u",
    database: "sr10p081"
});

module.exports = pool;