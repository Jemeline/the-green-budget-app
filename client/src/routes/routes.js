import React from 'react';
import {Switch} from 'react-router-dom';
import Home from '../components/Home.component';
import Login from '../components/Login.component';
import Dashboard from '../components/Dashboard.component';
import Admin from '../components/Admin.component';
import About from '../components/About.component';
import Contact from '../components/Contact.component';
import PrivateRoute from './Private.route'
import AdminRoute from './Admin.route'
import PublicRoute from './Public.route'

const Routes = () => (
  <Switch>
    <PublicRoute exact path="/" component={Home} />
    <PublicRoute exact path="/login" component={Login} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />
    <AdminRoute exact path="/admin" component={Admin} />
    <PublicRoute exact path="/about" component={About} />
    <PublicRoute exact path="/contact" component={Contact} />
  </Switch>
);

export default Routes;