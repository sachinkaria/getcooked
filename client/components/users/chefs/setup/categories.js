import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Field, reduxForm} from 'redux-form';
import {Col, Panel, Row, Button}  from 'react-bootstrap';
import _ from 'lodash';

import {updateUser} from '../../../../actions/users';
import renderCheckbox from '../../../forms/renderCheckbox';
import ProgressBar from '../../../progress-bar';

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
  constructor() {
    super();
    this.state = {serviceType: []};
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handler = this.handler.bind(this);
  }

  handleFormSubmit() {
    this.props.updateUser(this.state);
  }

  handler(event) {
    if (event.target.checked) {
      this.setState({
        serviceType: this.state.serviceType.concat([event.target.name])
      });
    } else {
      this.setState({
        serviceType: _.remove(this.state.serviceType, (event.target.name))
      });
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
    const {handleSubmit} = this.props;

    return (
      <Row>
        <Col sm={6} smOffset={3}>
          <ProgressBar progress={0.2}/>
          <Panel className="gc-panel-light">
            <br />
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              {this.renderAlert()}
              <Row>
                <Col xs={8} xsOffset={2} sm={4} smOffset={4}>
                  <Field
                    name="professional caterer"
                    type="checkbox"
                    component={renderCheckbox}
                    onChange={e => this.handler(e)}
                  />
                  <Field
                    name="market stall"
                    type="checkbox"
                    component={renderCheckbox}
                    onChange={e => this.handler(e)}
                  />
                  <Field
                    name="private chef"
                    type="checkbox"
                    component={renderCheckbox}
                    onChange={e => this.handler(e)}
                  />
                  <Field
                    name="food truck"
                    type="checkbox"
                    component={renderCheckbox}
                    onChange={e => this.handler(e)}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <Link className="gc-link-default pull-left" to="/setup-basics">
                    <Button bsSize="small" bsStyle="default">
                      Back
                    </Button>
                  </Link>
                </Col>
                <Col xs={4}>
                  <Button type="submit" bsSize="small" block className="btn gc-btn gc-btn--orange">Next</Button>
                </Col>
                <Col xs={4}>
                  <Link className="gc-link-default pull-right" to="/setup-categories">
                    <Button bsSize="small" bsStyle="default">
                      Skip
                    </Button>
                  </Link>
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

export default connect(mapStateToProps, {updateUser})(form(BasicInfo));
