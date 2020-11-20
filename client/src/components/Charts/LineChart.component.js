import React, { Component} from 'react';
import { Line } from 'react-chartjs-2';
import { Container } from 'reactstrap';
import ReactLoading from 'react-loading';
import {getChartData,getCategories,getChartIncomeData} from './ChartUtils';
import {categories as categoryColors, monthNames} from '../Budget/budgetCategories';




class LineChart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:"loading",
            lineLabels: Array.from({length: monthNames[new Date().getMonth()].days}, (_, i) => i + 1)
        }    
    }
    async renderChartData(){
        try{
            const year = new Date().getFullYear();
            const month = new Date().getMonth();
            const data = await getChartData(year,month);
            const incomeData = await getChartIncomeData(year,month);
            if (data){
                const dayCostArray = new Array(monthNames[month].days).fill(null);
                data.map(function(ele){
                    const ind = ele.date.getDate();
                    dayCostArray[ind] = dayCostArray[ind] + ele.cost;
                    if ((ind>0 || ind<dayCostArray.length-1) && !dayCostArray[ind+1]){
                        dayCostArray[ind+1]=0
                    };
                    if ((ind>0 || ind<dayCostArray.length-1) && !dayCostArray[ind-1]){
                        dayCostArray[ind-1]=0
                    } ;  
                });
                const categories = getCategories(data);
                const categoryDay = Array(categories.length).fill(0).map(x => Array(monthNames[month].days).fill(null));
                const x = data.map(function(ele){
                    const indCat = categories.indexOf(ele.category);
                    const indDay = ele.date.getDate();
                    categoryDay[indCat][indDay]= categoryDay[indCat][indDay] + ele.cost;
                    if ((indDay<categoryDay[indCat].length-1) && !categoryDay[indCat][indDay+1]){
                        categoryDay[indCat][indDay+1]=0
                    };
                    if ((indDay<categoryDay[indCat].length-1) && !categoryDay[indCat][indDay-1]){
                        categoryDay[indCat][indDay-1]=0
                    };
                });
                const datasets=new Array(categories.length);
                let ind = 0;
                categoryDay.map(function(catGroup){
                    datasets[ind]=
                    {
                        label: categories[ind],
                        data: catGroup,
                        fill: false,
                        backgroundColor: categoryColors.filter(c => c.value === categories[ind])[0].color,
                        borderColor: categoryColors.filter(c => c.value === categories[ind])[0].colorBorder,
                        pointHoverBackgroundColor:categoryColors.filter(c => c.value === categories[ind])[0].color,
                        pointHoverRadius:8,
                        lineTension: 0.4,
                        spanGaps:false
                    };
                    ind = ind+1;
                });
                datasets.push({
                    label: "Total Expenses",
                    data: dayCostArray,
                    fill: false,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                    lineTension: 0.4,
                    spanGaps:false,
                    pointHoverBackgroundColor:"rgba(75,192,192,0.2)",
                    pointHoverRadius:8,
                });
                if (incomeData){
                    const incomeCostArray = new Array(monthNames[month].days).fill(null);
                    incomeData.map(function(ele){
                        const ind = ele.date.getDate();
                        incomeCostArray[ind] = incomeCostArray[ind] + ele.cost;
                        if ((ind>0 || ind<incomeCostArray.length-1) && !incomeCostArray[ind+1]){
                            incomeCostArray[ind+1]=0
                        };
                        if ((ind>0 || ind<incomeCostArray.length-1) && !incomeCostArray[ind-1]){
                            incomeCostArray[ind-1]=0
                        } ;  
                    });
                    // datasets.push({
                    //     label: "Total Income",
                    //     data: incomeCostArray,
                    //     fill: false,
                    //     backgroundColor: "rgba(102,151,153,0.2)",
                    //     borderColor: "rgba(102,151,153,1)",
                    //     lineTension: 0.4,
                    //     spanGaps:false,
                    //     pointHoverBackgroundColor:"rgba(102,151,153,0.2)",
                    //     pointHoverRadius:8,
                    // });
                }
                this.setState({lineLabels: Array.from({length: monthNames[month].days}, (_, i) => i + 1)});
                this.setState({ datasets:datasets, loading:"complete" });



                // const monthCostArray = new Array(12).fill(null);
                // data.map(function(ele){
                //     const ind = ele.date.getMonth();
                //     monthCostArray[ind] = monthCostArray[ind] + ele.cost;
                //     if ((ind>0 || ind<monthCostArray.length-1) && !monthCostArray[ind+1]){
                //         monthCostArray[ind+1]=0
                //     };
                //     if ((ind>0 || ind<monthCostArray.length-1) && !monthCostArray[ind-1]){
                //         monthCostArray[ind-1]=0
                //     } ;  
                // });
                // const categories = getCategories(data);
                // const categoryMonth = Array(categories.length).fill(0).map(x => Array(12).fill(null));
                // const x = data.map(function(ele){
                //     const indCat = categories.indexOf(ele.category);
                //     const indMonth = ele.date.getMonth();
                //     categoryMonth[indCat][indMonth]= categoryMonth[indCat][indMonth] + ele.cost;
                //     if ((indMonth<categoryMonth[indCat].length-1) && !categoryMonth[indCat][indMonth+1]){
                //         categoryMonth[indCat][indMonth+1]=0
                //     };
                //     if ((indMonth<categoryMonth[indCat].length-1) && !categoryMonth[indCat][indMonth-1]){
                //         categoryMonth[indCat][indMonth-1]=0
                //     };
                // });
                // const datasets=new Array(categories.length);
                // let ind = 0;
                // categoryMonth.map(function(catGroup){
                //     datasets[ind]=
                //     {
                //         label: categories[ind],
                //         data: catGroup,
                //         fill: false,
                //         backgroundColor: categoryColors.filter(c => c.value === categories[ind])[0].color,
                //         borderColor: categoryColors.filter(c => c.value === categories[ind])[0].colorBorder,
                //         pointHoverBackgroundColor:categoryColors.filter(c => c.value === categories[ind])[0].colorBorder,
                //         pointHoverRadius:8,
                //         lineTension: 0.4,
                //         spanGaps:false
                //     };
                //     ind = ind+1;
                // });
                // datasets.push({
                //     label: "Total",
                //     data: monthCostArray,
                //     fill: false,
                //     backgroundColor: "rgba(75,192,192,0.2)",
                //     borderColor: "rgba(75,192,192,1)",
                //     lineTension: 0.4,
                //     spanGaps:false,
                //     pointHoverBackgroundColor:"rgba(75,192,192,0.2)",
                //     pointHoverRadius:8,
                // });
                // this.setState({ datasets:datasets, loading:"complete" });
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
        await this.renderChartData();
    };
    
    render() {
        // const monthNames = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
        const data = {
            labels: this.state.lineLabels,
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
            <Line data={data} options={{responsive:true,title:{
              display:true,
              text:'Monthly Spending By Category',
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
                    labelString: "Day"
                  },
                  gridLines: {
                    display: false,
                  },
                }],
            }  
        }}/></Container>
        
        )}
        }
export default LineChart;