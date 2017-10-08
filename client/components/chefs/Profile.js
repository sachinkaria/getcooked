import React from 'react';
import { Col, Panel, Thumbnail, Row } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect} from 'react-redux';
import Phone from 'react-icons/lib/fa/phone'
import Email from 'react-icons/lib/fa/envelope-o'
import Globe from 'react-icons/lib/fa/globe'
import LightBox from '../../containers/LightBox';
import ContactForm from '../../containers/ContactForm';
import BookingForm from '../../containers/BookingForm';
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
      return (
        <div>
          <Row>
            <Col md={10} mdOffset={1}>
              <div style={coverStyle} className="gc-profile-cover"></div>
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
                    <p className="gc-center gc-profile-heading-md gc-margin-bottom gc-green">{user.displayName}</p>
                    <div className="text-center">
                      { user.serviceType.map(item =>
                        (
                          <div className="gc-inline-block">
                            <p key={item} className="text-capitalize gc-text gc-bold">
                              {item}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                    <div className="gc-margin-bottom gc-margin-top--lg">
                      <div className="gc-tags">
                        { user.services.map(item =>
                          (
                            <p className="gc-tag">
                              {item}
                            </p>
                          )
                        )}
                      </div>
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
                  <p className="gc-profile-heading-md gc-margin-bottom">Contact</p>
                  <div>
                    <div className="gc-margin-bottom">
                      <Globe className="gc-icon gc-list-item gc-grey" /><a href={user.companyWebsite} className="gc-text gc-list-item gc-grey">{user.companyWebsite}</a>
                    </div>
                    <div className="gc-margin-bottom">
                      <Email className="gc-icon gc-list-item gc-grey" /><p className="gc-text gc-list-item gc-grey">{user.companyEmail}</p>
                    </div>
                    <div className="gc-margin-bottom">
                      <Phone className="gc-icon gc-list-item gc-grey" /><p className="gc-text gc-list-item gc-grey">{user.companyPhoneNumber}</p>
                    </div>
                  </div>
                  {/*<BookingForm id={user.id} />*/}
                  {/*<hr />*/}
                  {/*<ContactForm chefId={this.props.params.id}/>*/}
                  {/*<Button className="gc-btn gc-btn--white gc-margin-top gc-margin-bottom" block>Favourite</Button>*/}
                  {/*<Link>Share</Link>*/}
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
  return {chef: state.public.chef};
}

export default connect(mapStateToProps, actions)(Profile);
