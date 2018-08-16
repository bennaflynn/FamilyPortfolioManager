import React, {Component} from 'react';

//functional
import {Link} from 'react-router-dom';

class Assets extends Component {

    render() {
        return(
            <div>
                <h1>Assets</h1>
                <Link 
                to="/home/stocks"
                >
                Stocks
                </Link>
            </div>
        );
    }
}

export default Assets;