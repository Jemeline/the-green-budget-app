import React from 'react';
import { Route} from 'react-router-dom';
import Header from "../components/Header.component";

const PublicRoute = ({ component: Component , ...path})=>{
    return (
        <Route {...path}  component={(props)=>(
            <div>
                <Header />
                <Component {...props} />
            </div>
        )}
        />
    )
};

export default PublicRoute;
