import React from 'react';
import {Link} from 'react-router';
import {Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import Modal from '../containers/Modal';
import ErrorHandler from '../containers/ErrorHandler';
import SuccessHandler from '../containers/SuccessHandler';
import BookingForm from '../containers/BookingForm';
import isAuthenticated from '../utils/isAuthenticated';
import {getBookings} from '../actions/bookings';
import {createEvent} from '../actions/events';
import Footer from './Footer';
import { MODAL } from '../utils/data';


class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.dashboardRoute = this.dashboardRoute.bind(this);
  }

  dashboardRoute(role) {
    if (role === 'chef') {
      return '/dashboard/profile/summary';
    } else if (role === 'admin') {
      return '/admin/dashboard/chefs';
    }
    return '/dashboard/account/settings';
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
                <img alt="Get Cooked" className="gc-logo-default" src="/images/logo-icon.png"/>
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
                    <NavItem href={this.dashboardRoute(user.data && user.data.role)}>
                      <p className="gc-text gc-text--dark-grey">
                        Dashboard
                      </p>
                    </NavItem>
                  </Nav>
                </div>
              )
            }
            {
              (!isAuthenticated() && showNav) && (
                <Nav pullRight>
                  <NavItem>
                    <div className="hidden-xs">
                      <Modal
                        large
                        navbar
                        title={MODAL.TITLE}
                        description={MODAL.DESCRIPTION}
                        buttonText={MODAL.ACTION}
                        onClick={heap.track('Click Get Quotes')}
                      >
                        <BookingForm
                          withoutChef
                          onSubmit={this.props.createEvent}
                          large
                          action="Get Quotes"
                        />
                      </Modal>
                    </div>
                    <div className="visible-xs">
                      <Link to={'/get-quotes'}>
                        <p className="gc-text gc-text--dark-grey">
                          Get Quotes
                        </p>
                      </Link>
                    </div>
                  </NavItem>
                  <NavItem href="/caterers/about">
                    <p className="gc-text gc-text--dark-grey">Register as a caterer</p>
                  </NavItem>
                  <NavItem href="/login">
                    <p className="gc-text gc-text--dark-grey">Login</p>
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

function mapStateToProps(state) {
  return {
    user: state.user,
    bookings: state.user.bookings
  };
}

export default connect(mapStateToProps, { getBookings, createEvent })(NavigationBar);
