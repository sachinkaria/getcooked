import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import renderInputBox from '../../../components/forms/renderInputBox';
import renderCheckBox from '../../../components/forms/renderCheckbox';
import { FOOD_STYLE, CUISINES } from '../../../utils/data';

const form = reduxForm({
  form: 'food-services',
  fields: ['foodServices', 'foodStyle']
});

class FoodServicesForm extends Component {
  constructor(props) {
    super(props);
    const SERVICES = sessionStorage.eventDetails && JSON.parse(sessionStorage.getItem('eventDetails')).foodServices;
    const FOOD_SERVICES = sessionStorage.eventDetails && JSON.parse(sessionStorage.getItem('eventDetails')).foodStyle;
    const OPEN_TO_VEGAN = sessionStorage.eventDetails && JSON.parse(sessionStorage.getItem('eventDetails')).openToVegan;
    const OPEN_TO_VEGETARIAN = sessionStorage.eventDetails && JSON.parse(sessionStorage.getItem('eventDetails')).openToVegetarian;
    this.state = { foodServices: SERVICES || [], foodStyle: FOOD_SERVICES || [], openToVegan: OPEN_TO_VEGAN !== undefined ? OPEN_TO_VEGAN : true, openToVegetarian: OPEN_TO_VEGETARIAN !== undefined ? OPEN_TO_VEGETARIAN : true, error: false };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    if (this.state.foodStyle.length < 1 || this.state.foodServices.length < 1) {
      this.setState({ error: true });
    } else {
      formProps.foodServices = this.state.foodServices;
      formProps.foodStyle = this.state.foodStyle;
      formProps.openToVegan = this.state.openToVegan;
      formProps.openToVegetarian = this.state.openToVegetarian;
      const EVENT = JSON.parse(sessionStorage.getItem('eventDetails'));
      const FINAL_EVENT = _.extend(EVENT, formProps);
      sessionStorage.setItem('eventDetails', JSON.stringify(FINAL_EVENT));
      this.props.onSubmit(4);
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
            <label className="gc-text gc-text--lg gc-text--slim">What type of style of food would you like to have?</label>
            {(this.state.foodStyle.length < 1 && this.state.error) && <div className="gc-red">Please select a style of food.</div>}
            <Row className="gc-margin-bottom">
              {
                FOOD_STYLE.map(item => (
                  <Col xs={6} key={item}>
                    <Field
                      checked={this.isChecked(item, this.state.foodStyle)}
                      name={item}
                      type="checkbox"
                      component={renderCheckBox}
                      onChange={e => this.handler(e, 'foodStyle')}
                    />
                  </Col>
                ))
              }
            </Row>
            <label className="gc-text gc-text--lg gc-text--slim">Do you have a certain cuisine in mind or are you open to suggestions?</label>
            {(this.state.foodServices.length < 1 && this.state.error) && <div className="gc-red">Please select a style of cuisine.</div>}
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
            <label className="gc-text gc-text--lg gc-text--slim">
              Vegan & Vegetarian menus can dramatically reduce your carbon footprint. Are you open to vegan and vegetarian options?
            </label>
            <Link to="/blog/what-is-sustainable-catering" target="_blank">
            <Button className="gc-btn gc-btn-white gc-margin-top gc-margin-bottom">Find out more</Button>
            </Link>
            <Row className="gc-margin-bottom">
              <Col xs={6}>
                <Field
                  checked={this.state.openToVegan}
                  name="Open to Vegan"
                  type="checkbox"
                  nonCapitalize
                  component={renderCheckBox}
                  onChange={() => this.setState({openToVegan: !this.state.openToVegan })}
                />
              </Col>
              <Col xs={6}>
                <Field
                  checked={this.state.openToVegetarian}
                  name="Open to Vegetarian"
                  type="checkbox"
                  nonCapitalize
                  component={renderCheckBox}
                  onChange={() => this.setState({openToVegetarian: !this.state.openToVegetarian })}
                />
              </Col>
            </Row>
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
