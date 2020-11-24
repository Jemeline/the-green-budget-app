import React from 'react';
import StockCard from './StockCard';

let tick = ['CVS', 'XOM', 'AAPL'];
// can later easily change it to where you map the this.props.myStocks instead of this hard coded

class MyStocks extends React.Component {
    // render() {
    //     return (
    //         tick.map(ticker => 
    //             <StockCard ticker={ticker} /> )
    //     );
    // }

    render() {
        if (!this.props.myStocks) {
        return(
            <h4>{this.state.cursor}</h4>
        );
    } else {
        return (
            this.props.myStocks.map(ticker => 
                <StockCard grandparentState={this.props.parentState} ticker={ticker} /> )
        );
    }
}
}
export default MyStocks;