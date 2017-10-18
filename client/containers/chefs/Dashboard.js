import React from 'react';
import { Col, Panel, Row, TabContainer } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DashboardNavBar from '../../components/users/dashboard/Navbar';
import * as actions from '../../actions/users';
import BasicsSetup from '../../containers/forms/setup/chefs/BasicsForm';


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
        <div className="gc-dashboard-container">
          <Row>
            <Col xsOffset={1} xs={10} smOffset={2} sm={2}>
              <Panel>
                <ul className="gc-list gc-padding-none">
                  <li>
                    <Link className="gc-link-default">
                      <p className="gc-text">Basic Details</p>
                    </Link>
                  </li>
                  <li>
                    <Link className="gc-link-default">
                      <p className="gc-text">Services</p>
                    </Link>
                  </li>
                  <li>
                    <Link className="gc-link-default">
                      <p className="gc-text">Food</p>
                    </Link>
                  </li>
                  <li>
                    <Link className="gc-link-default">
                      <p className="gc-text">Photos</p>
                    </Link>
                  </li>
                </ul>
              </Panel>
            </Col>
            <Col xs={10} xsOffset={1} smOffset={0} sm={6}>
              <Panel>
                <BasicsSetup />
              </Panel>
            </Col>
          </Row>
        </div>
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
