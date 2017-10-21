import React from 'react';
import { Col, Panel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCurrentUser } from '../../../actions/users';
import DashboardNavBar from '../../users/dashboard/Navbar';
import Sidebar from './Sidebar';
import BasicsForm from '../../../containers/forms/setup/chefs/BasicsForm';
import ServicesForm from '../../../containers/forms/setup/chefs/ServicesForm';
import FoodForm from '../../../containers/forms/setup/chefs/FoodForm';
import PhotosForm from '../../../containers/forms/setup/chefs/PhotosForm';
import SettingsForm from '../../../containers/forms/setup/chefs/SettingsForm';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.renderView = this.renderView.bind(this);
  }

  componentWillMount() {
    this.props.getCurrentUser();
    this.renderView();
  }

  renderView() {
    if (this.props.route.view === 'basics') {
      return <BasicsForm />;
    } else if (this.props.route.view === 'service-type') {
      return <ServicesForm />;
    } else if (this.props.route.view === 'food-services') {
      return <FoodForm />;
    } else if (this.props.route.view === 'photos') {
      return <PhotosForm />;
    } else if (this.props.route.view === 'settings') {
      return <SettingsForm />;
    }
    return null;
  }

  render(){
    return (
      <div>
        <DashboardNavBar location={this.props.location.pathname} userRole={this.props.user.data && this.props.user.data.role} />
        <div className="gc-dashboard-container">
          <Row>
            <Col sm={3} mdOffset={1} md={2}>
              {
                (this.props.user.data && this.props.user.data.role === 'chef') &&
                <Link className="btn btn-block gc-btn gc-btn--orange gc-margin-top gc-margin-bottom visible-xs" to={`/chefs/${this.props.user.data._id}`}>
                  View my profile
                </Link>
              }
              <Sidebar location={this.props.location.pathname} userRole={this.props.user.data && this.props.user.data.role} />
              {
                (this.props.user.data && this.props.user.data.role === 'chef') &&
                <Link className="btn btn-block gc-btn gc-btn--orange gc-margin-top gc-margin-bottom hidden-xs" to={`/chefs/${this.props.user.data._id}`}>
                  View my profile
                </Link>
              }
            </Col>
            <Col smOffset={0} sm={7}>
              <Panel>
                {this.renderView()}
              </Panel>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: React.PropTypes.shape({ user: { data: {} } }).isRequired,
  location: React.PropTypes.shape({ location: { pathname: '' } }).isRequired,
  getCurrentUser: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { getCurrentUser })(Dashboard);
