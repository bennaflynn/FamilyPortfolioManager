import React, {Component} from 'react';

//functional imports
import {withCookies,Cookies} from 'react-cookie';
import {withRouter} from 'react-router-dom';
import {checkCookie} from '../../Helpers/checkCookie';
import {handleResponse} from '../../Helpers/handleResponse';
import {API_URL, ALPHA_KEY,ALPHA_URL_WEEKLY} from '../../Constants/api';
import {Route, Switch} from 'react-router-dom';
import {httpGet} from '../../Helpers/httpMethods';

//Components
import Header from './Header';
import Stocks from './Stocks/Stocks';
import Assets from './Assets/Assets';
import Portfolio from './Portfolio/Portfolio';

class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            stocks: [],
            stockCharts: [],
            assets: [],
            loading: true
        }

        //bind our event handlers
        this.handleNavigation = this.handleNavigation.bind(this);
    }

    //all the stuff that happens before the component loads
    componentWillMount() {

        //check to see if the cookie exists
        if(!checkCookie(this.props.cookies)) {
            this.props.history.push('/login');
        }

        //if we get this far then yes, the user is meant to be here
        //now lets get the user information from the server
        fetch(`${API_URL}users/getuser`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + this.props.cookies.get('token')
            }
        })
        .then(handleResponse)
        .then((result) => {
            if(result.username) {
                this.setState({
                    username: result.username,
                    firstname: result.firstname,
                    lastname: result.lastname
                });
            } else {
                this.props.history.push('/login');
            }
            
        })
        .catch((error) => {
            console.log(error);
            this.props.history.push('/login');
        })
        
    }

    //get the stock and asset data from our backend
    componentDidMount() {
       
        //we are loading
        this.setState({loading: true});
        //get stocks
        httpGet(`${API_URL}assets/getallstocks`, this.props.cookies.get('token'))
        .then(handleResponse)
        .then((result) => {
            //we got our stocks from the backend
            this.setState({stocks: result});
            //now lets call the alpha advantage api
            //to get the price info
            result.forEach(function(element) {
                
                fetch(`${ALPHA_URL_WEEKLY+element.symbol+ALPHA_KEY}`, {
                    method: 'GET'
                })
                .then(handleResponse)
                .then((result) => {
                    
                    //add the stock info for that stock to our state
                    //add it this way, because it is an array of objects
                    this.setState({stockCharts: [result,...this.state.stockCharts]});
                   
                     
                })
                .catch((error) => {
                    console.log("Blah blah blah");
                })
            }, this);
            this.setState({loading: false});
        })
        .catch((error) => {
            console.log(error);
            this.setState({loading: false});
        })

        
        //get the assets
        httpGet(`${API_URL}assets/getassets`, this.props.cookies.get('token'))
        .then(handleResponse)
        .then((result) => {
            this.setState({assets: result, loading: false});
        })
        .catch((error) => {
            this.setState({loading: false});
            console.log(error);
        })
    }

    //the user clicks an item in the header
    handleNavigation(item) {
        //get whatever item is selected
        this.props.history.push(`/home/${item[0]}`)
    }

    render() {
        const {loading, stocks, stockCharts, assets} = this.state;

        //is loading done?
        if(!loading) {

            
            //are the sizes of the arrays the same?
            if(stocks.length == stockCharts.length && assets.length > 0 && stockCharts.length > 0) {
                
                if(stockCharts[0]["Information"] != null) {
                    //this will be fired if we exceed the call limit from alpha advantage
                    return(
                        <div>
                            <h1>The Alpha Advantage API took a bite into the sand</h1>
                            <h3>Just wait 5 seconds and then refresh the page</h3>
                            <h4>If problem persists contact Ben</h4>
                        </div>
                    );
                } else {
                    return(   
                        <div>
                            <Header 
                            first={this.state.firstname}
                            last={this.state.lastname}
                            handleNavigation={this.handleNavigation}
                            />     
                           
                                <Switch>
                                <Route path={`${this.props.match.path}/stocks`} 
                                render={(props) => <Stocks {...props} stocks={stocks} stockCharts={stockCharts} />}  />
                                <Route path={`${this.props.match.path}/assets`} render={(props) => <Assets {...props} assets={assets} />}  />
                                <Route path={`${this.props.match.path}/portfolio`}
                                render={(props) => <Portfolio {...props} stockCharts={stockCharts} stocks={stocks} assets={assets} />} />
                            </Switch>
                            
                            
                        </div>      
                    );
                }
                } else {
                    return <h1>A lot is happening, wait a little more...</h1>
                }
                
                
            
        } else {
            return <h1>Loading...</h1>
        }
       
    }
}

export default withRouter(withCookies(Home));