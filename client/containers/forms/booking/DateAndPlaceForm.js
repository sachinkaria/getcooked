import React, { Component } from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import renderField from '../../../components/forms/renderField';
import DatePicker from '../../DatePicker';

const form = reduxForm({
  form: 'date-and-place',
  fields: ['address_line_1', 'postcode'],
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
            <label className="gc-text">Event Date</label>
            <div>
              <DatePicker
                name="date"
                date={this.state.date}
                onChange={this.setDate} />
            </div>
            <label className="gc-text gc-dark-grey">Event Address</label>
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
