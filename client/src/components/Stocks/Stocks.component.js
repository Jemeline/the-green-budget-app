import React from "react";
import Graph from '../PieChart/Graph.component';
import MyStocks from '../StockCard/MyStocks'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid'
import tickers from './tickers.js';
import '../../css/Stocks.css';
require("dotenv").config();
const alpha = require('alphavantage')({ key: process.env.REACT_APP_ALPHA_VANTAGE_API_KEY});

const graphData = [
  { x: new Date("2018-03-01"), y: 85.3},
  { x: new Date("2018-03-02"), y: 83.97},
  { x: new Date("2018-03-05"), y: 83.49},
  { x: new Date("2018-03-06"), y: 84.16},
  { x: new Date("2018-03-07"), y: 84.86},
  { x: new Date("2018-03-08"), y: 84.97},
  { x: new Date("2018-03-09"), y: 85.13},
  { x: new Date("2018-03-12"), y: 85.71},
  { x: new Date("2018-03-13"), y: 84.63},
  { x: new Date("2018-03-14"), y: 84.17},
  { x: new Date("2018-03-15"), y: 85.12},
  { x: new Date("2018-03-16"), y: 85.86},
  { x: new Date("2018-03-19"), y: 85.17},
  { x: new Date("2018-03-20"), y: 85.99},
  { x: new Date("2018-03-21"), y: 86.1},
  { x: new Date("2018-03-22"), y: 85.33},
  { x: new Date("2018-03-23"), y: 84.18},
  { x: new Date("2018-03-26"), y: 85.21},
  { x: new Date("2018-03-27"), y: 85.81},
  { x: new Date("2018-03-28"), y: 85.56},
  { x: new Date("2018-03-29"), y: 88.15}
];


async function getStocks(ticker, thing) {
  let data = await alpha.data.daily(ticker);
  let points = [];
  let times = data['Time Series (Daily)'];
  for (const property in times) {
    // console.log(property.toString());
    // console.log(times[property]["4. close"]);
    let obj = {
      x: new Date(property.toString()),
      y: parseFloat(times[property]["4. close"]) 
    };
    points.unshift(obj);
  }
  thing.setState({graphData: points, ticker: ticker})
  return points;
}

function getintraday(ticker) {
  alpha.data.intraday(ticker).then((data) => {
    console.log(data);
  })
}


class Stocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {myStocks: ['CVS', 'XOM', 'AAPL']};
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleStockClick = this.handleStockClick.bind(this);
    this.handleAddStock = this.handleAddStock.bind(this);
  }

  handleSelectChange(e) {
    console.log('selectchange');
    this.setState({tickerValue: e.target.value})
  }

  handleStockClick() {
    console.log('clicked')
    let ticker = document.getElementsByClassName('tickerinput')[0].value;
    getStocks(ticker, this);
    getintraday(ticker);
  }

  handleAddStock() {
    console.log('addstock')
    let ticker = document.getElementsByClassName('tickerinput')[0].value;
    if (ticker) {
      this.setState({myStocks: this.state.myStocks.concat(ticker)})
    }
  }

  printInfo() {
    console.log('greetings to all')
  }

  render() {
    if (!this.state.ticker) {
      return (
        <Grid container>
        <Grid className='leftgrid' item xs={6}>
        <h1 className='myStocks'>Stock Search</h1>
        <Autocomplete
        className='tickerselect'
        options={tickers}
        getOptionLabel={(option) => option.company}
        style={{ width: 300 }}
        onChange={this.handleSelectChange}
        renderInput={(params) => <TextField  value={this.state.tickerValue} className='tickertext' {...params} label="Stock Finder" variant="outlined" />}
      />
        
        <textarea className='tickerinput'>ticker input</textarea>
        <div>
        <button className='stockbutton' onClick={() => this.handleAddStock()}>Add to My Stocks</button>
        <button className='stockbutton' onClick={() => this.handleStockClick()}>Get stock</button>
        </div>
        </Grid>
        <Grid className={"flex-col-scroll"} item xs={6}>
          <h1 className='myStocks'>My Stocks</h1>
          <MyStocks myStocks={this.state.myStocks}/>
        </Grid>
      </Grid>
      )
    }
    return (
      <Grid container>
        <Grid className='leftgrid' item xs={6}>
        <h1 className='myStocks'>Stock Search</h1>
        <Autocomplete
        className='tickerselect'
        options={tickers}
        getOptionLabel={(option) => option.company}
        style={{ width: 300 }}
        onChange={this.handleSelectChange}
        renderInput={(params) => <TextField  value={this.state.tickerValue} className='tickertext' {...params} label="Stock Finder" variant="outlined" />}
      />
        
        <textarea className='tickerinput'>ticker input</textarea>
        <div>
        <button className='stockbutton' onClick={() => this.handleAddStock()}>Add to My Stocks</button>
        <button className='stockbutton' onClick={() => this.handleStockClick()}>Get stock</button>
        </div>
        <Graph className='searchGraph' color={'#6b9c32'} title={this.state.ticker} data={this.state.graphData} />
        </Grid>
        <Grid className={"flex-col-scroll"} item xs={6}>
          <h1 className='myStocks'>My Stocks</h1>
          <MyStocks myStocks={this.state.myStocks}/>
        </Grid>
      </Grid>
    );
  }
}
// }
export default Stocks;