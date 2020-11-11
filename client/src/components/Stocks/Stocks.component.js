import React from "react";
import ReactDOM from "react-dom";
import Graph from '../PieChart/Graph.component';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import tickers from './tickers.js';
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

// const getStock = async ticker => {
//   console.log("Getting data");
//   try {
//   const request = await fetch(`http://localhost:8080/stock`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },

//     body: JSON.stringify({
//       ticker: ticker,
//       type: "daily"
//     })
//   });
// } catch(error) {
//     console.log(error);
// }

//   // const data = await request.json();
//   const data = 1;
//   console.log(data);
//   return data;
// };




// const getMultipleStocks = async tickersArray =>{
//   const request = await fetch(`http://localhost:8080/stocks`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },

//     body: JSON.stringify({
//       tickers: tickersArray,
//       type: "daily"
//     })
//   });

//   const data = await request.json();
//   console.log(data);
//   return data;
// }

// const getUnlimitedStocks = async tickersArray =>{
//   const request = await fetch(`http://localhost:8080/stocks-unlimited`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },

//     body: JSON.stringify({
//       tickers: tickersArray,
//       type: "daily"
//     })
//   });

//   const data = await request.json();
//   console.log(data);
//   return data;
// }

function getStocky(ticker) {
  alpha.data.daily(ticker).then((data) => {
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
  console.log('points');
  console.log(points)
  return points;
  });
}



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




class Stocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleGraphClick = this.handleGraphClick.bind(this);
    this.handleStockClick = this.handleStockClick.bind(this);
  }

  handleGraphClick() {

  }

  handleStockClick() {
    let ticker = document.getElementsByClassName('tickerinput')[0].value;
    getStocks(ticker, this);
  }

  printInfo() {
    console.log('greetings to all')
  }

  render() {
    if (!this.state.graphData) {
      return (
        <div>
        <h2>loading...</h2>
        <Autocomplete
  className='tickerselect'
  options={tickers}
  getOptionLabel={(option) => option.company}
  style={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Stock Finder" variant="outlined" />}
/>
        <textarea className='tickerinput'>ticker input</textarea>
        <button onClick={() => this.handleStockClick()}>Get stock</button>
        </div>
      )
    } else {
    return (
      <div>
        <h2>Stocks</h2>
        <Autocomplete
  className='tickerselect'
  options={tickers}
  getOptionLabel={(option) => option.company}
  style={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Stock Finder" variant="outlined" />}
/>
        <textarea className='tickerinput'>ticker input</textarea>
        <button onClick={() => this.handleStockClick()}>Get stock</button>
        <Graph title={this.state.ticker} data={this.state.graphData} />
        {/* <button onClick={() => getMultipleStocks(['AAPL', 'MSFT', 'TQQQ'], 'daily')}>Get multiple stocks</button>
        <button onClick={() => getUnlimitedStocks(['AAPL', 'MSFT', 'TQQQ', 'TLT', 'DIA', 'SPY', ],'daily')}>Get unlimited stocks in 12 seconds X #of Stocks</button> */}
      </div>
    );
  }
}
}
export default Stocks;