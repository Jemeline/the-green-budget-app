import React, { Component} from 'react';
import {Container} from 'reactstrap';
import { Doughnut } from "react-chartjs-2";
import '../../css/DoughnutChart.css';
import ReactLoading from 'react-loading';
import {getChartData,getCategories} from './ChartUtils';
import { Col } from 'reactstrap';
import Select from 'react-select';
import {categories as categoryColors} from '../Budget/budgetCategories';

class DoughnutChart extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:{},
            loading:"loading"                
        }    
    }

    async renderChart(){
        try{
            const defaultYear = new Date().getFullYear();
            const data= await getChartData(defaultYear);
            if (data){
                const categories = getCategories(data);
                const catCost =new Array(categories.length).fill(0);
                data.map(function(ele){
                    const ind = categories.indexOf(ele.category);
                    catCost[ind]= catCost[ind] + ele.cost;
                })
                const x= catCost.map(function(ele){
                    return ele.toFixed(2);
                });
                const backgroundColor = new Array();
                const hoverBackgroundColor = new Array();
                categories.map(function(cat){
                    backgroundColor.push(categoryColors.filter(c => c.value === cat)[0].colorBorder);
                    hoverBackgroundColor.push(categoryColors.filter(c => c.value === cat)[0].color);
                });
                this.setState({data: {
                    datasets: [
                    {
                    data: x,
                    backgroundColor: backgroundColor,
                        hoverBackgroundColor: hoverBackgroundColor
                    }
                ],
                    labels: categories
                }});
                this.setState({loading:"complete"});


            } else {
                this.props.history.push('/login');
            }
        }catch (error){
            this.setState({loading:'error'});
            console.log(error);
        }
    }

    async componentDidMount(){
        this.setState({loading:'loading'});
        await this.renderChart();
    };
    render() {
        if (this.state.loading === 'loading') {
            return (
                <div>
                    <br></br>
                    <ReactLoading className="loading" type={"spinningBubbles"} color={"#002884"} height={'15%'} width={'15%'} />
                </div>
        )};
        if (this.state.loading === 'error') {
            return (
                <div>
                    <br></br>
                    <ReactLoading className="loading" type={"spinningBubbles"} color={"#ff0000"} height={'15%'} width={'15%'} />
                </div>
        )};
    
        return (
            <Container>
                <Col xs="3">
                <Select
                    value={this.state.year}
                    onChange={this.handleSelect}
                    options={this.state.years}
                /> 
                </Col>
         
            <Doughnut
            data={this.state.data}
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
        );
    };
};
export default DoughnutChart;