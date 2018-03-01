import React from 'react';
import { Col, Panel, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import moment from 'moment';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../../actions/users';
import { adminListChefs, updateStatus, adminListUsers } from '../../../actions/admin';
import DashboardNavBar from '../../users/dashboard/Navbar';
import ProfilePicture from '../../chefs/profile/ProfilePicture';
import Status from '../../Status';
import Sidebar from '../../chefs/Dashboard/Sidebar';


class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.updateStatus = this.updateStatus.bind(this);
  }
  componentWillMount() {
    this.props.getCurrentUser();
    this.props.adminListChefs();
    this.props.adminListUsers();
  }

  updateStatus(status, id) {
    this.props.updateStatus(status, id);
  }

  render() {
    const { user } = this.props;
    const { chefs } = this.props;
    const { users } = this.props;

    if (!user.data) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <DashboardNavBar location={this.props.location.pathname} userRole={user.data.role} />
        <div className="gc-dashboard-container">
          <Row>
            <Col sm={3} smOffset={1} mdOffset={1} md={2}>
              <Sidebar location={this.props.location.pathname} userRole={user.data.role} />
            </Col>
            <Col smOffset={0} sm={7}>
              {
                this.props.location.pathname.includes('chefs') &&
                <div>
                  {chefs.map(chef =>
                    (
                      <Panel key={chef._id}>
                        <Row>
                          <Col xs={3} md={2}>
                            <ProfilePicture withoutMargins photoUrl={chef.profilePhoto} />
                          </Col>
                          <Col xs={6} md={7}>
                            <p className="gc-text gc-bold gc-margin-none">{chef.displayName}</p>
                            <Status status={chef.status} />
                            <p>Name: {chef.firstName.concat(' ').concat(chef.lastName)}</p>
                            <p>Email: {chef.email}</p>
                            <p>Contact Number: {chef.contactNumber}</p>
                            <p>Subscription: {chef.subscription.status}</p>

                          </Col>
                          <Col xs={3} className="text-right">
                            <p className="gc-text gc-text--sm gc-bold gc-margin-none">Updated: {moment(chef.updatedAt).format('MMM Do YYYY')}</p>
                            <Link to={`/admin/dashboard/chefs/${chef._id}`}>
                              <Button block className="gc-btn gc-btn--sm gc-btn-white gc-margin-top--xs">View Profile</Button>
                            </Link>
                            <div className="gc-margin-top--xs">
                              {
                                (chef.status === 'pending') &&
                                <Button block className="btn gc-btn gc-btn--sm btn-success" onClick={() => this.updateStatus('approve', chef._id)}>
                                  Approve
                                </Button>
                              }
                              {
                                (chef.status === 'unlisted') &&
                                <Button block className="btn gc-btn gc-btn--sm gc-btn-blue" onClick={() => this.updateStatus('list', chef._id)}>
                                  List
                                </Button>
                              }
                              {
                                (chef.status === 'listed') &&
                                <Button block className="btn gc-btn gc-btn--sm btn-danger" onClick={() => this.updateStatus('unlist', chef._id)}>
                                  Unlist
                                </Button>
                              }
                            </div>
                          </Col>
                        </Row>
                      </Panel>
                    )
                  )}
                </div>
              }
              {
                this.props.location.pathname.includes('users') &&
                <Panel>
                  {users.map(userItem =>
                    (
                      <div key={userItem.email}>
                        <p className="gc-text">
                          Name: {userItem.firstName} {userItem.lastName}
                        </p>
                        <p className="gc-text">
                          Email: {userItem.email}
                        </p>
                        <p className="gc-text">
                          Phone number: {userItem.mobileNumber}
                        </p>
                      </div>
                    )
                  )}
                </Panel>
              }
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  user: React.PropTypes.shape({ user: { data: {} } }).isRequired,
  location: React.PropTypes.shape({ location: { pathname: '' } }).isRequired,
  getCurrentUser: React.PropTypes.func.isRequired,
  adminListChefs: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    chefs: state.admin.chefs,
    users: state.admin.users
  };
}

export default connect(mapStateToProps, { getCurrentUser, adminListChefs, updateStatus, adminListUsers })(AdminDashboard);
