import axios from 'axios';


export async function generateToken(userData) {
    // const res = await axios.post('https://green-budget-app.herokuapp.com/api/generate-token', {
    const res = await axios.post('http://localhost:5000/api/generate-token', {
            user: userData
    })
    return await res.data.token;
};

// Login.component.js
export async function validateToken(userData, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/users/validate-user', userData, headers);
        const res = await axios.post('http://localhost:5000/api/users/validate-user', userData, headers);
        return await res;
    } catch (error){
        console.log(error);
        return null;
    }    
};

export async function register(userData, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/users/create-user', userData, headers);
        const res = await axios.post('http://localhost:5000/api/users/create-user', userData, headers);
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
        const res = await axios.post('http://localhost:5000/api/expenses/create-expense', data, headers);
        return await res;
    } catch (error){
        console.log(error);
        return null;
    }    
};

export async function removeBudgetItem(data, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/expenses/delete-expense', data, headers);
        const res = await axios.post('http://localhost:5000/api/expenses/delete-expense', data, headers);
        return await res;
    } catch (error){
        console.log(error);
        return null;
    }    
};
export async function updateBudgetItem(data, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/expenses/update-expense', data, headers);
        const res = await axios.post('http://localhost:5000/api/expenses/update-expense', data, headers);
        return await res;
    } catch (error){
        console.log(error);
        return null;
    }    
};

export async function getBudgetData(data, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/expenses/read-expenses', data, headers);
        const res = await axios.post('http://localhost:5000/api/expenses/read-expenses', data, headers);
        return await res.data.data;
    } catch (error){
        console.log(error);
        return null;
    }    
};
