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
            stocks: [],
            stockCharts: [],
            stockIndex: 0,
            selectedStock: null,
            error: null,
            loading: false
        }

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(selectedKey) {
        
        console.log(this.state.stockCharts[selectedKey]);
        //a new stock has been selected
        this.setState({
            selectedStock: this.state.stocks[selectedKey],
            stockIndex: selectedKey
        });

        
        
    }

    componentWillMount() {
        
        //set loading to true
        this.setState({loading: true})

        //get the stocks from the backend
        fetch(`${API_URL}assets/getallstocks`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + this.props.cookies.get('token')
            }
        })
        .then(handleResponse)
        .then((result) => {
            if(result) {
                //the stocks is now our array of data
                this.setState({stocks: result, selectedStock: result[0]});

                //now we have our result. 
                //what we want to do now is call the Alpha Advantage API to get the price info foreach of these stocks

                result.forEach(function(element) {
                    
                    fetch(`${ALPHA_URL_WEEKLY+element.symbol+ALPHA_KEY}`, {
                        method: 'GET'
                    })
                    .then(handleResponse)
                    .then((result) => {
                       

                        //add the stock info for that stock to our state
                        //add it this way, because it is an array of objects
                        this.setState({stockCharts: [result,...this.state.stockCharts]})
                        
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }, this);

                this.setState({loading:false});
                //console.log(this.state.stockCharts);
                
            } else {
                console.log("Something went wrong");
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({loading: false});
        })

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