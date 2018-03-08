import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { Col, Panel, Row, Button } from 'react-bootstrap';
import { registerChef } from '../../../actions/auth';
import renderField from '../../forms/renderField';

const form = reduxForm({
  form: 'register',
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.verifyPassword || formProps.verifyPassword !== formProps.password) {
    errors.verifyPassword = 'Your passwords do not match. Please enter the same password.';
  }

  return errors;
}

class RegisterChef extends Component {
  handleFormSubmit(formProps) {
    this.props.registerChef(formProps);
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
      <Row>
        <Col sm={8} smOffset={2} md={4} mdOffset={4}>
          <div>
            <h4 className="gc-profile-heading-md gc-center gc-margin-bottom--lg">Sign up</h4>
            <form className="gc-center" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              {this.renderAlert()}
              <Row>
                <Col xs={12} sm={8} smOffset={2}>
                  <Field
                    name="email"
                    placeholder="Email"
                    className="form-control gc-input gc-margin-bottom"
                    component={renderField}
                    type="email"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={8} smOffset={2}>
                  <Field
                    name="password"
                    placeholder="Password"
                    className="form-control gc-input gc-margin-bottom"
                    component={renderField}
                    type="password"
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={8} smOffset={2}>
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
              <Row className="gc-margin-bottom--lg">
                <Col>
                  <Link className="gc-text gc-bold" to="/login">Already have an account? </Link>
                </Col>
              </Row>
              <Button onClick={() => heap.track('Sign Up', { role: 'caterer' })} type="submit" bsSize="large" className="btn gc-btn gc-btn--orange">Register</Button>
            </form>
          </div>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
}

export default connect(mapStateToProps, { registerChef })(form(RegisterChef));
