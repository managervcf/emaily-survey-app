// Import mongoose helper functions
const { Schema, model } = require('mongoose');

// Define schema
const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

// Export schema
module.exports = recipientSchema;
