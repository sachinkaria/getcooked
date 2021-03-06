import React from 'react';
import {connect} from 'react-redux';
import { Row } from 'react-bootstrap';
import ContactDetailsForm from '../containers/forms/booking/ContactDetailsForm';
import DateAndPlaceForm from '../containers/forms/booking/DateAndPlaceForm';
import EventTypeGuestsAndBudgetForm from './forms/booking/EventTypeAndServiceForm';
import FoodServicesForm from '../containers/forms/booking/FoodServicesForm';
import AdditionalServicesForm from '../containers/forms/booking/AdditionalServicesForm';
import BudgetAdditionalInformationForm from '../containers/forms/booking/BudgetAdditionalInformationForm';
import {createBooking} from '../actions/bookings';
import {registerUser} from '../actions/auth';
import ProgressBar from '../components/ProgressBar';

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slide: 1 };
    this.baseState = this.state;

    this.signUpAndSubmitEvent = this.signUpAndSubmitEvent.bind(this);
    this.setSlide = this.setSlide.bind(this);
  }

  componentWillReceiveProps() {
    if (this.props.user.sent_booking_request) {
      this.hideModal();
    }
  }

  setSlide(value) {
    this.setState({ slide: value }, () => window.scrollTo(0, 0));
  }

  signUpAndSubmitEvent(event) {
    const EVENT = JSON.parse(sessionStorage.getItem('eventDetails'));
    if (!this.props.withoutChef) {
      heap.track('Submit Booking', { chef_id: this.props.chef.id, chef_name: this.props.chef.displayName });
    } else {
      heap.track('Submit Event', EVENT);
    }

    let BOOKING_VALUE = (parseInt(EVENT.budget) * 0.05).toFixed(2);
    if (BOOKING_VALUE > 200) BOOKING_VALUE = 200;
    
    window.gtag_report_conversion(undefined, BOOKING_VALUE);
    // this.props.onSubmit(event, this.props.endRoute);
    localStorage.token ? this.props.onSubmit(event, '/dashboard/events') : this.props.registerUser(event);
    this.props.closeModal();
  }

  render() {
    const styles = {
      marginLeft: '-114px',
      marginRight: '-114px',
      marginTop: '-20px'
    };
    return (
      <div>
        <div style={styles}>
          <ProgressBar
            progress={this.state.slide / (localStorage.token ? 5 : 6)}
          />
        </div>
        <Row>
          {this.state.slide === 1 &&
          <DateAndPlaceForm
            onSubmit={this.setSlide}
          />
          }
          {this.state.slide === 2 &&
          <EventTypeGuestsAndBudgetForm
            chef={this.props.chef}
            onSubmit={this.setSlide}
          />
          }
          {this.state.slide === 3 &&
          <FoodServicesForm
            withoutChef={this.props.withoutChef}
            onSubmit={this.setSlide}
          />
          }
          {this.state.slide === 4 &&
          <AdditionalServicesForm
            withoutChef={this.props.withoutChef}
            onSubmit={this.setSlide}
          />
          }
          {this.state.slide === 5 &&
          <BudgetAdditionalInformationForm
            withoutChef={this.props.withoutChef}
            onSubmit={localStorage.token ? this.signUpAndSubmitEvent : this.setSlide}
          />
          }
          {this.state.slide === 6 &&
          <ContactDetailsForm
            withoutChef={this.props.withoutChef}
            chef={this.props.chef}
            onSubmit={this.signUpAndSubmitEvent}
          />
        }
        </Row>
      </div>
    );
  }
}

BookingForm.PropTypes = {
  action: String.isRequired,
  withoutChef: Boolean,
  endRoute: String
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user,
    chef: state.public.chef && state.public.chef.profile
  };
}

export default connect(mapStateToProps, { registerUser })(BookingForm);
