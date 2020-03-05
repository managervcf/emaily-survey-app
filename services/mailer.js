const sgMail = require('@sendgrid/mail');
const { sendgridKey } = require('../config/keys');

class Mailer {
  constructor({ subject, recipients }, content) {
    sgMail.setApiKey(sendgridKey);
    this.email = {
      to: recipients.map(({ email }) => email),
      from: 'no-reply@emaily.com',
      subject,
      html: content,
      trackingSettings: { enable_text: true, enabled: true },
      isMultiple: true
    };
  }

  async send() {
    return await sgMail.send(this.email);
  }
}

module.exports = Mailer;
