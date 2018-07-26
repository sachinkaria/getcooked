import React, { Component } from 'react';
import _ from 'lodash';
import { Row, Col, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import renderCheckBox from '../../../components/forms/renderCheckbox';
import { EVENT_TYPE, EVENT_SERVICES } from '../../../utils/data';

const form = reduxForm({
  form: 'eventType-and-services',
  fields: ['eventType', 'services']
});

class EventTypeGuestsAndBudgetForm extends Component {
  constructor(props) {
    super(props);
    const EVENT_TYPE = sessionStorage.eventDetails && this.props.initialValues.eventType;
    const SERVICES = sessionStorage.eventDetails && this.props.initialValues.services;
    this.state = { eventType: EVENT_TYPE || [], services: SERVICES || [], error: false };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.handler = this.handler.bind(this);
  }

  handleFormSubmit(formProps) {
    if (this.state.eventType.length < 1 || this.state.services.length < 1) {
      this.setState({ error: true })
    } else {
      formProps.eventType = this.state.eventType;
      formProps.services = this.state.services;
      const EVENT = JSON.parse(sessionStorage.getItem('eventDetails'));
      const FINAL_EVENT = _.extend(EVENT, formProps);
      sessionStorage.setItem('eventDetails', JSON.stringify(FINAL_EVENT));
      this.props.onSubmit(3);
    }
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
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div>
            <label className="gc-text gc-text--lg gc-text--slim">What type of event are you hosting?</label>
            {(this.state.eventType.length < 1 && this.state.error) && <div className="gc-red">Please select a type of event.</div>}
            <Row className="gc-margin-bottom">
              {
                EVENT_TYPE.map(item => (
                  <Col xs={6} key={item}>
                    <Field
                      checked={this.isChecked(item, this.state.eventType)}
                      name={item}
                      type="checkbox"
                      component={renderCheckBox}
                      onChange={e => this.handler(e, 'eventType')}
                    />
                  </Col>
                ))
              }
            </Row>
            <label className="gc-text gc-text--lg gc-text--slim">What services are you looking for?</label>
            {(this.state.services.length < 1 && this.state.error) && <div className="gc-red">Please select a service.</div>}
            <Row className="gc-margin-bottom">
              {
                EVENT_SERVICES.map(item => (
                  <Col xs={6} key={item}>
                    <Field
                      checked={this.isChecked(item, this.state.services)}
                      name={item}
                      selectedItems={this.state.services}
                      type="checkbox"
                      component={renderCheckBox}
                      onChange={e => this.handler(e, 'services')}
                    />
                  </Col>
                ))
              }
            </Row>
            <Row>
              <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
                <Button
                  block
                  type="submit"
                  className="gc-btn gc-btn--orange gc-margin-top"
                  onClick={() => this.props.withoutChef && heap.track('Get Quotes - Step 2')}
                >
                  Next
                </Button>
                <Button
                  block
                  className="gc-btn gc-btn-white gc-margin-top"
                  onClick={() => this.props.onSubmit(1)}
                >
                  Back
                </Button>
              </Col>
            </Row>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps() {
  const EVENT_DETAILS = sessionStorage.getItem('eventDetails');
  return {
    initialValues: JSON.parse(EVENT_DETAILS)
  };
}

export default (connect(mapStateToProps))(form(EventTypeGuestsAndBudgetForm));
