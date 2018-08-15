import React, {Component} from 'react';

//styles
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);


        this.state = {
            navItems: [['Stocks',1],['Assets',2],['Profile',3]]
        }

        this.handleClick = this.handleClick.bind(this);
    }

    //the user has clicked the item
    handleClick(event) {
        event.preventDefault();
        console.log(event);
    }

    //render our nav items
    render() {
        const {navItems} = this.state;
        const {first, last} = this.props;

        return(
            <Navbar fluid inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        {first} {last}
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav>
                    {navItems.map(item => {
                        return(
                            <NavItem                           
                            key={item[1]}
                            eventKey={item[1]}
                            onClick={()=> console.log("Hello")}
                            >
                                {item[0]}
                            </NavItem>
                        );
                    })}                  
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Header;