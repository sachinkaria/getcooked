const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/main');

class Mailer extends helper.Mail {
  constructor({ subject, recipient }, content) {
    super();

    this.sendGridApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('team@getcooked.co');
    this.subject = subject;
    this.recipient = new helper.Email(recipient);
    this.body = new helper.Content('text/html', content);

    this.addContent(this.body);
    this.addRecipient();
  }

  addRecipient() {
    const personalize = new helper.Personalization();
    personalize.addTo(this.recipient);
    this.addPersonalization(personalize);
  }

  send() {
    const request = this.sendGridApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    return this.sendGridApi.API(request);
  }
}

module.exports = Mailer;
