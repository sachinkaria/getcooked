import React from 'react';
import {Link} from 'react-router';
import { Navbar, Nav, NavItem, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import ErrorHandler from '../containers/ErrorHandler';
import SuccessHandler from '../containers/SuccessHandler';
import isAuthenticated from '../utils/isAuthenticated';
import { isChef } from '../utils/helpers';
import { getBookings } from '../actions/bookings';


class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.dashboardRoute = this.dashboardRoute.bind(this);
    this.updateBookings = this.updateBookings.bind(this);
    this.state = {
      newBookings: 0
    };
  }

  componentWillMount() {
   if (isAuthenticated() && isChef()) this.props.getBookings();
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      if (isAuthenticated() && isChef()) this.props.getBookings();
      this.updateBookings();
    }, 30000);
  }

  updateBookings() {
    if (this.props.user.data && this.props.bookings.length) {
      this.setState({
        newBookings: this.props.bookings.filter(booking => !booking.read)
      }, () => {
        if (this.state.newBookings.length) {
          document.title = `Get Cooked (${this.state.newBookings.length})`;
        } else {
          document.title = 'Get Cooked';
        }
      });
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
    const { user } = this.props;
    return (
      <div>
        <Navbar fixedTop className="gc-navbar">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" className="gc-padding-none">
                <img alt="Get Cooked" className="gc-logo-default" src="/images/logo-icon.png" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <ErrorHandler />
          <SuccessHandler />
          <Navbar.Collapse className="gc-navbar-dropdown">
            {
              (isAuthenticated() && user.data && showNav) && (
                <div>
                  <Nav pullRight>
                    {user.data.role === 'chef' && this.state.newBookings.length > 0 &&
                    <NavItem>
                      <Link to={'/dashboard/bookings'}>
                        <p className="gc-text gc-bold gc-text--dark-grey">
                          New bookings ({this.state.newBookings.length})
                        </p>
                      </Link>
                    </NavItem>
                    }
                    <NavItem>
                      <Link to={this.dashboardRoute(user.data && user.data.role)}>
                        <p className="gc-text gc-text--dark-grey">
                          Dashboard
                        </p>
                      </Link>
                    </NavItem>
                  </Nav>
                </div>
              )
            }
            {
              (!isAuthenticated() && showNav) && (
                <Nav pullRight>
                  <NavItem>
                    <Link to={'/chef/register'}>
                      <p className="gc-text gc-text--dark-grey">Sign up as a caterer</p>
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
        <br />
        <Row className="gc-footer text-center">
          <Col sm={8} smOffset={2}>
            <Row>
              <Col sm={4}>
                <li className="gc-list">
                  <ul className="gc-text gc-white gc-padding-none">
                    Terms and Conditions
                  </ul>
                  <ul className="gc-text gc-white gc-padding-none">
                    Privacy Policy
                  </ul>
                </li>
              </Col>
              <Col sm={4}>
                <li className="gc-list">
                  <ul className="gc-text gc-white gc-padding-none">
                    Facebook
                  </ul>
                  <ul className="gc-text gc-white gc-padding-none">
                    Instagram
                  </ul>
                  <ul className="gc-text gc-white gc-padding-none">
                    Twitter
                  </ul>
                </li>
              </Col>
              <Col sm={4}>
                <li className="gc-list">
                  <ul className="gc-text gc-white gc-padding-none">
                    Contact us
                  </ul>
                  <ul className="gc-text gc-white gc-padding-none">
                    Blog
                  </ul>
                </li>
              </Col>
            </Row>
            <br />
            <Row>
              <Col className="text-center">
                <p className="gc-text gc-white">
                  All rights reserved Get Cooked Ltd
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

}
;

function mapStateToProps(state) {
  return {
    user: state.user,
    bookings: state.user.bookings
  };
}

export default connect(mapStateToProps, { getBookings })(NavigationBar);
