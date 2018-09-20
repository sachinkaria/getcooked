import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Button } from 'react-bootstrap';
import renderField from '../../../components/forms/renderField';
import CODES from '../../../utils/country-codes.json';

const form = reduxForm({
  form: 'contact-details',
  fields: ['firstName', 'lastName', 'email', 'mobileNumber', 'password', 'confirmPassword'],
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter your first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter your last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter your email address';
  }

  if (!formProps.mobileNumber) {
    errors.email = 'Please enter your email address';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.confirmPassword || (formProps.confirmPassword !== formProps.password)) {
    errors.confirmPassword = 'Your passwords do not match';
  }

  return errors;
}

class ContactDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    const phoneCode = {
        name : 'United Kingdom',
        dialCode: 44,
        code: 'GB'
    };

    this.props.onSubmit({
      firstName: formProps.firstName,
      lastName: formProps.lastName,
      email: formProps.email,
      password: formProps.password,
      mobileNumber: formProps.mobileNumber,
      phoneCode
    });
  }

  render() {
    const { handleSubmit, initialValues } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <label className="gc-text gc-text--lg gc-text--slim">First name</label>
          <div>
            <Field
              name="firstName"
              placeholder="e.g. John"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="text"
            />
          </div>
          <label className="gc-text gc-text--lg gc-text--slim">Last name</label>
          <div>
            <Field
              name="lastName"
              placeholder="e.g. Smith"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="text"
            />
          </div>
          <label className="gc-text gc-text--lg gc-text--slim">Email</label>
          <div>
            <Field
              name="email"
              placeholder="e.g. hello@johnsmith.com"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="text"
            />
          </div>
          <label className="gc-text gc-text--lg gc-text--slim">Mobile Number</label>
          <div>
            <Field
              name="mobileNumber"
              placeholder="e.g. 07123456789"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="number"
            />
          </div>
          <label className="gc-text gc-text--lg gc-text--slim">Password</label>
          <div>
            <Field
              name="password"
              placeholder="Password"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="password"
            />
          </div>
          <label className="gc-text gc-text--lg gc-text--slim">Confirm Password</label>
          <div>
            <Field
              name="confirmPassword"
              placeholder="Confirm Password"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="password"
            />
          </div>
          <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
            <Button
              onClick={ () => this.props.withoutChef ? heap.track('Submit Event') : heap.track('Submit Booking', { chef_id: this.props.chef.id, chef_name: this.props.chef.displayName }) }
              block
              type="submit"
              className="gc-btn gc-btn--orange gc-margin-top">
              Get Quotes
            </Button>
          </Col>
        </form>
      </div>
    );
  }
}

function mapStateToProps() {
  const CONTACT_DETAILS = sessionStorage.getItem('contactDetails');
  return {
    initialValues: JSON.parse(CONTACT_DETAILS)
  };
}

export default (connect(mapStateToProps))(form(ContactDetailsForm));
