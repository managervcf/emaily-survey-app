// Import mongoose helper functions
const { Schema, model } = require('mongoose');

// Define schema
const userSchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0
  }
});

// Create model
model('User', userSchema);
