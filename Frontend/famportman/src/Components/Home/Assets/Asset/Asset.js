import React, {Component} from 'react';

//bootstrap
import {Table} from 'react-bootstrap';

class Asset extends Component {
    constructor(props) {
        super(props);

        this.state = props;

        console.log(this.state);
    }

    componentWillReceiveProps(props) {
        this.setState({asset: props});
    }

    render() {
        console.log(this.state);
        var currentValue = this.state.asset["currentValue"] * this.state.asset["quanityOwned"];
        var overhead = this.state.asset["overhead"] * this.state.asset["quanityOwned"];
        var purchasePrice = this.state.asset["purchasePrice"] * this.state.asset["quanityOwned"];

        var valueInPortfolio = currentValue - overhead;

        var imageUrl = this.state.asset["imageUrl"] == "" ? "MarlonBrandog.png" : "~%PUBLIC_URL%/" + this.state.asset["imageUrl"]; 

        return(
            <div>
                <h1>{this.state.asset["name"]}</h1>
                <img src={imageUrl} />
                <Table>
                    <thead>
                        <tr>
                            <th>Current Selling Price</th>
                            <th>Purchase Price</th>
                            <th>Overhead</th>
                            <th>Value in Portfolio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{currentValue}</td>
                            <td>{purchasePrice}</td>
                            <td>{overhead}</td>
                            <td>{valueInPortfolio}</td>
                        </tr>
                    </tbody>
                </Table>
            
            </div>
        ); 
    }
    
}

export default Asset;