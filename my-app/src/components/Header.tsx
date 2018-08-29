import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';

export const Header: React.StatelessComponent<{}> = () => {
    return (
        <Navbar className = "navbar">
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">Test</Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <IndexLinkContainer to="/FirstComponent">
                    <NavItem>Page 1</NavItem>
                </IndexLinkContainer>
                <IndexLinkContainer to="/SecondComponent">
                    <NavItem>How it works.</NavItem>
                </IndexLinkContainer>
            </Nav>
        </Navbar>
    );
}