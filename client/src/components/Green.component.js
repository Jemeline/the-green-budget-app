import {Container, Row, Col, Button, Navbar, Nav, NavDropdown} from 'react-bootstrap'
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component, useState} from 'react';
import Icon from "./Green/Icon.js";
import '../css/Green.css';
import Info from "./Green/Info.js";
import categories from "./Budget/budgetCategories.js";
import { generateToken,getBudgetData } from '../utils/apiCalls';
import {generateBudgetDataPayload} from "./Budget/BudgetUtils.js";
import {getUser,getName} from '../utils/common';

// let expenses = [{
//   id: "12345", 
//   email: "test@email.com", 
//   date: "01/01/1000",
//   category: "Transportation",
//   subcategory: "gas",
//   description: "gas",
//   amount: "12.35",
//   }, 
//   {
//   id: "12345", 
//   email: "test@email.com", 
//   date: "01/01/1000",
//   category: "Food",
//   subcategory: "dinner",
//   description: "chicfila",
//   amount: "12.35",
  // }];

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
       value: 0,
       expenses: []
     };   
     this.displayInfo = this.displayInfo.bind(this);
  }

  displayInfo(displayData){
    this.setState({
      display: true,
      expense: displayData,
    });
    
  }

  async componentDidMount(){
    await this.getData();
  };

  async getData(){
    const token = await generateToken(getUser());
    const payload = generateBudgetDataPayload(token);
    const data = await getBudgetData(payload.body,payload.headers);
    let dataArray = []
    data.map(expense => dataArray.push(expense));
    this.setState({expenses: dataArray})
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
            {this.state.expenses.map(expense => (
              <Icon data = {expense} displayFunction = {this.displayInfo} />
            ))}
          </Row>
        </Container>
        </Col>
        <Col>
        <Container className = "infoContainer rounded height-full">
          
           {this.state.display ? <Info type = {this.state.type} expense = {this.state.expense}/>:null}
           {!this.state.display ? <div className = "fill is-vcentered is-centered"> <p className = "text-center is-centered" id = "infolabel">  Click an expense to show more information </p> </div>:null}
           
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

