import React, { Component } from 'react';
import Logout from "./Logout.component";

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
        };   
    }
    handleLogout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('admin');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('name');
        this.props.history.push('/login');
    }
    
    render() {
        return (
            <div>
                <h4>Dashboard</h4>
                <p>This is Dashboard page.</p>
                <p>Welcome, {sessionStorage.getItem('name')}</p>
                <input type="button" onClick={this.handleLogout} value="Logout" />
            </div>
        )};
}
 
export default Dashboard;