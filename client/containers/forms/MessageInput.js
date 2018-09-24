import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Field, reduxForm, reset } from 'redux-form';
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
    this.state = {
      attachment: true,
      data_uri: '',
      filename: '',
      filetype: ''
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onPDFUpload = this.onPDFUpload.bind(this);
  }

  onPDFUpload(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      }, () => {
        this.props.onSubmit(this.state);
      });
    };

    reader.readAsDataURL(file);
  }

  handleFormSubmit(formProps) {
    this.props.onSubmit(formProps.message);
    this.props.reset();
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
            <input id="pdf" type="file" className="custom-file-input pdf-input" accept="application/pdf" onChange={(e) => this.onPDFUpload(e)} />
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default (connect(mapStateToProps, { reset }))(form(MessageInput));
