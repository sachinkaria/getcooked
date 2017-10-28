import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Row } from 'react-bootstrap';
import { updateUser } from '../../../actions/users';
import renderField from '../../forms/renderField';
import Wizard from '../../Wizard';
import Steps from './steps.json';

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

class BasicInfo extends Component {
  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    const DASHBOARD = '/dashboard/account/settings';
    this.props.updateUser(formProps, this.props.initialValues && this.props.initialValues.role === 'chef' ? Steps.personal.onNext : DASHBOARD);
  }

  render() {
    const DASHBOARD = '/dashboard/account/settings';
    const { handleSubmit } = this.props;
    const { initialValues } = this.props;
    const progress = (Steps.personal.number / (Steps.totalSteps + 1));
    const sideBarHeading = Steps.personal.name;
    const sideBarText = Steps.personal.description;
    const onSkip = initialValues && initialValues.role === 'chef' ? Steps.personal.onNext : DASHBOARD;

    return (
      <Wizard
        onSubmit={handleSubmit(this.handleFormSubmit)}
        progress={progress}
        sideBarHeading={sideBarHeading}
        sideBarText={sideBarText}
        onSkip={onSkip}
        errorMessage={this.props.errorMessage}
      >
        <div>
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
        </div>
      </Wizard>
    );
  }
}

BasicInfo.propTypes = {
  updateUser: React.PropTypes.func,
  errorMessage: React.PropTypes.string,
  initialValues: React.PropTypes.shape({ role: '' })
};

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    initialValues: state.user.data
  };
}

export default connect(mapStateToProps, { updateUser })(form(BasicInfo));
