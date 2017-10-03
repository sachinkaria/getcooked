import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {Col, Panel, Row, Button} from 'react-bootstrap';
import _ from 'lodash';
import ImageUpload from '../../../image-upload';
import {uploadPhoto} from '../../../../actions/users';
import ProgressBar from '../../../progress-bar';


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
    this.onFileUpload = this.onFileUpload.bind(this);
  }

  onFileUpload(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      });
    };

    reader.readAsDataURL(file);
  };

  isChecked(item, state) {
    return state && state.indexOf(item) > -1;
  }

  handleFormSubmit() {
    this.props.uploadPhoto(this.state);
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
    let uploaded;

    return (
      <Row>
        <div className="gc-progress-bar">
          <ProgressBar progress={0.8} />
        </div>
        <Col sm={5} smOffset={2}>
          <Row>
            <Col sm={6} smOffset={1}>
              <Link className="gc-link-default pull-left" to="/setup-food">
                <Button className="gc-btn gc-btn--white gc-margin-top" bsSize="small" bsStyle="default">
                  Back
                </Button>
              </Link>
            </Col>
          </Row>
          <br />
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            {this.renderAlert()}
            <Row>
              {uploaded}
              <Col xs={12} sm={11} smOffset={1}>
                <Panel className="gc-panel-light">
                  <form className="gc-center" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    {this.renderAlert()}
                    <ImageUpload onUpload={this.onFileUpload}/>
                  </form>
                </Panel>
              </Col>
            </Row>
            <Row>
              <Col sm={11} smOffset={1}>
                <Row>
                  <Col xs={6} xsOffset={3} md={4} mdOffset={4}>
                    <Button
                      type="submit"
                      bsSize="small"
                      block
                      className="btn gc-btn gc-btn--orange gc-margin-bottom--xs gc-margin-top">Next</Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} xsOffset={3} md={4} mdOffset={4}>
                    <Link className="gc-link-default" to="/setup-photos">
                      <Button className="gc-btn gc-btn--white" block bsStyle="default">
                        Skip
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </form>
        </Col>
        <Col xsHidden={true} sm={3}>
          <Row>
            <Col sm={11}>
              <Panel className="gc-panel gc-margin-top">
                <h3 className="gc-profile-heading-sm">Photos</h3>
                <p className="gc-text">Provide a profile and photo as well as photos of events and food.</p>
              </Panel>
            </Col>
          </Row>
        </Col>
      </Row>
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
