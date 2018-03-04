import React, { PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

function PaymentForm({ ...props }) {
  return (
    <Panel>
      <h3 className="gc-text">Please note your subscription will not start until you have received your first enquiry. You will not be charged until you start receiving bookings!</h3>
      <div className="gc-center">
        <img className="gc-margin-top--lg gc-margin-bottom--lg gc-icon gc-icon--stripe" alt="Powered by stripe" src="/images/powered_by_stripe.svg"/>
      </div>
      <div>
        <label className="gc-margin-bottom">
          Credit or debit card
        </label>
        <div id="card-element" className="gc-margin-bottom" />
        <div id="card-errors" role="alert" />
        <label>
          Name
        </label>
        <input type="text" className="gc-input" name="name" value={props.name} onChange={props.onChange} />
        <label>
          Name or Number
        </label>
        <input type="text" className="gc-input" name="addressLine1" value={props.addressLine1} onChange={props.onChange} />
        <label>
          Street Name
        </label>
        <input type="text" className="gc-input" name="addressLine2" value={props.addressLine2} onChange={props.onChange} />
        <label>
          City
        </label>
        <input type="text" className="gc-input" name="city" value={props.city} onChange={props.onChange} />
        <label>
          Postcode
        </label>
        <input type="text" className="gc-input" name="postcode" value={props.postcode} onChange={props.onChange} />
      </div>
    </Panel>
  );
}

PaymentForm.propTypes = {
  name: PropTypes.string.isRequired,
  addressLine1: PropTypes.string.isRequired,
  addressLine2: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  postcode: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default PaymentForm;
