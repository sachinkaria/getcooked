import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Row, Button} from 'react-bootstrap';
import {resetPassword} from '../../actions/auth';
import renderField from '../forms/renderField';

const form = reduxForm({
  form: 'resetPassword',
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.verifyPassword || formProps.verifyPassword !== formProps.password) {
    errors.verifyPassword = 'Your passwords do not match. Please enter the same password.';
  }

  return errors;
}

class ResetPassword extends Component {
  handleFormSubmit(formProps) {
    this.props.resetPassword(formProps, this.props.params.token);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Col sm={8} smOffset={2} md={4} mdOffset={4}>
        <div className="gc-panel-light gc-center">
          <h4 className="gc-profile-heading-md gc-center gc-margin-bottom--lg">Enter a new password</h4>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            <div className="gc-margin-bottom--lg">
            </div>
            <Row>
              <Col sm={8} smOffset={2}>
                <Field
                  name="password"
                  placeholder="Password"
                  className="form-control gc-input"
                  component={renderField}
                  type="password"
                />
              </Col>
            </Row>
            <Row>
              <Col sm={8} smOffset={2}>
                <div>
                  <Field
                    name="verifyPassword"
                    placeholder="Confirm password"
                    className="form-control gc-input gc-margin-bottom"
                    component={renderField}
                    type="password"
                  />
                </div>
              </Col>
            </Row>
            <Button type="submit" bsSize="large" className="btn gc-btn gc-btn--orange gc-margin-top">Submit</Button>
          </form>
        </div>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, {resetPassword})(form(ResetPassword));
