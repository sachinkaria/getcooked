import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {Col, Panel, Row, Thumbnail} from 'react-bootstrap';
import ImageUpload from '../../../image-upload';
import {uploadPhoto} from '../../../../actions/users';
import Wizard from '../../../wizard';
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
    const {handleSubmit} = this.props;
    const progress = (Steps.photos.number / (Steps.totalSteps + 1));
    const sideBarHeading = Steps.photos.name;
    const sideBarText = Steps.photos.description;
    const onBack = Steps.photos.onBack;
    let uploaded;

    return (
      <Wizard
        onSubmit={handleSubmit(this.handleFormSubmit)}
        progress={progress}
        sideBarHeading={sideBarHeading}
        sideBarText={sideBarText}
        onBack={onBack}
        errorMessage={this.props.errorMessage}
      >
        <Row>
          <Col xs={12} sm={11} smOffset={1}>
            <Panel className="gc-panel-light">
              <form className="gc-center">
                <p className="gc-form-heading">Profile Photo</p>
                {this.renderAlert()}
                <ImageUpload image={this.props.user.data.profilePhoto} onUpload={this.onProfileUpload}/>

                <p className="gc-form-heading">Cover Photo</p>
                {this.renderAlert()}
                <ImageUpload image={this.props.user.data.coverPhoto} onUpload={this.onCoverUpload}/>
              </form>
            </Panel>
          </Col>
        </Row>
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
