import React from 'react';
import StockCard from './StockCard';

let tick = ['CVS', 'XOM', 'AAPL'];
// can later easily change it to where you map the this.props.myStocks instead of this hard coded

class MyStocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursor: 0, 
            result: this.props.myStocks
        };
        this.arrowRight = this.arrowRight.bind(this);
    }

    arrowRight() {
        console.log('right')
       if(this.state.cursor === this.state.result.length) {
           this.setState({cursor: 0, result: this.state.result})
       } else {
           this.setState({cursor: this.state.cursor + 1, result: this.state.result});
           console.log(this.state)
       }
    }

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
                <StockCard ticker={ticker} /> )
        );
    }
}
}
export default MyStocks;