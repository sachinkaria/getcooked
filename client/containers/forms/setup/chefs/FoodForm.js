import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Panel, Row, Button } from 'react-bootstrap';
import _ from 'lodash';
import { updateUser, getCurrentUser } from '../../../../actions/users';
import { FOOD_SERVICES, CUISINES } from '../../../../utils/data';
import renderCheckbox from '../../../../components/forms/renderCheckbox';

const form = reduxForm({
  form: 'setup-categories',
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

class FoodServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: props.user.data ? props.user.data.services : [],
      cuisines: props.user.data ? props.user.data.cuisines : []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handler = this.handler.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  componentWillMount() {
    this.props.getCurrentUser();
  }

  handleFormSubmit() {
    this.props.updateUser(this.state);
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
          <label className="gc-text">Food Services</label>
          <Row>
            {
              FOOD_SERVICES.map(item => (
                <Col sm={6} key={item}>
                  <Field
                    checked={this.isChecked(item, this.state.services)}
                    name={item}
                    type="checkbox"
                    component={renderCheckbox}
                    onChange={e => this.handler(e, 'services')}
                  />
                </Col>
              ))
            }
          </Row>
          <br />
          <label className="gc-text">Cuisines</label>
          <Row>
            {
              CUISINES.map(item => (
                <Col sm={6} key={item}>
                  <Field
                    checked={this.isChecked(item, this.state.cuisines)}
                    name={item}
                    type="checkbox"
                    component={renderCheckbox}
                    onChange={e => this.handler(e, 'cuisines')}
                  />
                </Col>
              ))
            }
          </Row>
          <Col sm={4} smOffset={4} >
            <Button block type="submit" className="gc-btn gc-btn--orange gc-margin-top">
              Save
            </Button>
          </Col>
        </form>
      </div>
    );
  }
}

FoodServices.propTypes = {
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

export default connect(mapStateToProps, { updateUser, getCurrentUser })(form(FoodServices));
