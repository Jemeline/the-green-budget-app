import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import Header from "../components/Header.component";
import {isUser} from "../utils/common";

const PrivateRoute = ({ component: Component, ...path }) => {
    return(
        <Route {...path}  component={(props)=>(
            isUser() ?
            <div>
                <Header />
                <Component {...props} />
            </div>
            :<Redirect to="/login" />
        )}
        />                         
)
};



export default PrivateRoute;