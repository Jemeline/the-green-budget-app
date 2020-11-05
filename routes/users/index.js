const users = require('express').Router();
const readUsers = require('./readUsers');
const readUser = require('./readUser');
const createUser = require('./createUser');
const deleteUser = require('./deleteUser');
const updateUser = require('./updateUser');
const validateUser = require('./validateUser');



//CREATE
// Add new user
// Endpoint: '/api/users/create-user'
// Consumes json parameters: email, lastname, firstname, password
// Example: 
//        {"email":"test2@test3.com",
//        "password":"test1test2test3",
//        "firstname":"Test3",
//        "lastname":"Test3"}
// Returns json
// Example: 
        // "message": "success",
        //     "data": {
        //         "username": "test2@test3.com",
        //         "email": "test2@test3.com",
        //         "firstname": "Test3",
        //         "lastname": "Test3"
        //     },
        //     "id": 5
        // }
// Failed request returns 400
users.post('/create-user',createUser);

//READ
// get all users
users.get('/',readUsers);

//READ
// Lookup single user by email
// Endpoint: '/api/users/read-user'
// Consumes json parameter: email
// Example: 
//        {"email":"test2@test3.com"}
// Returns json
// Example: 
        // "message": "success",
        //     "data": {
        //         "username": "test2@test3.com",
        //         "email": "test2@test3.com",
        //         "password": "0708b4ca464c40390706888030555d860e4a0d2bc6c487392c1655b082131629",
        //         "firstname": "Test3",
        //         "lastname": "Test3"
        //     },
        //     "id": 5
        // }
// Failed request returns 400
users.post('/read-user',readUser);

//UPDATE
// Update a user's password, firstname, or lastname
// Endpoint: '/api/users/update-user'
// Consumes json parameters: email, firstname(optional),lastname(optional),password(optional)
// Example: 
//        {"email":"test2@test2.com",
//          "lastname":"Test2",
//          "password":"222"}
// Returns json
// Example: 
        // {
        //     "message": "success",
        //     "data": {
        //         "email": "test2@test2.com",
        //         "lastname": "Test2"
        //     }
        // }
// Failed request returns 400
users.post('/update-user',updateUser);


//DELETE
// Deletes user
// Consumes json parameters: email
// Example: 
//        {"email":"test2@test3.com"}
// Returns json
// Example: 
        // "message": "success",
        //     "data": {
        //         "email": "test2@test3.com"
        //     }
        // }
// Failed request returns 400
users.post('/delete-user',deleteUser);

// VALIDATE
// Validates user for Login
// Consumes json parameters: email, sessionUser, password
// Example: 
//        {"sessionUser":"jada_pfeiffer@email.com",
        // "email":"jada_pfeiffer@email.com",
        // "password":"12345678"}
// Returns json
// Example: 
// {
//         "message": "success",
//         "data": {
//             "id": 3,
//             "email": "jada_pfeiffer@email.com",
//             "firstname": "jada",
//             "lastname": "Jada",
//             "isAdmin": 0
//         }
// }
// Failed request returns 400
users.post('/validate-user',validateUser);


module.exports = users;