import React from 'react';
import {Col, Panel, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import ContactDetails from '../../components/chefs/profile/ContactDetails';
import Heading from '../../components/chefs/profile/Heading';
import Services from '../../components/chefs/profile/Services';
import ServiceTypes from '../../components/chefs/profile/ServiceTypes';
import ProfilePicture from '../../components/chefs/profile/ProfilePicture';
import CoverPicture from '../../components/chefs/profile/CoverPicture';
import Description from '../../components/chefs/profile/Description';
import Images from '../../components/chefs/profile/Images';
import * as actions from '../../actions/public';


class Profile extends React.Component {
  componentWillMount() {
    this.props.getChef(this.props.params.id);
  }

  renderContent() {
    const CHEF = this.props.chef;

    // let endorsements = _.sortBy(CHEF.endorsements, 'number').reverse();
    return (
      <div>
        <Row>
          <CoverPicture photoUrl={CHEF.coverPhoto} />
        </Row>
        <Row>
          <div className="gc-profile-body">
            <Col sm={9} md={7} mdOffset={1}>
              <Panel className="gc-panel--translucent gc-center">
                <Row>
                  <div className="hidden-xs">
                    <Heading text={CHEF.displayName} />
                  </div>
                  <Col xs={6} xsOffset={3} sm={4} smOffset={4} className="gc-padding-none">
                    <ProfilePicture photoUrl={CHEF.profilePhoto} />
                  </Col>
                </Row>
                <div className="visible-xs">
                  <Heading text={CHEF.displayName} />
                </div>
                <div>
                  <ServiceTypes serviceTypes={CHEF.serviceType.sort()} />
                  <div className="visible-xs">
                    <ContactDetails
                      mobile
                      website={CHEF.companyWebsite}
                      email={CHEF.companyEmail}
                      phone={CHEF.companyPhoneNumber}
                    />
                  </div>
                </div>
                <hr className="grey" />
                <div>
                  <Description description={CHEF.description} />
                </div>
                <hr className="grey" />
                <div>
                  <Row>
                    <Col xs={10} xsOffset={1} sm={6} smOffset={0}>
                      <Services title="Services" services={CHEF.services.sort()} />
                    </Col>
                    <Col xs={12} className="visible-xs">
                      <hr className="grey" />
                    </Col>
                    <Col xs={10} xsOffset={1} sm={6} smOffset={0}>
                      <Services title="Cuisines" services={CHEF.cuisines.sort()} />
                    </Col>
                  </Row>
                </div>
                <hr className="grey" />
                <div>
                  <Images images={CHEF.images} />
                </div>
                <hr className="grey" />
                <Row>
                  <p className="gc-form-heading"> Reviews</p>
                </Row>
              </Panel>
            </Col>
            <Col sm={3} xsHidden>
              <Panel className="gc-panel--translucent">
                <Heading text="Contact" textAlign="left" />
                <ContactDetails
                  website={CHEF.companyWebsite}
                  email={CHEF.companyEmail}
                  phone={CHEF.companyPhoneNumber}
                />
              </Panel>
            </Col>
          </div>
        </Row>
      </div>
    );
  }

  render() {
    return (
      (this.props.chef) ?
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
  return { chef: state.public.chef };
}

export default connect(mapStateToProps, actions)(Profile);
