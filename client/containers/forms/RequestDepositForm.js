import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Button} from 'react-bootstrap';
import {Field, reduxForm} from 'redux-form';
import renderField from '../../components/forms/renderField';

const form = reduxForm({
  form: 'request-deposit-form',
  fields: ['amount'],
  validate
});

function validate(formProps) {
  const errors = {};

  if (!formProps.amount) {
    errors.message = 'Please enter your final quote amount';
  }
  return errors;
}

class RequestDepositForm extends Component {
  constructor(props) {
    super(props);
    this.state = {amount: null, depositAmount: null, balanceDue: null, status: 'requested'};
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setQuote = this.setQuote.bind(this);
  }

  setQuote(e) {
    const amount = parseInt(e.target.value).toFixed(2);
    const depositAmount =  ((e.target.value * 0.05) < 200) ? parseInt(e.target.value * 0.05).toFixed(2) : 200;
    const balanceDue = (amount - depositAmount).toFixed(2);
    this.setState({amount, depositAmount, balanceDue});
  }

  handleFormSubmit() {
    this.props.onSubmit(this.state);
    this.props.closeModal();
  }

  render() {
    const {handleSubmit, initialValues} = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div>
            <label className="gc-text gc-text--lg gc-text--slim">Final Quote</label>
            <div className="gc-margin-bottom">
              <Field
                onChange={(e) => this.setQuote(e)}
                addonText="£"
                withAddon
                name="amount"
                placeholder="e.g. 1500"
                className="form-control gc-input gc-margin-bottom"
                component={renderField}
                type="number"
              />
            </div>
            {
              (this.state.depositAmount && this.state.amount) &&
              <Row>
                <Col xs={12}>
                <span className="gc-text gc-text--lg gc-text--slim">
                  Final Quote
                </span>
                  <span className="gc-text gc-text--lg gc-grey pull-right">
                  £{this.state.amount}
                </span>
                  <hr className="gc-hr-sm"/>
                </Col>
                <Col xs={12}>
                <span className="gc-text gc-text--lg gc-text--slim">
                  Fee/Deposit (5%)
                </span>
                  <span className="gc-text gc-text--lg gc-grey pull-right">
                  £{this.state.depositAmount}
                </span>
                  <hr className="gc-hr-sm"/>
                </Col>
                <Col xs={12}>
                <span className="gc-text gc-text--lg gc-text--slim">
                  Outstanding Balance
                </span>
                  <span className="gc-text gc-text--lg gc-grey pull-right">
                  £{this.state.balanceDue}
                </span>
                  <hr className="gc-hr-sm"/>
                </Col>
              </Row>
            }
            <Row>
              <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
                <Button
                  block
                  type="submit"
                  className="gc-btn gc-btn--orange gc-margin-top"
                >
                  Submit
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
  return {};
}

export default (connect(mapStateToProps))(form(RequestDepositForm));
