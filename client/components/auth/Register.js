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
    this.props.registerUser(formProps, this.props.redirect);
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
      <Col>
        <Panel className="gc-panel-light gc-center">
          <h4 className="gc-profile-heading-md gc-center">Sign up</h4>
          {this.props.redirect && <Link className="gc-text gc-link-default" to="/chef/register">I&apos;m a caterer </Link>}
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            <Row>
              <Col xs={12} sm={6} smOffset={3}>
                <Field name="email" placeholder="Email" className="form-control gc-input gc-margin-bottom" component={renderField} type="text" />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6} smOffset={3}>
                <Field name="password" placeholder="Password" className="form-control gc-input gc-margin-bottom" component={renderField} type="password" />
              </Col>
            </Row>
            <p className="gc-text gc-center"><Link to="/login">Already have an account? </Link></p>
            <Button type="submit" bsSize="large" className="btn gc-btn gc-btn--orange">Register</Button>
          </form>
        </Panel>
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
