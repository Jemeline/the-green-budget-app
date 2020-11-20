import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {monthNames} from '../Budget/budgetCategories';
import Chip from '@material-ui/core/Chip';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import "../../css/Dashboard.css";
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

export const MonthlyExpenses = (props) => {
    const date = new Date();
    const thisMonthExpenses = props.data
        .filter(entry=>entry.date.slice(0,4)===date.getFullYear().toString() && entry.date.slice(5,7)===(date.getMonth()+1).toString())
        .map(item => item.amount)
        .reduce((prev, curr) => prev + curr, 0);
    const lastMonthExpenses = props.data
        .filter(entry=>entry.date.slice(0,4)===date.getFullYear().toString() && entry.date.slice(5,7)===(date.getMonth()).toString())
        .map(item => item.amount)
        .reduce((prev, curr) => prev + curr, 0);
    const differenceExpenses = (thisMonthExpenses - lastMonthExpenses).toFixed(2);
    return (
        <div>
            <Card className="expense-card" style={{backgroundColor:'#A6D785',borderRadius:"15%"}}>
                <CardContent>
                    <Typography style={{color:'white'}} gutterBottom><strong>Monthly Expenses</strong></Typography>
                    <Typography style={{color:'white'}} variant="h5" component="h2">
                        <strong>{'$'+thisMonthExpenses.toFixed(2).toString()}</strong>
                    </Typography>
                    <br></br>
                    <Chip className="expense-chip" color="primary" style={{backgroundColor:'#009ffd',cursor:"pointer"}} label={'$'+Math.abs(differenceExpenses).toString()+ " from last month" } icon={getIcon(differenceExpenses)} />
                    </CardContent>
            </Card>
        </div>
    );
};

export const MonthlyIncome = (props) => {
    const date = new Date();
    const thisMonthIncome = props.data
        .filter(entry=>entry.date.slice(0,4)===date.getFullYear().toString() && entry.date.slice(5,7)===(date.getMonth()+1).toString())
        .map(item => item.amount)
        .reduce((prev, curr) => prev + curr, 0);
    const lastMonthIncome = props.data
        .filter(entry=>entry.date.slice(0,4)===date.getFullYear().toString() && entry.date.slice(5,7)===(date.getMonth()).toString())
        .map(item => item.amount)
        .reduce((prev, curr) => prev + curr, 0);
    const differenceIncome = (thisMonthIncome - lastMonthIncome).toFixed(2);
    
    return (
        <div>
            <Card className="income-card" style={{backgroundColor:'#A6D785',borderRadius:"15%"}}>
                <CardContent>
                    <Typography style={{color:'white'}} gutterBottom><strong>Monthly Income</strong></Typography>
                    <Typography style={{color:'white'}} variant="h5" component="h2">
                        <strong>{'$'+thisMonthIncome.toFixed(2).toString()}</strong>
                    </Typography>
                    <br></br>
                    <Chip className="expense-chip" color="primary" style={{ backgroundColor:"#3eadcf",cursor:"pointer"}} label={'$'+Math.abs(differenceIncome).toString()+ " from last month" } icon={getIcon(differenceIncome)} />
                    </CardContent>
            </Card>
        </div>
    );
};

function getIcon(value){
    if (value>0){
        return <ArrowUpwardIcon/>
    } else if (value == 0){
        return <TrendingFlatIcon/>
    } else {
        return <ArrowDownwardIcon/>
    }
};

function getColor(value){
    if (value>0){
        return "#84BE6A"
    } else if (value == 0){
        return "#ed1c24"
    } else {
        return "#66CCCC"
    }
};

export const MonthlySavingsRate = (props) => {
    const date = new Date();
    const thisMonthExpenses = props.expenses
        .filter(entry=>entry.date.slice(0,4)===date.getFullYear().toString() && entry.date.slice(5,7)===(date.getMonth()+1).toString())
        .map(item => item.amount)
        .reduce((prev, curr) => prev + curr, 0);
    const thisMonthIncome = props.income
        .filter(entry=>entry.date.slice(0,4)===date.getFullYear().toString() && entry.date.slice(5,7)===(date.getMonth()+1).toString())
        .map(item => item.amount)
        .reduce((prev, curr) => prev + curr, 0);
    const thisMonthSavingsRate = ((1-thisMonthExpenses/thisMonthIncome)*100).toFixed(2);
    const lastMonthExpenses = props.expenses
        .filter(entry=>entry.date.slice(0,4)===date.getFullYear().toString() && entry.date.slice(5,7)===(date.getMonth()).toString())
        .map(item => item.amount)
        .reduce((prev, curr) => prev + curr, 0);
    const lastMonthIncome = props.income
        .filter(entry=>entry.date.slice(0,4)===date.getFullYear().toString() && entry.date.slice(5,7)===(date.getMonth()).toString())
        .map(item => item.amount)
        .reduce((prev, curr) => prev + curr, 0);
    const lastMonthSavingsRate = ((1-lastMonthExpenses/lastMonthIncome)*100).toFixed(2);
    const differenceSavingsRate = (thisMonthSavingsRate - lastMonthSavingsRate).toFixed(2);
    return (
        <div>
            <Card className="savingsRate-card" style={{backgroundColor:'#A6D785',borderRadius:"15%"}}>
                <CardContent>
                    <Typography style={{color:'white'}} gutterBottom><strong>Monthly Savings Rate</strong></Typography>
                    <Typography style={{color:'white'}} variant="h5" component="h2">
                        <strong>{thisMonthSavingsRate.toString()+'%'}</strong>
                    </Typography>
                    <br></br>
                    <Chip className="expense-chip" color="primary" style={{ backgroundColor:"#9795ef",cursor:"pointer"}} label={Math.abs(differenceSavingsRate).toString()+ "% from last month" } icon={getIcon(differenceSavingsRate)} />
                    </CardContent>
            </Card>
        </div>
    );
};