const expenses = require('express').Router();
const readIncomes = require('./readIncomes');
const readIncome = require('./readIncome');
const readAllIncomes = require('./readAllIncomes');
const createIncome = require('./createIncome');
const deleteIncome = require('./deleteIncome');
const deleteIncomes = require('./deleteIncomes');
const updateIncome = require('./updateIncome');


//CREATE
// Add new income
expenses.post('/create-income',createIncome);
// Endpoint: '/api/income/create-income'
// Consumes json parameters: sessionUser, email, month, year, day,
//      category, description, amount
// Example: 
        // {"sessionUser":"jada_pfeiffer@email.com",
        // "email":"jada_pfeiffer@email.com",
        // "date":"2019-10-10",
        // "category":"Wages/Salary",
        // "description":"Apple Paycheck 2",
        // "amount":2100.12}
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
expenses.post('/read-income',readIncome);
// Lookup single income
// Endpoint: '/api/income/read-income'
// Consumes json parameter: sessionUser, incomeID
// Example: 
//        {"sessionUser":"jada_pfeiffer@email.com",
//         "incomeID":6}
// Returns json
// Example: 
// {
//         "message": "success",
//         "data": [
//             {
//                 "id": 6,
//                 "email": "jada_pfeiffer@email.com",
//                 "date": "2019-10-10",
//                 "category": "Wages/Salary",
//                 "description": "Apple Paycheck 2",
//                 "amount": 2100.12
//             }
//         ]
// }
// Failed request returns       400 => Invalid Parameter or DB error
//                              401 => JWT Auth Error
//                              500 => Generic error



// Read all income associated with user
expenses.post('/read-incomes',readIncomes);
// Endpoint: '/api/income/read-incomes'
// Consumes json parameter: sessionUser, incomeUser
// Example: 
        // {"sessionUser":"jada_pfeiffer@email.com",
        // "incomeUser":"jada_pfeiffer@email.com"}
// Returns json
// Example: 
// {
//         "message": "success",
//         "data": [
//             {
//                 "id": 6,
//                 "email": "jada_pfeiffer@email.com",
//                 "date": "2019-10-10",
//                 "category": "Wages/Salary",
//                 "description": "Apple Paycheck 2",
//                 "amount": 2100.12
//             }
//         ]
// }
// Failed request returns       400 => Invalid Parameter or DB error
//                              401 => JWT Auth Error
//                              500 => Generic error

// get all expenses
// expenses.get('/',readAllIncomes);

//UPDATE
// Update an income
expenses.post('/update-income',updateIncome);
// Endpoint: '/api/income/update-income'
// Consumes json parameters: sessionUser, incomeID, date(optional)
//            category(optional),description(optional),amount(optional)
// Example: 
        // {"sessionUser":"jada_pfeiffer@email.com",
        // "incomeID":6,
        // "date":"2020-02-03",
        // "amount":3333.44}
// Returns json
// Example: 
// {
//         "message": "success",
//         "data": {
//             "incomeID": 6,
//             "date": "2020-02-03",
//             "amount": 3333.44
//         }
// }
// Failed request returns       400 => Invalid Parameter or DB error
//                              401 => JWT Auth Error
//                              500 => Generic error



//DELETE
// Deletes an income
expenses.post('/delete-income',deleteIncome);
// Endpoint: '/api/income/delete-income'
// Consumes json parameters: sessionUser, incomeID
// Example: 
//        {"sessionUser":"jada_pfeiffer@email.com",
//         "incomeID":2}
// Returns json
// Example: 
        // {
        //     "message": "success",
        //     "data": {
        //         "incomeID": 2
        //     }
        // }
// Failed request returns       400 => Invalid Parameter or DB error
//                              401 => JWT Auth Error
//                              500 => Generic error


// Deletes all expenses associated with user (admin access)
expenses.post('/delete-incomes',deleteIncomes);
// Endpoint: '/api/income/delete-incomes'
// Consumes json parameters: sessionUser, incomeUser
// Example: 
//        {"sessionUser":"admin@email.com",
//         "incomeUser":"jada_pfeiffer@email.com"}
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