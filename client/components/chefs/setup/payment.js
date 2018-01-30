import React from 'react';
import axios from 'axios';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      elements: null,
      card: null
    };
  }

  componentWillReceiveProps() {
    this.setState({ elements: this.props.stripe.elements() }, () => {
      this.setState({ card: this.state.elements.create('card') }, () => {
        this.state.card.mount('#card-element');
      });
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
    axios.post('/api/stripe/customers', { email: localStorage.user.email }, AUTH_HEADERS).then((response) => {
      console.log(response);
    }).catch((err) => {
      console.log(err);
    });

    // this.props.stripe.createSource(this.state.card).then((token) => {
    //   console.log('Received Stripe token:', token);
    // });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <label >
            Credit or debit card
          </label>
          <div id="card-element"/>
          <div id="card-errors" role="alert"/>
        </div>
        <button>Submit Payment</button>
      </form>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {stripe: window.Stripe('pk_test_wlrAJ1iylIKBVemPVv5tuIaL')};
  }

  render() {
    return (
      <CheckoutForm stripe={this.state.stripe}/>
    );
  }
}

export default App;
