import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import renderInputBox from '../../components/forms/renderInputBox';

const form = reduxForm({
  form: 'message-input-form',
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

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.onSubmit(formProps.message);
  }

  render() {
    const { handleSubmit, initialValues } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div>
            <div className="gc-margin-bottom">
              <Field
                name="message"
                placeholder="Send a message..."
                component={renderInputBox}
                type="text"
                rows={3}
              />
            </div>
            <Button
              block
              type="submit"
              className="gc-btn gc-btn--orange gc-inline-block gc-center pull-right gc-margin-bottom"
              style={{ maxWidth: '150px' }}
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default (connect(mapStateToProps))(form(MessageInput));
