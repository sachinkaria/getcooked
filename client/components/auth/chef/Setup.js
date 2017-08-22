import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { Col, Panel, Row, Button } from 'react-bootstrap';
import { updateUser } from '../../../actions/users';

const form = reduxForm({
  form: 'register',
  validate
});

const renderField = field => (
  <div>
    <input className="form-control gc-input gc-margin-bottom" placeholder={field.placeholder} {...field.input} />
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.displayName = 'Please enter a display name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a description';
  }

  return errors;
}

class BasicInfo extends Component {
  handleFormSubmit(formProps) {
    this.props.updateUser(formProps);
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
          <h4 className="gc-profile-heading-md gc-center">Basic details</h4>
          <br />
          <form className="gc-center" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {this.renderAlert()}
            <Row>
              <Col xs={12} sm={6} smOffset={3}>
                <Field name="displayName" placeholder="Display name" className="form-control gc-input gc-margin-bottom" component={renderField} type="text" />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6} smOffset={3}>
                <Field name="description" placeholder="Description" className="form-control gc-input gc-margin-bottom" component={renderField} type="text" />
              </Col>
            </Row>
            <Button type="submit" bsSize="large" className="btn gc-btn gc-btn--orange">Next</Button>
            <Link to="/setup-photos">Skip</Link>
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

export default connect(mapStateToProps, { updateUser })(form(BasicInfo));
