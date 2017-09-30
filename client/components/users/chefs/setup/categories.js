import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Col, Panel, Row, Button } from 'react-bootstrap';
import _ from 'lodash';
import { updateUser } from '../../../../actions/users';
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
  constructor(props) {
    super(props);
    this.state = {serviceType: props.user.data.serviceType || []};

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handler = this.handler.bind(this);
    this.isChecked = this.isChecked.bind(this);
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
        serviceType: _.pull(this.state.serviceType, (event.target.name))
      });
    }
  }

  isChecked(item, state) {
    return state && state.indexOf(item) > -1;
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
    const TYPES = ['professional caterer', 'market stall', 'private chef', 'food truck'];
    const SERVICES = ['breakfast', 'dinner', 'lunch', 'canapes', 'dessert', 'buffets', 'vegetarian', 'vegan', 'alcoholic drinks', 'non-alcoholic drinks'];
    const EVENTS = ['corporate events', 'weddings', 'private dinners', 'parties'];

    return (
      <Row>
        <Col sm={6} smOffset={3}>
          <ProgressBar progress={0.4} />
          <Panel className="gc-panel-light">
            <br />
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              {this.renderAlert()}
              <Row>
                <Col xs={8} xsOffset={2} sm={8} smOffset={2}>
                  <Panel>
                    <h3 className="gc-profile-heading-sm">Service Type</h3>
                    <Row>
                      {
                        TYPES.map(item => (
                          <Col sm={6} key={item}>
                            <Field
                              checked={this.isChecked(item, this.state.serviceType)}
                              name={item}
                              type="checkbox"
                              component={renderCheckbox}
                              onChange={e => this.handler(e)}
                            />
                          </Col>
                        ))
                      }
                    </Row>
                  </Panel>
                  <Panel>
                    <p className="gc-profile-heading-sm">Services</p>
                    <Row>
                      {
                        SERVICES.map(item => (
                          <Col sm={6} key={item}>
                            <Field
                              checked={this.isChecked(item, this.state.services)}
                              name={item}
                              type="checkbox"
                              component={renderCheckbox}
                              onChange={e => this.handler(e)}
                            />
                          </Col>
                        ))
                      }
                    </Row>
                  </Panel>
                  <Panel>
                    <h3 className="gc-profile-heading-sm">Events</h3>
                    <Row>
                      {
                        EVENTS.map(item => (
                          <Col sm={6} key={item}>
                            <Field
                              checked={this.isChecked(item, this.state.events)}
                              name={item}
                              type="checkbox"
                              component={renderCheckbox}
                              onChange={e => this.handler(e)}
                            />
                          </Col>
                        ))
                      }
                    </Row>
                  </Panel>
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

BasicInfo.propTypes = {
  updateUser: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    message: state.user.error,
    user: state.user
  };
}

export default connect(mapStateToProps, {updateUser})(form(BasicInfo));
