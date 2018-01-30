import React from 'react';
import {
  CardElement,
  StripeProvider,
  Elements
} from 'react-stripe-elements';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.stripe.createToken().then((source) => {
      console.log('Received Stripe token:', source);
    });
  }

  render() {
    return (
      <Elements>
        <form onSubmit={this.handleSubmit}>
          <CardElement />
          <button>Add details</button>
        </form>
      </Elements>
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
      <StripeProvider stripe={this.state.stripe}>
        <CheckoutForm stripe={this.state.stripe}/>
      </StripeProvider>
    );
  }
}

export default App;
