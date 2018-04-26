import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, Row } from 'react-bootstrap';
import DatePicker from './DatePicker';
import { EVENT_TYPE, EVENT_SERVICES, CUISINES } from '../utils/data';
import ContactDetailsForm from '../containers/forms/booking/ContactDetailsForm';
import renderField from '../components/forms/renderField';
import renderInputBox from '../components/forms/renderInputBox';
import renderCheckbox from '../components/forms/renderCheckbox';
import { createBooking } from '../actions/bookings';

const form = reduxForm({
  form: 'booking',
  fields: ['date', 'eventType', 'address_line1', 'address_line2', 'city', 'postcode', 'numberOfPeople', 'budget', 'additionalInformation', 'services', 'cuisines'],
  validate
});

function validate(formProps, props) {
  const errors = {};
  const { chef } = props;

  const PER_HEAD_BUDGET = parseInt(formProps.budget / formProps.numberOfPeople).toFixed(2);

  if (chef && chef.minimumPerHeadBudget && (PER_HEAD_BUDGET < chef.minimumPerHeadBudget)) {
    errors.budget = `Your budget does not meet the minimum amount (£${chef.minimumPerHeadBudget}/ per person) required to book this caterer.`;
  }

  if (chef && chef.minimumTotalBudget && (formProps.budget < chef.minimumTotalBudget)) {
    errors.budget = `Your budget of does not meet the minimum amount (£${chef.minimumTotalBudget}) required to book this caterer.`;
  }

  if (formProps.eventType === 'select') {
    errors.eventType = 'Please select an event type';
  }

  if (!formProps.address_line2) {
    errors.address_line2 = 'Please enter address street';
  }

  if (!formProps.city) {
    errors.city = 'Please enter a address city';
  }

  if (!formProps.postcode) {
    errors.postcode = 'Please enter a postcode';
  }

  if (!formProps.numberOfPeople) {
    errors.numberOfPeople = 'Please enter the approximate number of people';
  }

  if (!formProps.budget) {
    errors.budget = 'Please enter your budget';
  }

  return errors;
}

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, services: [], foodServices: [], hideEventForm: false };
    this.baseState = this.state;

    this.resetForm = this.resetForm.bind(this);
    this.setDate = this.setDate.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.submitEventDetails = this.submitEventDetails.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  componentWillReceiveProps() {
    if (this.props.user.sent_booking_request) {
      this.hideModal();
    }
  }

  onClick() {
    if (!this.props.withoutChef) {
      heap.track('Click Book Now', { chef_id: this.props.chef.id, chef_name: this.props.chef.displayName });
    } else {
      heap.track('Click Get Quotes');
    }
  }

  setDate(date) {
    this.setState({ date });
  }

  resetForm() {
    this.setState(this.baseState);
  }

  handleFormSubmit(formProps) {
    formProps.chef = (!this.props.withoutChef && this.props.chef) && this.props.chef._id;
    formProps.date = this.state.date;
    formProps.services = this.state.services;
    formProps.foodServices = this.state.foodServices;
    sessionStorage.setItem('eventDetails', JSON.stringify(formProps));
    this.setState({
      hideEventForm: true
    }, () => {
      window.scrollTo(0, 0);
    });
  }

  handler(event, category) {
    if (event.target.checked) {
      this.state[category] = this.state[category].concat(event.target.name);
      this.setState(this.state);
    } else {
      this.state[category] = _.pull(this.state[category], (event.target.name));
      this.setState(this.state);
    }
  }

  isChecked(item, state) {
    return state && state.indexOf(item) > -1;
  }

  submitEventDetails(event) {
    this.props.onSubmit(event, this.props.endRoute);
    this.props.closeModal();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        {
          (this.state.hideEventForm) &&
          <ContactDetailsForm
            withoutChef={this.props.withoutChef}
            chef={this.props.chef}
            onSubmit={this.submitEventDetails}
          />
        }
        {!this.state.hideEventForm &&
        <Row>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <label className="gc-text">Event Date</label>
            <div>
              <DatePicker name="date" onChange={this.setDate} />
            </div>
            <label className="gc-text gc-dark-grey">Event Address</label>
            <div className="gc-margin-bottom">
              <Field
                name="address_line1"
                placeholder="Name or Number"
                component={renderField}
                type="text"
              />
            </div>
            <div className="gc-margin-bottom">
              <Field
                name="address_line2"
                placeholder="Street name"
                component={renderField}
                type="text"
              />
            </div>
            <div className="gc-margin-bottom">
              <Field
                name="city"
                placeholder="City"
                component={renderField}
                type="text"
              />
            </div>
            <div className="gc-margin-bottom">
              <Field
                name="postcode"
                placeholder="Postcode"
                component={renderField}
                type="text"
              />
            </div>
            <label className="gc-text">Event Type</label>
            <div className="gc-margin-bottom">
              <Field
                name="eventType"
                className="form-control gc-input text-capitalize"
                component="select"
              >
                {EVENT_TYPE.map(code =>
                  (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  )
                )}
              </Field>
            </div>
            <label className="gc-text">Number of Guests (approx.)</label>
            <Row>
              <Col sm={6}>
                <div className="gc-margin-bottom">
                  <Field
                    name="numberOfPeople"
                    placeholder="e.g. 200"
                    className="form-control gc-input gc-margin-bottom"
                    component={renderField}
                    type="number"
                  />
                </div>
              </Col>
            </Row>
            <label className="gc-text">Estimated Budget</label>
            <Row>
              <Col sm={6}>
                <div className="gc-margin-bottom">
                  <Field
                    addonText="£"
                    withAddon
                    name="budget"
                    placeholder="e.g. 1500"
                    className="form-control gc-input gc-margin-bottom"
                    component={renderField}
                    type="number"
                  />
                </div>
              </Col>
            </Row>
            <label className="gc-text">Services Required</label>
            <Row className="gc-margin-bottom">
              {
                EVENT_SERVICES.map(item => (
                  <Col xs={6} key={item}>
                    <Field
                      checked={this.isChecked(item, this.state.services)}
                      name={item}
                      type="checkbox"
                      component={renderCheckbox}
                      onChange={e => this.handler(e, 'services')}
                    />
                  </Col>
                ))
              }
            </Row>
            <label className="gc-text">Type of Food</label>
            <Row className="gc-margin-bottom">
              {
                CUISINES.map(item => (
                  <Col xs={6} key={item}>
                    <Field
                      checked={this.isChecked(item, this.state.foodServices)}
                      name={item}
                      type="checkbox"
                      component={renderCheckbox}
                      onChange={e => this.handler(e, 'foodServices')}
                    />
                  </Col>
                ))
              }
            </Row>
            <label className="gc-text">Additional Information</label>
            <div className="gc-margin-bottom">
              <Field
                name="additionalInformation"
                placeholder="Please give any extra details about your event and any special requirements you might have."
                className="form-control gc-input gc-margin-bottom"
                component={renderInputBox}
                type="text"
              />
            </div>
            <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
              <Button
                block
                type="submit"
                className="gc-btn gc-btn--orange gc-margin-top"
              >
                Next
              </Button>
            </Col>
          </form>
        </Row>
        }
      </div>
    );
  }
}

BookingForm.PropTypes = {
  action: String.isRequired,
  withoutChef: Boolean,
  endRoute: String
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user,
    chef: state.public.chef && state.public.chef.profile
  };
}

export default connect(mapStateToProps, { createBooking })(form(BookingForm));
