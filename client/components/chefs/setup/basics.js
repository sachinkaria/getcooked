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
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.displayName) {
    errors.displayName = 'Please enter a display name';
  }

  if (!formProps.description) {
    errors.description = 'Please enter a description';
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
          <label className="gc-text">Company website</label>
          <div>
            <Field
              name="companyWebsite"
              placeholder="e.g. www.mycateringcompany.com"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="string"
            />
          </div>
          <label className="gc-text">Company email</label>
          <div>
            <Field
              name="companyEmail"
              placeholder="e.g. hello@cateringco.com"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="string"
            />
          </div>
          <label className="gc-text">Company contact number</label>
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
              placeholder="Write something about your company.s"
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
