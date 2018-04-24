import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Button } from 'react-bootstrap';
import renderField from '../../../components/forms/renderField';
import CODES from '../../../utils/country-codes.json';

const form = reduxForm({
  form: 'contact-details',
  fields: ['firstName', 'lastName', 'email', 'mobileNumber', 'phoneCode'],
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
    errors.mobileNumber = 'Please enter your mobile number';
  }
  
  return errors;
}

class ContactDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    const PHONE_CODE = formProps.phoneCode;

    formProps.phoneCode = CODES.filter((item) => {
      return item.name === PHONE_CODE;
    })[0];

    localStorage.setItem('contactDetails', JSON.stringify(formProps));
    this.props.onSubmit();
  }

  render() {
    const { handleSubmit, initialValues } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <label className="gc-text">First name</label>
          <div>
            <Field
              name="firstName"
              placeholder="e.g. John"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="text"
            />
          </div>
          <label className="gc-text">Last name</label>
          <div>
            <Field
              name="lastName"
              placeholder="e.g. Smith"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="text"
            />
          </div>
          <label className="gc-text">Email</label>
          <div>
            <Field
              name="email"
              placeholder="e.g. hello@johnsmith.com"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="text"
            />
          </div>
          <label className="gc-text">Mobile number</label>
          <div>
            <Field
              name="phoneCode"
              className="form-control gc-input"
              component="select"
            >
              {CODES.map(code =>
                (
                  <option key={code.name} value={code.name}>
                    {code.name}
                  </option>
                )
              )}
            </Field>
          </div>
          <div>
            <Field
              name="mobileNumber"
              placeholder="e.g. 07912345678"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="number"
            />
          </div>
          <Col xs={10} xsOffset={1} sm={4} smOffset={4} >
            <Button block type="submit" className="gc-btn gc-btn--orange gc-margin-top">
              Next
            </Button>
          </Col>
        </form>
      </div>
    );
  }
}

function mapStateToProps() {
  const CONTACT_DETAILS = localStorage.getItem('contactDetails');
  return {
    initialValues: JSON.parse(CONTACT_DETAILS)
  };
}

export default (connect(mapStateToProps))(form(ContactDetailsForm));
