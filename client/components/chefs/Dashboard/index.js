import React from 'react';
import { Col, Panel, Row, Button } from 'react-bootstrap';
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
import Notification from '../../Notification';


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

  render() {
    const PROFILE_UNDER_REVIEW = 'Your profile is under review. You will be notified as soon as it has been approved and listed.';
    const PROFILE_LISTED = 'Congrats! Your profile is currently published and is publicly shareable.';
    const PROFILE_UNLISTED = 'Note: Your profile is currently not published and will not be publicly visible.';
    const { user } = this.props;

    if (!user.data) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <DashboardNavBar location={this.props.location.pathname} userRole={user.data.role} />
        <div className="gc-dashboard-container">
          {
            (user.data.role === 'chef') &&
              <div>
                {user.data.status === 'pending' &&
                <Row className="gc-center">
                  <Col xs={10} xsOffset={1} sm={7} smOffset={3}>
                    <Notification text={PROFILE_UNDER_REVIEW} />
                  </Col>
                </Row>
                }
                {user.data.status !== 'pending' &&
                  <div>
                    <Row className="gc-background-light-grey gc-center">
                      <Col xs={8} xsOffset={2} sm={6} smOffset={3}>
                        <p className="gc-text gc-grey visible-xs">
                          {user.data.status === 'listed' ? PROFILE_LISTED : PROFILE_UNLISTED}
                        </p>
                      </Col>
                    </Row>
                    <Row className="gc-background-light-grey">
                      <Col xs={8} xsOffset={2} sm={6} smOffset={3}>
                        <Link className="btn btn-block gc-btn gc-btn-white gc-margin-bottom--xs visible-xs" to={`/chefs/${this.props.user.data._id}`}>
                          View my profile
                        </Link>
                        <Button block className="gc-btn gc-btn-white gc-margin-bottom visible-xs">
                          {user.data.status === 'listed' ? 'Hide my profile' : 'Publish my profile'}
                        </Button>
                      </Col>
                    </Row>
                  </div>
                }
              </div>
          }
          <Row>
            <Col sm={3} smOffset={1} mdOffset={1} md={2}>
              <Sidebar location={this.props.location.pathname} userRole={user.data.role} />
              {
                (user.data.role === 'chef' && user.data.status !== 'pending') &&
                  <div>
                    <Link className="btn btn-block gc-btn gc-btn-white gc-margin-top gc-margin-bottom--lg hidden-xs" to={`/chefs/${this.props.user.data._id}`}>
                      View my profile
                    </Link>
                    <div className="hidden-xs gc-margin-top--lg">
                      {user.data.status === 'listed' ?
                        <Notification text={PROFILE_LISTED} />
                        :
                        <Notification text={PROFILE_UNLISTED} />}
                    </div>
                    <Button block className="gc-btn gc-btn-white gc-margin-bottom hidden-xs">
                      {user.data.status === 'listed' ? 'Hide my profile' : 'Publish my profile'}
                    </Button>
                  </div>
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
