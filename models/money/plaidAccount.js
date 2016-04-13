'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
const PlaidAccountSchema = new mongoose.Schema({
  plaid_id: { type: String, required: true, unique: true }
}, {
  strict: false,
  timestamps: true
});

PlaidAccountSchema.plugin(require('../findOrCreatePlugin'));


module.exports = mongoose.model('PlaidAccount', PlaidAccountSchema);