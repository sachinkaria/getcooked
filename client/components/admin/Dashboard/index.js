import React from 'react';
import { Col, Panel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../../actions/users';
import { adminListChefs } from '../../../actions/admin';
import DashboardNavBar from '../../users/dashboard/Navbar';


class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getCurrentUser();
    this.props.adminListChefs();
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
              hello
            </Col>
            <Col smOffset={0} sm={7}>
              <Panel>
                {chefs.map(chef =>
                  (
                    <div key={chef.displayName}>
                      {chef.displayName}
                    </div>
                  )
                )}
              </Panel>
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

export default connect(mapStateToProps, { getCurrentUser, adminListChefs })(AdminDashboard);
