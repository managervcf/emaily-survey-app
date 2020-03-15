// Import mongoose helper functions
const { Schema, model } = require('mongoose');

// Import subdocument schema
const recipientSchema = require('./recipient');

// Define schema
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});

// Create model
model('Survey', surveySchema);
