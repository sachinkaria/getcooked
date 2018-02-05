import React from 'react';

export default function (ComposedComponent) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = { stripe: window.Stripe(process.env.REACT_APP_STRIPE_KEY) };
    }

    render() {
      return (
        <ComposedComponent stripe={this.state.stripe} />
      );
    }
  };
}

