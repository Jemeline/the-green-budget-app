import React from 'react';
import Graph from '../PieChart/Graph.component';
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


class StockCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {visible: true}
        getStocks(this.props.ticker, this)
        this.removeStock = this.removeStock.bind(this);
    }

    removeStock() {
      this.setState({visible: false});
    }
    

    render() {
      if (!this.state.visible) {
        return null;
      } else if(!this.state.ticker) {
            return (
                <div>
                <h2>loading...</h2>
                </div>
            )
        } else {
        return (
            <div className='mystock'>
           <Graph className={'mystockgraph'} color={'#412234'}title={this.state.ticker} data={this.state.graphData} />
           <button onClick={() => this.removeStock()}>Remove</button>
           </div>
        )
    }
}
}
export default StockCard;