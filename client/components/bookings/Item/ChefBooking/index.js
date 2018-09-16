import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {Col, Panel, Row, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import Modal from '../../../../containers/Modal';
import AcceptBookingForm from '../../../../containers/forms/AcceptBooking';
import {getBooking, accept, decline} from '../../../../actions/bookings';
import {create} from '../../../../actions/messages';
import Title from '../Title';
import ContactDetails from '../ContactDetails';
import CoreDetails from '../CoreDetails';
import EventType from '../EventType';
import ServicesRequired from '../ServicesRequired';
import TypeOfFood from '../TypeOfFood';
import FoodStyle from '../FoodStyle';
import AdditionalEquipment from '../AdditionalEquipment';
import Chat from '../../../../components/Chat';


class ChefBooking extends React.Component {
  constructor(props) {
    super(props);
    this.acceptBooking = this.acceptBooking.bind(this);
    this.declineBooking = this.declineBooking.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
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

  acceptBooking(message) {
    const {booking} = this.props;
    heap.track('Accepted Booking', {caterer: booking.chef.displayName});
    this.props.accept(this.props.id, message);
  }

  sendMessage(message) {
    this.props.create(this.props.booking._id, message);
  }

  renderView() {
    const { booking, user } = this.props;
    const { messages } = booking;
    const BOOKING_ACCEPTED = booking.status === 'accepted';
    const BOOKING_PENDING = (booking.status === 'pending' || booking.status === 'declined');
    const STATUS = this.getStatus();

    return (
      <div>
        <Row>
          {
            BOOKING_PENDING === false &&
              <Col xs={12} sm={8}>
                <h2 className="gc-profile-heading-sm">Chat</h2>
                <Chat messages={messages} user={user} otherUser={booking.user} onSubmit={this.sendMessage} />
              </Col>
          }
          <Col xs={12} sm={BOOKING_PENDING ? 12 : 4}>
            <h2 className="gc-profile-heading-sm">Booking Details</h2>
            <Panel className="gc-panel">
              <Panel.Body>
                <div>
                  <Row>
                    <Col xs={12}>
                      <Title name={booking.contactDetails.firstName || booking.user.firstName} date={booking.date}/>
                    </Col>
                    <Col xs={12}>
                      <span className="gc-text gc-text--lg gc-bold">{STATUS}</span>
                    </Col>
                  </Row>
                  <hr />
                  {
                    booking.status !== 'declined' &&
                      <div>
                        <Row>
                          <Col xs={12} sm={!BOOKING_PENDING ? 12 : 6}>
                            <CoreDetails
                              address={booking.address}
                              numberOfPeople={booking.numberOfPeople}
                              budget={booking.budget}
                              startTime={booking.startTime}
                              endTime={booking.endTime}
                            />
                          </Col>
                          {
                            (booking.status === 'pending') &&
                            <Col xs={12} sm={6}>
                              <Row>
                                <Col xs={12}>
                                  <p className="gc-text gc-margin-bottom--lg">
                                    Note: You are NOT obliged to cater the event once you have confirmed your availability.
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <div>
                                  <Col xs={6}>
                                    <Modal
                                      title="Accept Enquiry"
                                      buttonText="Accept"
                                    >
                                      <AcceptBookingForm onSubmit={this.acceptBooking}/>
                                    </Modal>
                                  </Col>
                                  <Col xs={6}>
                                    <Button block className="gc-btn gc-btn-white gc-btn-white--error" onClick={this.declineBooking}>Decline</Button>
                                  </Col>
                                </div>
                              </Row>
                              <hr className="visible-xs"/>
                            </Col>
                          }
                        </Row>
                        <hr className="hidden-xs"/>
                      </div>
                  }
                  <Row className="gc-padding-small">
                    <Col xs={12}>
                      <Row>
                        <Col xs={6} sm={BOOKING_ACCEPTED ? 6 : 4}>
                          <p className="gc-text gc-grey">Event Type</p>
                          <EventType eventType={booking.eventType}/>
                        </Col>
                        <Col xs={6} sm={BOOKING_ACCEPTED ? 6 : 4}>
                          <p className="gc-text gc-grey">Services Required</p>
                          <ServicesRequired services={booking.services}/>
                        </Col>
                        <Col xs={6} sm={BOOKING_ACCEPTED ? 6 : 4}>
                          <p className="gc-text gc-grey">Type of Food</p>
                          <TypeOfFood
                            openToVegan={booking.openToVegan}
                            openToVegetarian={booking.openToVegetarian}
                            foodServices={booking.foodServices}
                          />
                        </Col>
                      </Row>
                      {
                        (booking.kitchenAvailable && (booking.foodStyle.length > 0) && (booking.additionalEquipment.length > 0)) &&
                        <hr />
                      }
                      <Row>
                        {(booking.kitchenAvailable !== undefined) &&
                        <Col xs={6} sm={BOOKING_ACCEPTED ? 6 : 4}>
                          <p className="gc-text gc-grey">Kitchen Facilities</p>
                          <p className="gc-text gc-text--lg">{ booking.kitchenAvailable ? 'Available' : 'Unavailable' }</p>
                        </Col>
                        }
                        {(booking.foodStyle.length > 0) &&
                        <Col xs={6} sm={BOOKING_ACCEPTED ? 6 : 4}>
                          <p className="gc-text gc-grey">Food Style</p>
                          <FoodStyle foodStyle={booking.foodStyle}/>
                        </Col>
                        }
                        {
                          (booking.additionalEquipment.length > 0) &&
                          <Col xs={6} sm={BOOKING_ACCEPTED ? 6 : 4}>
                            <p className="gc-text gc-grey">Additional Equipment</p>
                            <AdditionalEquipment additionalEquipment={booking.additionalEquipment}/>
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


ChefBooking.propTypes = {
  booking: PropTypes.object
};

function mapStateToProps(state) {
  return {
    booking: state.user.booking,
    user: state.user.data
  };
}

export default connect(mapStateToProps, {getBooking, accept, decline, create})(ChefBooking);
