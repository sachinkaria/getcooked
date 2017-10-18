import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Panel, Row } from 'react-bootstrap';
import _ from 'lodash';
import { updateUser } from '../../../../actions/users';
import { EVENTS, TYPES } from '../../../../utils/data';
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

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceType: props.user.data.serviceType || [],
      events: props.user.data.events || []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handler = this.handler.bind(this);
    this.isChecked = this.isChecked.bind(this);
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
          <Panel>
            <p className="gc-form-heading gc-green">Service Type</p>
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
          </Panel>
          <Panel>
            <p className="gc-form-heading">Events</p>
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
          </Panel>
        </form>
      </div>
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
