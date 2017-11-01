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
      <Col sm={8} smOffset={2} md={4} mdOffset={4}>
        <Panel className="gc-panel-light">
          <h4 className="gc-profile-heading-md gc-center">Sign up</h4>
          <br />
          <form className="gc-center" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            <Row>
              <Col xs={12} sm={8} smOffset={2}>
                <Field
                  name="email"
                  placeholder="Email"
                  className="form-control gc-input gc-margin-bottom"
                  component={renderField}
                  type="text"
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

export default connect(mapStateToProps, { registerChef })(form(RegisterChef));
