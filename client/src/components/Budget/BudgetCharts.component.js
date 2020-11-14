import React from 'react';
// import {Container} from 'reactstrap';
import { Doughnut } from "react-chartjs-2";
import '../../css/DoughnutChart.css';
import {Col,Row} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';




export const BudgetCharts = (props) => {
        let month = "";
        let axis="Month";
        if (props.month.id !== 12){
            month=props.month.value;
            axis="Day"
        }
        const title = month + " "+ props.year.value +' Spending By Category';
        const data = {
            labels: props.lineLabels,
            datasets: props.datasets
        };
        if (props.formats.length>1){
            return (
                <div>
                    <br></br>
                    <Container  fluid={true}>
                    <Row>
                        <Col xl="6"> 
                        <Line data={data} options={{responsive:true,title:{
                        display:true,
                        text:title,
                        fontSize:20
                        },
                        scales: {
                            yAxes: [{
                              scaleLabel: {
                                display: true,
                                labelString: 'Amount ($)',
                                
                              },
                              gridLines: {
                              },
                            }],
                            xAxes: [{
                              scaleLabel: {
                                display: true,
                                labelString: axis
                              },
                              gridLines: {
                                display: false,
                              },
                            }],
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
                                text:title ,
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
                                text:title,
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
                        text:title,
                        fontSize:20
                        },
                        scales: {
                            yAxes: [{
                              scaleLabel: {
                                display: true,
                                labelString: 'Amount ($)',
                                
                              },
                              gridLines: {
                              },
                            }],
                            xAxes: [{
                              scaleLabel: {
                                display: true,
                                labelString: axis
                              },
                              gridLines: {
                                display: false,
                              },
                            }],
                        }    
                        
                    }}/></Container>
                </div>)
        } else {
            return (
                <div>
                </div>)
        }
              
};