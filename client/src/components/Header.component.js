import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavDropdown, Nav, NavLink, Button} from 'react-bootstrap'
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import {Link } from 'react-router-dom'
import logo from "../images/gf.png";
import {handleLogout, isUser, capitalizeFirst, isAdmin} from '../utils/common';
import '../css/Header.css';




class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            userIsActive:false,
            adminIsActive:false,   
        };
    }

    checkAuth (){
        if (isAdmin()){
            this.setState({ adminIsActive: false });
            this.setState({ userIsActive: false });
        } else if (isUser()){
            this.setState({ adminIsActive: true });
            this.setState({ userIsActive: false });
        } else {
            this.setState({ adminIsActive: true });
            this.setState({ userIsActive: true });
        }
    }

    componentDidMount(){
        this.checkAuth();
    }
    
  render() {
    return  (
    <div>
    <Navbar className = "navbar-expand-sm navbar-dark bg-dark">
    <NavbarBrand id="nav-custom" href="/">
        <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
        />
          {'  '}Green Financing
    </NavbarBrand>
    <NavbarCollapse className="order-1 order-md-0">
    <Nav className= "mr-auto order-2 ">
    <NavLink id="nav-custom" as={Link} hidden={this.state.userIsActive} to="/dashboard">Dashboard</NavLink> 
    <NavLink id="nav-custom" as={Link} hidden={this.state.adminIsActive} to="/admin">Admin</NavLink>
      
    </Nav>
    </NavbarCollapse>
    <Button as={Link} variant="outline-primary"hidden={!this.state.userIsActive} to="/login" >Login</Button>
    <NavDropdown id="nav-dropdown" hidden={this.state.userIsActive} title={"Welcome, " + capitalizeFirst(sessionStorage.getItem('name'))+ "  "}>
        <NavDropdown.Item as={Link} to="/budget">Budget</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/income">Income</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/green">Green</NavDropdown.Item>
    </NavDropdown>
    <Button as={Link} id="nav-custom" variant="outline-primary"hidden={this.state.userIsActive} to="/login" onClick={() => {handleLogout()}}>Logout</Button>
    </Navbar>
    </div>
    )}
};
export default Header;
