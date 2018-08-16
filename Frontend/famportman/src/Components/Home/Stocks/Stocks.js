import React, {Component} from 'react';

//functional
import {Link} from 'react-router-dom';

class Stocks extends Component {

    render() {
        return(

            <div>
                <h1>Stocks</h1>
                <Link
                to="/home/assets"
                >
                Assets
                </Link>
            </div>
        );
    }
}

export default Stocks;