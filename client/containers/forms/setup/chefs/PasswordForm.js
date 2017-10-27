import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Button } from 'react-bootstrap';
import { updatePassword, getCurrentUser } from '../../../../actions/users';
import renderField from '../../../../components/forms/renderField';

const form = reduxForm({
  form: 'setup-password',
  fields: ['currentPassword', 'newPassword', 'verifyPassword'],
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.currentPassword) {
    errors.currentPassword = 'Please enter your current password';
  }

  if (!formProps.newPassword) {
    errors.newPassword = 'Please enter your new password';
  }

  if (!formProps.verifyPassword || formProps.verifyPassword !== formProps.newPassword) {
    errors.verifyPassword = 'Your passwords do not match. Please enter the same password.';
  }

  return errors;
}

class BasicInfo extends Component {
  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getCurrentUser();
  }

  handleFormSubmit(formProps) {
    this.props.updatePassword(formProps, null);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <label className="gc-text">Current password</label>
        <div>
          <Field
            name="currentPassword"
            placeholder="Current password"
            className="form-control gc-input gc-margin-bottom"
            component={renderField}
            type="password"
          />
        </div>
        <label className="gc-text">New password</label>
        <div>
          <Field
            name="newPassword"
            placeholder="New password"
            className="form-control gc-input gc-margin-bottom"
            component={renderField}
            type="password"
          />
        </div>
        <label className="gc-text">Verify password</label>
        <div>
          <Field
            name="verifyPassword"
            placeholder="Verify password"
            className="form-control gc-input gc-margin-bottom"
            component={renderField}
            type="password"
          />
        </div>
        <Col xs={10} xsOffset={1} sm={4} smOffset={4} >
          <Button block type="submit" className="gc-btn gc-btn--orange gc-margin-top">
            Save
          </Button>
        </Col>
      </form>
    );
  }
}

BasicInfo.propTypes = {
  updatePassword: React.PropTypes.func,
  errorMessage: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error
  };
}

export default connect(mapStateToProps, { updatePassword, getCurrentUser })(form(BasicInfo));
