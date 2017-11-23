import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, Col, Row, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import ErrorHandler from '../containers/ErrorHandler';
import SuccessHandler from '../containers/SuccessHandler';
import isAuthenticated from '../utils/isAuthenticated';
import { getBookings } from '../actions/bookings';

class NavigationBar extends React.Component{
  constructor(props) {
    super(props);
    this.dashboardRoute = this.dashboardRoute.bind(this);
  }

  componentWillMount() {
    this.props.getBookings();
  }

  componentWillReceiveProps() {
    if (this.props.user && this.props.bookings.length) {
      const NEW_BOOKINGS = this.props.bookings.filter(booking => !booking.read);
      if (NEW_BOOKINGS.length) {
        document.title = `Get Cooked (${NEW_BOOKINGS.length})`;
      } else {
        document.title = 'Get Cooked';
      }
    }
  }

  dashboardRoute(role) {
    if (role === 'chef') {
      return '/dashboard/profile/basics';
    } else if (role === 'admin') {
      return '/admin/dashboard/chefs';
    }
    return 'dashboard/account/settings';
  }

  render() {
  const showNav = !this.props.location.pathname.includes('setup');
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
        <SuccessHandler />
        <Navbar.Collapse className="gc-navbar-dropdown">
          {
            (isAuthenticated() && showNav) && (
              <Nav pullRight>
                <NavItem>
                  <Link to={this.dashboardRoute(this.props.user.data && this.props.user.data.role)}>
                    <p className="gc-text gc-text--dark-grey">Dashboard <span>&#8226;</span></p>
                  </Link>
                </NavItem>
              </Nav>
            )
          }
          {
            (!isAuthenticated() && showNav) && (
              <Nav pullRight>
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
        {this.props.children}
      </div>
    </div>
  );
}

};

function mapStateToProps(state) {
  return {
    user: state.user,
    bookings: state.user.bookings
  };
}

export default connect(mapStateToProps, { getBookings })(NavigationBar);
