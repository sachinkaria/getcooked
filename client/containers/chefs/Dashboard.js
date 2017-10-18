import React from 'react';
import { Col, Panel, Row, Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ContactDetails from '../../components/chefs/profile/ContactDetails';
import Heading from '../../components/chefs/profile/Heading';
import Services from '../../components/chefs/profile/Services';
import ServiceTypes from '../../components/chefs/profile/ServiceTypes';
import ProfilePicture from '../../components/chefs/profile/ProfilePicture';
import CoverPicture from '../../components/chefs/profile/CoverPicture';
import Description from '../../components/chefs/profile/Description';
import * as actions from '../../actions/users';


class Dashboard extends React.Component {
  componentWillMount() {
    this.props.getCurrentUser();
  }
  renderContent() {
    const USER = this.props.user;

    // let endorsements = _.sortBy(USER.endorsements, 'number').reverse();
    return (
      <div>
        <div>
          <Navbar className="gc-dashboard-navbar">
            <ul>
              <li className="gc-dashboard-navbar-item">
                <Link to={'/dashboard/profile'}>
                  <p className={classNames('gc-text gc-light-grey', { 'gc-white': this.props.location.pathname === '/dashboard/profile' })}>Profile</p>
                </Link>
              </li>
              <li className="gc-dashboard-navbar-item">
                <Link to={'/dashboard/account'}>
                  <p className={classNames('gc-text gc-light-grey', { 'gc-white': this.props.location.pathname === '/dashboard/account' })}>Account</p>
                </Link>
              </li>
            </ul>
          </Navbar>
        </div>
        <Row>
          <CoverPicture photoUrl={USER.coverPhoto} />
        </Row>
        <Row>
          <div className="gc-profile-body gc-margin-top--lg">
            <Col sm={9} md={7} mdOffset={1}>
              <Panel className="gc-panel--translucent">
                <Col xs={8} xsOffset={2} sm={3} smOffset={0} className="gc-padding-none">
                  <ProfilePicture photoUrl={USER.profilePhoto} />
                </Col>
                <Col sm={9}>
                  <Heading text={USER.displayName} />
                  <ServiceTypes serviceTypes={USER.serviceType} />
                  <Services services={USER.services} />
                  <Services services={USER.cuisines} />
                </Col>
                <Col>
                  <Description description={USER.description} />
                </Col>

              </Panel>
            </Col>
            <Col sm={3} xsHidden>
              <Panel className="gc-panel--translucent">
                <Heading text="Contact" textAlign="left" />
                <ContactDetails
                  website={USER.companyWebsite}
                  email={USER.companyEmail}
                  phone={USER.companyPhoneNumber}
                />
              </Panel>
            </Col>
          </div>
        </Row>
      </div>
    );
  }

  render() {
    return (
      (this.props.user) ?
        <div>
          {this.renderContent()}
        </div>
        :
        <div>
          Cannot find profile.
        </div>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user.data };
}

export default connect(mapStateToProps, actions)(Dashboard);
