import React, { Component} from 'react';
import { Line } from 'react-chartjs-2';
import { Container, Col } from 'reactstrap';
import ReactLoading from 'react-loading';
import {getChartData,getCategories, getYears} from './ChartUtils';
import Select from 'react-select';
import {categories as categoryColors} from '../Budget/budgetCategories';


class LineChart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            years:[],
            year:{ value:2020,label:2020},
            loading:"loading"
        }    
    }
    handleSelect = async select => {
        console.log(select);
        this.setState({year:select});
        await this.renderChartData(select.value);

    };
    async renderChartData(year){
        try{
            const data = await getChartData(year);
            if (data){
                const monthCostArray = new Array(12).fill(null);
                data.map(function(ele){
                    const ind = ele.date.getMonth();
                    monthCostArray[ind] = monthCostArray[ind] + ele.cost;
                    if ((ind>0 || ind<monthCostArray.length-1) && !monthCostArray[ind+1]){
                        monthCostArray[ind+1]=0
                    };
                    if ((ind>0 || ind<monthCostArray.length-1) && !monthCostArray[ind-1]){
                        monthCostArray[ind-1]=0
                    } ;  
                });
                const categories = getCategories(data);
                const categoryMonth = Array(categories.length).fill(0).map(x => Array(12).fill(null));
                const x = data.map(function(ele){
                    const indCat = categories.indexOf(ele.category);
                    const indMonth = ele.date.getMonth();
                    categoryMonth[indCat][indMonth]= categoryMonth[indCat][indMonth] + ele.cost;
                    if ((indMonth<categoryMonth[indCat].length-1) && !categoryMonth[indCat][indMonth+1]){
                        categoryMonth[indCat][indMonth+1]=0
                    };
                    if ((indMonth<categoryMonth[indCat].length-1) && !categoryMonth[indCat][indMonth-1]){
                        categoryMonth[indCat][indMonth-1]=0
                    };
                });
                const datasets=new Array(categories.length);
                let ind = 0;
                categoryMonth.map(function(catGroup){
                    datasets[ind]=
                    {
                        label: categories[ind],
                        data: catGroup,
                        fill: false,
                        backgroundColor: categoryColors.filter(c => c.value === categories[ind])[0].color,
                        borderColor: categoryColors.filter(c => c.value === categories[ind])[0].colorBorder,
                        pointHoverBackgroundColor:categoryColors.filter(c => c.value === categories[ind])[0].colorBorder,
                        pointHoverRadius:8,
                        lineTension: 0.4,
                        spanGaps:false
                    };
                    ind = ind+1;
                });
                datasets.push({
                    label: "Total",
                    data: monthCostArray,
                    fill: false,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                    lineTension: 0.4,
                    spanGaps:false,
                    pointHoverBackgroundColor:"rgba(75,192,192,0.2)",
                    pointHoverRadius:8,
                });
                this.setState({ datasets:datasets, loading:"complete" });
            } else {
                this.setState({loading:'loading'});
            }
        } catch (error){
            this.setState({loading:'error'});
            console.log(error);
        }
    };
    
    

    async componentDidMount(){
        this.setState({loading:'loading'});
        const years= await getYears(await getChartData());
        years.map((year) => this.state.years.push({ value:year,label:year}));
        const defaultYear = new Date().getFullYear();
        await this.renderChartData(defaultYear);
    };
    
    render() {
        const monthNames = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
        const data = {
            labels: monthNames,
            datasets: this.state.datasets
        };
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
         
            
           
            
            <Line data={data} options={{responsive:true,title:{
              display:true,
              text:'Monthly Spending By Category',
              fontSize:20
            }
            
        }}/></Container>
        
        )}
        }
export default LineChart;