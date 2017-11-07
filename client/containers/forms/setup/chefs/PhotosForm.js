import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm} from 'redux-form';
import { hashHistory } from 'react-router';
import FaTrash from 'react-icons/lib/fa/trash';
import ImageUpload from '../../../../components/ImageUpload';
import { uploadPhoto, getCurrentUser, deletePhoto, uploadMultiplePhotos, deleteMultiple } from '../../../../actions/users';
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

  onDelete(type, item) {
    if (type === 'multiple') {
      this.props.deleteMultiple(item._id);
    } else {
      this.props.deletePhoto(type);
    }
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
          <label className="gc-text gc-margin-bottom">Profile Photo</label>
          <br />
          {this.renderAlert()}
          <ImageUpload
            inProgress={this.state.processing === 'profile' && this.props.user.processing_file_upload}
            image={this.props.user.data ? this.props.user.data.profilePhoto || null : null}
            onDelete={() => this.onDelete('profile')}
            onUpload={this.onProfileUpload}
          />
        </div>
        <div className="gc-margin-bottom--lg">
          <label className="gc-text gc-margin-bottom">Cover Photo</label>
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
        <div className="gc-margin-bottom--lg">
          <label className="gc-text">Photos</label>
          <p className="gc-text gc-grey">Share photos of your team, food, drinks and more. Give your viewers a visual idea of the delicous treats they can experience when they work with you!</p>
          <ImageUpload
            inProgress={this.state.processing === 'normal' && this.props.user.processing_file_upload}
            multiple
            onUpload={this.onImagesUpload}
          />
        </div>
        <Row>
          { this.props.user.data.photos.map(item =>
            (
              <Col sm={4} key={item._id}>
                <div
                  className="gc-image-preview"
                  style={{ backgroundImage: `url(${item.src})`, backgroundSize: 'cover' }}
                  onClick={null}
                >
                  <Button type="button" onClick={() => this.onDelete('multiple', item)}>
                    <p style={{ fontSize: '22px' }}>
                      <FaTrash />
                    </p>
                  </Button>
                </div>
              </Col>
            )
          )}
        </Row>
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
  return {
    errorMessage: state.user.error,
    user: state.user
  };
}

export default connect(mapStateToProps, { uploadPhoto, getCurrentUser, deletePhoto, uploadMultiplePhotos, deleteMultiple })(form(Photos));
