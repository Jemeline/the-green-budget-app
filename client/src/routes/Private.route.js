import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const validUser = () => {
    if (sessionStorage.getItem('user')) return true;
    return false;
}
const PrivateRoute = ({ component: Component, ...path }) => (
    <Route {...path} render={props => (validUser() ? <Component {...props} /> :  
    <Redirect to="/login" />)} />                         
)


export default PrivateRoute;