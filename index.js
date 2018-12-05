// Require statements
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

// Are we in production check
const isInProduction = process.env.NODE_ENV === 'production';

// Loading models
require('./models/user');

// Passport configuration
require('./services/passport');

// Connect to mlab database
mongoose.connect(
	keys.mongoURI,
	{ useNewUrlParser: true }
);

// Create express app
const app = express();

// Application middleware
app.use(
	cookieSession({
		// Cookie expiry in ms
		maxAge: 30 * 23 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

// Require authRoutes and execute with express app as an argument
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// Handle unrecognized routes and assets in production
if (isInProduction) {
	app.use(express.static('client/build'));
	const path = require('path');
	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	);
}

// Start the server
const port = process.env.PORT || 5000;
app.listen(port);
