import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import renderInputBox from '../../components/forms/renderInputBox';

const form = reduxForm({
  form: 'accept-booking-form',
  fields: ['message'],
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.message) {
    errors.message = 'Please enter a message';
  }
  return errors;
}

class AcceptBookingForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.onSubmit(formProps.message);
    this.props.closeModal();
  }

  render() {
    const { handleSubmit, initialValues } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div>
            <label className="gc-text gc-text--lg gc-text--slim">Message</label>
            <div className="gc-margin-bottom">
              <Field
                name="message"
                placeholder="Introduce yourself and find out a little bit more about your client."
                className="form-control gc-input gc-margin-bottom"
                component={renderInputBox}
                type="text"
              />
            </div>
            <Row>
              <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
                <Button
                  block
                  type="submit"
                  className="gc-btn gc-btn--orange gc-margin-top"
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default (connect(mapStateToProps))(form(AcceptBookingForm));
