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
  form: 'setup-basics',
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.displayName) {
    errors.firstName = 'Please enter a display name';
  }

  if (!formProps.description) {
    errors.lastName = 'Please enter a description';
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
    const progress = (Steps.basics.number / (Steps.totalSteps + 1));
    const sideBarHeading = Steps.basics.name;
    const sideBarText = Steps.basics.description;
    const onSkip = Steps.basics.onNext;

    return (
      <Wizard
        onSubmit={handleSubmit(this.handleFormSubmit)}
        progress={progress}
        sideBarHeading={sideBarHeading}
        sideBarText={sideBarText}
        onSkip={onSkip}
        errorMessage={this.props.errorMessage}
      >
        <Row>
          <Col sm={11} smOffset={1}>
            <Field
              name="firstName"
              placeholder="First name"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="text"
            />
          </Col>
          <Col sm={11} smOffset={1}>
            <Field
              name="lastName"
              placeholder="Last name"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="text"
            />
          </Col>
          <Col sm={11} smOffset={1}>
            <Field
              name="email"
              placeholder="Email"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="text"
            />
          </Col>
          <Col sm={11} smOffset={1}>
            <Field
              name="mobileNumber"
              placeholder="Mobile number"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="number"
            />
          </Col>
          <Col sm={11} smOffset={1}>
            <Field
              name="displayName"
              placeholder="Display name"
              className="form-control gc-input gc-margin-bottom"
              component={renderField}
              type="text"
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
