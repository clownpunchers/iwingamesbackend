const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'iwingaming_db',
  password: ''
});

module.exports = db;