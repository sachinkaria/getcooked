import React from 'react';
import axios from 'axios';
import { Button, Panel, Row, Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import PaymentForm from '../../components/forms/PaymentForm';
import {createSource} from '../../actions/stripe';
import {errorHandler} from '../../actions/public';


class BookingPaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stripe: window.Stripe(process.env.REACT_APP_STRIPE_KEY),
      elements: null,
      card: null,
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: 'United Kingdom',
      postcode: '',
      loading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ elements: this.state.stripe.elements() }, () => {
      this.setState({ card: this.state.elements.create('card') }, () => {
        this.state.card.mount('#card-element');
      });
    });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
    axios.post('/api/stripe/customers', {
      email: localStorage.user.email,
    }, AUTH_HEADERS).then(() => {
      this.setState({ loading: true });
      this.state.stripe.createSource(this.state.card, {
        owner: {
          address: {
            line1: this.state.addressLine1,
            line2: this.state.addressLine2,
            city: this.state.city,
            country: this.state.country,
            postal_code: this.state.postcode
          },
        },
      }).then((source) => {
        this.props.createSource(source, this.props.amount, this.props.id);
      });
    }).catch(() => {
      this.setState({loading: false});
      this.props.errorHandler(this.props.dispatch, 'Sorry, there was a problem saving your cards details.');
    });
  }


  render() {
    return (
        <Panel>
          <Panel.Body>
            <Row>
              <Col xs={12}>
                <form>
                  <PaymentForm
                    name={this.state.name}
                    city={this.state.city}
                    addressLine1={this.state.addressLine1}
                    addressLine2={this.state.addressLine2}
                    postcode={this.state.postcode}
                    onChange={this.handleChange}
                  />
                  <Button className="gc-btn gc-btn--orange gc-margin-top center-block" onClick={(e) => this.handleSubmit(e)}>Pay Deposit</Button>
                </form>
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
    );
  }
}

BookingPaymentForm.propTypes = {
  createSource: React.PropTypes.func.isRequired,
  errorHandler: React.PropTypes.func.isRequired,
  amount: React.PropTypes.number.isRequired
};

function mapStateToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, {createSource, errorHandler})(BookingPaymentForm);
