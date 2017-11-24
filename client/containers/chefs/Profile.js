import React from 'react';
import { Col, Panel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import BookingForm from '../BookingForm';
import ReviewForm from '../ReviewForm';
import Heading from '../../components/chefs/profile/Heading';
import Services from '../../components/chefs/profile/Services';
import ServiceTypes from '../../components/chefs/profile/ServiceTypes';
import ProfilePicture from '../../components/chefs/profile/ProfilePicture';
import CoverPicture from '../../components/chefs/profile/CoverPicture';
import Description from '../../components/chefs/profile/Description';
import Images from '../../components/chefs/profile/Images';
import Reviews from '../../components/chefs/reviews/List';
import Ratings from '../../components/chefs/profile/Ratings';
import Sticky from '../../components/Sticky';
import * as actions from '../../actions/public';


class Profile extends React.Component {
  componentWillMount() {
    this.props.getChef(this.props.params.id);
  }

  renderContent() {
    const primaryColour = '#ff6851';
    const emptyStarColor = '#e4e2e2';
    const CHEF = this.props.chef.profile;
    const REVIEWS = this.props.chef.comments || [];
    const NUMBER_OF_REVIEWS = this.props.chef.comments.length;
    const RATING = this.props.chef.rating;
    // let endorsements = _.sortBy(CHEF.endorsements, 'number').reverse();
    return (
      <div>
        <Row className="hidden-xs">
          <CoverPicture photoUrl={CHEF.coverPhoto} />
        </Row>
        <Row>
          <div className="gc-profile-body">
            <Col sm={9} md={7} mdOffset={1}>
              <Panel className="gc-panel gc-panel--translucent gc-center">
                <Row>
                  <div>
                    <Heading text={CHEF.displayName} />
                  </div>
                  <Col xs={6} xsOffset={3} sm={4} smOffset={4} className="gc-padding-none">
                    <ProfilePicture withoutMargins={(REVIEWS.length > 0) ? true : false} photoUrl={CHEF.profilePhoto} />
                  </Col>
                </Row>
                {
                  (REVIEWS.length > 0) &&
                  <StarRatingComponent
                    editing={false}
                    className="gc-star-rating"
                    starColor={primaryColour}
                    emptyStarColor={emptyStarColor}
                    name="overall"
                    starCount={5}
                    value={parseFloat(RATING.overall)}
                  />
                }
                <div>
                  <ServiceTypes serviceTypes={CHEF.serviceType.sort()} />
                </div>
                <hr />
                <div>
                  <Description description={CHEF.description} />
                </div>
                <hr />
                <div>
                  <Row>
                    <Col xs={10} xsOffset={1} sm={6} smOffset={0}>
                      <Services title="Services" services={CHEF.services.sort()} />
                    </Col>
                    <Col xs={12} className="visible-xs">
                      <hr />
                    </Col>
                    {
                      (CHEF.cuisines.length > 0) &&
                      <Col xs={10} xsOffset={1} sm={6} smOffset={0}>
                        <Services title="Cuisines" services={CHEF.cuisines.sort()} />
                      </Col>
                    }
                    {
                      (CHEF.cuisines.length > 0 && CHEF.additionalServices.length > 0) &&
                      <Col xs={12}>
                        <hr />
                      </Col>
                    }
                    {
                      (CHEF.additionalServices.length > 0) &&
                      <Col xs={10} xsOffset={1} sm={6} smOffset={CHEF.cuisines.length > 0 ? 3 : 0}>
                        <Services title="Additional Services" services={CHEF.additionalServices.sort()} />
                      </Col>
                    }
                  </Row>
                </div>
                {
                  (CHEF.photos.length > 0) &&
                    <div>
                      <hr />
                      <div>
                        <Images images={CHEF.photos} />
                      </div>
                    </div>
                }
                <hr />
                <Row className={NUMBER_OF_REVIEWS && 'gc-margin-bottom--lg'}>
                  <h3 className={NUMBER_OF_REVIEWS > 0 ? 'gc-form-heading gc-margin-bottom--lg' : 'gc-form-heading'}>Reviews ({NUMBER_OF_REVIEWS})</h3>
                  {
                    (REVIEWS.length > 0) &&
                    <Col xs={10} xsOffset={1}>
                      <Ratings ratings={RATING} />
                    </Col>
                  }
                </Row>
                <Row>
                  {
                    (REVIEWS.length > 0) ?
                      <Reviews reviews={REVIEWS} />
                      :
                      <div>
                        <p className="gc-text gc-margin-bottom">There are no reviews for this profile yet.</p>
                        <ReviewForm id={CHEF._id} />
                      </div>
                  }
                </Row>
              </Panel>
              <br />
            </Col>
            <BookingForm mobile id={CHEF._id} />
              <Col sm={3} xsHidden>
                <Sticky enter="254">
                <Panel className="gc-panel gc-panel--translucent">
                  <div>
                    <BookingForm id={CHEF._id} />
                  </div>
                </Panel>
                <ReviewForm block id={CHEF._id} />
                </Sticky>
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
