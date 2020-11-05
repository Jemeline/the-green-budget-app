const routes = require('express').Router();
const users = require('./users')
const expenses = require('./expenses')
const generateToken = require('./generateToken.js');


// User endpoints:
    // CREATE
       // 'api/users/create-user': add new user to db 
    // READ
        // '/api/users/': get all registered users
        // '/api/users/read-user': lookup single user by email
    // UPDATE
        // '/api/users/update-user': update single user by email
    // DELETE
        // 'api/users/delete-user': delete user from db 
    // VALIDATE
        // 'api/users/validate-user': for user login
routes.use('/users',users);

// Expenses endpoints:
    // CREATE
       // 'api/expenses/create-expense': add new expense to db 
    // READ
        // '/api/expenses/': get all registered expenses
        // '/api/expenses/read-expense': lookup single users' expenses
    // UPDATE
        // '/api/expenses/update-expense': update expense
    // DELETE
        // 'api/expenses/delete-expense': delete expense from db
        // 'api/expenses/delete-expenses': delete all expenses by user from db     
routes.use('/expenses',expenses);

// Check if api is working
routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

// Generate JWT Token
routes.post('/generate-token',generateToken);

  
module.exports = routes;
  