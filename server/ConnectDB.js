const mysql = require("mysql2/promise");

const ConnectDB = async () => {
  //using a try-catch block for better code readability
  try {
    const pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      waitForConnections: process.env.DB_WAITFORCONNECTIONS,
      connectionLimit: process.env.DB_CONNECTIONLIMIT,
      queueLimit: process.env.DB_QUEUELIMIT
    });

    //await querie to create a database
    const CreateDatabase = await pool.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\``
    );

    //incase the query was not successful
    if (!CreateDatabase) {
      return console.log(`Error Creating Database ${process.env.DB_DATABASE}.`);
    }

    //await query to switch database
    const SwitchDatabase = await pool.query(
      `USE \`${process.env.DB_DATABASE}\``
    );

    //incase the switch query was not successful
    if (!SwitchDatabase) {
      return console.log("Error Switching Database.");
    }

    //await querie to create a table
    const CreateTable = await pool.query(
      `CREATE TABLE IF NOT EXISTS \`${process.env.DB_AUTHTABLE}\`(
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    );

    //in case the create table was not successful
    if (!CreateTable) {
      return console.log(`Error Creating Table ${process.env.DB_AUTHTABLE}.`);
    }

    //console loging that the connection was successful
    console.log("Connected to DataBase.");

    //return the pool to use it in controller function
    return pool;
  } catch (error) {
    //basic error handling incase of error
    console.log(error);
  }
};

//exporting the created database connection function
module.exports = ConnectDB;
