import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Field, reduxForm} from 'redux-form';
import {Col, Panel, Row, Button} from 'react-bootstrap';
import _ from 'lodash';
import {updateUser} from '../../../../actions/users';
import {FOOD_SERVICES, CUISINES} from '../../../../utils/data';
import renderCheckbox from '../../../forms/renderCheckbox';
import ProgressBar from '../../../progress-bar';
import Wizard from '../../../wizard';

const URL = '/setup-photos';

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

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: props.user.data.services || [],
      cuisines: props.user.data.cuisines || []
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
    const progress = 0.6;
    const sideBarHeading = 'services';
    const sideBarText = 'Your basic information will give everyone an idea of what type of services you are able to offer. You can select more than one category for all of your services.';
    const onBack = '/setup-services';
    const onSkip = '/setup-photos';

    return (
      <Wizard
        onSubmit={handleSubmit(this.handleFormSubmit)}
        progress={progress}
        sideBarHeading={sideBarHeading}
        sideBarText={sideBarText}
        onBack={onBack}
        onSkip={onSkip}
        errorMessage={this.props.errorMessage}
      >
        <Row>
          <Col xs={12} sm={11} smOffset={1}>
            <Panel>
              <p className="gc-form-heading">Food Services</p>
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
            </Panel>
            <Panel>
              <p className="gc-form-heading">Cuisines</p>
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
            </Panel>
          </Col>
        </Row>
      </Wizard>
    );
  }
}

Services.propTypes = {
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

export default connect(mapStateToProps, {updateUser})(form(Services));
