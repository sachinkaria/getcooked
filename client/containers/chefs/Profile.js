import React from 'react';
import {Col, Panel, Thumbnail, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import LightBox from '../LightBox';
import ContactDetails from '../../components/chefs/profile/ContactDetails';
import Heading from '../../components/chefs/profile/Heading';
import Services from '../../components/chefs/profile/Services';
import ServiceTypes from '../../components/chefs/profile/ServiceTypes';
import ProfilePicture from '../../components/chefs/profile/ProfilePicture';
import CoverPicture from '../../components/chefs/profile/CoverPicture';
import Description from '../../components/chefs/profile/Description';
import * as actions from '../../actions/public';


class Profile extends React.Component {
  componentWillMount() {
    this.props.getChef(this.props.params.id);
  }

  renderContent() {
    const CHEF = this.props.chef;
    const coverStyle = {
      backgroundImage: `url(${CHEF.coverPhoto})`,
      backgroundSize: 'cover'
    };

    // let endorsements = _.sortBy(CHEF.endorsements, 'number').reverse();
    const imagesCount = CHEF.images && CHEF.images.length;
    return (
      <div>
        <Row>
          <CoverPicture photoUrl={CHEF.coverPhoto} />
        </Row>
        <Row>
          <div className="gc-profile-body">
            <Col sm={9} md={7} mdOffset={1}>
              <Panel className="gc-panel--translucent">
                <Col xs={8} xsOffset={2} sm={3} smOffset={0} className="gc-padding-none">
                  <ProfilePicture photoUrl={CHEF.profilePhoto} />
                </Col>
                <Col sm={9}>
                  <Heading text={CHEF.displayName} />
                  <ServiceTypes serviceTypes={CHEF.serviceType} />
                  <Services services={CHEF.services} />
                  <Services services={CHEF.cuisines} />
                </Col>
                <Col>
                  <Description description={CHEF.description} />
                </Col>

              </Panel>
            </Col>
            <Col sm={3} xsHidden>
              <Panel className="gc-panel--translucent">
                <Heading text="Contact" textAlign="left" />
                <ContactDetails website={CHEF.companyWebsite} email={CHEF.companyEmail} phone={CHEF.companyPhoneNumber} />
              </Panel>
            </Col>
          </div>
        </Row>
      </div>
    );
  }

  render() {
    if (this.props.chef) {
      return (
        <div>
          {this.renderContent()}
        </div>
      );
    } else {
      return (
        <div>
          Cannot find profile.
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {chef: state.public.chef};
}

export default connect(mapStateToProps, actions)(Profile);
