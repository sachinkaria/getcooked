import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Field, reduxForm} from 'redux-form';
import {FormGroup, Checkbox} from 'react-bootstrap';
import {Col, Panel, Row, Button} from 'react-bootstrap';
import {updateUser} from '../../../../actions/users';
import renderField from '../../../forms/renderField';
import renderCheckbox from '../../../forms/renderCheckbox';
import ProgressBar from '../../../progress-bar';

const form = reduxForm({
  form: 'setup-basics',
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

class BasicInfo extends Component {
  handleFormSubmit(formProps) {
    this.props.updateUser(formProps);
  }

  handler(event) {
    this.setState({ value: event.target.value });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <Row>
        <Col sm={6} smOffset={3}>
          <ProgressBar progress={0.4} />
          <Panel className="gc-panel-light">
            <br />
            <FormGroup className="gc-center" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              {this.renderAlert()}
              <Row>
                <Col xs={12} sm={10} smOffset={1}>
                  <Field placeholder="Professional Caterer" onChange={console.log('hello')} name="Professional Caterer" type="checkbox" component={renderCheckbox}>
                    <Checkbox onClick={e => this.handler(e.target.checked)}>
                      Professional Caterer
                    </Checkbox>
                  </Field>
                  <Checkbox onClick={e => this.handler(e.target.checked)}>
                    Food Truck
                  </Checkbox>
                  <Checkbox onClick={e => this.handler(e.target.checked)}>
                    Private Chef
                  </Checkbox>
                  <Checkbox onClick={e => this.handler(e.target.checked)}>
                    Market Stall
                  </Checkbox>
                </Col>
              </Row>
              <Row>
                <Col xs={4} xsOffset={4}>
                  <Button type="submit" bsSize="small" block className="btn gc-btn gc-btn--orange">Next</Button>
                </Col>
                <Col xs={3} xsOffset={1}>
                  <Button bsSize="small" bsStyle="default">
                    <Link className="gc-link-default" to="/setup-photos">Skip</Link>
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Panel>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    message: state.user.error,
    user: state.user
  };
}

export default connect(mapStateToProps, {updateUser})(form(BasicInfo));
