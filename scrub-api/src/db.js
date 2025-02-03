import mysql from "mysql2/promise";

export const db = mysql.createPool({  //quando a api vai ter mais de uma consulta
    host: "localhost",
    user: "root",
    password: "civil2016",
    database: "scrub_bd"
  });