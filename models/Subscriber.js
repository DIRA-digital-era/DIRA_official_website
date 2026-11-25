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
  confirmToken: {
    type: String,
    index: true
  },
  confirmSentAt: { type: Date },
  confirmedAt: { type: Date },
  // Gmail ignores dots and "+tags": the same inbox under another spelling is one subscriber.
  inboxKey: { type: String, index: true },
  excludedReason: { type: String },
  excludedAt: { type: Date },
  status: {
    type: String,
    // pending: signed up, has not clicked the confirmation link yet (gets no articles)
    // excluded: removed from mailings by the list clean-up (bot sign-ups); never deleted
    enum: ['pending', 'active', 'unsubscribed', 'excluded'],
    default: 'pending'
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
