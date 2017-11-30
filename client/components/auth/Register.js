import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Panel, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { registerUser } from '../../actions/auth';
import renderField from '../forms/renderField';

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

  return errors;
}

class Register extends Component {
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps, this.props.route && this.props.route.redirect);
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
    const redirect = this.props.route && this.props.route.redirect;

    return (
      <Col sm={redirect ? 6 : 12} smOffset={redirect ? 3 : 0}>
        <div className="gc-panel-light gc-center">
          {redirect && <h4 className="gc-profile-heading-md gc-center gc-margin-bottom--lg">Sign up</h4>}
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            <div className="gc-margin-bottom--lg">
              {redirect && <Link className="gc-text gc-bold" to="/chef/register">Are you a caterer? <span className="gc-orange">Sign up as a caterer</span> </Link>}
            </div>
            <Row>
              <Col sm={redirect ? 6 : 12} smOffset={redirect ? 3 : 0}>
                <Field name="email" placeholder="Email" className="form-control gc-input gc-margin-bottom" component={renderField} type="text" />
              </Col>
            </Row>
            <Row>
              <Col sm={redirect ? 6 : 12} smOffset={redirect ? 3 : 0}>
                <Field name="password" placeholder="Password" className="form-control gc-input" component={renderField} type="password" />
              </Col>
            </Row>
            <Link className="gc-text gc-bold" to="/login">Already have an account? </Link>
            <br />
            <Button type="submit" bsSize="large" className="btn gc-btn gc-btn--orange gc-margin-top">{redirect ? 'Sign Up' : 'Continue'}</Button>
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

export default connect(mapStateToProps, { registerUser })(form(Register));
