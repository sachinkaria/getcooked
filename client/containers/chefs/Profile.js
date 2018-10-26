import React from 'react';
import { Col, Panel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
import BookingForm from '../BookingForm';
import ReviewForm from '../ReviewForm';
import Heading from '../../components/chefs/profile/Heading';
import Services from '../../components/chefs/profile/Services';
import ServiceTypes from '../../components/chefs/profile/ServiceTypes';
import ProfilePicture from '../../components/chefs/profile/ProfilePicture';
import Description from '../../components/chefs/profile/Description';
import Images from '../../components/chefs/profile/Images';
import Reviews from '../../components/chefs/reviews/List';
import Ratings from '../../components/chefs/profile/Ratings';
import FoodSuppliers from '../../components/chefs/profile/FoodSources';
import CoverPicture from '../../components/chefs/profile/CoverPicture';
import Sticky from '../../components/Sticky';
import Modal from '../../containers/Modal';
import { BOOKING_MODAL } from '../../utils/data';
import { getChef } from '../../actions/public';
import { createBooking } from '../../actions/bookings';


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
    const CANONICAL_URL = 'https://www.getcooked.co/caterers/profile/'.concat(this.props.params.id);
    const DESCRIPTION = CHEF.description.split('***');
    const SUPPLIERS = CHEF.foodSuppliers && CHEF.foodSuppliers.filter(supplier => supplier.name && supplier.description);
    let PHOTOS = [];
    if (CHEF.instagramFeed) {
      CHEF.instagramFeed.forEach((item) => {
        PHOTOS.push({
          id: item.id,
          src: item.images.standard_resolution.url
        });
      });
    }
    PHOTOS = PHOTOS.concat(CHEF.photos);

    heap.track('View Caterer', { name: CHEF.displayName, id: this.props.params.id });

    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Get Cooked | {_.startCase(_.toLower(CHEF.displayName))}</title>
          <meta property="og:image" alt="Book the best caterers around" content={CHEF.coverPhoto} />
          <link rel="canonical" href={CANONICAL_URL} />
        </Helmet>
        <Row>
          <div className="gc-profile-body">
            <Col sm={9} md={7} mdOffset={1}>
              <Panel className="gc-panel gc-panel--translucent gc-center" style={{ paddingTop: '0'}}>
                <Panel.Body style={{ paddingTop: '0'}}>
                  <Row style={{ paddingTop: '15px' }}>
                    <Col xs={6} xsOffset={3} sm={6} lg={5} smOffset={0}>
                      <ProfilePicture photoUrl={CHEF.profilePhoto} />
                    </Col>
                    <Col xs={12} sm={6} lg={7}>
                      <Heading text={CHEF.displayName} />
                      <h4 className="gc-profile-text">London, United Kingdom</h4>
                      <StarRatingComponent
                        editing={false}
                        className="gc-star-rating"
                        starColor={primaryColour}
                        emptyStarColor={emptyStarColor}
                        name="overall"
                        starCount={5}
                        value={(RATING && parseFloat(RATING.overall)) || 0}
                      />
                      <div>
                        <ServiceTypes serviceTypes={CHEF.serviceType.sort()} />
                      </div>
                    </Col>
                  </Row>
                  <br />
                  <Row className="gc-background-light-grey text-left center-m gc-padding-small">
                    <Col xs={12}>
                      <Description description={DESCRIPTION} />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={10} xsOffset={1} sm={4} smOffset={0}>
                      <Services title="Events" services={CHEF.events.sort()} />
                    </Col>
                    <Col xs={12} className="visible-xs">
                      <hr />
                    </Col>
                    {
                      (CHEF.services.length > 0) &&
                      <Col xs={10} xsOffset={1} sm={4} smOffset={0}>
                        <Services title="Services" services={CHEF.services.sort()} />
                      </Col>
                    }
                    {
                      (CHEF.additionalServices.length > 0) &&
                      <Col className="visible-xs" xs={12}>
                        <hr />
                      </Col>
                    }
                    {
                      (CHEF.additionalServices.length > 0) &&
                      <Col xs={10} xsOffset={1} sm={4} smOffset={0}>
                        <Services title="Extras" services={CHEF.additionalServices.sort()} />
                      </Col>
                    }
                  </Row>
                  {(SUPPLIERS.length > 0) && <br />}
                  {
                    (SUPPLIERS.length > 0) &&
                    <div className="gc-section--grey">
                      <Row className="gc-background-light-grey gc-padding-top">
                        <Col xs={12}>
                          <FoodSuppliers sources={SUPPLIERS} />
                        </Col>
                       </Row>
                    </div>
                  }
                  {
                    (PHOTOS.length > 0) &&
                    <div>
                      <br />
                        <Images images={PHOTOS} />
                    </div>
                  }
                  <br />
                  <Row className={NUMBER_OF_REVIEWS && 'gc-margin-bottom--lg'}>
                    <h3 className={NUMBER_OF_REVIEWS > 0 ? 'gc-profile-heading-md gc-margin-bottom--lg' : 'gc-profile-heading-md gc-text--lg'}>
                      Reviews ({NUMBER_OF_REVIEWS})</h3>
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
                          <p className="gc-text gc-text--lg gc-margin-bottom">There are no reviews for this profile yet.</p>
                        </div>
                    }
                  </Row>
                </Panel.Body>
              </Panel>
              <br />
            </Col>
            <Modal
              mobile
              title={BOOKING_MODAL.TITLE}
              description={BOOKING_MODAL.DESCRIPTION}
              buttonText={BOOKING_MODAL.ACTION}
              onClick={heap.track('Click Book Now', { chef_id: this.props.chef.id, chef_name: this.props.chef.displayName })}
            >
              <BookingForm
                onSubmit={this.props.createBooking}
                action="Contact now"
              />
            </Modal>
            <Col sm={3} xsHidden>
              <Sticky enter="1">
                <Panel className="gc-panel gc-panel--translucent">
                  <Panel.Body>
                    <div className="gc-center">
                      <Modal
                        title={BOOKING_MODAL.TITLE}
                        description={BOOKING_MODAL.DESCRIPTION}
                        buttonText={BOOKING_MODAL.ACTION}
                        onClick={heap.track('Click Book Now', { chef_id: this.props.chef.id, chef_name: this.props.chef.displayName })}
                      >
                        <BookingForm
                          onSubmit={this.props.createBooking}
                          action="Contact now"
                        />
                      </Modal>
                      <p className="gc-text gc-text--lg gc-dark-grey gc-margin-top">
                        Contact this caterer and check their availability for your event.
                      </p>
                    </div>
                  </Panel.Body>
                </Panel>
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
        <div className="text-center">
          <span className="gc-icon gc-icon--xl gc-icon--loading" />
          <div>
            Loading...
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return { chef: state.public.chef };
}

export default connect(mapStateToProps, { getChef, createBooking })(Profile);
