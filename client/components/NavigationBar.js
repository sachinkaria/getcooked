import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Navbar, Nav, NavItem, Button, Panel } from 'react-bootstrap';
import {connect} from 'react-redux';
import { Helmet } from 'react-helmet';
import Modal from '../containers/Modal';
import ErrorHandler from '../containers/ErrorHandler';
import SuccessHandler from '../containers/SuccessHandler';
import BookingForm from '../containers/BookingForm';
import isAuthenticated from '../utils/isAuthenticated';
import {getBookings} from '../actions/bookings';
import {updateUser, getCurrentUser } from '../actions/users';
import {createEvent} from '../actions/events';
import Footer from './Footer';
import { MODAL } from '../utils/data';


class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.dashboardRoute = this.dashboardRoute.bind(this);
    this.acceptTerms = this.acceptTerms.bind(this);
  }

  acceptTerms() {
    this.props.updateUser({ termsAccepted: true });
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
        <Helmet>
          <meta charSet="utf-8" />
          <title>Get Cooked | Compare and Book Caterers</title>
          <meta property="og:type" content="website" />
          <meta name="description" content="Cater your events with the coolest chefs around. Book the best caterers and private chefs in London." />
          <meta name="og:description" content="Cater your events with the coolest chefs around. Book the best caterers and private chefs in London." />
          <meta property="og:image" alt="get cooked helps you find and book caterers" content="https://scontent.flhr4-2.fna.fbcdn.net/v/t31.0-8/22904747_10159544920385357_7464408184009395937_o.jpg?oh=6ed6793c237ea32cf39212adf179997b&oe=5B11E87F" />
          <meta property="og:url" content="https://www.getcooked.co" />
        </Helmet>
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
                    <p className="gc-text gc-text--dark-grey">Register as a Caterer</p>
                  </NavItem>
                  <NavItem href="/login">
                    <p className="gc-text gc-text--dark-grey">Login</p>
                  </NavItem>
                </Nav>
              )
            }
          </Navbar.Collapse>
        </Navbar>
        {
          (isAuthenticated() && user.data && showNav && !user.data.termsAccepted && user.data.role === 'chef') && (
          <div className="gc-popup">
            <Row className="gc-margin-bottom--lg gc-center">
              <Col xs={12} sm={6} smOffset={3}>
                <p className="gc-text gc-text--lg gc-white gc-center">Our pricing model has been updated! We listened to your feedback and bookings are now on a commission basis. Do you understand and accept our <Link className="gc-light-grey" target="_blank" to="/terms">terms and conditions</Link> and <Link className="gc-light-grey" target="_blank" to="/privacy">privacy policy?</Link></p>
                <Button bsClass="success" className="btn btn-success" onClick={() => this.acceptTerms()}>Accept</Button>
              </Col>
            </Row>
          </div>
          )
        }
        <div className="gc-container">
          {this.props.children}
        </div>
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

export default connect(mapStateToProps, { getBookings, createEvent, updateUser, getCurrentUser })(NavigationBar);
