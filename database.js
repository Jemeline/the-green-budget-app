const sqlite3 = require('sqlite3').verbose();
const sha256 = require('js-sha256');

const DBSOURCE = "./project.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      console.error(err.message)
      throw err
    }else{
        console.log('SQLite database: Connected')
    }
});
db.run(`PRAGMA foreign_keys = ON;`, function(err) {
    if (err) {
      console.log(err.message);
    }
});
db.run(`CREATE TABLE IF NOT EXISTS users_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    email text UNIQUE NOT NULL, 
    password text NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    isAdmin int NOT NULL,
    CONSTRAINT email_unique UNIQUE (email),
    CHECK(isAdmin=1 OR isAdmin=0)
    )`,
(err) => {
    if (err) {   
    }else{
        db.run(`INSERT INTO users_table (email, password, firstname, lastname, isAdmin) VALUES (?,?,?,?,?)`, ["admin@email.com",sha256(process.env.ADMIN_PASS),"Admin","Admin",1], function(err) {
            if (err) {
            //   console.log(err.message);
            }
        });
    }
}); 
db.run(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    email text NOT NULL, 
    year int NOT NULL CHECK (year BETWEEN 1900 AND 2100),
    month int NOT NULL CHECK (month BETWEEN 1 AND 12),
    day int NOT NULL CHECK (day BETWEEN 1 AND 31),
    category text NOT NULL,
    description text NOT NULL,
    amount real NOT NULL,
    FOREIGN KEY (email) REFERENCES
    users_table (email)
    )`,
(err) => {
    if (err) { 
        console.log(err.message);  
    }
}); 
// db.run(`INSERT INTO expenses (email, year, month, day, category, description, amount) VALUES (?,?,?,?,?,?,?)`, 
// ["admin@email.com",2020,11,02,"social","Root Cellar", 25.25], function(err) {
//     if (err) {
//       console.log(err.message);
//     }
// });
// db.run(`DROP TABLE expenses`),
// (err) => {
//     if (err) {
//         console.log(err.message) ;
//     }
// }; 



module.exports = db