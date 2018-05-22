import React, { Component } from 'react';
import _ from 'lodash';
import { Row, Col, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import renderField from '../../../components/forms/renderField';
import { EVENT_TYPE } from '../../../utils/data';

const form = reduxForm({
  form: 'eventType-and-guests',
  fields: ['event_type', 'budget', 'numberOfGuests'],
  validate
});

function validate(formProps, props) {
  const { chef } = props;
  const PER_HEAD_BUDGET = parseInt(formProps.budget / formProps.numberOfPeople).toFixed(2);
  const errors = {};

  if (chef && chef.minimumPerHeadBudget && (PER_HEAD_BUDGET < chef.minimumPerHeadBudget)) {
    errors.budget = `Your budget does not meet the minimum amount (£${chef.minimumPerHeadBudget}/ per person) required to book this caterer.`;
  }

  if (chef && chef.minimumTotalBudget && (formProps.budget < chef.minimumTotalBudget)) {
    errors.budget = `Your budget of does not meet the minimum amount (£${chef.minimumTotalBudget}) required to book this caterer.`;
  }

  if (formProps.eventType === 'select') {
    errors.eventType = 'Please select an event type';
  }

  if (!formProps.numberOfPeople) {
    errors.numberOfPeople = 'Please enter the approximate number of people';
  }

  if (!formProps.budget) {
    errors.budget = 'Please enter your budget';
  }
  return errors;
}

class EventTypeGuestsAndBudgetForm extends Component {
  constructor(props) {
    super(props);
    this.state = { date: null };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  setDate(date) {
    this.setState({ date });
  }

  handleFormSubmit(formProps) {
    const EVENT = JSON.parse(sessionStorage.getItem('eventDetails'));
    const FINAL_EVENT = _.extend(EVENT, formProps);
    sessionStorage.setItem('eventDetails', JSON.stringify(FINAL_EVENT));
    this.props.onSubmit(3);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div>
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
            <div className="gc-margin-bottom">
              <Field
                name="numberOfPeople"
                placeholder="e.g. 200"
                className="form-control gc-input gc-margin-bottom"
                component={renderField}
                type="number"
              />
            </div>
            <label className="gc-text">Estimated Budget</label>
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
            <Row>
              <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
                <Button
                  block
                  type="submit"
                  className="gc-btn gc-btn--orange gc-margin-top"
                  onClick={() => this.props.withoutChef && heap.track('Get Quotes - Step 2')}
                >
                  Next
                </Button>
                <Button
                  block
                  className="gc-btn gc-btn-white gc-margin-top"
                  onClick={() => this.props.onSubmit(1)}
                >
                  Back
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

export default (connect(mapStateToProps))(form(EventTypeGuestsAndBudgetForm));
