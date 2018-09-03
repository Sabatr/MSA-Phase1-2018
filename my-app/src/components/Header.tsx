import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';

export const Header: React.StatelessComponent<{}> = () => {
    return (
        <Navbar className = "navbar">
            <Navbar.Header>
                <Navbar.Brand style={{height:'50px'}}>
                    <Link to="/">DogPic</Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <IndexLinkContainer to="/Breed">
                    <NavItem>List Of Breeds</NavItem>
                </IndexLinkContainer>
            </Nav>
        </Navbar>
    );
}