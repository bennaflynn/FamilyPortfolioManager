import React, {Component} from 'react';

//functional
import {Link} from 'react-router-dom';
import {httpGet} from '../../../Helpers/httpMethods';
import {API_URL} from '../../../Constants/api';
import {Cookies, withCookies} from 'react-cookie';
import {handleResponse} from '../../../Helpers/handleResponse';

class Assets extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }   

    componentWillMount() {
        httpGet(`${API_URL}assets/getassets`,this.props.cookies.get('token'))
        .then(handleResponse)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        console.log("render");
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

export default withCookies(Assets);