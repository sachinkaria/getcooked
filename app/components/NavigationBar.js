import React from 'react';
import { ReactRouter, Link } from 'react-router';
import { Navbar, Nav, Col, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';

export default class NavigationBar extends React.Component {
  render() {
      return (
          <div>
              <Navbar className="gc-navbar">
                  <Col>
                      <Navbar.Header>
                          <Navbar.Brand>
                              <Link to="/" className="gc-padding-none">
                              <img className="gc-logo-default" href="#" src="images/logo-icon.png"/>
                              </Link>
                          </Navbar.Brand>
                          <Navbar.Toggle />
                      </Navbar.Header>
                  </Col>
                          <Navbar.Collapse className="gc-navbar-dropdown">
                              <Nav pullRight>
                                  <NavItem eventKey={1} href="#">
                                      <Link to={'/inbox'}>
                                        <p className="gc-dropdown-item">Messages</p>
                                      </Link>
                                  </NavItem>
                                  <NavItem eventKey={2} href="#">
                                      <Link>
                                        <p className="gc-dropdown-item">I'm a chef</p>
                                      </Link>
                                  </NavItem>
                                  <NavItem eventKey={2} href="#">
                                      <Link to={'/bookings'}>
                                          <p className="gc-dropdown-item">Bookings</p>
                                      </Link>
                                  </NavItem>
                              </Nav>
                          </Navbar.Collapse>
              </Navbar>
              {this.props.children}
          </div>
            )
         }
    }