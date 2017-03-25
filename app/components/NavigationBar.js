import React from 'react';
import { ReactRouter, Link } from 'react-router';
import { Navbar, Nav, Col } from 'react-bootstrap';

export default class NavigationBar extends React.Component {
  render() {
      return (
          <div className="row">
              <Navbar bsSize="lg" className="gc-navbar">
                  <Col xs={4}>
                      <Navbar.Header>
                          <Navbar.Brand>
                              <Link to="/" className="gc-padding-none">
                              <img className="gc-logo-default" href="#" src="images/logo-icon.png"/>
                              </Link>
                          </Navbar.Brand>
                          <Navbar.Toggle />
                      </Navbar.Header>
                  </Col>
                  <Col xs={4} xsOffset={4} className="gc-vertical-center">
                      <Nav>
                          <Col xs={4}>
                              <Link>
                                  <p>I'm a chef</p>
                              </Link>
                          </Col>
                          <Col xs={4}>
                              <Link to={'/inbox'}>
                                  <p>Messages</p>
                              </Link>
                          </Col>
                          <Col xs={4}>
                              <Link>
                                  <p>Bookings</p>
                              </Link>
                          </Col>
                      </Nav>
                  </Col>
              </Navbar>
              {this.props.children}
          </div>
            )
         }
    }