const routes = require('express').Router();
const users = require('./users')
const generateToken = require('./generateToken.js');


// User endpoints:
    // CREATE
       // 'api/users/new-user': add new user to db 
    // READ
        // '/api/users/': get all registered users
        // '/api/users/read-user': lookup single user by email
    // UPDATE
        // '/api/users/update-user': update single user by email
    // DELETE
        // 'api/users/delete-user': delete user from db 
routes.use('/users',users);



// Check if api is working
routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

// Generate JWT Token
routes.post('/generate-token',generateToken);

  
module.exports = routes;
  