import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { updateUser, getCurrentUser } from '../../../../actions/users';
import renderField from '../../../../components/forms/renderField';

const form = reduxForm({
  form: 'setup-personal',
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
    this.props.updateUser(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

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
            name="mobileNumber"
            placeholder="e.g. 07912345678"
            className="form-control gc-input gc-margin-bottom"
            component={renderField}
            type="number"
          />
        </div>
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
