// Import stripe key
const { stripeSecretKey } = require('../config/keys');

// Import stripe and immidiately configure it with secret key
const stripe = require('stripe')(stripeSecretKey);

// Import middleware
const requireLogin = require('../middleware/requireLogin');

// Export a function that will be invoked with an app object
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // Charge user
    let charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      source: req.body.id,
      description: '$5 for 5 credits'
    });

    // Update user credits
    req.user.credits += 5;

    // Save user model to the database
    let updatedUser = await req.user.save();

    // Send updated user info to the browser
    res.send(updatedUser);
  });
};
