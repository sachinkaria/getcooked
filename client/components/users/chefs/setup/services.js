import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Col, Panel, Row } from 'react-bootstrap';
import _ from 'lodash';
import {updateUser} from '../../../../actions/users';
import { EVENTS, TYPES } from '../../../../utils/data';
import renderCheckbox from '../../../forms/renderCheckbox';
import Wizard from '../../../wizard';
import Steps from './steps.json';

const URL = '/setup-food';

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
    this.props.updateUser(this.state, URL);
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
        <Row>
          <Col xs={12} sm={11} smOffset={1}>
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
          </Col>
        </Row>
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

export default connect(mapStateToProps, {updateUser})(form(Categories));
