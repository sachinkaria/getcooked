import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {Col, Panel, Row, Button} from 'react-bootstrap';
import moment from 'moment';
import {connect} from 'react-redux';
import {getBooking, accept, decline} from '../../actions/bookings';


class BookingItem extends React.Component {
  constructor(props) {
    super(props);
    this.acceptBooking = this.acceptBooking.bind(this);
    this.declineBooking = this.declineBooking.bind(this);
    this.getStatus = this.getStatus.bind(this);
  }

  componentWillMount() {
    this.props.getBooking(this.props.id);
  }

  getStatus() {
    switch (this.props.booking.status) {
      case 'accepted':
        return (<span className="gc-text gc-text--xl text-capitalize gc-light-green">Accepted</span>);
      case 'declined':
        return (<span className="gc-text gc-text--xl text-capitalize gc-red">Declined</span>);
      default:
        return (<span className="gc-text gc-text--xl text-capitalize gc-yellow">Pending</span>);
    }
  }

  declineBooking() {
    const {booking} = this.props;
    heap.track('Declined Booking', {caterer: booking.chef.displayName});
    this.props.decline(this.props.id);
  }

  acceptBooking() {
    const {booking} = this.props;
    heap.track('Accepted Booking', {caterer: booking.chef.displayName});
    this.props.accept(this.props.id);
  }

