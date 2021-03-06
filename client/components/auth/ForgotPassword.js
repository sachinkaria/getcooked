import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Panel, Row, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import {forgotPassword} from '../../actions/auth';
import renderField from '../forms/renderField';

const form = reduxForm({
  form: 'forgotPassword',
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  return errors;
}

class ForgotPassword extends Component {
  handleFormSubmit(formProps) {
    this.props.forgotPassword(formProps);
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
    const {handleSubmit} = this.props;

    return (
      <Col sm={8} smOffset={2} md={4} mdOffset={4}>
        <div className="gc-panel-light gc-center">
          <h4 className="gc-profile-heading-md gc-center gc-margin-bottom--lg">Reset your password</h4>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            <div className="gc-margin-bottom--lg">
            </div>
            <Row>
              <Col sm={8} smOffset={2}>
                <label>Enter your email address</label>
                <Field name="email" placeholder="Email" className="form-control gc-input gc-margin-bottom" component={renderField} type="text"/>
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

export default connect(mapStateToProps, {forgotPassword})(form(ForgotPassword));
