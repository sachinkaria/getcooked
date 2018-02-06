const _ = require('lodash');
const request = require('superagent');
const keys = require('../config/main');
const stripe = require('stripe')(keys.stripe_secret_key);

module.exports.createCustomer = createCustomer;
module.exports.createSource = createSource;
module.exports.getSource = getSource;
module.exports.getSubscription = getSubscription;
module.exports.cancelSubscription = cancelSubscription;
module.exports.resumeSubscription = resumeSubscription;

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

function getSubscription(req, res) {
  const SUBSCRIPTION_ID = req.params.id;

  stripe.subscriptions.retrieve(
    SUBSCRIPTION_ID,
    (err, subscription) => {
      if (err) return err;
      const plan = subscription.plan;
      const currentPeriodEnd = subscription.current_period_end;
      res.jsonp({ plan, currentPeriodEnd });
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
      sendNewStripeCustomerSlackWebhook(user);
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
    stripe.customers.createSource(customerId, { source }, (err, newSource) => {
      if (err) return err;

      const sourceId = newSource.id;
      const sourceClientSecret = newSource.client_secret;
      user = _.extend(user, { stripe: { customerId, sourceId, sourceClientSecret } });
      user.save();
      sendNewStripeSourceSlackWebhook(user);
      res.jsonp(user);
    });
  } else {
    res.jsonp(user);
  }
}

function resumeSubscription(req, res) {
  const USER = req.user;

  console.log('Adding subscription to user ', USER.stripe.customerId);
  stripe.subscriptions.create({
    customer: USER.stripe.customerId,
    items: [{
      plan: 'basic_monthly'
    }]
  }, (err, subscription) => {
    if (err) return err;

    USER.subscription.id = subscription.id;
    USER.subscription.plan = subscription.plan.id;
    USER.subscription.currency = subscription.plan.currency;
    USER.subscription.status = 'active';
    USER.status = 'listed';
    USER.save();
    res.sendStatus(200);
  });
}

function cancelSubscription(req, res) {
  const USER = req.user;
  const SUBSCRIPTION_ID = USER.subscription.id;
  console.log('Cancelling subscription for user ', USER.stripe.customerId);

  stripe.subscriptions.del(SUBSCRIPTION_ID);
  USER.subscription.status = 'cancelled';
  USER.subscription.id = undefined;
  USER.subscription.plan = undefined;
  USER.status = 'unlisted';
  USER.save((err) => {
    if (err) return err;
    res.sendStatus(200);
  });
}

function sendNewStripeSourceSlackWebhook(user) {
  if (process.env.NODE_ENV === 'production') {
    request
      .post(keys.slackStripeWebHookUrl)
      .send({
        text: `${user.email} just added a new payment card.`
      })
      .end();
  }
}

function sendNewStripeCustomerSlackWebhook(user) {
  if (process.env.NODE_ENV === 'production') {
    request
      .post(keys.slackStripeWebHookUrl)
      .send({
        text: `${user.email} just signed up as a stripe customer.`
      })
      .end();
  }
}
