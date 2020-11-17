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
    date TEXT NOT NULL CHECK (date IS date(date)),
    category text NOT NULL,
    subcategory text NOT NULL,
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
db.run(`CREATE TABLE IF NOT EXISTS income (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    email text NOT NULL, 
    date TEXT NOT NULL CHECK (date IS date(date)),
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
// db.run(`INSERT INTO expenses (email, date, category, subcategory,description, amount) VALUES (?,?,?,?,?,?)`, 
// ["admin@email.com",'2020-12-04',"Social","Dining","Root Cellar", 25.25], function(err) {
//     if (err) {
//       console.log(err.message);
//     }
// });
// db.run(`INSERT INTO income (email, date, category,description, amount) VALUES (?,?,?,?,?)`, 
// ["admin@email.com",'2020-12-04',"Wages/Salary","Paycheck 10-25-2020", 1225.05], function(err) {
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
// db.run(`DROP TABLE income`),
// (err) => {
//     if (err) {
//         console.log(err.message) ;
//     }
// }; 



module.exports = db