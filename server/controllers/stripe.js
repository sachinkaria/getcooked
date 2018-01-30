const _ = require('lodash');

const keys = require('../config/main');
const stripe = require('stripe')(keys.stripe_secret_key);

module.exports.createCustomer = createCustomer;

/**
 * Update customer id for user
 */
function createCustomer(req, res) {
  let user = req.user;

  stripe.customers.create({ email: req.user.email }, (err, response) => {
    if (err) return err;

    const customerId = response.id;
    user = _.extend(user, { stripe: { customerId } });
    user.save();
    res.jsonp(user);
  });
}

