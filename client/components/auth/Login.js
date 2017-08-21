import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { Col, Panel, Button } from 'react-bootstrap';
import { loginUser } from '../../actions/auth';

const form = reduxForm({
  form: 'login'
});

class Login extends Component {
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <strong>{this.props.errorMessage}</strong>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Col sm={8} smOffset={2} md={4} mdOffset={4}>
        <Panel className="gc-panel-light gc-center">
          <h4 className="gc-profile-heading-md">Get Cooked</h4>
          <br />
          <p className="gc-text gc-center"><Link to="/register">Don't have an account?</Link></p>
          <br />
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <Col sm={8} smOffset={2}>
              <Field placeholder="Email" name="email" className="form-control gc-input gc-margin-bottom" component="input" type="text" />
            </Col>
            <Col sm={8} smOffset={2}>
              <Field placeholder="Password" name="password" className="form-control gc-input gc-margin-bottom--lg" component="input" type="password" />
            </Col>
            <Col sm={8} smOffset={2} className="gc-margin-bottom">
              {this.renderAlert()}
            </Col>
            <Col xs={12} sm={4} smOffset={4}>
              <Button type="submit" block bsSize="large" className="btn gc-btn gc-btn--orange gc-margin-bottom">Login</Button>
              <p className="gc-text">Forgot your password?</p>
            </Col>
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

export default connect(mapStateToProps, { loginUser })(form(Login));
