import React from 'react';
import { Col, Panel, Thumbnail, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import LightBox from '../../containers/LightBox';
import ContactDetails from './ContactDetails';
import Heading from './Heading';
import Services from './Services';
import ServiceTypes from './ServiceTypes';
import * as actions from '../../actions/public';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.props.getChef(props.params.id);
  }

  renderContent() {
    if (this.props.chef.displayName) {
      const user = this.props.chef;
      const coverStyle = {
        backgroundImage: `url(${user.coverPhoto})`,
        backgroundSize: 'cover'
      };

      // let endorsements = _.sortBy(user.endorsements, 'number').reverse();
      const imagesCount = user.images && user.images.length;
      const websiteUrl = user.companyWebsite && user.companyWebsite.substring(0, 4) === 'http' ? user.companyWebsite : 'http://' + user.companyWebsite;
      return (
        <div>
          <Row>
            <Col md={10} mdOffset={1}>
              <div style={coverStyle} className="gc-profile-cover" />
            </Col>
          </Row>
          <Row>
            <div className="gc-profile-body">
              <Col sm={9} md={7} mdOffset={1}>
                <Panel className="gc-panel--translucent">
                  <Col xs={8} xsOffset={2} sm={3} smOffset={0} className="gc-padding-none gc-profile-photo">
                    <Thumbnail onClick={null} src={user.profilePhoto} />
                  </Col>
                  <Col md={9}>
                    <Heading text={user.displayName} />
                    <ServiceTypes serviceTypes={user.serviceType} />
                    <div className="gc-margin-bottom gc-margin-top--lg">
                      <Services services={user.services} />
                    </div>
                    <div className="gc-margin-bottom gc-margin-top--lg">
                      <Services services={user.cuisines} />
                    </div>
                    <Col>
                      <p className="gc-text gc-grey">{user.description}</p>
                    </Col>
                  </Col>
                  {imagesCount > 0 && (
                    <Col>
                      <h3 className="gc-center gc-margin-bottom">Photos <span
                        className="gc-profile-text-xs"
                      >({imagesCount})</span></h3>
                      <LightBox images={user.images} />
                    </Col>
                  )
                  }
                  {/* <Col xs={12} className="gc-margin-top"> */}
                  {/* <Col xs={12} className="gc-center"> */}
                  {/* <h3>Reviews <span className="gc-profile-text-xs">({user.numberOfRatings})</span></h3> */}
                  {/* </Col> */}
                  {/* <Col xs={12} md={8}> */}
                  {/* {user.reviews.map(function (review) { */}
                  {/* return ( */}
                  {/* <Review key={review.name} name={review.name} */}
                  {/* description={review.reviewDescription}/> */}
                  {/* ) */}
                  {/* }) */}
                  {/* } */}
                  {/* </Col> */}

                  {/* <Col xs={12} md={4} className="gc-margin-top--lg"> */}
                  {/* {endorsements.map(function (endorsement) { */}
                  {/* return ( */}
                  {/* <Endorsement key={endorsement.description} description={endorsement.description} */}
                  {/* number={endorsement.number}/> */}
                  {/* ) */}
                  {/* }) */}
                  {/* } */}
                  {/* </Col> */}
                  {/* </Col> */}
                </Panel>
              </Col>
              <Col sm={3} xsHidden>
                <Panel className="gc-panel--translucent">
                  <Heading text="Contact" textAlign="left" />
                  <ContactDetails website={websiteUrl} email={user.companyEmail} phone={user.companyPhoneNumber} />
                </Panel>
              </Col>
            </div>
          </Row>
        </div>
      );
    }
  }

  render() {
    if (this.props.chef.displayName) {
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
  return { chef: state.public.chef };
}

export default connect(mapStateToProps, actions)(Profile);
