const keys = require('../config/main');
const stripe = require('stripe')(keys.stripe_secret_key);

function createCustomer(user) {
  const email = user.email;
  return stripe.customers.create({ email });
}

function createBasicSubscription(user) {
  return stripe.subscriptions.create({
    customer: user.stripe.customerId,
    items: [{ plan: 'basic_monthly' }]
  });
}

function updatePaymentDetails(user, details) {
  const CUSTOMER_ID = user.stripe.customerId;
  return stripe.customers.update({CUSTOMER_ID}, details);
}

module.exports = createCustomer;
module.exports = createBasicSubscription;
module.exports = updatePaymentDetails;