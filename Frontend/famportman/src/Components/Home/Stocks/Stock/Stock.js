import React, {Component} from 'react';

//bootstrap
import {Table} from 'react-bootstrap';

class Stock extends Component {
    constructor(props) {
        super(props);
        

        this.state = {
            name: this.props.name,
            symbol: this.props.symbol,
            quantity: this.props.quantity,
            priceData: this.props.priceData,
            //get the date that we are looking for
            lastUpdated: this.props.priceData["Meta Data"]["3. Last Refreshed"]
        }
    }

    //this is fired before the component is rendered
    //and essentially says, have the props changed?
    //if so, do stuff
    componentWillReceiveProps(props) {

        console.log(props.priceData);
        this.setState({
            name: props.name,
            symbol: props.symbol,
            priceData: props.priceData,
            lastUpdated: props.priceData["Meta Data"]["3. Last Refreshed"],
            quantity: props.quantity
        });
       
        
    }

    render() {
        
        var {name, symbol, priceData, lastUpdated, quantity} = this.state;

        return(
            <div>
                <h1>{name}</h1>
                <h3>{symbol}</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>Quantity Owned</th>
                            <th>Price (close)</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{quantity}</td>
                            <td>{priceData["Weekly Time Series"][lastUpdated]["4. close"]}</td>
                            <td>{quantity * priceData["Weekly Time Series"][lastUpdated]["4. close"]}</td>
                        </tr>
                    </tbody>
                </Table>
                <Table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Open</th>
                            <th>High</th>
                            <th>Low</th>
                            <th>Close</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                           
                            <th>{lastUpdated}</th>
                            <th>{priceData["Weekly Time Series"][lastUpdated]["1. open"]}</th>
                            <th>{priceData["Weekly Time Series"][lastUpdated]["2. high"]}</th>
                            <th>{priceData["Weekly Time Series"][lastUpdated]["3. low"]}</th>
                            <th>{priceData["Weekly Time Series"][lastUpdated]["4. close"]}</th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Stock;