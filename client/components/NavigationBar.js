import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, Col, Row, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import ErrorHandler from '../containers/errors/ErrorHandler';

const NavigationBar = (props) => {
  const isAuthenticated = localStorage.token;
  const showNav = !props.location.pathname.includes('setup');
  return (
    <div>
      <Navbar fixedTop className="gc-navbar">
        <Col>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" className="gc-padding-none">
                <img alt="Get Cooked" className="gc-logo-default" src="images/logo-icon.png" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Col>
        <ErrorHandler />
        <Navbar.Collapse className="gc-navbar-dropdown">
          {
            (isAuthenticated && showNav) && (
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
            )
          }
          {
            (!isAuthenticated && showNav) && (
              <Nav pullRight>
                <NavItem>
                  <Link to={'/events'}>
                    <p className="gc-text gc-text--dark-grey">Events</p>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to={'/chef/register'}>
                    <p className="gc-text gc-text--dark-grey">I&apos;m a chef</p>
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
      <div className="gc-container">
        {props.children}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
    inbox: state.user.inbox,
    bookings: state.user.bookings
  };
}

export default connect(mapStateToProps)(NavigationBar);
