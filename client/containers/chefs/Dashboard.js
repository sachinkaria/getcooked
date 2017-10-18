import React from 'react';
import { Col, Panel, Row } from 'react-bootstrap';
import DashboardNavBar from '../../components/users/dashboard/Navbar';
import Sidebar from '../../components/chefs/dashboard/Sidebar';
import BasicsSetup from '../../containers/forms/setup/chefs/BasicsForm';
import ServicesSetup from '../../containers/forms/setup/chefs/ServicesForm';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.renderView = this.renderView.bind(this);
  }

  componentWillMount() {
    this.renderView();
  }

  renderView() {
    if (this.props.route.view === 'basics') {
      return <BasicsSetup />;
    } else if (this.props.route.view === 'services') {
      return <ServicesSetup />;
    }
    return null;
  }

  render(){
    return (
      <div>
        <DashboardNavBar location={this.props.location.pathname} />
        <div className="gc-dashboard-container">
          <Row>
            <Col xsOffset={1} xs={10} sm={3} mdOffset={1} md={2}>
              <Sidebar />
            </Col>
            <Col xs={10} xsOffset={1} smOffset={0} sm={7}>
              <Panel>
                {this.renderView()}
              </Panel>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
};


export default Dashboard;
