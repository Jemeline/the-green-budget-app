import {Container, Row, Col, Button, Navbar, Nav, NavDropdown} from 'react-bootstrap'
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component, useState} from 'react';
import Icon from "./Green/Icon.js";
import '../css/Green.css';
import Info from "./Green/Info.js";
import categories from "./Budget/budgetCategories.js";

let expenses = [{
  id: "12345", 
  email: "test@email.com", 
  date: "01/01/1000",
  category: "transportation",
  subcategory: "gas",
  description: "gas",
  amount: "12.35",
  }, 
  {
  id: "12345", 
  email: "test@email.com", 
  date: "01/01/1000",
  category: "food",
  subcategory: "dinner",
  description: "chicfila",
  amount: "12.35",
  }];

// let displayInfo = function() {
//       console.log("DISPLAYING INFO")
// }

//const [count, setCount] = useState(0);

class Green extends Component {

  constructor(props){
    super(props);
    this.state = {
       type: null,
       expense: null,
       value: 0
     };   
     this.displayInfo = this.displayInfo.bind(this);
  }

  displayInfo(data){
    this.setState({
      display: true,
      type: data.subcategory,
      expense: data.amount,
      value: this.state.value + 1
    });
    console.log(this.state)
  }

  render() {
  let main = (
  <div className="">
    <header className="">
      <h1 className = "text-success m-4 text-left"> Recent Purchases </h1>
      <Row>
        <Col className = "bg-white">
        <Container>
          <Row className = "iconRow border rounded ml-2">
            {expenses.map(expense => (
              <Icon data = {expense} displayFunction = {this.displayInfo} />
            ))}
          </Row>
        </Container>
        </Col>
        <Col>
        <Container className = "infoContainer rounded height-full">
          
           {this.state.display ? <Info type = {this.state.type} expense = {this.state.expense}/>:null}
           {!this.state.display ? <div className = "fill is-vcentered is-centered"> <p className = "text-center is-centered" id = "infolabel">  click a expense to show more information </p> </div>:null}
           
       </Container>
        </Col>
      </Row>

    </header>
  </div>
  );

  return main;

  }
};

export default Green;

