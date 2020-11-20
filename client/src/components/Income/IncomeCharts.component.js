import React from 'react';
import {Container} from 'reactstrap';
import { Doughnut } from "react-chartjs-2";
import '../../css/DoughnutChart.css';
import {Col,Row} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';




export const BudgetCharts = (props) => {
    const monthNames = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
        const data = {
            labels: monthNames,
            datasets: props.datasets
        };
        if (props.formats.length>1){
            return (
                <div>
                    <br></br>
                    <Container fluid={true}>
                    <Row>
                        <Col xl="6"> 
                        <Line data={data} options={{responsive:true,title:{
                        display:true,
                        text:'Monthly Spending By Category',
                        fontSize:20
                        }
                        
                    }}/>
                        </Col>
                        <Col xl="6">
                        
                        
                            <Doughnut
                            data={props.data}
                            options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            title:{
                                display:true,
                                text:'Monthly Spending By Category',
                                fontSize:20
                            },
                            
                            }}
                        /> 
                        
                        </Col>
                        <br></br>
                    
                    </Row>
                    </Container>
                </div>);
        } else if (props.formats[0]==='donut'){
            return (
                <div>
                    <br></br>
                    <Container >
                        
                            <Doughnut
                            data={props.data}
                            options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            title:{
                                display:true,
                                text:'Monthly Spending By Category',
                                fontSize:20
                            },
                            
                            }}
                        /> 
                       
                    </Container>
                </div>)
        } else if (props.formats[0]==='line'){
            return (
                <div>
                    <br></br>
                    <Container > 
                        <Line data={data} options={{responsive:true,title:{
                        display:true,
                        text:'Monthly Spending By Category',
                        fontSize:20
                        }
                        
                    }}/></Container>
                </div>)
        } else {
            return (
                <div>
                </div>)
        }
              
};