import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Panel, Row } from 'react-bootstrap';
import _ from 'lodash';
import { updateUser } from '../../../actions/users';
import { EVENTS, TYPES, ADDITIONAL_SERVICES } from '../../../utils/data';
import renderCheckbox from '../../forms/renderCheckbox';
import Wizard from '../../Wizard';
import Steps from './steps.json';

const form = reduxForm({
  form: 'setup-categories'
});

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceType: props.user.data ? props.user.data.serviceType : [],
      events: props.user.data ? props.user.data.events : [],
      additionalServices: props.user.data ? props.user.data.additionalServices : []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handler = this.handler.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  handleFormSubmit() {
    this.props.updateUser(this.state, Steps.services.onNext);
  }

  handler(event, category) {
    if (event.target.checked) {
      this.state[category] = this.state[category].concat(event.target.name);
      this.setState(this.state);
    } else {
      this.state[category] = _.pull(this.state[category], (event.target.name));
      this.setState(this.state);
    }
  }

  isChecked(item, state) {
    return state && state.indexOf(item) > -1;
  }

  render() {
    const { handleSubmit } = this.props;
    const progress = (Steps.services.number / (Steps.totalSteps + 1));
    const sideBarHeading = Steps.services.name;
    const sideBarText = Steps.services.description;
    const onSkip = Steps.services.onNext;
    const onBack = Steps.services.onBack;

    return (
      <Wizard
        onSubmit={handleSubmit(this.handleFormSubmit)}
        progress={progress}
        sideBarHeading={sideBarHeading}
        sideBarText={sideBarText}
        onSkip={onSkip}
        onBack={onBack}
        errorMessage={this.props.errorMessage}
      >
        <div>
          <Panel className="gc-panel">
            <Panel.Body>
            <label className="gc-text">Service Type</label>
            <Row>
              {
                TYPES.map(item => (
                  <Col sm={6} key={item}>
                    <Field
                      checked={this.isChecked(item, this.state.serviceType)}
                      name={item}
                      type="checkbox"
                      component={renderCheckbox}
                      onChange={e => this.handler(e, 'serviceType')}
                    />
                  </Col>
                ))
              }
            </Row>
            </Panel.Body>
          </Panel>
          <Panel className="gc-panel">
            <Panel.Body>
            <label className="gc-text">Events</label>
            <Row>
              {
                EVENTS.map(item => (
                  <Col sm={6} key={item}>
                    <Field
                      checked={this.isChecked(item, this.state.events)}
                      name={item}
                      type="checkbox"
                      component={renderCheckbox}
                      onChange={e => this.handler(e, 'events')}
                    />
                  </Col>
                ))
              }
            </Row>
            </Panel.Body>
          </Panel>
          <Panel className="gc-panel">
            <Panel.Body>
            <label className="gc-text">Additional Services</label>
            <Row>
              {
                ADDITIONAL_SERVICES.map(item => (
                  <Col sm={6} key={item}>
                    <Field
                      checked={this.isChecked(item, this.state.additionalServices)}
                      name={item}
                      type="checkbox"
                      component={renderCheckbox}
                      onChange={e => this.handler(e, 'additionalServices')}
                    />
                  </Col>
                ))
              }
            </Row>
            </Panel.Body>
          </Panel>
        </div>
      </Wizard>
    );
  }
}

Categories.propTypes = {
  user: React.PropTypes.object,
  updateUser: React.PropTypes.func,
  errorMessage: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    user: state.user
  };
}

export default connect(mapStateToProps, { updateUser })(form(Categories));
