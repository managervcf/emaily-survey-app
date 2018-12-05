const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleware/requireLogin');

// Export a route function
module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		// Charge user
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			source: req.body.id,
			description: '$5 for 5 credits'
		});
		// Update user credits
		req.user.credits += 5;
		// Save user model to the database
		const updatedUser = await req.user.save();
		// Send updated user info to the browser
		res.send(updatedUser);
	});
};
