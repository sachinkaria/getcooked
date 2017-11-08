import React from 'react';
import { Col, Panel, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCurrentUser, updateUser } from '../../../actions/users';
import DashboardNavBar from '../../users/dashboard/Navbar';
import Sidebar from './Sidebar';
import BasicsForm from '../../../containers/forms/setup/chefs/BasicsForm';
import ServicesForm from '../../../containers/forms/setup/chefs/ServicesForm';
import FoodForm from '../../../containers/forms/setup/chefs/FoodForm';
import PhotosForm from '../../../containers/forms/setup/chefs/PhotosForm';
import SettingsForm from '../../../containers/forms/setup/chefs/SettingsForm';
import PasswordForm from '../../../containers/forms/setup/chefs/PasswordForm';
import Notification from '../../Notification';
import Bookings from '../../bookings/List';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.renderView = this.renderView.bind(this);
    this.updateUserStatus = this.updateUserStatus.bind(this);
  }

  componentWillMount() {
    this.props.getCurrentUser();
    this.renderView();
  }

  updateUserStatus(status) {
    this.props.updateUser({ status });
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
    } else if (this.props.route.view === 'password') {
      return <PasswordForm />;
    } else if (this.props.route.view === 'bookings') {
      return <Bookings />;
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

    const USER_LISTED = user.data.status === 'listed';
    const USER_PENDING = user.data.status === 'pending';
    const IS_CHEF = user.data.role === 'chef';

    return (
      <div>
        <DashboardNavBar location={this.props.location.pathname} userRole={user.data.role} />
        <div className="gc-dashboard-container">
          {
            (IS_CHEF) &&
              <div>
                {USER_PENDING &&
                <Row className="gc-center">
                  <Col xs={10} xsOffset={1} sm={7} smOffset={4} mdOffset={3}>
                    <Notification text={PROFILE_UNDER_REVIEW} />
                  </Col>
                </Row>
                }
                {(!USER_PENDING && !this.props.location.pathname.includes('account')) &&
                  <div>
                    <Row className="gc-center">
                      <Col xs={10} xsOffset={1} sm={7} smOffset={4} mdOffset={3}>
                        <Notification text={!USER_LISTED ? PROFILE_UNLISTED : PROFILE_LISTED} >
                          <Row>
                            <Col xs={8} xsOffset={2} sm={6} smOffset={3} md={4} mdOffset={4}>
                              {USER_LISTED ?
                                <Link className="btn btn-block gc-btn gc-btn--white gc-margin-top" to={`/chefs/${this.props.user.data._id}`}>
                                  View my profile
                                </Link> :
                                <Button
                                  block
                                  className="gc-btn gc-btn--white gc-margin-top"
                                  onClick={() => this.updateUserStatus(USER_LISTED ? 'unlisted' : 'listed')}
                                >
                                  Publish my profile
                                </Button>
                              }
                            </Col>
                          </Row>
                        </Notification>
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
                (IS_CHEF && !USER_PENDING && USER_LISTED) &&
                  <div>
                    <Button
                      block
                      className="gc-btn gc-btn-white gc-btn-white--error gc-margin-bottom hidden-xs"
                      onClick={() => this.updateUserStatus(USER_LISTED ? 'unlisted' : 'listed')}
                    >
                      {USER_LISTED ? 'Hide my profile' : 'Publish my profile'}
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
          {(!USER_PENDING && USER_LISTED) &&
          <div className="visible-xs">
            <Row>
              <Col xs={6} xsOffset={3} sm={6} smOffset={3}>
                <Button
                  block
                  className="gc-btn gc-btn-white gc-btn-white--error gc-margin-bottom"
                  onClick={() => this.updateUserStatus(USER_LISTED ? 'unlisted' : 'listed')}
                >
                  {USER_LISTED ? 'Hide my profile' : 'Publish my profile'}
                </Button>
              </Col>
            </Row>
          </div>
          }
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: React.PropTypes.shape({ user: { data: {} } }).isRequired,
  location: React.PropTypes.shape({ location: { pathname: React.PropTypes.string } }).isRequired,
  getCurrentUser: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { getCurrentUser, updateUser })(Dashboard);
