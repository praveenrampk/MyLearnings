const mysql = require("mysql");

const pool = mysql.createConnection({
  host: "sql10.freemysqlhosting.net",
  user: "sql10628369",
  password: "GvuUU8NB3X",
  database: "sql10628369",
  port: 3306,
});

pool.connect((error) => {
  if (error) console.log(error);
  console.log("connected");

  //   pool.query(
  //     "create table users (id int primary key auto_increment, name varchar(30), email varchar(30), password varchar(200), age int)",
  //     (error, result) => {
  //       if (error) throw error;
  //       console.log("Table created...");
  //     }
  //   );
  pool.query("drop table users", (error, result) => {
    if (error) throw error;
    console.log("table droped...");
  });
});

module.exports = { pool };
