import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { Col, Row, Button } from 'react-bootstrap';
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
      <Row>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Get Cooked | Login</title>
          <link rel="canonical" href="https://www.getcooked.co/login" />
        </Helmet>
        <Col sm={8} smOffset={2} md={4} mdOffset={4}>
          <div className="gc-center">
            <h1 className="gc-profile-heading-md gc-margin-bottom--lg">Login</h1>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Row>
                <Col sm={8} smOffset={2}>
                  <Field placeholder="Email" name="email" className="form-control gc-input gc-margin-bottom" component="input" type="email" />
                </Col>
              </Row>
              <Row>
                <Col sm={8} smOffset={2}>
                  <Field placeholder="Password" name="password" className="form-control gc-input gc-margin-bottom--lg" component="input" type="password" />
                </Col>
              </Row>
              <Row>
                <Col sm={8} smOffset={2}>
                  {this.renderAlert()}
                </Col>
              </Row>
              <Row className="gc-margin-bottom--lg">
                <Col>
                  <Link className="gc-text gc-bold" to="/caterers/register">Don&apos;t have an account?</Link>
                  <br />
                  <Link className="gc-text gc-bold" to="/forgot">Forgot your password?</Link>
                </Col>
              </Row>
              <Row>
                <Col sm={4} smOffset={4}>
                  <Button onClick={() => heap.track('Sign In')} type="submit" block bsSize="large" className="btn gc-btn gc-btn--orange gc-margin-bottom">Login</Button>
                </Col>
              </Row>
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

export default connect(mapStateToProps, { loginUser })(form(Login));
