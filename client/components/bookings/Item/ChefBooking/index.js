import React from 'react';
import PropTypes from 'prop-types';
import {Col, Panel, Row, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import Modal from '../../../../containers/Modal';
import AcceptBookingForm from '../../../../containers/forms/AcceptBooking';
import RequestDepositForm from '../../../../containers/forms/RequestDepositForm';
import {getBooking, accept, decline, update, requestDeposit} from '../../../../actions/bookings';
import {create} from '../../../../actions/messages';
import Title from '../Title';
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
    this.requestDeposit = this.requestDeposit.bind(this);
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
      case 'deposit requested':
        return (<span className="gc-text gc-text--xl text-capitalize gc-grey">Deposit Requested</span>);
      case 'confirmed':
        return (<span className="gc-text gc-text--xl text-capitalize gc-light-green">Confirmed</span>);
      default:
        return (<span className="gc-text gc-text--xl text-capitalize gc-yellow">Pending</span>);
    }
  }

  declineBooking() {
    const { booking } = this.props;
    heap.track('Declined Booking', { caterer: booking.chef.displayName });
    this.props.decline(this.props.id);
  }

  acceptBooking(message) {
    const {booking} = this.props;
    heap.track('Accepted Booking', { caterer: booking.chef.displayName });
    this.props.accept(this.props.id, message);
  }

  requestDeposit(quote) {
    const status = 'deposit requested';
    const BOOKING = { quote, status };
    const {booking} = this.props;
    heap.track('Deposit Requested', { caterer: booking.chef.displayName, depositAmount: quote.depositAmount, quoteAmount: quote.amount });
    this.props.requestDeposit(this.props.id, BOOKING);
  }

  sendMessage(message) {
    this.props.create(this.props.booking._id, message);
  }

  renderView() {
    const { booking, user } = this.props;
    const { messages } = booking;
    const BOOKING_PENDING = (booking.status === 'pending' || booking.status === 'declined');
    const STATUS = this.getStatus();
    let ADDITIONAL_INFORMATION = null;

    if (booking.additionalInformation && booking.user) {
      ADDITIONAL_INFORMATION = {
        _id: '1234567890',
        _sender: booking.user._id,
        date: booking.createdAt,
        body: booking.additionalInformation
      };
      messages.unshift(ADDITIONAL_INFORMATION);
    }

    return (
      <div>
        <Row className="gc-margin-bottom--lg">
          <Col xs={12} sm={9}>
            <Title name={booking.contactDetails.firstName || booking.user.firstName} date={booking.date}/>
            <br />
            {
              (booking.status === 'accepted' || booking.status === 'deposit requested' || booking.status === 'confirmed' ) &&
                <div>
                  <img
                    className="gc-icon pull-left"
                    alt="location"
                    src="/images/phone-grey.png"
                  />
                  <span className="gc-text gc-text--lg gc-grey pull-left">{booking.contactDetails.mobileNumber || booking.user.mobileNumber || 'Not provided'}</span>
                </div>
            }
          </Col>
          <Col xs={12} sm={3}>
            <span className="gc-text gc-text--lg gc-bold pull-right">{STATUS}</span>
          </Col>
        </Row>
        <Row>
          {
            !BOOKING_PENDING &&
            <Col xs={12} sm={4} smPush={8}>
              <Panel className="gc-panel gc-panel--alert">
                <Panel.Body>
                  <p className="gc-margin-bottom gc-profile-heading-sm gc-margin-bottom--lg">
                    {booking.status === 'deposit requested' && 'Awaiting confirmation and deposit payment.'}
                    {booking.status === 'accepted' && 'To confirm this booking please request a deposit.'}
                    {booking.status === 'confirmed' && 'Booking confirmed. You can settle the outstanding balance directly with your client.'}
                  </p>
                  {booking.status === 'deposit requested' &&
                  <div>
                       <span className="gc-text gc-text--lg gc-text--slim">
                  Final Quote
                </span>
                    <span className="gc-text gc-text--lg gc-grey pull-right">
                  £{booking.quote.amount}
                </span>
                    <hr className="gc-hr-sm"/>
                    <span className="gc-text gc-text--lg gc-text--slim">
                  Deposit / Fee (5%)
                </span>
                    <span className="gc-text gc-text--lg gc-grey pull-right">
                  £{booking.quote.depositAmount}
                </span>
                    <hr className="gc-hr-sm"/>
                    <span className="gc-text gc-text--lg gc-text--slim">
                      Outstanding Balance
                  </span>
                    <span className="gc-text gc-text--lg gc-grey pull-right">
                  £{booking.quote.balanceDue}
                  </span>
                  </div>
                  }
                  {booking.status === 'confirmed' &&
                  <div>
                       <span className="gc-text gc-text--lg gc-text--slim">
                  Final Quote
                </span>
                    <span className="gc-text gc-text--lg gc-grey pull-right">
                  £{booking.quote.amount}
                </span>
                    <hr className="gc-hr-sm"/>
                    <span className="gc-text gc-text--lg gc-text--slim">
                  Fee / Deposit Received (5%)
                </span>
                    <span className="gc-text gc-text--lg gc-grey pull-right">
                  £{booking.quote.depositAmount}
                </span>
                    <hr className="gc-hr-sm"/>
                    <span className="gc-text gc-text--lg gc-text--slim">
                      Outstanding Balance
                  </span>
                    <span className="gc-text gc-text--lg gc-grey pull-right">
                  £{booking.quote.balanceDue}
                  </span>
                  </div>
                  }
                  {
                    booking.status === 'accepted' &&
                    <Modal
                      large
                      title="Request Deposit"
                      buttonText="Request Deposit"
                    >
                      <RequestDepositForm onSubmit={this.requestDeposit}/>
                    </Modal>
                  }
                </Panel.Body>
              </Panel>
            </Col>
          }
          {
            !BOOKING_PENDING &&
            <Col xs={12} sm={8} smPull={4}>
              <h2 className="gc-profile-heading-sm">Chat</h2>
              <Chat messages={messages} user={user} otherUser={booking.user} onSubmit={this.sendMessage}/>
            </Col>
          }
        </Row>
        <Row>
          <Col xs={12} sm={BOOKING_PENDING ? 12 : 8}>
            <h2 className="gc-profile-heading-sm">Booking Details</h2>
            <Panel className="gc-panel">
              <Panel.Body>
                <div>
                  {
                    booking.status !== 'declined' &&
                    <div>
                      <Row>
                        <Col xs={12} sm={!BOOKING_PENDING ? 12 : 6}>
                          <CoreDetails
                            status={booking.status}
                            mobileNumber={booking.contactDetails.mobileNumber || booking.user.mobileNumber}
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
                                <Panel className="gc-text gc-text--lg gc-bold gc-margin-bottom--lg gc-panel gc-panel--alert">
                                  <Panel.Body>
                                    To ensure we continue to improve your experience with us please
                                    try keep all written correspondences on platform.
                                  </Panel.Body>
                                </Panel>
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={6}>
                                <Modal
                                  title="Accept Enquiry"
                                  buttonText="Accept"
                                >
                                  <AcceptBookingForm onSubmit={this.acceptBooking}/>
                                </Modal>
                              </Col>
                              <Col xs={6}>
                                <Button block className="gc-btn gc-btn-white gc-btn-white--error"
                                        onClick={this.declineBooking}>Decline</Button>
                              </Col>
                            </Row>
                          </Col>
                        }
                      </Row>
                      <hr />
                    </div>
                  }
                  <Row className="gc-padding-small">
                    <Col xs={12}>
                      <Row>
                        <Col xs={6} sm={4}>
                          <p className="gc-text gc-grey">Event Type</p>
                          <EventType eventType={booking.eventType}/>
                        </Col>
                        <Col xs={6} sm={4}>
                          <p className="gc-text gc-grey">Services Required</p>
                          <ServicesRequired services={booking.services}/>
                        </Col>
                        <Col xs={6} sm={4}>
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
                        <Col xs={6} sm={4}>
                          <p className="gc-text gc-grey">Kitchen Facilities</p>
                          <p
                            className="gc-text gc-text--lg">{ booking.kitchenAvailable ? 'Available' : 'Unavailable' }</p>
                        </Col>
                        }
                        {(booking.foodStyle.length > 0) &&
                        <Col xs={6} sm={4}>
                          <p className="gc-text gc-grey">Food Style</p>
                          <FoodStyle foodStyle={booking.foodStyle}/>
                        </Col>
                        }
                        {
                          (booking.additionalEquipment.length > 0) &&
                          <Col xs={6} sm={4}>
                            <p className="gc-text gc-grey">Additional Equipment</p>
                            <AdditionalEquipment additionalEquipment={booking.additionalEquipment}/>
                          </Col>
                        }
                      </Row>
                      {
                        (BOOKING_PENDING && booking.additionalInformation) &&
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

export default connect(mapStateToProps, {getBooking, accept, decline, create, update, requestDeposit})(ChefBooking);
