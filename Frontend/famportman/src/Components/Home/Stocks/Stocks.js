import React, {Component} from 'react';

//bootstrap
import {Nav, NavItem, Grid, Row, Col} from 'react-bootstrap';

//styles
import './Stocks.css';

//functional
import {Link} from 'react-router-dom';
import {cookies, withCookies} from 'react-cookie';
import {API_URL, ALPHA_URL_WEEKLY, ALPHA_KEY} from '../../../Constants/api';
import {handleResponse} from '../../../Helpers/handleResponse';

//components
import Stock from './Stock/Stock';

class Stocks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stocks: this.props.stocks,
            stockCharts: this.props.stockCharts,
            stockIndex: 0,
            selectedStock: this.props.stocks[0],
            error: null,
            loading: false
        }
        
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(selectedKey) {
        
        //a new stock has been selected
        this.setState({
            selectedStock: this.state.stocks[selectedKey],
            stockIndex: selectedKey
        });

        
        
    }

    
    render() {
        //bring in our state
        var {stocks, stockCharts, selectedStock, loading, stockIndex} = this.state;

        //for iterating the eventkey
        var index = -1;

        if(loading) {
            return <h1>Loading...</h1>
        }

        

        //basically, is the array filled up yet?
        if(stockCharts.length == stocks.length) {
            return(                
                <Grid>
                    <Row>
                        <Col xs={2}>
                            <Nav className="sideBar" bsStyle="pills" stacked pullLeft onSelect={this.handleSelect}>
                                {stocks.map(stock => {
                                    //this is why index is -1
                                    index++;
                                    return(
                                        <NavItem key={stock.stockId} eventKey={index}>
                                            {stock.name}
                                        </NavItem>
                                    );
                                    
                                })}
                            </Nav>
                    </Col>
                    <Col xs={10}>
                        <Stock 
                        name={this.state.selectedStock.name}
                        symbol={this.state.selectedStock.symbol}
                        quantity={this.state.selectedStock.quantityOwned}
                        priceData={this.state.stockCharts[stockIndex]}
                        />
                    </Col>
                    </Row>
                </Grid>
            );
        }

        return(
            <h1>Nothing here yet</h1>
        );
       
    }
}

export default withCookies(Stocks);