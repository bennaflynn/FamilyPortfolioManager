import React, {Component} from 'react';

//styles
import './Portfolio.css';

//bootstrap
import {Grid, Row, Col, Table} from 'react-bootstrap';

class Portfolio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stocks: this.props.stocks,
            charts: this.props.stockCharts,
            assets: this.props.assets,
            prices: [],
            quantities: [],
            value: 0
        }
        //get the value of the portfolio
        //this.valuePortfolio();
        console.log(this.props.assets);
    }

    valuePortfolio() {
        const {stocks, charts, assets, prices, quantities} = this.state;
        
        var portVal = 0;

        var lastUpdated = charts[0]["Meta Data"]["3. Last Refreshed"].substring(0,10);

        //loop through our stocks
        for(let i = 0; i < stocks.length; i++) {
            portVal += stocks[i].quantityOwned * charts[i]["Weekly Time Series"][lastUpdated]["4. close"]    
        }
        console.log(assets);
        //now lets get the value of our assets
        for(let i = 0; i < assets.length; i++) {
            
        }

    }

    render() {
        const {assets, stocks, charts} = this.state;

        //the value of the portfolio
        var portVal = 0;
        var assetVals = 0;

        if(charts == null) {
            return <p>Nothing is here...</p>
        }
        //time to base prices off
        var lastUpdated = charts[0]["Meta Data"]["3. Last Refreshed"].substring(0,10);

        return(
            <Grid>
                <Row>
                    <Col md={4}>
                        <Table className="portfolioTable">
                            <thead>
                                <tr>
                                    <th colSpan={4}>Stocks</th>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stocks.map((stock, index) => {
                                    var stockVal = charts[index]["Weekly Time Series"][lastUpdated]["4. close"] * stock.quantityOwned;
                                    portVal += stockVal;
                                    return(
                                        <tr key={stock.stockId}>
                                            <td>{stock.name}</td>
                                            <td>{stock.quantityOwned}</td>
                                            <td>${Math.round(charts[index]["Weekly Time Series"][lastUpdated]["4. close"])}</td>
                                            <td>${Math.round(stockVal)}</td>
                                        </tr>
                                    );
                                })}
                                <tr></tr>
                                <tr>
                                    <td colSpan={3}>Stocks Total Value</td>
                                    <td>${Math.round(portVal)}</td>
                                </tr>
                                
                                
                            </tbody>
                            <thead>
                                    <tr>
                                        <th colSpan={4}>Assets</th>
                                    </tr>
                                    <tr>
                                        <th colSpan={2}>Asset</th>
                                        <th colSpan={2}>Current Value</th>
                                    </tr>
                                    
                            </thead>

                            <tbody>
                                {assets.map((ass) => {
                                    var assVal = (ass.currentValue * ass.quanityOwned) - ass.overhead;
                                    portVal += assVal;
                                    assetVals += assVal;
                                    return(
                                        <tr key={ass.assetId}>
                                            <td colSpan={3}>{ass.name}</td>
                                            <td colSpan={1}>${assVal}</td>
                                        </tr>
                                    );
                                })}
                                <tr></tr>
                                <tr>
                                    <td colSpan={3}>Assets Total Value</td>
                                    <td>${assetVals}</td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan={4}></th>
                                </tr>
                                
                                <tr>
                                    <th colSpan={3}>Porfolio Value</th>
                                    <th>${Math.round(portVal)}</th>
                                </tr>
                            </thead>
                        </Table>
                    </Col>
                    <Col md={8}>
                    
                    </Col>
                </Row>
            </Grid>        
        );
    }
}

export default Portfolio;