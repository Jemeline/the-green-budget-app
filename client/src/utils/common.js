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