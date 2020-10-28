import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Home from './components/Home.component';
import Login from './components/Login.component';
import Dashboard from './components/Dashboard.component';
import Admin from './components/Admin.component';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import PrivateRoute from './routes/Private.route'
import AdminRoute from './routes/Admin.route'
import Logout from "./components/Logout.component";


function App() {
  return (
  <div className="App">
   <BrowserRouter>
     
     
     <div>
       <h3>Sample Title</h3>
       <ul>
         <li>
           <Link to="/dashboard">Dashboard</Link>
         </li>
         <li>
           <Link to="/login">Login</Link>
         </li>
         <li>
           <Link to="/home">Home</Link>
         </li>
         <li>
           <Link to="/admin">Admin</Link>
         </li>
       </ul>
       
       <Switch>
         <PrivateRoute path="/dashboard" component={Dashboard} />
         <Route path="/login" component={Login} />
         <Route path="/home" component={Home} />
         <AdminRoute path="/admin" component={Admin} />
       </Switch>
     </div>
     </BrowserRouter>
     </div>


  );
}

export default App;
