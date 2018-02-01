import React from 'react';

export default function (ComposedComponent) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = { stripe: window.Stripe('pk_test_wlrAJ1iylIKBVemPVv5tuIaL') };
    }

    render() {
      return (
        <ComposedComponent stripe={this.state.stripe} />
      );
    }
  };
}

