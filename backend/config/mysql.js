var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'qlrqod12',
    database:'vue_db'
  });

  module.exports = connection;