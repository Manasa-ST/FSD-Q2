const mysql = require("mysql2");
require("dotenv").config();

// First connection (without db)
const baseConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Main connection (with db)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "movies_db", // <--- Fixed to movies_db
});

// Create database if not exists
baseConnection.query(`CREATE DATABASE IF NOT EXISTS movies_db`, (err) => {
  if (err) {
    console.error("Error creating database:", err);
    return;
  }
  console.log("Database checked/created");

  db.connect((err) => {
    if (err) {
      console.error("MySQL connection error:", err);
      return;
    }
    console.log("Connected to MySQL database");

    // Ensure movies table exists
    db.query(
      `CREATE TABLE IF NOT EXISTS movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        director VARCHAR(255) NOT NULL,
        genre VARCHAR(100) NOT NULL,
        release_year INT NOT NULL,
        rating DECIMAL(2,1) NOT NULL
      )`,
      (err) => {
        if (err) console.error("Error creating movies table:", err);
        else console.log("Movies table checked/created");
      }
    );
  });
});

module.exports = db;
