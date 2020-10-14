import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const validAdmin = () => {
    if (sessionStorage.getItem('admin')==='1') return true;
    return false;
}
const AdminRoute = ({ component: Component, ...path }) => (
    <Route {...path} render={props => (validAdmin() ? <Component {...props} /> :  
    <Redirect to="/login" />)} />                         
)


export default AdminRoute;