const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mern_auth_db", // ⚠️ change to your DB name
});

module.exports = db;
