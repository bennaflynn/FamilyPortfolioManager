import React, {Component} from 'react';

//functional imports
import {withCookies,Cookies} from 'react-cookie';
import {withRouter} from 'react-router-dom';
import {checkCookie} from '../../Helpers/checkCookie';
import {handleResponse} from '../../Helpers/handleResponse';
import {API_URL} from '../../Constants/api';

//Components
import Header from './Header';
import Stocks from './Stocks/Stocks';
import Assets from './Assets/Assets';

class Home extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: "",
            firstname: "",
            lastname: ""
        }
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

    render() {
        return(   
            <div>
                <Header 
                first={this.state.firstname}
                last={this.state.lastname}
                />     
                   
                <h1>{this.state.username}</h1> 
                <p>{this.state.firstname} {this.state.lastname}</p>
            </div>      
        );
    }
}

export default withRouter(withCookies(Home));