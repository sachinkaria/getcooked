import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Wizard from '../../Wizard';
import PaymentForm from '../../forms/PaymentForm';
import Steps from './steps.json';
import {createSource} from '../../../actions/stripe';
import {errorHandler} from '../../../actions/public';


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
      postcode: '',
      loading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({elements: this.props.stripe.elements()}, () => {
      this.setState({card: this.state.elements.create('card')}, () => {
        this.state.card.mount('#card-element');
      });
    });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(ev) {
    ev.preventDefault();
    heap.track('Submit Payment Details');
    gtag_report_conversion();
    const AUTH_HEADERS = {headers: {Authorization: localStorage.token}};
    axios.post('/api/stripe/customers', {
      email: localStorage.user.email,
    }, AUTH_HEADERS).then(() => {
      this.setState({loading: true});
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
        this.props.createSource(source, '/dashboard/profile/summary');
      });
    }).catch(() => {
      this.setState({ loading: false });
      this.props.errorHandler(this.props.dispatch, 'Sorry, there was a problem saving your cards details.');
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
        loading={this.state.loading}
      >
        <PaymentForm
          name={this.state.name}
          city={this.state.city}
          addressLine1={this.state.addressLine1}
          addressLine2={this.state.addressLine2}
          postcode={this.state.postcode}
          onChange={this.handleChange}
        />
      </Wizard>
    );
  }
}

CheckoutForm.propTypes = {
  createSource: React.PropTypes.func.isRequired,
  errorHandler: React.PropTypes.func.isRequired
};

function mapStateToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, {createSource, errorHandler})(CheckoutForm);
