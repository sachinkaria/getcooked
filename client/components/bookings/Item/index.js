import React from 'react';
import PropTypes from 'prop-types';
import {Col, Panel, Row, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getBooking, accept, decline} from '../../../actions/bookings';
import Title from './Title';
import ContactDetails from './ContactDetails';
import CoreDetails from './CoreDetails';
import EventType from './EventType';
import ServicesRequired from './ServicesRequired';
import TypeOfFood from './TypeOfFood';
import FoodStyle from './FoodStyle';
import AdditionalEquipment from './AdditionalEquipment';


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
                <Title name={booking.contactDetails.firstName} date={booking.date} />
              </Col>
              <Col xs={3} className="text-right">
                {STATUS}
              </Col>
            </Row>
            <hr />
            <Row>
              {
                (booking.status === 'pending') &&
                <Col xs={12} sm={6} smPush={6}>
                  <Row>
                    <Col xs={12}>
                      <p className="gc-text gc-margin-bottom--lg">
                        Note: You are NOT obliged to cater the event once you have confirmed your availability.
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
                  <hr className="visible-xs" />
                </Col>
              }
              {
                (booking.status === 'accepted') &&
                <Col xs={12} sm={6} smPush={6}>
                  <ContactDetails contactDetails={booking.contactDetails} />
                </Col>
              }
              <Col xs={12} sm={6} smPull={booking.status === 'declined' ? 0 : 6}>
                <CoreDetails
                  address={booking.address}
                  numberOfPeople={booking.numberOfPeople}
                  budget={booking.budget}
                  startTime={booking.startTime}
                  endTime={booking.endTime}
                />
              </Col>
            </Row>
            <hr />
            <Row className="gc-padding-small">
              <Col xs={12}>
                <Row>
                  <Col xs={6} sm={4}>
                    <p className="gc-text gc-grey">Event Type</p>
                    <EventType eventType={booking.eventType} />
                  </Col>
                  <Col xs={6} sm={4}>
                    <p className="gc-text gc-grey">Services Required</p>
                    <ServicesRequired services={booking.services} />
                  </Col>
                  <Col xs={6} sm={4}>
                    <p className="gc-text gc-grey">Type of Food</p>
                    <TypeOfFood foodServices={booking.foodServices} />
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
                    <p className="gc-text gc-text--lg">{ booking.kitchenAvailable ? 'Available' : 'Unavailable' }</p>
                  </Col>
                  }
                  {(booking.foodStyle.length > 0) &&
                  <Col xs={6} sm={4}>
                    <p className="gc-text gc-grey">Food Style</p>
                    <FoodStyle foodStyle={booking.foodStyle} />
                  </Col>
                  }
                  {
                    (booking.additionalEquipment.length > 0) &&
                    <Col xs={6} sm={4}>
                      <p className="gc-text gc-grey">Additional Equipment</p>
                      <AdditionalEquipment additionalEquipment={booking.additionalEquipment} />
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
