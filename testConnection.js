const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "tuxa.sme.utc", //ou localhost
    user: "sr10p079",
    password: "gahZ8Lc7iYla",
    database: "sr10p079"
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

