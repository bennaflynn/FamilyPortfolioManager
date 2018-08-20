import React, {Component} from 'react';

class Asset extends Component {
    constructor(props) {
        super(props);

        this.state = props;

        console.log(this.state);
    }

    componentWillReceiveProps(props) {
        this.state = props;
    }

    render() {
        console.log(this.state.asset["name"])
        
        return <h1>{this.state.asset["name"]}</h1>
    }
    
}

export default Asset;