import React from 'react';
import { ReactRouter, Link } from 'react-router';
import { Navbar, Nav, Col, NavItem } from 'react-bootstrap';

const NavigationBar = (props) => {
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
                                  <NavItem>
                                      <Link>
                                          <p className="gc-text gc-text--grey">I'm a chef</p>
                                      </Link>
                                  </NavItem>
                                  <NavItem>
                                      <Link to={'/inbox'}>
                                        <p className="gc-text gc-text--grey">Messages</p>
                                      </Link>
                                  </NavItem>
                                  <NavItem>
                                      <Link to={'/bookings'}>
                                          <p className="gc-text gc-text--grey">Bookings</p>
                                      </Link>
                                  </NavItem>
                              </Nav>
                          </Navbar.Collapse>
              </Navbar>
              {props.children}
          </div>
      )
    };

export default NavigationBar;

