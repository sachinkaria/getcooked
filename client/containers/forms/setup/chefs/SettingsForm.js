import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Row, Button } from 'react-bootstrap';
import { updateUser, getCurrentUser } from '../../../../actions/users';
import renderField from '../../../../components/forms/renderField';
import CODES from '../../../../utils/country-codes.json';

const form = reduxForm({
  form: 'setup-personal',
  fields: ['firstName', 'lastName', 'email', 'mobileNumber'],
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

class SettingsForm extends Component {
  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getCurrentUser();
  }

  handleFormSubmit(formProps) {
    const PHONE_CODE = formProps.phoneCode;

    formProps.phoneCode = CODES.filter((item) => {
      return item.name === PHONE_CODE;
    })[0];

    this.props.updateUser(formProps, null, true);
  }

  render() {
    const { handleSubmit } = this.props;
    const { initialValues } = this.props;
    if (initialValues && initialValues.phoneCode.name) initialValues.phoneCode = initialValues.phoneCode.name;
    console.log(initialValues);
    return (
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
            Save
          </Button>
        </Col>
      </form>
    );
  }
}

SettingsForm.propTypes = {
  updateUser: React.PropTypes.func,
  errorMessage: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    initialValues: state.user.data
  };
}

export default connect(mapStateToProps, { updateUser, getCurrentUser })(form(SettingsForm));
