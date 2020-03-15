// Import statements
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Import keys
const {
  googleClientID,
  googleClientSecret,
  redirectDomain
} = require('../config/keys');

// Use User model
const User = mongoose.model('User');

// Serialize/deserialize user with an id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    // Configure keys and redirect domain
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: `${redirectDomain}/auth/google/callback`,
      proxy: true
    },
    // Configure function that signs up user or logs in if already exists
    async (accessToken, refreshToken, profile, done) => {
      let existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      let savedUser = await new User({ googleId: profile.id }).save();
      done(null, savedUser);
    }
  )
);
