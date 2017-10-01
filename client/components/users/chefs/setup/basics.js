import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Field, reduxForm} from 'redux-form';
import {Col, Panel, Row, Button, Jumbotron} from 'react-bootstrap';
import {updateUser} from '../../../../actions/users';
import renderField from '../../../forms/renderField';
import renderInputBox from '../../../forms/renderInputBox';
import ProgressBar from '../../../progress-bar';

const URL = '/setup-categories';

const form = reduxForm({
  form: 'setup-basics',
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

class BasicInfo extends Component {
  handleFormSubmit(formProps) {
    this.props.updateUser(formProps, URL);
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

    return (
      <div>
        <Row>
          <div className="gc-progress-bar">
            <ProgressBar containerClassName="gc-progress-bar" progress={0.2}/>
          </div>
          <Col sm={5} smOffset={1} md={4} mdOffset={2}>
            <div>
              <br />
              <form className="gc-center" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                {this.renderAlert()}
                <Row>
                  <Col sm={11} smOffset={1}>
                    <Field
                      name="firstName"
                      placeholder="First name"
                      className="form-control gc-input gc-margin-bottom"
                      component={renderField}
                      type="text"
                    />
                  </Col>
                  <Col sm={11} smOffset={1}>
                    <Field
                      name="lastName"
                      placeholder="Last name"
                      className="form-control gc-input gc-margin-bottom"
                      component={renderField}
                      type="text"
                    />
                  </Col>
                  <Col sm={11} smOffset={1}>
                    <Field
                      name="email"
                      placeholder="Email"
                      className="form-control gc-input gc-margin-bottom"
                      component={renderField}
                      type="text"
                    />
                  </Col>
                  <Col sm={11} smOffset={1}>
                    <Field
                      name="mobileNumber"
                      placeholder="Mobile number"
                      className="form-control gc-input gc-margin-bottom"
                      component={renderField}
                      type="number"
                    />
                  </Col>
                  <Col sm={11} smOffset={1}>
                    <Field
                      name="displayName"
                      placeholder="Display name"
                      className="form-control gc-input gc-margin-bottom"
                      component={renderField}
                      type="text"
                    />
                  </Col>
                  <Col sm={11} smOffset={1}>
                    <Field
                      name="description"
                      placeholder="Description"
                      className="form-control gc-input gc-margin-bottom"
                      component={renderInputBox}
                      type="text"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={11} xsOffset={1}>
                    <Row>
                      <Col xs={6} xsOffset={3} md={4} mdOffset={4}>
                        <Button type="submit" bsSize="small" block
                                className="btn gc-btn gc-btn--orange gc-margin-bottom--xs gc-margin-top">Next</Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} xsOffset={3} md={4} mdOffset={4}>
                        <Link className="gc-link-default" to="/setup-categories">
                          <Button className="gc-btn gc-btn--white" bsSize="small" block bsStyle="default">
                            Skip
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
          <Col xsHidden={true} sm={5} md={4}>
            <Row>
              <Col sm={11}>
                <Panel className="gc-panel gc-margin-top">
                  <h3 className="gc-profile-heading-sm">Personal Details</h3>
                  <p className="gc-text">These are you personal details and won't be linked to you profile. They will
                    only be used for authentication and to contact you via email and phone.
                    They will never be published on your profile.</p>
                </Panel>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

BasicInfo.propTypes = {
  updateUser: React.PropTypes.func,
  errorMessage: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    initialValues: state.user.data
  };
}

export default connect(mapStateToProps, {updateUser})(form(BasicInfo));