  renderView() {
    const {booking} = this.props;
    const STATUS = this.getStatus();

    return (
      <Panel className="gc-panel">
        <Panel.Body>
          <div>
            <Row>
              <Col xs={9}>
                <h1 className="gc-section-heading-sm gc-margin-none">
                  {booking.contactDetails.firstName}&#39;s event on {moment(booking.date).format('MMMM Do YYYY')}
                  </h1>
              </Col>
              <Col xs={3} className="text-right">
                {STATUS}
              </Col>
            </Row>
            <hr/>
            <Row>
              {
                (booking.status === 'pending') &&
                <Col xs={12} sm={6} smPush={6}>
                  <Row>
                    <Col xs={12}>
                      <p className="gc-text gc-margin-bottom--lg">
                        Note: You are NOT obliged to cater the event if you have confirmed your availability.
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={6}>
                      <Button
                        block
                        className="gc-btn gc-margin-bottom--xs"
                        onClick={this.acceptBooking}
                        bsStyle="success">Accept</Button>
                    </Col>
                    <Col xs={6}>
                      <Button block className="gc-btn" onClick={this.declineBooking} bsStyle="danger">Decline</Button>
                    </Col>
                  </Row>
                  <hr className="visible-xs"/>
                </Col>
              }
              {
                (booking.status === 'accepted') &&
                <Col xs={12} sm={6} smPush={6}>
                  <Row>
                    <Col xs={12} className="gc-margin-bottom--xs">
                      <img
                        alt="Profile Image"
                        src="/images/contact-grey.png"
                        className="gc-icon"
                      />
                      <p
                        className="gc-text gc-text--lg text-capitalize gc-inline-block">{booking.contactDetails.firstName}</p>
                    </Col>
                    <Col xs={12} className="gc-margin-bottom--xs">
                      <img
                        alt="Profile Image"
                        src="/images/phone-grey.png"
                        className="gc-icon"
                      />
                      <p className="gc-text gc-text--lg gc-inline-block"> {booking.contactDetails.mobileNumber}</p>
                    </Col>
                    <Col xs={12} className="gc-margin-bottom--xs">
                      <img
                        alt="Profile Image"
                        src="/images/letter-grey.png"
                        className="gc-icon"
                      />
                      <p className="gc-text gc-text--lg gc-inline-block">{booking.contactDetails.email}</p>
                    </Col>
                  </Row>
                </Col>
              }
              <Col xs={12} sm={6} smPull={booking.status === 'declined' ? 0 : 6}>
                <Row>
                  <Col xs={12} className="gc-margin-bottom--xs">
                    <img
                      className="gc-icon"
                      alt="location"
                      src="/images/location-grey.png"
                    />
                    <p className="gc-text gc-text--lg text-capitalize gc-inline-block">
                      {booking.address.line1}, {booking.address.postcode}
                    </p>
                  </Col>
                  <Col xs={12} className="gc-margin-bottom--xs">
                    <img
                      className="gc-icon"
                      alt="people"
                      src="/images/people-grey.png"
                    />
                    <p className="gc-text gc-text--lg gc-inline-block">{booking.numberOfPeople} people</p>
                  </Col>
                  <Col xs={12} className="gc-margin-bottom--xs">
                    <img
                      className="gc-icon"
                      alt="budget"
                      src="/images/money-grey.png"
                    />
                    <p className="gc-text gc-text--lg gc-inline-block">£{booking.budget || 1500}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
            <Row className="gc-padding-small">
              <Col xs={12}>
                <Row>
                  <Col xs={6} sm={4}>
                    <p className="gc-text gc-grey">Event Type</p>
                    {
                      booking.eventType.map((service) => {
                        return (
                          <p key={service} className="gc-text gc-text--lg text-capitalize gc-margin-none">
                            {service}
                          </p>
                        );
                      })
                    }
                  </Col>
                  <Col xs={6} sm={4}>
                    <p className="gc-text gc-grey">Services Required</p>
                    <div className="gc-margin-bottom">
                      {
                        booking.services.map((service) => {
                          return (
                            <p key={service} className="gc-text gc-text--lg text-capitalize gc-margin-none">
                              {service}
                            </p>
                          );
                        })
                      }
                    </div>
                  </Col>
                  <Col xs={6} sm={4}>
                    <p className="gc-text gc-grey">Type of Food</p>
                    <div className="gc-margin-bottom">
                      {
                        booking.foodServices.map((service) => {
                          return (
                            <p key={service} className="gc-text gc-text--lg text-capitalize gc-margin-none">
                              {service}
                            </p>
                          );
                        })
                      }
                    </div>
                  </Col>
                </Row>
                <hr />
                <Row>
                  { !!booking.kitchenAvailable &&
                  <Col xs={6} sm={4}>
                    <p className="gc-text gc-grey">Kitchen Facilities</p>
                    <p className="gc-text gc-text--lg">{ booking.kitchenAvailable ? 'Available' : 'Unavailable' }</p>
                  </Col>
                  }
                  {(booking.foodStyle.length > 0) &&
                  <Col xs={6} sm={4}>
                    <p className="gc-text gc-grey">Food Style</p>
                    <div className="gc-margin-bottom">
                      {
                        booking.foodStyle.map((service) => {
                          return (
                            <p key={service} className="gc-text gc-text--lg text-capitalize gc-margin-none">
                              {service}
                            </p>
                          );
                        })
                      }
                    </div>
                  </Col>
                  }
                  {
                    (booking.additionalEquipment.length > 0) &&
                    <Col xs={6} sm={4}>
                      <p className="gc-text gc-grey">Additional Equipment</p>
                      <div className="gc-margin-bottom">
                        {
                          booking.additionalEquipment.map((service) => {
                            return (
                              <p key={service} className="gc-text gc-text--lg text-capitalize gc-margin-none">
                                {service}
                              </p>
                            );
                          })
                        }
                      </div>
                    </Col>
                  }
                </Row>
                {
                  booking.additionalInformation &&
                  <Row>
                    <Col xs={12}>
                      <hr />
                      <p className="gc-text gc-grey">Additional Information</p>
                      <p className="gc-text gc-text--lg gc-dark-grey">
                        {booking.additionalInformation}
                      </p>
                    </Col>
                  </Row>
                }
              </Col>
            </Row>
          </div>
        </Panel.Body>
      </Panel>
    );
  }

  render() {
    if (this.props.booking) {
      return this.renderView();
    }
    return (
      <div>Loading booking...</div>
    );
  }
}


BookingItem.propTypes = {
  booking: PropTypes.object
};

function mapStateToProps(state) {
  return {
    booking: state.user.booking
  };
}

export default connect(mapStateToProps, {getBooking, accept, decline})(BookingItem);
