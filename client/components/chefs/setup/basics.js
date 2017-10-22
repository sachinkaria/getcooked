import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Row } from 'react-bootstrap';
import { updateUser } from '../../../actions/users';
import renderField from '../../forms/renderField';
import renderInputBox from '../../forms/renderInputBox';
import Wizard from '../../Wizard';
import Steps from './steps.json';

const form = reduxForm({
  form: 'setup-basic',
  fields: ['displayName', 'companyWebsite', 'companyEmail', 'companyPhoneNumber', 'description'],
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.displayName) {
    errors.displayName = 'Please enter your display name';
  }

  if (!formProps.companyWebsite) {
    errors.companyWebsite = 'Please enter your professional website';
  }

  if (!formProps.companyEmail) {
    errors.companyEmail = 'Please enter your professional email';
  }

  if (!formProps.companyPhoneNumber) {
    errors.companyPhoneNumber = 'Please enter your professional phone number';
  }

  if (!formProps.description) {
    errors.description = 'Please enter your description';
  }

  return errors;
}

class BasicInfo extends Component {
  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.updateUser(formProps, Steps.basic.onNext);
  }

  render() {
    const { handleSubmit } = this.props;
    const progress = (Steps.basic.number / (Steps.totalSteps + 1));
    const sideBarHeading = Steps.basic.name;
    const sideBarText = Steps.basic.description;
    const onSkip = Steps.basic.onNext;
    const onBack = Steps.basic.onBack;

    return (
      <Wizard
        onSubmit={handleSubmit(this.handleFormSubmit)}
        progress={progress}
        sideBarHeading={sideBarHeading}
        sideBarText={sideBarText}
        onSkip={onSkip}
        onBack={onBack}
        errorMessage={this.props.errorMessage}
      >
        <div>
          <label className="gc-text">Display name</label>
          <div>
            <Field
              name="displayName"
              placeholder="e.g. Catering Co."
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="text"
            />
          </div>
          <label className="gc-text">Professional website</label>
          <div>
            <Field
              name="companyWebsite"
              placeholder="e.g. www.mycateringcompany.com"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="string"
            />
          </div>
          <label className="gc-text">Professional email</label>
          <div>
            <Field
              name="companyEmail"
              placeholder="e.g. hello@cateringco.com"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="string"
            />
          </div>
          <label className="gc-text">Professional contact number</label>
          <div>
            <Field
              name="companyPhoneNumber"
              placeholder="e.g. 0201234567"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="number"
            />
          </div>
          <label className="gc-text">Description</label>
          <div>
            <Field
              name="description"
              placeholder="Write something about your company"
              className="form-control gc-input gc-margin-bottom"
              component={renderInputBox}
              type="text"
            />
          </div>
        </div>
      </Wizard>
    );
  }
}

BasicInfo.propTypes = {
  updateUser: React.PropTypes.func,
  errorMessage: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    initialValues: state.user.data
  };
}

export default connect(mapStateToProps, { updateUser })(form(BasicInfo));
