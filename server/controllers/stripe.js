const _ = require('lodash');

const keys = require('../config/main');
const stripe = require('stripe')(keys.stripe_secret_key);

module.exports.createCustomer = createCustomer;
module.exports.createSource = createSource;
module.exports.getSource = getSource;

/**
 * Update customer id for user
 */

function getSource(req, res) {
  const SOURCE_ID = req.params.id;

  stripe.sources.retrieve(
    SOURCE_ID,
    (err, response) => {
      if (err) return (err);

      const card = {
        brand: response.card.brand,
        last4: response.card.last4,
        expMonth: response.card.exp_month,
        expYear: response.card.exp_year
      };
      return res.jsonp({ card });
    }
  );
}
function createCustomer(req, res) {
  let user = req.user;

  if (!req.user.stripe.customerId) {
    console.log('Creating customer');
    stripe.customers.create({ email: req.user.email }, (err, response) => {
      if (err) return err;

      const customerId = response.id;
      user = _.extend(user, { stripe: { customerId }});
      user.save();
      res.send(user);
    });
  } else {
    res.jsonp(user);
  }
}

function createSource(req, res) {
  console.log('Creating and attaching source');
  let user = req.user;
  const source = req.body.source.id;
  const customerId = req.user.stripe.customerId;

  if (!req.user.stripe.sourceId) {
    stripe.customers.createSource(customerId, {source}, (err, newSource) => {
      if (err) return err;

      const sourceId = newSource.id;
      const sourceClientSecret = newSource.client_secret;
      user = _.extend(user, { stripe: { customerId, sourceId, sourceClientSecret } });
      user.save();
      res.jsonp(user);
    });
  } else {
    res.jsonp(user);
  }
}

