const mongoose = require('mongoose');

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

subscriberSchema.index({ ip: 1 });
subscriberSchema.index({ clientId: 1 });

const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber };
