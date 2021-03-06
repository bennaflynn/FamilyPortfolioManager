import React, {Component} from 'react';

//styles
import './Assets.css';

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
            assets: this.props.assets,
            loading: false,
            error: null,
            selectedAsset: 0
        }

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
                        <Col md={2}>
                            <Nav bsStyle="tabs" stacked pullLeft>
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
                        <Col md={10}>
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