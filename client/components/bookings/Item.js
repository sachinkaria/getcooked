import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Col, Panel, Row } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import { getBooking } from '../../actions/bookings';


class BookingItem extends React.Component {
  componentWillMount() {
    this.props.getBooking(this.props.id);
  }
  renderView() {
    if (this.props.itemType === 'chefItem') {
      return (
        <Panel className="gc-panel">
          <Panel.Body>
          <Row className="gc-center">
            <Col>
              <Link to={`/chefs/${this.props.booking.chef._id}`}>
                <img
                  alt={this.props.booking.chef.displayName}
                  src={this.props.booking.chef.profilePhoto}
                  className="gc-thumbnail gc-margin-bottom--xs"
                />
                <p className="gc-form-heading text-capitalize">{this.props.booking.chef.displayName}</p>
              </Link>
            </Col>
          </Row>
          <Row className="gc-center">
            <Col>
              <div>
                <p className="gc-text"><span className="gc-bold">Event date:</span> {moment(this.props.booking.date).format('MMMM Do YYYY')}</p>
                <p className="gc-text"><span className="gc-bold">Type of event:</span> <span className="text-capitalize">{this.props.booking.eventType}</span></p>
                <p className="gc-text"><span className="gc-bold">Number of guests (approx.):</span> {this.props.booking.numberOfPeople}</p>
                <p className="gc-text"><span className="gc-bold">Address: </span>{this.props.booking.address.line1}, {this.props.booking.address.line2}, {this.props.booking.address.city}, {this.props.booking.address.postcode}</p>
                <p className="gc-text"><span className="gc-bold">Budget (approx.):</span> £{this.props.booking.budget || 1500}</p>
              </div>
            </Col>
          </Row>
          {
            this.props.booking.additionalInformation &&
            <Row className="gc-margin-top gc-center">
              <Col xs={12}>
                <p className="gc-text gc-bold">Additional Information</p>
                <p className="gc-text gc-dark-grey">
                  {this.props.booking.additionalInformation}
                </p>
              </Col>
            </Row>
          }
          </Panel.Body>
        </Panel>
      );
    }
    return (
      <Panel className="gc-panel">
        <Panel.Body>
        <Row>
          <Col md={6}>
            <div>
              <p className="gc-form-heading text-capitalize">
                  Customer Details
              </p>
              <p className="gc-text"><span className="gc-bold">Full name: </span>
                {this.props.booking.user.firstName} {this.props.booking.user.lastName}</p>
              <p className="gc-text"><span className="gc-bold">Mobile number: </span>
                +44 {this.props.booking.user.mobileNumber}</p>
              <p className="gc-text"><span className="gc-bold">Email address: </span> {this.props.booking.user.email}</p>
            </div>
          </Col>
          <hr className="hidden-lg hidden-md" />
          <Col md={6}>
            <div>
              <p className="gc-form-heading">Event details</p>
              <p className="gc-text"><span className="gc-bold">Event date:</span> {moment(this.props.booking.date).format('MMMM Do YYYY')}</p>
              <p className="gc-text"><span className="gc-bold">Address: </span>{this.props.booking.address.line1}, {this.props.booking.address.line2}, {this.props.booking.address.city}, {this.props.booking.address.postcode}</p>
              <p className="gc-text"><span className="gc-bold">Type of event:</span> <span className="text-capitalize">{this.props.booking.eventType}</span></p>
              <p className="gc-text"><span className="gc-bold">Number of guests (approx.):</span> {this.props.booking.numberOfPeople}</p>
              <p className="gc-text"><span className="gc-bold">Budget (approx.):</span> £{this.props.booking.budget || 1500}</p>
            </div>
          </Col>
        </Row>
        {
          this.props.booking.additionalInformation &&
          <Row className="gc-margin-top">
            <Col xs={12}>
              <p className="gc-text gc-bold">Additional Information</p>
              <p className="gc-text gc-dark-grey">
                {this.props.booking.additionalInformation}
              </p>
            </Col>
          </Row>
        }
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
};


BookingItem.propTypes = {
  booking: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    booking: state.user.booking
  };
}

export default connect(mapStateToProps, { getBooking })(BookingItem);
