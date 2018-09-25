import React from 'react';
import {Col, Panel, Row, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link, Route} from 'react-router';
import {getCurrentUser, updateUser} from '../../../actions/users';
import {getBookings} from '../../../actions/bookings';
import DashboardNavBar from '../../users/dashboard/Navbar';
import Sidebar from './Sidebar';
import BasicsForm from '../../../containers/forms/setup/chefs/BasicsForm';
import ServicesForm from '../../../containers/forms/setup/chefs/ServicesForm';
import FoodForm from '../../../containers/forms/setup/chefs/FoodForm';
import PhotosForm from '../../../containers/forms/setup/chefs/PhotosForm';
import SettingsForm from '../../../containers/forms/setup/chefs/SettingsForm';
import PasswordForm from '../../../containers/forms/setup/chefs/PasswordForm';
import SubscriptionForm from '../../../containers/forms/setup/chefs/SubscriptionForm';
import Notification from '../../Notification';
import Bookings from '../../bookings/List';
import Events from '../../users/dashboard/events/List';
import EventItem from '../../users/dashboard/events/Item';
import ChefBooking from '../../bookings/Item/ChefBooking';
import UserBooking from '../../bookings/Item/UserBooking';
import Summary from './Summary';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.renderView = this.renderView.bind(this);
    this.updateUserStatus = this.updateUserStatus.bind(this);
    this.getViewLayout = this.getViewLayout.bind(this);
  }

  componentWillMount() {
    this.props.authenticated && this.props.getCurrentUser();
  }

  getViewLayout() {
    if (this.props.route.expandView) {
      return {width: 10, offset: 1};
    } else if (this.props.route.hideSidebar) {
      return {width: 8, offset: 2};
    }
    return {width: 7, offset: 0};
  }

  getBookingLayout() {
    if (this.props.user.data.role === 'chef') {
      return (
        <ChefBooking
          id={this.props.params.id}
          itemType={(this.props.user.data && this.props.user.data.role === 'member') ? 'chefItem' : 'memberItem'}
        />
      );
    }
    return (
      <UserBooking
        stripe={this.props.stripe}
        id={this.props.params.id}
        itemType={(this.props.user.data && this.props.user.data.role === 'member') ? 'chefItem' : 'memberItem'}
      />
    );

  }

  updateUserStatus(status) {
    this.props.updateUser({status});
  }

  renderView() {
    switch (this.props.route.view) {
      case 'basics':
        return <Panel className="gc-panel"><Panel.Body><BasicsForm /></Panel.Body></Panel>;
      case 'service-type':
        return <Panel className="gc-panel"><Panel.Body><ServicesForm /></Panel.Body></Panel>;
      case 'food-services':
        return <Panel className="gc-panel"><Panel.Body><FoodForm /></Panel.Body></Panel>;
      case 'photos':
        return <Panel className="gc-panel"><Panel.Body><PhotosForm /></Panel.Body></Panel>;
      case 'settings':
        return <Panel className="gc-panel"><Panel.Body><SettingsForm /></Panel.Body></Panel>;
      case 'password':
        return <Panel className="gc-panel"><Panel.Body><PasswordForm /></Panel.Body></Panel>;
      case 'subscription':
        return <Panel className="gc-panel"><Panel.Body><SubscriptionForm /></Panel.Body></Panel>;
      case 'events':
        return <Events />;
      case 'view-event':
        return <EventItem params={this.props.params} id={this.props.params.id}/>;
      case 'bookings':
        return <Bookings
          itemType={(this.props.user.data && this.props.user.data.role === 'member') ? 'chefItem' : 'memberItem'}/>;
      case 'view-booking':
        return this.getBookingLayout();
      default:
        return <Summary user={this.props.user.data}/>;
    }
  }

  render() {
    const PROFILE_UNDER_REVIEW = 'Your profile is under review. You will be notified as soon as it has been approved and listed.';
    const PROFILE_LISTED = 'Congrats! Your profile is currently published and is publicly shareable.';
    const PROFILE_UNLISTED = 'Note: Your profile is currently not published and will not be publicly visible.';
    const PROFILE_BLOCKED = 'Note: Your profile is currently not published and will not be publicly visible.';
    const {user} = this.props;

    if (!user.data) {
      return <div>Loading...</div>;
    }

    const USER_LISTED = (user.data.status === 'listed' && (user.data.subscription.status === 'pending'));
    const USER_PENDING = user.data.status === 'pending';
    const USER_UNLISTED = user.data.status === 'unlisted';
    const IS_CHEF = user.data.role === 'chef';

    function userStatus() {
      if (USER_LISTED) {
        return PROFILE_LISTED;
      } else if (USER_PENDING) {
        return PROFILE_UNDER_REVIEW;
      } else if (USER_UNLISTED) {
        return PROFILE_BLOCKED;
      }
      return PROFILE_UNLISTED;
    }

    return (
      <div>
        <DashboardNavBar location={this.props.location.pathname} userRole={user.data.role}/>
        <div className="gc-dashboard-container">
          {
            (IS_CHEF && !this.props.route.hideProfileStatus) &&
            <div>
              {USER_PENDING &&
              <Row className="gc-center">
                <Col xs={10} xsOffset={1} sm={7} smOffset={4} mdOffset={3}>
                  <Notification text={PROFILE_UNDER_REVIEW}/>
                </Col>
              </Row>
              }
              {(!USER_PENDING && !this.props.location.pathname.includes('account')) &&
              <div>
                <Row className="gc-center">
                  <Col xs={10} xsOffset={1} sm={7} smOffset={4} mdOffset={3}>
                    <Notification text={userStatus()}>
                      <Row>
                        <Col xs={8} xsOffset={2} sm={6} smOffset={3} md={4} mdOffset={4}>
                          {USER_LISTED ?
                            <Link className="btn btn-block gc-btn gc-btn--white gc-margin-top"
                                  to={`/caterers/profile/${this.props.user.data._id}`}>
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
            {
              !this.props.route.hideSidebar &&
              <Col sm={3} smOffset={1} mdOffset={1} md={2}>
                <Sidebar location={this.props.location.pathname} userRole={user.data.role}/>
                {
                  (IS_CHEF && !USER_PENDING && USER_LISTED && !this.props.route.hideProfileStatus) &&
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
                <Link className="gc-btn btn btn-danger btn-block gc-margin-bottom hidden-xs" to="/logout">
                  Logout
                </Link>
              </Col>
            }
            <Col smOffset={this.getViewLayout().offset} sm={this.getViewLayout().width}>
              {this.renderView()}
            </Col>
          </Row>
          {(!USER_PENDING && USER_LISTED && !this.props.route.hideLogout) &&
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
            <Row>
              <Col xs={6} xsOffset={3} sm={6} smOffset={3}>
                <Link className="gc-btn btn btn-danger btn-block gc-margin-bottom" to={'/logout'}>
                  Logout
                </Link>
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
  getCurrentUser: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    authenticated: state.authenticated,
    user: state.user
  };
}

export default connect(mapStateToProps, {getCurrentUser, updateUser, getBookings})(Dashboard);