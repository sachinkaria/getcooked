import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { hashHistory } from 'react-router';
import { Panel } from 'react-bootstrap';
import ImageUpload from '../../ImageUpload';
import { uploadPhoto, deletePhoto } from '../../../actions/users';
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
      filetype: '',
      processing: ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.onProfileUpload = this.onProfileUpload.bind(this);
    this.onCoverUpload = this.onCoverUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(type) {
    this.props.deletePhoto(type);
  }

  onProfileUpload(e) {
    (this.props.user.data && this.props.user.data.profilePhoto) && this.onDelete('profile');

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type,
        processing: 'profile'
      }, () => {
        this.handleFormSubmit('profile');
      });
    };

    reader.readAsDataURL(file);
  };

  onCoverUpload(e) {
    (this.props.user.data && this.props.user.data.coverPhoto) && this.onDelete('cover');

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type,
        processing: 'cover'
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
              <br />
              {this.renderAlert()}
              <ImageUpload
                inProgress={this.state.processing === 'profile' && !this.props.user.data.profilePhoto}
                image={this.props.user.data ? this.props.user.data.profilePhoto : null}
                onUpload={this.onProfileUpload}
                onDelete={() => this.onDelete('profile')}
              />
            </div>
            <div>
              <label className="gc-text">Cover Photo</label>
              <br />
              {this.renderAlert()}
              <ImageUpload
                inProgress={this.state.processing === 'cover'}
                type="cover"
                image={this.props.user.data ? this.props.user.data.coverPhoto : null}
                onUpload={this.onCoverUpload}
                onDelete={() => this.onDelete('cover')}
              />
            </div>
          </form>
        </Panel>
      </Wizard>
    );
  }
}

Photos.propTypes = {
  user: React.PropTypes.object.isRequired,
  uploadPhoto: React.PropTypes.func.isRequired,
  errorMessage: React.PropTypes.string.isRequired,
  deletePhoto: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    user: state.user
  };
}

export default connect(mapStateToProps, { uploadPhoto, deletePhoto })(form(Photos));
