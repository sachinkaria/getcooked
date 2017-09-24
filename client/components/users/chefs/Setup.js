import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Col, Panel, Row, Button } from 'react-bootstrap';
import { updateUser } from '../../../actions/users';
import renderField from '../../forms/renderField';
import renderTextBox from '../../forms/renderInputBox';
import ProgressBar from '../../progress-bar';

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
    this.props.updateUser(formProps);
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
    const { handleSubmit } = this.props;

    const containerStyle = {
      height: '50px'
    };

    const options = {
      strokeWidth: 2,
      easing: 'easeInOut',
      duration: 1400,
      color: '#ff6851',
      trailColor: '#eee',
      trailWidth: 1
    };

    return (
      <Row>
        <Col sm={6} smOffset={3}>
          <ProgressBar progress={0.1} />
          <Panel className="gc-panel-light">
            <h4 className="gc-profile-heading--sm gc-center">Basic details</h4>
            <br />
            <form className="gc-center" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              {this.renderAlert()}
              <Row>
                <Col xs={12} sm={10} smOffset={1}>
                  <Field name="displayName" placeholder="Display name" className="form-control gc-input gc-margin-bottom" component={renderField} type="text" />
                </Col>
                <Col xs={12} sm={10} smOffset={1}>
                  <Field value={this.props.user.displayName} name="description" placeholder="Description" className="form-control gc-input gc-margin-bottom" component={renderTextBox} type="text" />
                </Col>
              </Row>
              <Row>
                <Col xs={4} xsOffset={4}>
                  <Button type="submit" bsSize="small" block className="btn gc-btn gc-btn--orange">Next</Button>
                </Col>
                <Col xs={3} xsOffset={1}>
                  <Button bsSize="small" bsStyle="default">
                    <Link className="gc-link-default" to="/setup-photos">Skip</Link>
                  </Button>
                </Col>
              </Row>
            </form>
          </Panel>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    message: state.user.error,
    user: state.user
  };
}

export default connect(mapStateToProps, { updateUser })(form(BasicInfo));
