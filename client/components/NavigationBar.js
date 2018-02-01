import React from 'react';
import {Link} from 'react-router';
import { Navbar, Nav, NavItem, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import ErrorHandler from '../containers/ErrorHandler';
import SuccessHandler from '../containers/SuccessHandler';
import isAuthenticated from '../utils/isAuthenticated';
import { isChef } from '../utils/helpers';
import { getBookings } from '../actions/bookings';
import Footer from './Footer';


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
    if (this.props.user.data && this.props.bookings.length && isChef()) {
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
                    <Link to={'/caterers/about'}>
                      <p className="gc-text gc-text--dark-grey">Register as a caterer</p>
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
        <Footer />
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
