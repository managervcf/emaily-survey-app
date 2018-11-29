// Require statements
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

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

// Require authRoutes and execute with app as an argument
require('./routes/authRoutes')(app);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port);
