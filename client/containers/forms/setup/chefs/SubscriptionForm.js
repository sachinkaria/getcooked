import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { getCurrentUser } from '../../../../actions/users';

class SettingsForm extends Component {
  componentWillMount() {
    this.props.getCurrentUser();
    this.state = {
      card: null
    };
  }

  componentDidMount() {
    const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
    if (this.props.user.stripe.sourceId) {
      axios.get(`/api/stripe/sources/${this.props.user.stripe.sourceId}`, AUTH_HEADERS).then((res) => {
        this.setState({
          card: res.data.card
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  render() {
    const { user } = this.props;
    const { card } = this.state;
    return (
      <div>
        {user.subscription.status === 'active' ?
          <div>
            <p className="gc-text">You&#39;re currently subscribed to our <span className="gc-bold">Basic Monthly</span> plan.</p>
            <p className="gc-text">Your plan will automatically renew on (date) and you&#39;ll be charged <span className="gc-bold">£20</span> on your preferred payment method below.</p>
          </div>
          :
          <p className="gc-text">Your subscription is currently not active.</p>
        }
        {this.state.card &&
          <Row>
            <Col xs={10} sm={6}>
              <h4 className="gc-text gc-bold">Payment Method</h4>
              <Panel className="gc-panel--alert">
                <p className="gc-text gc-bold text-uppercase">{card.brand}</p>
                <p className="gc-text gc-bold text-center">**** **** **** {card.last4}</p>
                <p className="gc-text gc-bold text-center">Expires: {card.expMonth}/{card.expYear}</p>
              </Panel>
            </Col>
          </Row>
        }
      </div>
    );
  }
}

SettingsForm.propTypes = {
  getCurrentUser: React.PropTypes.func.isRequired,
  errorMessage: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    errorMessage: state.user.error,
    user: state.user.data
  };
}

export default connect(mapStateToProps, { getCurrentUser })(SettingsForm);
