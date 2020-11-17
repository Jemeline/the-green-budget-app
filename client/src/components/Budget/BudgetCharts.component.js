import React from 'react';
import {Container} from 'reactstrap';
import { Doughnut,Line } from "react-chartjs-2";
import '../../css/DoughnutChart.css';
import {Col,Row} from 'reactstrap';

export const BudgetCharts = (props) => {
        let month = "";
        let axis="Month";
        let description='Yearly';
        if (props.month.id !== 12){
            month=props.month.value;
            axis="Day"
            description = "Daily"
        }
        const titleLine = month + " "+ props.year.value +' '+ description +' Spending';
        const title = month + " "+ props.year.value +' '+ description+' Breakdown By Category';
        const data = {
            labels: props.lineLabels,
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
                        text:titleLine,
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
                        text:titleLine,
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