import React from 'react';
import { Col, Panel, Row, Button } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../../actions/users';
import { adminListChefs, updateStatus } from '../../../actions/admin';
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
  }

  updateStatus(status, id) {
    this.props.updateStatus(status, id);
  }

  render() {
    const { user } = this.props;
    const { chefs } = this.props;

    if (!user.data || chefs && !chefs.length) {
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
              <div>
                {chefs.map(chef =>
                  (
                    <Panel key={chef.displayName}>
                      <Row>
                        <Col xs={3} sm={2}>
                          <ProfilePicture withoutMargins photoUrl={chef.profilePhoto} />
                        </Col>
                        <Col xs={6} sm={7}>
                          <p className="gc-text gc-bold gc-margin-none">{chef.displayName}</p>
                          <Status status={chef.status} />
                        </Col>
                        <Col xs={3} className="text-right">
                          <p className="gc-text gc-margin-none">{moment(chef.created).format('MMM Do YYYY')}</p>
                        </Col>
                        <div className="text-right">
                          <Button className="btn btn-primary btn-xs" onClick={() => this.updateStatus('approve', chef._id)}>
                            Approve
                          </Button>
                          <Button className="btn btn-primary btn-xs" onClick={() => this.updateStatus('list', chef._id)}>
                            List
                          </Button>
                          <Button className="btn btn-error btn-xs" onClick={() => this.updateStatus('unlist', chef._id)}>
                            Unlist
                          </Button>
                        </div>
                      </Row>
                    </Panel>
                  )
                )}
              </div>
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
    chefs: state.admin.chefs
  };
}

export default connect(mapStateToProps, { getCurrentUser, adminListChefs, updateStatus })(AdminDashboard);
