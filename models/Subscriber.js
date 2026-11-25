const crypto = require('crypto');
const mongoose = require('mongoose');

function newUnsubscribeToken() {
  return crypto.randomBytes(24).toString('hex');
}

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  ip: {
    type: String,
    trim: true,
    index: true,
    default: ''
  },
  clientId: {
    type: String,
    trim: true,
    index: true,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  },
  source: {
    type: String,
    trim: true,
    default: ''
  },
  unsubscribeToken: {
    type: String,
    index: true,
    default: newUnsubscribeToken
  },
  unsubscribedAt: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active'
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber, newUnsubscribeToken };
