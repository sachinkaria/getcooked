import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import {Col, Panel, Row, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import BookingPaymentForm from '../../../../containers/forms/BookingPayment';
import {getBooking, accept, decline} from '../../../../actions/bookings';
import {create} from '../../../../actions/messages';
import Chat from '../../../../components/Chat';


class UserBooking extends React.Component {
  constructor(props) {
    super(props);
    this.acceptBooking = this.acceptBooking.bind(this);
    this.declineBooking = this.declineBooking.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.makePayment = this.makePayment.bind(this);

    this.state = { showPaymentForm: false }
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

  makePayment() {
    this.setState({
      showPaymentForm: true
    })
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
    let ADDITIONAL_INFORMATION = null;
    const { messages } = booking;

    if (booking.additionalInformation) {
      ADDITIONAL_INFORMATION = {
        _id: '1234567890',
        _sender: booking.user._id,
        date: booking.createdAt,
        body: booking.additionalInformation
      };
      messages.unshift(ADDITIONAL_INFORMATION);
    }

    const BOOKING_PENDING = (booking.status === 'pending' || booking.status === 'declined');

    return (
      <div>
        <Row>
          <Col xs={6} sm={3}>
            <Button className="gc-btn gc-btn-white gc-margin-bottom" onClick={browserHistory.goBack}>Back to
              Event</Button>
          </Col>
        </Row>
        <Row>
          {
            (!BOOKING_PENDING && !this.state.showPaymentForm) &&
            <Col xs={12} sm={4} smPush={8}>
              <Panel className="gc-panel gc-panel--alert">
                <Panel.Body>
                  <p className="gc-margin-bottom gc-profile-heading-sm gc-margin-bottom--lg">
                    {booking.status === 'deposit requested' && 'Deposit has been requested to confirm your booking.'}
                    {booking.status === 'accepted' && 'Awaiting final quote to confirm booking.'}
                    {booking.status === 'confirmed' && 'Congrats! Your booking is confirmed. You can settle the outstanding balance directly with your caterer.'}
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
                  Deposit Due (5%)
                </span>
                    <span className="gc-text gc-text--lg gc-grey pull-right">
                  £{booking.quote.depositAmount}
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
                  Deposit Paid (5%)
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
                    <span className="gc-text">This booking is unconfirmed. To confirm your booking you will be requested to pay a 5% deposit.</span>
                  }
                  {booking.status === 'deposit requested' &&
                  <Button block className="gc-btn gc-btn--orange gc-margin-top" onClick={() => this.makePayment()}>Confirm Now</Button>
                  }
                </Panel.Body>
              </Panel>
            </Col>
          }
          {
            this.state.showPaymentForm &&
            <Col xs={12} sm={4} smPush={8}>
              <BookingPaymentForm
                stripe={this.props.stripe}
                amount={parseInt(booking.quote.depositAmount)}
                id={booking._id}
              />
            </Col>
          }
          <Col xs={12} sm={8} smPull={4}>
            <h2 className="gc-profile-heading-sm">Chat</h2>
            <Chat messages={messages} user={user} otherUser={booking.chef} onSubmit={this.sendMessage}/>
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


UserBooking.propTypes = {
  booking: PropTypes.object
};

function mapStateToProps(state) {
  return {
    booking: state.user.booking,
    user: state.user.data
  };
}

export default connect(mapStateToProps, {getBooking, accept, decline, create})(UserBooking);
