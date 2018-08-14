import React, {Component} from 'react';

//functional imports
import {withRouter} from 'react-router-dom';
import {withCookies, Cookies} from 'react-cookie';
import {API_URL} from '../../Constants/api';
import {handleResponse} from '../../Helpers/handleResponse';

class Login extends Component {
    constructor(props) {
        super(props);

        //so we can do routing and cookies
        const {cookies, history} = props;

        this.state = {
            username: "",
            password: "",
            loading: false,
            error: null
        }

        //bind events
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    //handle the form being submitted
    handleSubmit(event) {
        //stop the page from changing
        event.preventDefault();
        
        var {username, password} = this.state;
        const {cookies, history} = this.props;

        //call the api
        fetch(`${API_URL}users/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(handleResponse)
        .then((result) => {
            if(result.success) {
                alert("Logged in bebe");
            } else {
                alert("Not logged babe");
                this.setState({error: result.message});
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    //render
    render() {
        var {username, password, loading, error} = this.state;

        //TO DO: render loading

        //not loading, render our form
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type="text"
                    placeholder='Username'
                    name='username'
                    value={username}
                    onChange={this.handleUsernameChange}
                    />
                    <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={this.handlePasswordChange}
                    />
                    <button type="submit">Login</button>
                </form>
                {error}
            </div>
        );
    }
}

export default withRouter(withCookies(Login));