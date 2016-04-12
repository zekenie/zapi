'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
const PlaidWebhookSchema = new mongoose.Schema({}, {
  strict: false,
  timestamps: true
});

module.exports = mongoose.model('PlaidWebhook', PlaidWebhookSchema);