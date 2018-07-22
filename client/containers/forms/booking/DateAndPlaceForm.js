import React, { Component } from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import renderField from '../../../components/forms/renderField';
import DatePicker from '../../DatePicker';

const form = reduxForm({
  form: 'date-and-place',
  fields: ['address_line_1', 'postcode', 'startTime', 'endTime'],
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.address_line1) {
    errors.address_line1 = 'Please enter street address';
  }

  if (!formProps.postcode) {
    errors.postcode = 'Please enter a postcode';
  }

  if (!formProps.startTime) {
    errors.startTime = 'Please enter your event start time';
  }

  if (!formProps.endTime) {
    errors.endTime = 'Please enter your event end time';
  }
  return errors;
}

class DateAndPlaceForm extends Component {
  constructor(props) {
    super(props);
    const DATE = sessionStorage.eventDetails && moment(JSON.parse(sessionStorage.getItem('eventDetails')).date);
    this.state = { date: DATE || null };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  setDate(date) {
    this.setState({ date });
  }

  handleFormSubmit(formProps) {
    formProps.date = this.state.date;
    sessionStorage.setItem('eventDetails', JSON.stringify(formProps));
    this.props.onSubmit(2);
  }

  render() {
    const { handleSubmit, initialValues } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div>
            <label className="gc-text gc-text--lg gc-text--slim">What date is your event?</label>
            <div className="gc-margin-bottom--lg">
              <DatePicker
                name="date"
                date={this.state.date}
                onChange={this.setDate}
              />
            </div>
            <label className="gc-text gc-text--lg gc-text--slim">What is the expected start and end time?</label>
            <div className="gc-margin-bottom">
              <Row>
                <Col xs={12} sm={6}>
                  <label className="gc-grey gc-text gc-text--slim">Start time</label>
                  <Field
                    name="startTime"
                    placeholder="Start time"
                    component={renderField}
                    type="time"
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <label className="gc-grey gc-text gc-text--slim">End time</label>
                  <Field
                    name="endTime"
                    placeholder="End time"
                    component={renderField}
                    type="time"
                  />
                </Col>
              </Row>
            </div>
            <label className="gc-text gc-text--lg gc-text--slim">What is the address of the venue?</label>
            <div className="gc-margin-bottom">
              <Field
                name="address_line1"
                placeholder="Street address"
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
            <Row>
              <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
                <Button
                  block
                  type="submit"
                  className="gc-btn gc-btn--orange gc-margin-top"
                  onClick={() => this.props.withoutChef && heap.track('Get Quotes - Step 1')}
                >
                  Next
                </Button>
              </Col>
            </Row>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps() {
  const EVENT_DETAILS = sessionStorage.getItem('eventDetails');
  return {
    initialValues: JSON.parse(EVENT_DETAILS)
  };
}

export default (connect(mapStateToProps))(form(DateAndPlaceForm));
