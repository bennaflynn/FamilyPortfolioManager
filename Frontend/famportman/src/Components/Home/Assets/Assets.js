import React, {Component} from 'react';

//bootstrap
import {Nav, NavItem, Grid, Row, Col} from 'react-bootstrap';

//components
import Asset from './Asset/Asset';

//functional
import {httpGet} from '../../../Helpers/httpMethods';
import {API_URL} from '../../../Constants/api';
import {Cookies, withCookies} from 'react-cookie';
import {handleResponse} from '../../../Helpers/handleResponse';

class Assets extends Component {

    constructor(props) {
        super(props);

        this.state = {
            assets: [],
            loading: false,
            error: null,
            selectedAsset: 0
        }

    }   

    //get the assets from our server
    componentWillMount() {
        httpGet(`${API_URL}assets/getassets`,this.props.cookies.get('token'))
        .then(handleResponse)
        .then((result) => {
            this.setState({assets: result})
        })
        .catch((error) => {
            console.log(error);
        })
    }



    render() {
        const {loading, assets, error, selectedAsset} = this.state;
        
        if(loading) {
            return <h1>Loading...</h1>
        }
        
        

        var index = -1;
        if(assets.length > 0) {
            return(
                <Grid>
                    <Row>
                        <Col xs={2}>
                            <Nav className="" bsStyle="tabs" stacked pullLeft>
                                {assets.map(ass => {
                                    index++;
                                    return(
                                        <NavItem
                                        key={ass.assetId}
                                        eventKey={index}>
                                        {ass.name}
                                        </NavItem>
                                        
                                    );
                                })}
                            </Nav>
                        </Col>
                        <Col xs={10}>
                                <Asset asset={assets[selectedAsset]} />
                        </Col>
                    </Row>
                </Grid>
            );
        }
        
        return <h1>Nothing is here...</h1>
    }
}

export default withCookies(Assets);