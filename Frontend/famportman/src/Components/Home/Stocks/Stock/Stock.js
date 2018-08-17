import React, {Component} from 'react';

class Stock extends Component {
    constructor(props) {
        super(props);
        

        this.state = {
            name: this.props.name,
            symbol: this.props.symbol,
            priceData: this.props.priceData
        }
    }

    render() {

        var {name, symbol, priceData} = this.state;

        return(
            <div>
                <h1>{name}</h1>
                <h3>{symbol}</h3>
                {console.log(priceData)}
            </div>
        );
    }
}

export default Stock;