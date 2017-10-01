import React from 'react';
import {Col, Panel, Thumbnail, Button, Row} from 'react-bootstrap';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import LightBox from '../../containers/LightBox';
import Rating from '../Rating';
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
      // let endorsements = _.sortBy(user.endorsements, 'number').reverse();
      const imagesCount = user.images && user.images.length;
      return (
        <Row>
          <Col sm={9} md={8} mdOffset={1}>
            <Panel>
              <Col md={4} className="gc-padding-none">
                <Thumbnail onClick={null} src={user.profilePhoto} />
              </Col>
              <Col md={8}>
                <p className="gc-center gc-profile-heading-md gc-margin-bottom gc-green">{user.displayName}</p>
                <div className="text-center">
                  { user.serviceType.map((item) =>
                    <p className="text-capitalize gc-text">
                      {item}
                    </p>
                  )}
                </div>
                <div className="gc-margin-bottom gc-margin-top--lg">
                  <ul className="gc-tags">
                    { user.services.map((item) =>
                      <li>
                        <p className="gc-tag">
                          {item}
                        </p>
                      </li>
                    )}
                  </ul>
                </div>
                <Col>
                  <p className="gc-text">{user.description}</p>
                </Col>
              </Col>
              {imagesCount > 0 && (
                <Col>
                  <h3 className="gc-center gc-margin-bottom">Photos <span
                    className="gc-profile-text-xs"
                  >({imagesCount})</span></h3>
                  <LightBox images={user.images}/>
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
          <Col sm={3} md={2} xsHidden>
            <Panel className="gc-center">
              <BookingForm id={user.id}/>
              <hr />
              <ContactForm chefId={this.props.params.id}/>
              <Button className="gc-btn gc-btn--white gc-margin-top gc-margin-bottom" block>Favourite</Button>
              <Link>Share</Link>
            </Panel>
          </Col>
        </Row>
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
          helloa
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {chef: state.public.chef};
}

export default connect(mapStateToProps, actions)(Profile);
