import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col, Row, Button } from 'react-bootstrap';
import _ from 'lodash';
import { updateUser, getCurrentUser } from '../../../../actions/users';
import { FOOD_SERVICES, CUISINES } from '../../../../utils/data';
import renderField from '../../../../components/forms/renderField';
import renderCheckbox from '../../../../components/forms/renderCheckbox';

const form = reduxForm({
  form: 'setup-categories'
});

class FoodServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: props.user.data ? props.user.data.services : [],
      cuisines: props.user.data ? props.user.data.cuisines : [],
      foodSuppliers: []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handler = this.handler.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  componentWillMount() {
    this.props.getCurrentUser();
  }

  handleFormSubmit(formProps) {
    this.setState({ foodSuppliers: formProps.foodSuppliers || null }, () => this.props.updateUser(this.state, null, true));
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
          <hr />
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
          <hr />
          <label className="gc-text">Sources and Suppliers</label>
          <p className="gc-profile-text-xs gc-grey">Give us a little bit of information the suppliers you commonly use and tell us a little bit about them.</p>
          <Row>
            <Col xs={12}>
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
            </Col>
          </Row>
          <Col xs={10} xsOffset={1} sm={4} smOffset={4} >
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
  // const USER = state.user;
  // state.user.foodSuppliers[0] && (USER.source1 = state.user.foodSuppliers[0]);
  // state.user.foodSuppliers[1] && (USER.source2 = state.user.foodSuppliers[1]);
  // state.user.foodSuppliers[2] && (USER.source3 = state.user.foodSuppliers[2]);
  return {
    errorMessage: state.user.error,
    user: state.user,
    initialValues: state.user.data
  };
}

export default connect(mapStateToProps, { updateUser, getCurrentUser })(form(FoodServices));
