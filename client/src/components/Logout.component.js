import React, { Component } from 'react';

class Logout extends Component {
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
                <input type="button" onClick={this.handleLogout} value="Logout" />
            </div>
        )};
}
 
export default Logout;