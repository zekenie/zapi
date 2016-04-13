'use strict';
const mongoose = require('mongoose');
const PlaidTransactionSchema = new mongoose.Schema({
  plaid_id: { type: String, required: true, unique: true }
}, {
  strict: false,
  timestamps: true
});

PlaidTransactionSchema.plugin(require('../findOrCreatePlugin'));

module.exports = mongoose.model('PlaidTransaction', PlaidTransactionSchema);