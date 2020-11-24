import axios from 'axios';
require("dotenv").config();

export async function generateToken(userData) {
    // const res = await axios.post('https://green-budget-app.herokuapp.com/api/generate-token', {
    const res = await axios.post(process.env.REACT_APP_API_URL+'generate-token', {
            user: userData
    })
    return await res.data.token;
};

// Login.component.js
export async function validateToken(userData, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/users/validate-user', userData, headers);
        const res = await axios.post(process.env.REACT_APP_API_URL+'users/validate-user', userData, headers);
        return await res;
    } catch (error){
        console.log(error);
        return null;
    }    
};

export async function register(userData, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/users/create-user', userData, headers);
        const res = await axios.post(process.env.REACT_APP_API_URL+'users/create-user', userData, headers);
        return await res;
    } catch (error){
        console.log(error);
        return null;
    }    
};

// BudgetForm.component.js
export async function addBudgetItem(data, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/expenses/create-expense', data, headers);
        const res = await axios.post(process.env.REACT_APP_API_URL+'expenses/create-expense', data, headers);
        return await res;
    } catch (error){
        console.log(error);
        return null;
    }    
};

export async function removeBudgetItem(data, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/expenses/delete-expense', data, headers);
        const res = await axios.post(process.env.REACT_APP_API_URL+'expenses/delete-expense', data, headers);
        return await res;
    } catch (error){
        console.log(error);
        return null;
    }    
};
export async function updateBudgetItem(data, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/expenses/update-expense', data, headers);
        const res = await axios.post(process.env.REACT_APP_API_URL+'expenses/update-expense', data, headers);
        return await res;
    } catch (error){
        console.log(error);
        return null;
    }    
};

export async function getBudgetData(data, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/expenses/read-expenses', data, headers);
        const res = await axios.post(process.env.REACT_APP_API_URL+'expenses/read-expenses', data, headers);
        return await res.data.data;
    } catch (error){
        console.log(error);
        return null;
    }    
};

// BudgetForm.component.js
export async function addIncomeItem(data, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/income/create-income', data, headers);
        const res = await axios.post(process.env.REACT_APP_API_URL+'income/create-income', data, headers);
        return await res;
    } catch (error){
        console.log(error);
        return null;
    }    
};

export async function removeIncomeItem(data, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/income/delete-income', data, headers);
        const res = await axios.post(process.env.REACT_APP_API_URL+'income/delete-income', data, headers);
        return await res;
    } catch (error){
        console.log(error);
        return null;
    }    
};
export async function updateIncomeItem(data, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/income/update-income', data, headers);
        const res = await axios.post(process.env.REACT_APP_API_URL+'income/update-income', data, headers);
        return await res;
    } catch (error){
        console.log(error);
        return null;
    }    
};

export async function getIncomeData(data, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/income/read-incomes', data, headers);
        const res = await axios.post(process.env.REACT_APP_API_URL+'income/read-incomes', data, headers);
        return await res.data.data;
    } catch (error){
        console.log(error);
        return null;
    }    
};
