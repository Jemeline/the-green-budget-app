const expenses = require('express').Router();
const readExpenses = require('./readExpenses');
const readExpense = require('./readExpense');
const readAllExpenses = require('./readAllExpenses');
const createExpense = require('./createExpense');
const deleteExpense = require('./deleteExpense');
const deleteExpenses = require('./deleteExpenses');
const updateExpense = require('./updateExpense');


//CREATE
// Add new expense
expenses.post('/create-expense',createExpense);
// Endpoint: '/api/expenses/create-expense'
// Consumes json parameters: sessionUser, email, month, year, day,
//      category, description, amount
// Example: 
//        {"sessionUser":"jada_pfeiffer@email.com",
        // "email":"jada_pfeiffer@email.com",
        // "month":8,
        // "year":2020,
        // "day":3,
        // "category":"social",
        // "description":"Date Night",
        // "amount":20.20}
// Returns json
// Example: 
// {
//         "message": "success",
//         "data": {
//             "email": "jada_pfeiffer@email.com",
//             "year": 2020,
//             "month": 8,
//             "day": 3,
//             "category": "social",
//             "description": "Date Night",
//             "amount": 20.2
//         },
//         "id": 2
// }
// Failed request returns       400 => Invalid Parameter or DB error
//                              401 => JWT Auth Error
//                              500 => Generic error



//READ
expenses.post('/read-expense',readExpense);
// Lookup single expense
// Endpoint: '/api/expenses/read-expense'
// Consumes json parameter: sessionUser, expenseID
// Example: 
//        {"sessionUser":"jada_pfeiffer@email.com",
//         "expenseID":1}
// Returns json
// Example: 
// {
//         "message": "success",
//         "data": [
//             {
//                 "id": 1,
//                 "email": "admin@email.com",
//                 "year": 2020,
//                 "month": 11,
//                 "day": 2,
//                 "category": "social",
//                 "description": "Root Cellar",
//                 "amount": 25.25
//             }
//         ]
//     }
// Failed request returns       400 => Invalid Parameter or DB error
//                              401 => JWT Auth Error
//                              500 => Generic error


// Read all expenses associated with user
expenses.post('/read-expenses',readExpenses);
// Endpoint: '/api/expenses/read-expenses'
// Consumes json parameter: sessionUser, expenseUser
// Example: 
//        {"sessionUser":"jada_pfeiffer@email.com",
//         "expenseUser":"admin@email.com"}
// Returns json
// Example: 
// {
//         "message": "success",
//         "data": [
//             {
//                 "id": 1,
//                 "email": "admin@email.com",
//                 "year": 2020,
//                 "month": 11,
//                 "day": 2,
//                 "category": "social",
//                 "description": "Root Cellar",
//                 "amount": 25.25
//             }
//         ]
// }
// Failed request returns       400 => Invalid Parameter or DB error
//                              401 => JWT Auth Error
//                              500 => Generic error

// get all expenses
expenses.get('/',readAllExpenses);

//UPDATE
// Update an expense
expenses.post('/update-expense',updateExpense);
// Endpoint: '/api/expenses/update-expense'
// Consumes json parameters: sessionUser, expenseID, year(optional),month(optional),day(optional),
//                              category(optional),description(optional),amount(optional)
// Example: 
//        {"sessionUser":"jada_pfeiffer@email.com",
//         "expenseID":8,
//         "year":2020,
//         "amount":1.01}
// Returns json
// Example: 
// {
//         "message": "success",
//         "data": {
//             "expenseID": 8,
//             "year": 2020,
//             "amount": 1.01
//         }
// }
// Failed request returns       400 => Invalid Parameter or DB error
//                              401 => JWT Auth Error
//                              500 => Generic error



//DELETE
// Deletes an expense
expenses.post('/delete-expense',deleteExpense);
// Endpoint: '/api/expenses/delete-expense'
// Consumes json parameters: sessionUser, expenseID
// Example: 
//        {"sessionUser":"jada_pfeiffer@email.com",
//         "expenseID":2}
// Returns json
// Example: 
        // {
        //     "message": "success",
        //     "data": {
        //         "expenseID": 2
        //     }
        // }
// Failed request returns       400 => Invalid Parameter or DB error
//                              401 => JWT Auth Error
//                              500 => Generic error


// Deletes all expenses associated with user (admin access)
expenses.post('/delete-expenses',deleteExpenses);
// Endpoint: '/api/expenses/delete-expenses'
// Consumes json parameters: sessionUser, expenseUser
// Example: 
//        {"sessionUser":"admin@email.com",
//         "userRemove":"jada_pfeiffer@email.com"}
// Returns json
// Example: 
        // {
        //     "message": "success",
        //     "data": {
        //         "expenseID": 2
        //     }
        // }
// Failed request returns       400 => Invalid Parameter or DB error
//                              401 => JWT Auth Error
//                              500 => Generic error




module.exports = expenses;