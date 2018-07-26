import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import renderInputBox from '../../../components/forms/renderInputBox';
import renderCheckBox from '../../../components/forms/renderCheckbox';
import { STAFF, EQUIPMENT } from '../../../utils/data';

const form = reduxForm({
  form: 'additional-services',
  fields: ['kitchenAvailable', 'staffRequired', 'additionalEquipment']
});

class FoodServicesForm extends Component {
  constructor(props) {
    super(props);
    const STAFF = sessionStorage.eventDetails && JSON.parse(sessionStorage.getItem('eventDetails')).staffRequired;
    const EQUIPMENT = sessionStorage.eventDetails && JSON.parse(sessionStorage.getItem('eventDetails')).additionalEquipment;
    const KITCHEN_AVAILABLE = sessionStorage.eventDetails && JSON.parse(sessionStorage.getItem('eventDetails')).kitchenAvailable;
    this.state = { staffRequired: STAFF || [], additionalEquipment: EQUIPMENT || [], kitchenAvailable: KITCHEN_AVAILABLE || null, error: false };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    if (this.state.staffRequired.length < 1 || this.state.additionalEquipment.length < 1 || (this.state.kitchenAvailable === null || undefined)) {
      this.setState({error: true});
    } else {
      formProps.staffRequired = this.state.staffRequired;
      formProps.additionalEquipment = this.state.additionalEquipment;
      formProps.kitchenAvailable = this.state.kitchenAvailable;
      formProps.chef = (!this.props.withoutChef && this.props.chef) && this.props.chef._id;
      const EVENT = JSON.parse(sessionStorage.getItem('eventDetails'));
      const FINAL_EVENT = _.extend(EVENT, formProps);
      sessionStorage.setItem('eventDetails', JSON.stringify(FINAL_EVENT));
      this.props.onSubmit(5);
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

  radioHandler(value) {
    this.setState({ kitchenAvailable: value });
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
            <label className="gc-text gc-text--lg gc-text--slim">Would you like to have any additional staff at your event?</label>
            {(this.state.staffRequired.length < 1 && this.state.error) && <div className="gc-red">Please select whether you would like any additional staff.</div>}
            <Row className="gc-margin-bottom">
              {
                STAFF.map(item => (
                  <Col xs={6} key={item}>
                    <Field
                      checked={this.isChecked(item, this.state.staffRequired)}
                      name={item}
                      type="checkbox"
                      component={renderCheckBox}
                      onChange={e => this.handler(e, 'staffRequired')}
                    />
                  </Col>
                ))
              }
            </Row>
            <label className="gc-text gc-text--lg gc-text--slim">Would you like your caterer to provide anything else?</label>
            {(this.state.additionalEquipment.length < 1 && this.state.error) && <div className="gc-red">Please select whether you would like any additional equipment.</div>}
            <Row className="gc-margin-bottom">
              {
                EQUIPMENT.map(item => (
                  <Col xs={6} key={item}>
                    <Field
                      checked={this.isChecked(item, this.state.additionalEquipment)}
                      name={item}
                      type="checkbox"
                      component={renderCheckBox}
                      onChange={e => this.handler(e, 'additionalEquipment')}
                    />
                  </Col>
                ))
              }
            </Row>
            <label className="gc-text gc-text--lg gc-text--slim">Are there kitchen facilities available at the location?</label>
            {((this.state.kitchenAvailable === null || undefined) && this.state.error) && <div className="gc-red">Please select an option.</div>}
            <Field
              component={renderCheckBox}
              name="Yes"
              type="radio"
              onChange={() => this.radioHandler(true)}
              checked={this.state.kitchenAvailable === true}
            />
            <Field
              component={renderCheckBox}
              name="No"
              type="radio"
              checked={this.state.kitchenAvailable === false}
              onChange={() => this.radioHandler(false)}
            />
            <Row>
              <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
                <Button
                  block
                  type="submit"
                  className="gc-btn gc-btn--orange gc-margin-top"
                  onClick={() => this.props.withoutChef && heap.track('Get Quotes - Step 4')}
                >
                  Next
                </Button>
                <Button
                  block
                  className="gc-btn gc-btn-white gc-margin-top"
                  onClick={() => this.props.onSubmit(3)}
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
