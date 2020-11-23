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
const strippedTickers = tickers.map((ele) => ele.company.slice(-5).split(",").pop().trim())


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
    this.state = {
      myStocks: ['CVS', 'XOM', 'AAPL'],
      tickerAutocomplete:'',
      divAutocomplete:"",
      timestamp:new Date().getTime()
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleStockClick = this.handleStockClick.bind(this);
    this.handleAddStock = this.handleAddStock.bind(this);
    this.handleTicker = this.handleTicker.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  handleSelectChange(e) {
    this.setState({tickerValue: e.target.value})
  }

  handleStockClick() {
    getStocks(this.state.tickerAutocomplete, this);
  }

  handleAddStock() {
    if (this.state.tickerAutocomplete) {
      this.setState({myStocks: this.state.myStocks.concat(this.state.tickerAutocomplete)})
    }
  }
  handleTicker(event){
      this.setState({divAutocomplete:""});
      this.setState({tickerAutocomplete:(event.target.value).toUpperCase()});
      const time = new Date().getTime();
      if (time - this.state.timestamp >= 250){
        const suggestion = this.autocomplete(event.target.value);
        if (suggestion.length > 0 && event.target.value){
          this.setState({divAutocomplete:suggestion[0]});
          this.setState({timestamp:new Date().getTime()})
        }
      }
  }

  onEnter(event){
    if(event.charCode === 13){
      this.setState({tickerAutocomplete:this.state.divAutocomplete, divAutocomplete:''});
    }
  }

  autocomplete(value){
    console.log(strippedTickers);
    let s = strippedTickers.filter(ele => ele.toUpperCase().startsWith(value.toUpperCase()));
    return s;
  }

  render() {
    if (!this.state.ticker) {
      return (
        <div>
        
     
        <Grid container>
        <Grid className='leftgrid' item xs={6}>
        <br></br>
        <h1 style={{left:"10px", position:"absolute"}} className='myStocks'>Stock Search</h1>
        <br></br>
        <br></br>
        <br></br>
        
        <Autocomplete
        className='tickerselect'
        options={tickers}
        getOptionLabel={(option) => option.company}
        style={{ width: 300, left:"10px", position:"absolute"}}
        onInputChange={this.handleSelectChange}
        renderInput={(params) => <TextField  value={this.state.tickerValue} className='tickertext' {...params} label="Stock Finder" variant="outlined" />}
      />
      
      <br></br>
      <br></br>
      <br></br>
        
      <div id="search_container">
          <div id="autocomplete">{this.state.divAutocomplete}</div>
            <input id="search_" type="text" value={this.state.tickerAutocomplete} placeholder="Input Ticker" onKeyPress={this.onEnter} onChange={this.handleTicker}/>
      </div>
      <br></br>
      <br></br>
        <div>
        <button className='stockbutton' style={{left:"10px", position:"absolute"}} onClick={() => this.handleAddStock()}>Add to My Stocks</button>
        
        </div>
        </Grid>
        <Grid className={"flex-col-scroll"} item xs={6}>
        <br></br>
          <h1 className='myStocks'>My Stocks</h1>
          <MyStocks parentState={this.state} myStocks={this.state.myStocks}/>
        </Grid>
      </Grid>
      </div>
      )
    }
    return (
      <div>
        
        
      <Grid container>
        <Grid style={{left:"10px", position:"absolute"}} className='leftgrid' item xs={6}>
        <br></br>
        <h1 className='myStocks'>Stock Search</h1>
        <br></br>
        <br></br>
        <br></br>
        
        <Autocomplete
        className='tickerselect'
        options={tickers}
        getOptionLabel={(option) => option.company}
        style={{ width: 300, left:"10px", position:"absolute"}}
        onInputChange={this.handleSelectChange}
        renderInput={(params) => <TextField  value={this.state.tickerValue} className='tickertext' {...params} label="Stock Finder" variant="outlined" />}
      />
      <br></br>
      <br></br>
      <br></br>
        <div id="search_container">
          <div id="autocomplete">{this.state.divAutocomplete}</div>
            <input id="search_" value={this.state.tickerAutocomplete} type="text" placeholder="Input Ticker" onChange={this.handleTicker}/>
          </div>
          <br></br>
          <br></br>
        <div>
        <button className='stockbutton' style={{left:"10px", position:"absolute"}} onClick={() => this.handleAddStock()}>Add to My Stocks</button>
        
        </div>
        <Graph className='searchGraph' color={'#6b9c32'} title={this.state.ticker} data={this.state.graphData} />
        </Grid>
        <Grid className={"flex-col-scroll"} item xs={6}>
        <br></br>
          <h1 className='myStocks'>My Stocks</h1>
          <MyStocks parentState={this.state} myStocks={this.state.myStocks}/>
        </Grid>
      </Grid>
      </div>
    );
  }
}
// }
export default Stocks;