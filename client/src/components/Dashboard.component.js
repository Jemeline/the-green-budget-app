import React, {Component } from 'react';
import {getUser} from '../utils/common';
import {generateToken,getBudgetData} from '../utils/apiCalls';
import {generateBudgetDataPayload} from "./Budget/BudgetUtils.js";
import {MonthlyExpenses, MonthlyIncome, MonthlySavingsRate, MonthlyDifferences} from './Dashboard/MonthlyExpenses.component';
import Grid from '@material-ui/core/Grid';
import {Container} from 'reactstrap';
import {generateIncomeDataPayload} from "./Income/IncomeUtils.js";
import {getIncomeData} from '../utils/apiCalls';
import LineChart from './Charts/LineChart.component';




  
class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataExpenses:[],
            dataIncome:[],
            goals:[],
            drawer:false
        };   
    }
    async renderData(){
        try {
            if (getUser()){
                const token = await generateToken(getUser());
                const payloadExpenses = generateBudgetDataPayload(token);
                const dataExpenses = await getBudgetData(payloadExpenses.body,payloadExpenses.headers);
                const payloadIncome = generateIncomeDataPayload(token);
                const dataIncome = await getIncomeData(payloadIncome.body,payloadIncome.headers);
                this.setState({ dataExpenses: dataExpenses,dataIncome:dataIncome});
            } else {
                this.props.history.push('/login');
            }
        }catch (error){
            console.log(error);
        }
    };  

   
    async componentDidMount(){   
        await this.renderData();   
    }
    
    render() {
        return (
            <div >
                <Container fluid={true}>
                    <br></br>
                    <Grid container spacing={4}>
                        <Grid item xs={2}>
                            <div onClick={() => { this.props.history.push('/budget')}} style={{cursor: 'pointer'}}>
                                <MonthlyExpenses data={this.state.dataExpenses} goals={this.state.goals} />
                            </div>
                            <br></br>
                            <br></br>
                            <div onClick={() => { this.props.history.push('/income')}} style={{cursor: 'pointer'}}>
                                <MonthlyIncome data={this.state.dataIncome} goals={this.state.goals} />
                            </div>
                            <br></br>
                            <br></br>
                                <MonthlySavingsRate income={this.state.dataIncome} expenses={this.state.dataExpenses} goals={this.state.goals} />
                        </Grid>
                        <Grid item xs={10}>
                            <LineChart/>
                        </Grid> 
                    </Grid> 
                </Container>
            </div> 
        )};
}
 
export default Dashboard;