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

class BasicInfo extends Component {
  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.updateUser(formProps, Steps.personal.onNext);
  }

  render() {
    const { handleSubmit } = this.props;
    const progress = (Steps.personal.number / (Steps.totalSteps + 1));
    const sideBarHeading = Steps.personal.name;
    const sideBarText = Steps.personal.description;
    const onSkip = Steps.personal.onNext;

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
