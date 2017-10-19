import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Button } from 'react-bootstrap';
import { updateUser, getCurrentUser } from '../../../../actions/users';
import renderField from '../../../../components/forms/renderField';
import renderInputBox from '../../../../components/forms/renderInputBox';

const form = reduxForm({
  form: 'setup-basic',
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.displayName) {
    errors.displayName = 'Please enter a display name';
  }

  if (!formProps.description) {
    errors.description = 'Please enter a description';
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
    this.props.updateUser(formProps, null);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <label className="gc-text">Display name</label>
        <div>
          <Field
            name="displayName"
            placeholder="Profile name"
            className="form-control gc-input gc-margin-bottom"
            component={renderField}
            type="text"
          />
        </div>
        <label className="gc-text">Company website</label>
        <div>
          <Field
            name="companyWebsite"
            placeholder="Company website (not required)"
            className="form-control gc-input gc-margin-bottom"
            component={renderField}
            type="string"
          />
        </div>
        <label className="gc-text">Company email</label>
        <div>
          <Field
            name="companyEmail"
            placeholder="Company email"
            className="form-control gc-input gc-margin-bottom"
            component={renderField}
            type="string"
          />
        </div>
        <label className="gc-text">Company phone number</label>
        <div>
          <Field
            name="companyPhoneNumber"
            placeholder="Company phone number"
            className="form-control gc-input gc-margin-bottom"
            component={renderField}
            type="number"
          />
        </div>
        <label className="gc-text">Description</label>
        <div>
          <Field
            name="description"
            placeholder="Description"
            className="form-control gc-input gc-margin-bottom"
            component={renderInputBox}
            type="text"
          />
        </div>
        <Col sm={4} smOffset={4} >
          <Button block type="submit" className="gc-btn gc-btn--orange gc-margin-top">
            Save
          </Button>
        </Col>
      </form>
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

export default connect(mapStateToProps, { updateUser, getCurrentUser })(form(BasicInfo));
