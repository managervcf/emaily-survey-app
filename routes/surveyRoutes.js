const { model } = require('mongoose');

const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');

const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = model('Survey');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    // Build a survey object
    const survey = {
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      user: req.user.id,
      dateSent: Date.now()
    };

    // Create new survey based on Survey model
    let newSurvey = await Survey.create(survey);

    // Create new mailer instance
    const newMailer = new Mailer(newSurvey, surveyTemplate(newSurvey.body));

    try {
      // Send an email
      await newMailer.send();

      // Save user to the databse
      await newSurvey.save();

      // Subtract a credit from a user
      req.user.credits -= 1;

      // Save user to the database
      const user = await req.user.save();

      // Send back user to client side
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(422).send(error);
    }
  });
};
