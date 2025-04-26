const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost", //ou localhost
    user: "sr10",
    password: "12345678",
    database: "sr10p079"
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

