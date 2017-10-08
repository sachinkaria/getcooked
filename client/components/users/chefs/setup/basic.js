import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Row } from 'react-bootstrap';
import { updateUser } from '../../../../actions/users';
import renderField from '../../../forms/renderField';
import renderInputBox from '../../../forms/renderInputBox';
import Wizard from '../../../wizard';
import Steps from './steps.json';

const URL = '/setup-services';

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
    this.props.updateUser(formProps, URL);
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
        <Row>
          <Col sm={11} smOffset={1}>
            <Field
              name="displayName"
              placeholder="Profile name"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="text"
            />
          </Col>
          <Col sm={11} smOffset={1}>
            <Field
              name="companyWebsite"
              placeholder="Company website (not required)"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="string"
            />
          </Col>
          <Col sm={11} smOffset={1}>
            <Field
              name="companyEmail"
              placeholder="Company email"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="string"
            />
          </Col>
          <Col sm={11} smOffset={1}>
            <Field
              name="companyPhoneNumber"
              placeholder="Company phone number"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="number"
            />
          </Col>
          <Col sm={11} smOffset={1}>
            <Field
              name="description"
              placeholder="Description"
              className="form-control gc-input gc-margin-bottom"
              component={renderInputBox}
              type="text"
            />
          </Col>
        </Row>
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
