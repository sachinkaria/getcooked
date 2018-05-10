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
        return (<p className="gc-text text-capitalize gc-light-green">Accepted</p>);
      case 'declined':
        return (<p className="gc-text text-capitalize gc-red">Declined</p>);
      default:
        return (<p className="gc-text text-capitalize gc-yellow">Pending</p>);
    }
  }

  declineBooking() {
    const { booking } = this.props;
    heap.track('Declined Booking', { caterer: booking.chef.displayName });
    this.props.decline(this.props.id);
  }

  acceptBooking() {
    const { booking } = this.props;
    heap.track('Accepted Booking', { caterer: booking.chef.displayName });
    this.props.accept(this.props.id);
  }

  renderView() {
    const { booking } = this.props;
    const STATUS = this.getStatus();

    return (
      <div>
        { (booking.status === 'pending') &&
          <Panel className="gc-panel">
            <Panel.Body>
              <Row>
                <Col xs={12}>
                  <p className="gc-text gc-margin-bottom--lg">
                    Are you available to cater for this event? Please confirm your availability to contact the event host and find out more information.
                    Note: You are NOT obliged to cater the event if you have confirmed your availability.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={4} smOffset={4}>
                  <Button block className="gc-btn gc-margin-bottom--xs" onClick={this.acceptBooking} bsStyle="success">Accept</Button>
                </Col>
                <Col xs={12} sm={4} smOffset={4}>
                  <Button block className="gc-btn" onClick={this.declineBooking} bsStyle="danger">Decline</Button>
                </Col>
              </Row>
            </Panel.Body>
          </Panel>
        }
        {
          (booking.status === 'accepted') &&
          <Panel>
            <Panel.Heading className="gc-text gc-bold">Contact Details</Panel.Heading>
            <Panel.Body>
              <Row>
                <Col className="gc-center" xs={12} sm={6}>
                  <img
                    alt="Profile Image"
                    src="/images/default_profile.png"
                    className="gc-thumbnail gc-thumbnail--lg"
                  />
                  <p className="gc-text">{booking.contactDetails.firstName}</p>
                </Col>
                <Col xs={12} sm={6}>
                  <div>
                    <p className="gc-text gc-grey">Mobile number</p>
                    <p className="gc-text">
                      {booking.contactDetails.mobileNumber}
                    </p>
                    <p className="gc-text gc-grey">Email address</p>
                    <p className="gc-text">
                      {booking.contactDetails.email}
                    </p>
                  </div>
                </Col>
              </Row>
            </Panel.Body>
          </Panel>
        }
        <Row>
          <Col xs={12}>
            <Panel>
              <Panel.Heading className="gc-text gc-bold">Event Details</Panel.Heading>
              <Panel.Body>
                <Row>
                  <Col xs={12} sm={4}>
                    <p className="gc-text gc-grey">Status</p>
                    <p className="gc-text">{STATUS}</p>
                    <hr className="visible-xs" />
                  </Col>
                  <Col xs={12} sm={4}>
                    <p className="gc-text gc-grey">Date</p>
                    <p className="gc-text">{moment(booking.date).format('MMMM Do YYYY')}</p>
                    <hr className="visible-xs" />
                  </Col>
                  <Col xs={12} sm={4}>
                    <p className="gc-text gc-grey">Event Address</p>
                    <p className="gc-text gc-margin-none">
                      {booking.address.line1} {booking.address.line2},
                    </p>
                    <p className="gc-text">
                      {booking.address.postcode}
                    </p>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col xs={12} sm={4}>
                    <p className="gc-text gc-grey">Event Type</p>
                    <p className="gc-text text-capitalize">{booking.eventType}</p>
                  </Col>
                  <Col xs={12} sm={4}>
                    <p className="gc-text gc-grey">Number of guests</p>
                    <p className="gc-text">{booking.numberOfPeople} people</p>
                  </Col>
                  <Col xs={12} sm={4}>
                    <p className="gc-text gc-grey">Budget</p>
                    <p className="gc-text">£{booking.budget || 1500}</p>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col xs={12} sm={4}>
                    <p className="gc-text gc-grey">Services Required</p>
                    <div className="gc-margin-bottom">
                      {
                        booking.services.map((service) => {
                          return (
                            <p className="text-capitalize gc-margin-none">
                              {service}
                            </p>
                          );
                        })
                      }
                    </div>
                  </Col>
                  <Col xs={12} sm={4}>
                    <p className="gc-text gc-grey">Type of Food</p>
                    <div className="gc-margin-bottom">
                      {
                        booking.foodServices.map((service) => {
                          return (
                            <p className="text-capitalize gc-margin-none">
                              {service}
                            </p>
                          );
                        })
                      }
                    </div>
                  </Col>
                </Row>
                {
                  booking.additionalInformation &&
                  <Row>
                    <Col xs={12}>
                      <hr />
                      <p className="gc-text gc-grey">Additional Information</p>
                      <p className="gc-text gc-dark-grey">
                        {booking.additionalInformation}
                      </p>
                    </Col>
                  </Row>
                }
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </div>
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
