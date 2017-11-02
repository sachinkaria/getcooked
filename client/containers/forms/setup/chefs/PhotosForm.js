import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm} from 'redux-form';
import { hashHistory } from 'react-router';
import ImageUpload from '../../../../components/ImageUpload';
import { uploadPhoto, getCurrentUser, deletePhoto, uploadMultiplePhotos } from '../../../../actions/users';
import Steps from '../../../../components/chefs/setup/steps.json';

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
      images: []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.onProfileUpload = this.onProfileUpload.bind(this);
    this.onCoverUpload = this.onCoverUpload.bind(this);
    this.onImagesUpload = this.onImagesUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    this.props.getCurrentUser();
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

  onImagesUpload(e) {
    Object.keys(e.target.files).forEach(function (key) {
      const reader = new FileReader();
      const FILE = e.target.files[key];
      reader.onload = (upload) => {
        this.setState({
          data_uri: upload.target.result,
          filename: FILE.name,
          filetype: FILE.type
        }, () => {
          this.handleFormSubmit('multiple');
        });
      };
      reader.readAsDataURL(FILE);
    }.bind(this));
  }

  onDelete(type) {
    this.props.deletePhoto(type);
  }

  isChecked(item, state) {
    return state && state.indexOf(item) > -1;
  }

  handleSubmit() {
    hashHistory.push(Steps.photos.onNext);
  }

  handleFormSubmit(type) {
    if (type === 'multiple') {
      this.props.uploadMultiplePhotos(this.state);
    } else {
      this.props.uploadPhoto(this.state, type);
    }
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
    return (
      <form>
        <div className="gc-margin-bottom--lg">
          <label className="gc-text clearfix">Profile Photo</label>
          <br />
          {this.renderAlert()}
          <ImageUpload
            inProgress={this.state.processing === 'profile' && this.props.user.processing_file_upload}
            image={this.props.user.data ? this.props.user.data.profilePhoto || null : null}
            onDelete={() => this.onDelete('profile')}
            onUpload={this.onProfileUpload}
          />
        </div>
        <div>
          <label className="gc-text clearfix">Cover Photo</label>
          <br />
          {this.renderAlert()}
          <ImageUpload
            inProgress={this.state.processing === 'cover' && this.props.user.processing_file_upload}
            type="cover"
            image={this.props.user.data ? this.props.user.data.coverPhoto || null : null}
            onDelete={() => this.onDelete('cover')}
            onUpload={this.onCoverUpload}
          />
        </div>
        <div>
          <label className="gc-text">Photos</label>
          <br />
          <ImageUpload
            multiple
            onUpload={this.onImagesUpload}
          />
        </div>
      </form>
    );
  }
}

Photos.propTypes = {
  user: React.PropTypes.object.isRequired,
  uploadPhoto: React.PropTypes.func.isRequired,
  errorMessage: React.PropTypes.string,
  deletePhoto: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  console.log(state.user.data);
  return {
    errorMessage: state.user.error,
    user: state.user
  };
}

export default connect(mapStateToProps, { uploadPhoto, getCurrentUser, deletePhoto, uploadMultiplePhotos })(form(Photos));
