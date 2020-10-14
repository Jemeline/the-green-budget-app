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

db.run(`CREATE TABLE users_table (
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
              console.log(err.message);
            }
        });
    }
}); 

// db.run(`DROP TABLE users`),
// (err) => {
//     if (err) {
//         console.log(err.message) ;
//     }
// }; 



module.exports = db