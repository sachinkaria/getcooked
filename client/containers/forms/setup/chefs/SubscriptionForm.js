import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Panel, Row, Col, Button } from 'react-bootstrap';
import { getCurrentUser } from '../../../../actions/users';
import { getSubscription, getSource } from '../../../../actions/stripe';

class SettingsForm extends Component {
  componentWillMount() {
    this.props.getCurrentUser();
    this.state = {
      card: null,
      plan: null,
      currentPeriodEnd: ''
    };
  }

  componentWillReceiveProps() {
    if (this.props.user.stripe.sourceId) {
      this.props.getSource(this.props.user.stripe.sourceId);
    }

    if (this.props.user.subscription.status === 'active') {
      this.props.getSubscription(this.props.user.subscription.id);
    }
  }

  renderContent() {
    const { user, card, plan, subscriptionEndDate } = this.props;
    const RENEWAL_DATE = moment.unix(subscriptionEndDate).format('MMMM Do YYYY');
    return (
      <div>
        {(plan && user.subscription.status === 'active') ?
          <div>
            <p className="gc-text">You&#39;re currently subscribed to our <span className="gc-bold">{plan.name}&nbsp;</span>plan.</p>
            <p className="gc-text">Your plan will automatically renew on<span className="gc-bold">&nbsp;{RENEWAL_DATE}&nbsp;</span>and you&#39;ll be
              charged<span className="gc-bold">&nbsp;£20&nbsp;</span>on your preferred payment method below.</p>
          </div>
          :
          <p className="gc-text">
            Your subscription is currently not active.
            Your subscription will start after you receive your first booking request.
            Please ensure your payment details are upto date.
          </p>
        }
        {card &&
          <div>
            <hr />
            <Row>
              <Col xs={10} xsOffset={1} sm={6} smOffset={3}>
                <h4 className="gc-text gc-bold text-center">Payment Method</h4>
                <Panel className="gc-panel--alert">
                  <p className="gc-text gc-bold text-uppercase">{card.brand}</p>
                  <p className="gc-text gc-bold text-center">**** **** **** {card.last4}</p>
                  <p className="gc-text gc-bold text-center">Expires: {card.expMonth}/{card.expYear}</p>
                </Panel>
              </Col>
            </Row>
            <hr />
            <Row className="text-center">
              <Col xs={6}>
                <Button className="gc-btn gc-btn-white">Edit Payment Method</Button>
              </Col>
              <Col xs={6}>
                <Button className="gc-btn btn-danger">Cancel Subscription</Button>
              </Col>
            </Row>
          </div>
        }
      </div>
    );
  }

  render() {
    return (
      (this.props.user) ?
        <div>
          {this.renderContent()}
        </div>
        :
        <div className="text-center">
          <span className="gc-icon gc-icon--xl gc-icon--loading" />
          <div>
            Loading...
          </div>
        </div>
    );
  }
}

SettingsForm.propTypes = {
  getCurrentUser: React.PropTypes.func.isRequired,
  getSubscription: React.PropTypes.func.isRequired,
  getSource: React.PropTypes.func.isRequired,
  subscriptionEndDate: React.PropTypes.number,
  errorMessage: React.PropTypes.string
};

SettingsForm.defaultProps = {
  errorMessage: null,
  card: null,
  plan: null,
  subscriptionEndDate: null
};

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    user: state.user.data,
    plan: state.stripe.plan,
    card: state.stripe.card,
    subscriptionEndDate: state.stripe.end_date
  };
}

export default connect(mapStateToProps, { getCurrentUser, getSubscription, getSource })(SettingsForm);
