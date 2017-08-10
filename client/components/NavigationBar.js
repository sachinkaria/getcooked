import React from 'react';
import { ReactRouter, Link } from 'react-router';
import { Navbar, Nav, Col, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';

const NavigationBar = (props) => {
  const isAuthenticated = localStorage.token;
  return (
    <div>
      <Navbar className="gc-navbar">
        <Col>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" className="gc-padding-none">
                <img className="gc-logo-default" href="#" src="images/logo-icon.png" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Col>
        <Navbar.Collapse className="gc-navbar-dropdown">
          {
            isAuthenticated ? (
              <Nav pullRight>
                <NavItem>
                  <Link to={'/events'}>
                    <p className="gc-text gc-text--dark-grey">Events</p>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to={'/inbox'}>
                    <p className="gc-text gc-text--dark-grey">Messages</p>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to={'/bookings'}>
                    <p className="gc-text gc-text--dark-grey">Bookings</p>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to={'/logout'}>
                    <p className="gc-text gc-text--dark-grey">Logout</p>
                  </Link>
                </NavItem>
              </Nav>
            ) : (
              <Nav pullRight>
                <NavItem>
                  <Link to={'/events'}>
                    <p className="gc-text gc-text--dark-grey">Events</p>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to={'/chef/register'}>
                    <p className="gc-text gc-text--dark-grey">I'm a chef</p>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to={'/register'}>
                    <p className="gc-text gc-text--dark-grey">Sign up</p>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to={'/login'}>
                    <p className="gc-text gc-text--dark-grey">Login</p>
                  </Link>
                </NavItem>
              </Nav>
            )
          }
        </Navbar.Collapse>
      </Navbar>
      {props.children}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    inbox: state.user.inbox,
    bookings: state.user.bookings
  };
}

export default connect(mapStateToProps)(NavigationBar);
