const { model } = require('mongoose');
const { Path } = require('path-parser');
const { URL } = require('url');

const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');

const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Mailer = require('../services/mailer');
const Survey = model('Survey');

module.exports = app => {
  // Route that end user is send back to after providing feedback
  app.get('/api/surveys/:surveyId/:choice', (req, res) =>
    res.send('Thanks for voting!')
  );

  app.post('/api/surveys/webhooks', async (req, res) => {
    // Create a pathSchema providing a schema of our route
    const pathSchema = new Path('/api/surveys/:surveyId/:choice');
    // Print out entire sendgrid response body
    console.log('\n\nRequestBody\n\n', req.body);

    // Parse the post request from Sendgrid
    const parsedEvents = req.body
      // Map over and return an object with email, surveyId, choice or undefined
      .map(({ url, email }) => {
        // Extract path from the URL user clicked
        const { pathname } = new URL(url);
        // Test the path of the URL user clicked against our route schema
        const urlMatch = pathSchema.test(pathname);
        //  Return an object or undefined
        return urlMatch
          ? { email, surveyId: urlMatch.surveyId, choice: urlMatch.choice }
          : undefined;
      })
      // Filter our undefined elements
      .filter(event => event !== undefined)
      // Remove duplicates where email and surveyId is the same
      .filter(
        (event, index, eventArray) =>
          eventArray.findIndex(
            e => e.email === event.email && e.surveyId === event.surveyId
          ) === index
      );

    // Print out parsed events
    console.log('\n\nParsed events\n\n', parsedEvents);

    // Send empty object to sendgrid
    res.send({});

    //// Update database
    // Find a survey with all the criteria and update it
    const responses = await Promise.all(
      parsedEvents.map(({ email, surveyId, choice }) =>
        // Build a query
        Survey.updateOne(
          // Criteria
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false }
            }
          },
          // Update data
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        )
          // Execute query
          .exec()
      )
    );

    // Print out response from MongoDB
    console.log('\n\nResponse from MongoDB\n\n', responses);
  });

  // Route handling creating new survey
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
    const newMailer = new Mailer(newSurvey, surveyTemplate(newSurvey));

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
