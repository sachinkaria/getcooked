import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import renderInputBox from '../../../components/forms/renderInputBox';
import renderCheckBox from '../../../components/forms/renderCheckbox';
import { CUISINES, EVENT_SERVICES } from '../../../utils/data';

const form = reduxForm({
  form: 'food-services',
  fields: ['services', 'foodServices', 'additionalInformation']
});

class FoodServicesForm extends Component {
  constructor(props) {
    super(props);
    const SERVICES = sessionStorage.eventDetails && JSON.parse(sessionStorage.getItem('eventDetails')).services;
    const FOOD_SERVICES = sessionStorage.eventDetails && JSON.parse(sessionStorage.getItem('eventDetails')).foodServices;
    this.state = { services: SERVICES || [], foodServices: FOOD_SERVICES || ['other'] };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    formProps.services = this.state.services;
    formProps.foodServices = this.state.foodServices;
    formProps.chef = (!this.props.withoutChef && this.props.chef) && this.props.chef._id;
    const EVENT = JSON.parse(sessionStorage.getItem('eventDetails'));
    const FINAL_EVENT = _.extend(EVENT, formProps);
    sessionStorage.setItem('eventDetails', JSON.stringify(FINAL_EVENT));
    this.props.onSubmit(4);
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
            <label className="gc-text">Services Required</label>
            <Row className="gc-margin-bottom">
              {
                EVENT_SERVICES.map(item => (
                  <Col xs={6} key={item}>
                    <Field
                      checked={this.isChecked(item, this.state.services)}
                      name={item}
                      type="checkbox"
                      component={renderCheckBox}
                      onChange={e => this.handler(e, 'services')}
                    />
                  </Col>
                ))
              }
            </Row>
            <label className="gc-text">Type of Food</label>
            <Row className="gc-margin-bottom">
              {
                CUISINES.map(item => (
                  <Col xs={6} key={item}>
                    <Field
                      checked={this.isChecked(item, this.state.foodServices)}
                      name={item}
                      type="checkbox"
                      component={renderCheckBox}
                      onChange={e => this.handler(e, 'foodServices')}
                    />
                  </Col>
                ))
              }
            </Row>
            <label className="gc-text">Additional Information</label>
            <div className="gc-margin-bottom">
              <Field
                name="additionalInformation"
                placeholder="Please give any extra details about your event and any special requirements you might have."
                className="form-control gc-input gc-margin-bottom"
                component={renderInputBox}
                type="text"
              />
            </div>
            <Row>
              <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
                <Button
                  block
                  type="submit"
                  className="gc-btn gc-btn--orange gc-margin-top"
                  onClick={() => this.props.withoutChef && heap.track('Get Quotes - Step 3')}
                >
                  Next
                </Button>
                <Button
                  block
                  className="gc-btn gc-btn-white gc-margin-top"
                  onClick={() => this.props.onSubmit(2)}
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

export default (connect(mapStateToProps))(form(FoodServicesForm));
