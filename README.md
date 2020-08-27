## Emaily Survey App

A full-stack automated survey app, that collects user feedback. Created with React and Redux on the front-end, Express, MongoDB and PassportJS on the back-end. App makes use of services such as Sendgrid for email sending, Stripe for accepting test credit card payments and Google OAuth for user authentication.

## Development

To succesfully run the app, you must create a `dev.js` file inside `/config` directory and export an object including:

```javascript
// dev.js
module.exports = {
  googleClientID: '<your-dev-value>',
  googleClientSecret: '<your-dev-value>',
  mongoURI: '<your-dev-value>',
  cookieKey: '<your-dev-value>',
  stripePublishableKey: '<your-dev-value>',
  stripeSecretKey: '<your-dev-value>',
  redirectDomain: '<your-dev-value>',
  sendgridKey: '<your-dev-value>',
};
```

Install dependencies using `npm i` both for server and client packages.

To boot the app in the development mode, run script `npm run dev`.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To test out billing, use the fake test credit card provided by Stripe: card number: `4242 4242 4242 4242` exp: `12/33`  cvc: `123`.  

## Production

For the deployed version, please visit [herokuapp.com](https://automated-survey-app.herokuapp.com/).
