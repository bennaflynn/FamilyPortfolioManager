import React, {Component} from 'react';

//bootstrap
import {Table} from 'react-bootstrap';

//functional
import {Line, Doughnut} from 'react-chartjs-2';

class Stock extends Component {
    constructor(props) {
        super(props);
        
        //TO DO: Add check to see if the data is actually coming from the api

        this.state = {
            name: this.props.name,
            symbol: this.props.symbol,
            quantity: this.props.quantity,
            priceData: this.props.priceData,
            //get the date that we are looking for
            lastUpdated: this.props.priceData["Meta Data"]["3. Last Refreshed"].substring(0,10),
            fiftyTwoWeeks: [],
            dates: []
        }

        
    }

    //this is fired before the component is rendered
    //and essentially says, have the props changed?
    //if so, do stuff
    componentWillReceiveProps(props) {

        //console.log(props.priceData);
        this.setState({
            name: props.name,
            symbol: props.symbol,
            priceData: props.priceData,
            lastUpdated: props.priceData["Meta Data"]["3. Last Refreshed"].substring(0,10),
            quantity: props.quantity
        });

        //get our year
        this.get52Weeks(props.priceData);
       
    }

    componentWillMount() {
        this.get52Weeks(this.state.priceData);
    }

    //essentially, loop through our pricedata and get the prices from the
    //past year
    get52Weeks(priceData) {
        var {fiftyTwoWeeks} = this.state;

        console.log(priceData);
        //our counter
        var max = 52;

        //get our keys
        var keys = Object.keys(priceData["Weekly Time Series"]);

        //our object
        var weeks = [];
        var dates = [];

        for(let i = 0; i < max; i++) {
            //push the close price for the year
            weeks.push(priceData["Weekly Time Series"][keys[i]]["4. close"]);
            //push the date associated with the close price for the year
            dates.push(keys[i]);
        }

        this.setState({fiftyTwoWeeks: weeks, dates: dates});
        
    }

    render() {
        
        var {name, symbol, priceData, lastUpdated, quantity, fiftyTwoWeeks, dates} = this.state;

        console.log(dates);

        if(!priceData) {
            return(
                <p>Fetching price data</p>
            );
        }

        var data = {
            labels: dates,
            datasets: [{
                data: fiftyTwoWeeks,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
            
        }

        var options = {
            maintainAspectRatio: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
        
        console.log(data, options);
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

                
                <Line width={400} height={100} data={data} options={options} />
               
                
                
            </div>
        );
    }
}

export default Stock;