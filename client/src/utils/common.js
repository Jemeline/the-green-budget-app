import axios from 'axios';

export async function generateToken(userData) {
    // const res = await axios.post('https://green-budget-app.herokuapp.com/api/users/generate-token', {
    const res = await axios.post('http://localhost:5000/api/generate-token', {
            user: userData
    })
    return await res;
};
export async function generateJWT(userData){
    const res = await generateToken(userData);
    return res.data.token;
};

async function validateToken(userData, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/users/validate-user', {
        const res = await axios.post('http://localhost:5000/api/users/validate-user', userData, headers);
        return await res;
    } catch (error){
        console.log(error);
        return null;
    }    
};
export async function validateJWT(userData,headers){
    const res = await validateToken(userData,headers);
    return res;
};

async function register(userData, headers) {
    try {
        // const res = await axios.post('https://green-budget-app.herokuapp.com/api/users/validate-user', {
        const res = await axios.post('http://localhost:5000/api/users/create-user', userData, headers);
        return await res;
    } catch (error){
        console.log(error);
        return null;
    }    
};
export async function registerUser(userData,headers){
    const res = await register(userData,headers);
    return res;
};

export function handleLogout (){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('admin');
    sessionStorage.removeItem('name');
};
export function handleLoginUser(response){
    sessionStorage.setItem('user', response.data.data.email);
    sessionStorage.setItem('admin', response.data.data.isAdmin);
    sessionStorage.setItem('name', response.data.data.firstname);
};

export function getUser() {
    return sessionStorage.getItem('user') || null;
}
export function isUser() {
    return (sessionStorage.getItem('user') !== null)
};
export function isAdmin() {
    return (sessionStorage.getItem('admin') === '1')
};

export function capitalizeFirst(name){
    if (name !== null){
        return name.charAt(0).toUpperCase() +name.slice(1);
    }
};

export function generateTokenValidationPayload(state,token){
    return {
      body: 
      {
        sessionUser:state.emailLogin,
        email:state.emailLogin,
        password:state.passwordLogin
      },
      headers: {
        headers: {
          'Authorization': `Bearer ${token}` 
      }},
    }
};

export function generateRegisterUserPayload(state,token){
    return {
      body: 
      {
        sessionUser:state.emailRegister,
        email: state.emailRegister,
        password: state.passwordRegister,
        firstname: state.firstnameRegister,
        lastname: state.lastnameRegister
      },
      headers: {
        headers: {
          'Authorization': `Bearer ${token}` 
      }},
    }
};