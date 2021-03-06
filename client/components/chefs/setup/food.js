import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Panel, Row } from 'react-bootstrap';
import _ from 'lodash';
import { updateUser } from '../../../actions/users';
import { FOOD_SERVICES, CUISINES } from '../../../utils/data';
import renderCheckbox from '../../forms/renderCheckbox';
import renderField from '../../forms/renderField';
import Wizard from '../../Wizard';
import Steps from './steps.json';

const form = reduxForm({
  form: 'setup-categories'
});

class Services extends Component {
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

  handleFormSubmit(formProps) {
    this.setState({ foodSuppliers: formProps.foodSuppliers || null }, () => this.props.updateUser(this.state, Steps.food.onNext));
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
    const progress = (Steps.food.number / (Steps.totalSteps + 1));
    const sideBarHeading = Steps.food.name;
    const sideBarText = Steps.food.description;
    const onSkip = Steps.food.onNext;
    const onBack = Steps.food.onBack;

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
        <div>
          <Panel className="gc-panel">
            <Panel.Body>
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
            </Panel.Body>
          </Panel>
          <Panel className="gc-panel">
            <Panel.Body>
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
            </Panel.Body>
          </Panel>
          <Panel className="gc-panel">
            <Panel.Body>
              <label className="gc-text">Sources and Suppliers</label>
              <p className="gc-profile-text-xs gc-grey">Give us a little bit of information the suppliers you commonly use and tell us a little bit about them.</p>
              <div>
                <Field
                  name="foodSuppliers[0].name"
                  placeholder="e.g. Ocado."
                  className="form-control gc-input gc-margin-bottom"
                  component={renderField}
                  type="text"
                />
                <Field
                  name="foodSuppliers[0].description"
                  placeholder="e.g. Ocado supply seasonal ingredients that are sourced locally.."
                  className="form-control gc-input gc-margin-bottom"
                  component={renderField}
                  type="text"
                />
                <hr />
                <Field
                  name="foodSuppliers[1].name"
                  placeholder="e.g. Ocado."
                  className="form-control gc-input gc-margin-bottom"
                  component={renderField}
                  type="text"
                />
                <Field
                  name="foodSuppliers[1].description"
                  placeholder="e.g. Ocado supply seasonal ingredients that are sourced locally.."
                  className="form-control gc-input gc-margin-bottom"
                  component={renderField}
                  type="text"
                />
                <hr />
                <Field
                  name="foodSuppliers[2].name"
                  placeholder="e.g. Ocado."
                  className="form-control gc-input gc-margin-bottom"
                  component={renderField}
                  type="text"
                />
                <Field
                  name="foodSuppliers[2].description"
                  placeholder="e.g. Ocado supply seasonal ingredients that are sourced locally.."
                  className="form-control gc-input gc-margin-bottom"
                  component={renderField}
                  type="text"
                />
              </div>
            </Panel.Body>
          </Panel>
        </div>
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
    user: state.user,
    initialValues: state.user.data
  };
}

export default connect(mapStateToProps, { updateUser })(form(Services));
