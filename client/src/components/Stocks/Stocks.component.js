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



async function getStocks(ticker, thing) {
  let data = await alpha.data.daily(ticker);
  let points = [];
  let times = data['Time Series (Daily)'];
  for (const property in times) {
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
    this.state = {myStocks: ['CVS', 'XOM', 'AAPL']};
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleStockClick = this.handleStockClick.bind(this);
    this.handleAddStock = this.handleAddStock.bind(this);
  }

  handleSelectChange(e) {
    this.setState({tickerValue: e.target.value})
  }

  handleStockClick() {
    let ticker = document.getElementsByClassName('tickerinput')[0].value;
    getStocks(ticker, this);
  }

  handleAddStock() {
    let ticker = document.getElementsByClassName('tickerinput')[0].value;
    if (ticker) {
      this.setState({myStocks: this.state.myStocks.concat(ticker)})
    }
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
        onInputChange={this.handleSelectChange}
        renderInput={(params) => <TextField  value={this.state.tickerValue} className='tickertext' {...params} label="Stock Finder" variant="outlined" />}
      />
        
        <textarea className='tickerinput'>ticker input</textarea>
        <div>
        <button className='stockbutton' onClick={() => this.handleAddStock()}>Add to My Stocks</button>
        <button className='stockbutton' onClick={() => this.handleStockClick()}>View Stock Graph</button>
        </div>
        </Grid>
        <Grid className={"flex-col-scroll"} item xs={6}>
          <h1 className='myStocks'>My Stocks</h1>
          <MyStocks parentState={this.state} myStocks={this.state.myStocks}/>
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
        onInputChange={this.handleSelectChange}
        renderInput={(params) => <TextField  value={this.state.tickerValue} className='tickertext' {...params} label="Stock Finder" variant="outlined" />}
      />
        
        <textarea className='tickerinput'>enter stock ticker here</textarea>
        <div>
        <button className='stockbutton' onClick={() => this.handleAddStock()}>Add to My Stocks</button>
        <button className='stockbutton' onClick={() => this.handleStockClick()}>View Stock Graph</button>
        </div>
        <Graph className='searchGraph' color={'#6b9c32'} title={this.state.ticker} data={this.state.graphData} />
        </Grid>
        <Grid className={"flex-col-scroll"} item xs={6}>
          <h1 className='myStocks'>My Stocks</h1>
          <MyStocks parentState={this.state} myStocks={this.state.myStocks}/>
        </Grid>
      </Grid>
    );
  }
}
// }
export default Stocks;