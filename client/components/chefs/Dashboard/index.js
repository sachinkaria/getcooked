import React from 'react';
import { Col, Panel, Row } from 'react-bootstrap';
import DashboardNavBar from '../../users/dashboard/Navbar';
import Sidebar from './Sidebar';
import BasicsForm from '../../../containers/forms/setup/chefs/BasicsForm';
import ServicesForm from '../../../containers/forms/setup/chefs/ServicesForm';
import FoodForm from '../../../containers/forms/setup/chefs/FoodForm';


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
      return <BasicsForm />;
    } else if (this.props.route.view === 'service-type') {
      return <ServicesForm />;
    } else if (this.props.route.view === 'food-services') {
      return <FoodForm />;
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
              <Sidebar location={this.props.location.pathname} />
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
