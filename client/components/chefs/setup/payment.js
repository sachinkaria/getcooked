import React from 'react';
import axios from 'axios';
import { Panel } from 'react-bootstrap';
import Wizard from '../../Wizard';
import Steps from './steps.json';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: null,
      card: null,
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: 'United Kingdom',
      postcode: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ elements: this.props.stripe.elements() }, () => {
      this.setState({ card: this.state.elements.create('card') }, () => {
        this.state.card.mount('#card-element');
      });
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
    axios.post('/api/stripe/customers', {
      email: localStorage.user.email,
    }, AUTH_HEADERS).then(() => {
      this.props.stripe.createSource(this.state.card, {
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
        console.log(source);
        axios.post('/api/stripe/sources', source, AUTH_HEADERS).then((result) => {
          console.log(result);
        }).catch((err) => {
          console.log(err);
        });
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const progress = (Steps.payment.number / (Steps.totalSteps + 1));
    const sideBarHeading = Steps.payment.name;
    const sideBarText = Steps.payment.description;
    const onSkip = Steps.payment.onNext;
    const onBack = Steps.payment.onBack;

    return (
      <Wizard
        onSubmit={this.handleSubmit}
        progress={progress}
        sideBarHeading={sideBarHeading}
        sideBarText={sideBarText}
        onSkip={onSkip}
        onBack={onBack}
      >
        <Panel>
          <div>
            <label className="gc-margin-bottom">
              Credit or debit card
            </label>
            <div id="card-element" className="gc-margin-bottom" />
            <div id="card-errors" role="alert" />
            <label>
              Name
            </label>
            <input type="text" className="gc-input" name="name" value={this.state.name} onChange={this.handleChange.bind(this)} />
            <label>
              Address line 1
            </label>
            <input type="text" className="gc-input" name="addressLine1"  value={this.state.addressLine1} onChange={this.handleChange} />
            <label>
              Address line 2
            </label>
            <input type="text" className="gc-input" name="addressLine2" value={this.state.addressLine2} onChange={this.handleChange} />
            <label>
              City
            </label>
            <input type="text" className="gc-input" name="city" value={this.state.city} onChange={this.handleChange} />
            <label>
              Postcode
            </label>
            <input type="text" className="gc-input" name="postcode" value={this.state.postcode} onChange={this.handleChange} />
          </div>
        </Panel>
      </Wizard>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = { stripe: window.Stripe('pk_test_wlrAJ1iylIKBVemPVv5tuIaL') };
  }

  render() {
    return (
      <CheckoutForm stripe={this.state.stripe}/>
    );
  }
}

export default App;
