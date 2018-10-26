import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm} from 'redux-form';
import { browserHistory } from 'react-router';
import FaTrash from 'react-icons/lib/fa/trash';
import ImageUpload from '../../../../components/ImageUpload';
import { uploadPhoto, getCurrentUser, deletePhoto, uploadMultiplePhotos, deleteMultiple, getInstagramFeed } from '../../../../actions/users';
import Steps from '../../../../components/chefs/setup/steps.json';

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
      images: []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.onProfileUpload = this.onProfileUpload.bind(this);
    this.onImagesUpload = this.onImagesUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.authenticateInstagram = this.authenticateInstagram.bind(this);
    this.renderView = this.renderView.bind(this);
  }

  componentWillMount() {
    this.props.getCurrentUser();
    if (this.props.user.data.social && this.props.user.data.social.instagram.accessToken) {
      this.props.getInstagramFeed(this.props.user.data.social.instagram.accessToken);
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

  authenticateInstagram() {
    window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URL}&response_type=code`;
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

  renderView() {
    const user = this.props.user.data;
    const INSTA = this.props.user.instagramFeed;
    return (
      <div>
        <form>
          <div className="gc-margin-bottom--lg">
            <label className="gc-text gc-margin-bottom">Profile Photo</label>
            <br />
            <ImageUpload
              inProgress={this.state.processing === 'profile' && this.props.user.processing_file_upload}
              image={this.props.user.data ? this.props.user.data.profilePhoto || null : null}
              onDelete={() => this.onDelete('profile')}
              onUpload={this.onProfileUpload}
            />
          </div>
          {/*<div className="gc-margin-bottom--lg">*/}
          {/*<label className="gc-text gc-margin-bottom">Cover Photo</label>*/}
          {/*<br />*/}
          {/*<ImageUpload*/}
          {/*inProgress={this.state.processing === 'cover' && this.props.user.processing_file_upload}*/}
          {/*type="cover"*/}
          {/*image={this.props.user.data ? this.props.user.data.coverPhoto || null : null}*/}
          {/*onDelete={() => this.onDelete('cover')}*/}
          {/*onUpload={this.onCoverUpload}*/}
          {/*/>*/}
          {/*</div>*/}
          {/*<div className="gc-margin-bottom--lg">*/}
            {/*<h4 className="gc-text gc-bold">Connect Instagram Account</h4>*/}
            {/*{*/}
              {/*(user.social && user.social.instagram.userName) ?*/}
                {/*<div>*/}
                  {/*<p className="gc-text">Connected to <span*/}
                    {/*className="gc-orange">{user.social.instagram.userName}</span></p>*/}
                  {/*{(INSTA && INSTA.length > 0) &&*/}
                  {/*<section id="photos">*/}
                    {/*{*/}
                      {/*INSTA.map(post => (*/}
                        {/*<img*/}
                          {/*src={post.images.low_resolution.url}*/}
                          {/*alt="unknown"*/}
                        {/*/>*/}
                      {/*))*/}
                    {/*}*/}
                  {/*</section>*/}
                  {/*}*/}
                {/*</div>*/}
                {/*:*/}
                {/*<Button*/}
                  {/*className="gc-btn gc-btn--white"*/}
                  {/*onClick={() => this.authenticateInstagram()}*/}
                {/*>*/}
                  {/*Connect Instagram*/}
                {/*</Button>*/}
            {/*}*/}
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
      </div>
    );
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        { user.data.firstName ? this.renderView() : <p>Loading User</p> }
      </div>
  )

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

export default connect(mapStateToProps, { uploadPhoto, getCurrentUser, deletePhoto, uploadMultiplePhotos, deleteMultiple, getInstagramFeed })(form(Photos));
