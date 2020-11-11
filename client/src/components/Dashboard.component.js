import React, {Component } from 'react';
import '../css/Dashboard.css';
import Widget from './Widget/Widget.js';
import PieChart from './PieChart/PieChart.js';
import {Link } from 'react-router-dom'



class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
        };   
    }

   
    componentDidMount(){      
    }
    
    
    render() {
        return (
            
            <div className="row">
            <div className={"column left"}>
                <Widget direction={'left'} text={'+'} />
                <Widget direction={'left'} text={'-'}/>
                <Widget direction={'left'} text={'edit'}/>
            </div>
            <div className="column middle">
                
                <div className={'Chart'}>
                <PieChart className={'Chart'}/>
                </div>
            </div>
            <div className="column right">
                <a href='./stocks' className='stocksButton right'><Widget  as={Link} to="/stocks" direction={'right'} text={'stocks'} /></a>
                <Widget direction={'right'} text={'check my progress'}/>
                <Widget direction={'right'} text={'impact'}/>
            </div>
          </div> 
        )};
}
 
export default Dashboard;