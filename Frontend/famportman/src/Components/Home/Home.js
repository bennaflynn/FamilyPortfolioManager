import React, {Component} from 'react';

//functional imports
import {withCookies,Cookies} from 'react-cookie';

class Home extends Component {
    constructor() {
        super();        
    }

    render() {
        return(
            <h1>Hello</h1>
        );
    }
}

export default withCookies(Home);