import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from "../components/Header.component";
import {isAdmin} from "../utils/common";

const AdminRoute = ({ component: Component, ...path }) => {
    return(
        <Route {...path}  component={(props)=>(
            isAdmin() ?
            <div>
                <Header />
                <Component {...props} />
            </div>
            :<Redirect to="/login" />
        )}
        />                         
)};


export default AdminRoute;