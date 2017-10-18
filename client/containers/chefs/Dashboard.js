import React from 'react';
import { Col, Panel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import ContactDetails from '../../components/chefs/profile/ContactDetails';
import Heading from '../../components/chefs/profile/Heading';
import Services from '../../components/chefs/profile/Services';
import ServiceTypes from '../../components/chefs/profile/ServiceTypes';
import ProfilePicture from '../../components/chefs/profile/ProfilePicture';
import CoverPicture from '../../components/chefs/profile/CoverPicture';
import Description from '../../components/chefs/profile/Description';
import DashboardNavBar from '../../components/users/dashboard/Navbar';
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
        <DashboardNavBar location={this.props.location.pathname} />
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
