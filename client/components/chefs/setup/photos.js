import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { hashHistory } from 'react-router';
import { Col, Panel, Row } from 'react-bootstrap';
import ImageUpload from '../../ImageUpload';
import { uploadPhoto } from '../../../actions/users';
import Wizard from '../../Wizard';
import Steps from './steps.json';

const form = reduxForm({
  form: 'setup-photos',
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.displayName) {
    errors.firstName = 'Please enter a display name';
  }

  if (!formProps.description) {
    errors.lastName = 'Please enter a description';
  }

  return errors;
}

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_uri: '',
      filename: '',
      filetype: ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.onProfileUpload = this.onProfileUpload.bind(this);
    this.onCoverUpload = this.onCoverUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onProfileUpload(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      }, () => {
        this.handleFormSubmit('profile');
      });
    };

    reader.readAsDataURL(file);
  };

  onCoverUpload(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      }, () => {
        this.handleFormSubmit('cover');
      });
    };

    reader.readAsDataURL(file);
  };

  isChecked(item, state) {
    return state && state.indexOf(item) > -1;
  }

  handleSubmit() {
    hashHistory.push(Steps.photos.onNext);
  }

  handleFormSubmit(type) {
    this.props.uploadPhoto(this.state, type);
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
    const progress = (Steps.photos.number / (Steps.totalSteps + 1));
    const sideBarHeading = Steps.photos.name;
    const sideBarText = Steps.photos.description;
    const onBack = Steps.photos.onBack;
    const onSkip = Steps.photos.onNext;
    let uploaded;

    return (
      <Wizard
        onSubmit={this.handleSubmit}
        progress={progress}
        sideBarHeading={sideBarHeading}
        sideBarText={sideBarText}
        onBack={onBack}
        onSkip={onSkip}
        errorMessage={this.props.errorMessage}
      >
        <Panel className="gc-panel-light">
          <form>
            <div className="gc-margin-bottom--lg">
              <label className="gc-text">Profile Photo</label>
              {this.renderAlert()}
              <ImageUpload image={this.props.user.data ? this.props.user.data.profilePhoto : null } onUpload={this.onProfileUpload} />
            </div>
            <div>
              <label className="gc-text">Cover Photo</label>
              {this.renderAlert()}
              <ImageUpload type="cover" image={this.props.user.data ? this.props.user.data.coverPhoto : null} onUpload={this.onCoverUpload} />
            </div>
          </form>
        </Panel>
      </Wizard>
    );
  }
}

Photos.propTypes = {
  user: React.PropTypes.object,
  uploadPhoto: React.PropTypes.func,
  errorMessage: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    user: state.user
  };
}

export default connect(mapStateToProps, {uploadPhoto})(form(Photos));
