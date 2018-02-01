const keys = require('../config/main');
const stripe = require('stripe')(keys.stripe_secret_key);


function updatePaymentDetails(user, details) {
  const CUSTOMER_ID = user.stripe.customerId;
  return stripe.customers.update({ CUSTOMER_ID }, details);
}

function cancelSubscription(customerId) {
  return stripe.subscriptions.del(customerId);
}

module.exports = cancelSubscription;
module.exports = updatePaymentDetails;