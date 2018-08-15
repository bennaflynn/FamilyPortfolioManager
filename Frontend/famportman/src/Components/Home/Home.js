import React, {Component} from 'react';

//functional imports
import {withCookies,Cookies} from 'react-cookie';
import {withRouter} from 'react-router-dom';
import {checkCookie} from '../../Helpers/checkCookie';

//Components
import Stocks from './Stocks/Stocks';
import Assets from './Assets/Assets';

class Home extends Component {
    constructor(props) {
        super(props);        
    }

    //check to see if the cookie exists
    componentWillMount() {
        if(!checkCookie(this.props.cookies)) {
            this.props.history.push('/login');
        }
    }

    render() {
        return(           
            <h1>Hello</h1>       
        );
    }
}

export default withRouter(withCookies(Home));