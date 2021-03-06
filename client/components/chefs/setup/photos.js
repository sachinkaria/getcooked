import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import FaTrash from 'react-icons/lib/fa/trash';
import { Panel, Row, Col, Button } from 'react-bootstrap';
import ImageUpload from '../../ImageUpload';
import { uploadPhoto, deletePhoto, uploadMultiplePhotos, deleteMultiple } from '../../../actions/users';
import Wizard from '../../Wizard';
import Steps from './steps.json';

const form = reduxForm({
  form: 'setup-photos'
});


class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_uri: '',
      filename: '',
      filetype: '',
      processing: '',
      images: []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.onProfileUpload = this.onProfileUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onImagesUpload = this.onImagesUpload.bind(this);
  }

  onDelete(type, item) {
    if (type === 'multiple') {
      this.props.deleteMultiple(item._id);
    } else {
      this.props.deletePhoto(type);
    }
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

  // onCoverUpload(e) {
  //   (this.props.user.data && this.props.user.data.coverPhoto) && this.onDelete('cover');
  //
  //   const reader = new FileReader();
  //   const file = e.target.files[0];
  //
  //   reader.onload = (upload) => {
  //     this.setState({
  //       data_uri: upload.target.result,
  //       filename: file.name,
  //       filetype: file.type,
  //       processing: 'cover'
  //     }, () => {
  //       this.handleFormSubmit('cover');
  //     });
  //   };
  //
  //   reader.readAsDataURL(file);
  // };

  onImagesUpload(e) {
    let FILE_NUMBER = 1;
    const NUMBER_OF_FILES = e.target.files.length;
    Object.keys(e.target.files).forEach(function (key) {
      const reader = new FileReader();
      const FILE = e.target.files[key];
      reader.onload = (upload) => {
        this.setState({
          images: [...this.state.images, {
            data_uri: upload.target.result,
            filename: FILE.name,
            filetype: FILE.type
          }]
        }, () => {
          if (FILE_NUMBER < NUMBER_OF_FILES) {
            FILE_NUMBER += 1;
          } else {
            this.setState({ processing: 'normal' });
            this.props.uploadMultiplePhotos(this.state.images);
            this.setState({ images: [] });
          }
        });
      };
      reader.readAsDataURL(FILE);
    }.bind(this));
  }

  isChecked(item, state) {
    return state && state.indexOf(item) > -1;
  }

  handleSubmit() {
    browserHistory.push(Steps.photos.onNext);
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
    const progress = (Steps.photos.number / (Steps.totalSteps + 1));
    const sideBarHeading = Steps.photos.name;
    const sideBarText = Steps.photos.description;
    const onBack = Steps.photos.onBack;
    const onSkip = Steps.photos.onNext;

    if (!this.props.user.data) {
      return (
        <div>Loading...</div>
      );
    }
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
          <Panel.Body>
            <div className="gc-margin-bottom--lg">
              <label className="gc-text gc-margin-bottom">Profile Photo</label>
              <br />
              {this.renderAlert()}
              <ImageUpload
                inProgress={this.state.processing === 'profile' && this.props.user.processing_file_upload}
                image={this.props.user.data ? this.props.user.data.profilePhoto : null}
                onUpload={this.onProfileUpload}
                onDelete={() => this.onDelete('profile')}
              />
            </div>
            {/*<div className="gc-margin-bottom--lg">*/}
              {/*<label className="gc-text gc-margin-bottom">Cover Photo</label>*/}
              {/*<br />*/}
              {/*{this.renderAlert()}*/}
              {/*<ImageUpload*/}
                {/*inProgress={this.state.processing === 'cover' && this.props.user.processing_file_upload}*/}
                {/*type="cover"*/}
                {/*image={this.props.user.data ? this.props.user.data.coverPhoto : null}*/}
                {/*onUpload={this.onCoverUpload}*/}
                {/*onDelete={() => this.onDelete('cover')}*/}
              {/*/>*/}
            {/*</div>*/}
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
              {this.props.user.data.photos.map(item =>
                (
                  <Col sm={6} key={item._id}>
                    <div
                      className="gc-image-preview"
                      style={{ backgroundImage: `url(${item.src})`, backgroundSize: 'cover' }}
                      onClick={null}
                    >
                      <Button type="button">
                        <p style={{ fontSize: '22px' }} onClick={() => this.onDelete('multiple', item)}>
                          <FaTrash />
                        </p>
                      </Button>
                    </div>
                  </Col>
                )
              )}
            </Row>
          </Panel.Body>
        </Panel>
      </Wizard>
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

export default connect(mapStateToProps, { uploadPhoto, deletePhoto, uploadMultiplePhotos, deleteMultiple })(form(Photos));
