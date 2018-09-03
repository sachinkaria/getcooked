import React, { Component } from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import renderField from '../../../components/forms/renderField';
import renderInputBox from '../../../components/forms/renderInputBox';

const form = reduxForm({
  form: 'budget-additional-information',
  fields: ['numberOfPeople', 'budget', 'additionalInformation'],
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
  
  if (!formProps.numberOfPeople) {
    errors.numberOfPeople = 'Please enter the amount of people you are expecting';
  }

  if (!formProps.budget) {
    errors.budget = 'Please enter your budget';
  }

  if (PER_HEAD_BUDGET < 10) {
    errors.budget = 'The minimum budgets our caterers and chefs cover begin at £10 per person. Please update your budget.';
  }

  if (formProps.budget < 200) {
    errors.budget = 'The minimum budgets our caterers and chefs cover begin at £200';
  }
  return errors;
}

class DateAndPlaceForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    const EVENT = JSON.parse(sessionStorage.getItem('eventDetails'));
    const FINAL_EVENT = _.extend(EVENT, formProps);
    sessionStorage.setItem('eventDetails', JSON.stringify(FINAL_EVENT));
    this.props.onSubmit(6);
  }

  render() {
    const { handleSubmit, initialValues } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div>
            <label className="gc-text gc-text--lg gc-text--slim">Approximately many guests are you expecting?</label>
            <div className="gc-margin-bottom">
              <Field
                name="numberOfPeople"
                placeholder="e.g. 200"
                className="form-control gc-input gc-margin-bottom"
                component={renderField}
                type="number"
              />
            </div>
            <label className="gc-text gc-text--lg gc-text--slim">What is estimated budget for the entire event? (incl. staff, equipment & food)</label>
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
            <label className="gc-text gc-text--lg gc-text--slim">Do you have any additional information that you would like to provide us with?</label>
            <div className="gc-margin-bottom">
              <Field
                name="additionalInformation"
                placeholder="Let us know if there's anything else! Are there any special requirements? What's the best way to contact you? "
                className="form-control gc-input gc-margin-bottom"
                component={renderInputBox}
                type="text"
              />
            </div>
            <Row>
              <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
                <Button
                  block
                  type="submit"
                  className="gc-btn gc-btn--orange gc-margin-top"
                  onClick={() => this.props.withoutChef && heap.track('Get Quotes - Step 5')}
                >
                  Next
                </Button>
                <Button
                  block
                  className="gc-btn gc-btn-white gc-margin-top"
                  onClick={() => this.props.onSubmit(4)}
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

export default (connect(mapStateToProps))(form(DateAndPlaceForm));
