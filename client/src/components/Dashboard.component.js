import React, {Component } from 'react';
import FakeHeader from './FakeHeader/FakeHeader.js';
import './FakeHeader/FakeHeader.css';
import './Dashboard.css';
import Widget from './Widget/Widget.js';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import PieChart from './PieChart/PieChart.js'



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
        this.props.history.push('/login');
    }

    
    render() {
        return (
            <>
            <div>
                <FakeHeader className={'Header'} handleLogout={this.handleLogout}/>
            </div>
            <div class="row">
            <div className={"column left"}>
                <Widget direction={'left'} text={'+'} />
                <Widget direction={'left'} text={'-'}/>
                <Widget direction={'left'} text={'edit'}/>
            </div>
            <div class="column middle">
                <ToggleButtonGroup 
                className={'ButtonGroup'}
                >
                    <ToggleButton value='left'>
                        Left
                    </ToggleButton>
                    <ToggleButton value='center'>
                        Center
                    </ToggleButton>
                    <ToggleButton value='right'>
                        Right
                    </ToggleButton>
                </ToggleButtonGroup>
                <div className={'Chart'}>
                <PieChart className={'Chart'}/>
                </div>
            </div>
            <div class="column right">
                <Widget direction={'right'} text={'stocks'} />
                <Widget direction={'right'} text={'check my progress'}/>
                <Widget direction={'right'} text={'impact'}/>
            </div>
          </div>
        </> 
        )};
}
 
export default Dashboard;