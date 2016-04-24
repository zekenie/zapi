'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('../config');
const plaid = require('plaid');
const plaidClient = new plaid.Client(config.plaid.clientId, config.plaid.secret, plaid.environments.production);
const PlaidWebhookSchema = new mongoose.Schema({}, {
  strict: false,
  timestamps: true
});

const transformIds = arr => arr.map( obj => {
  obj.plaid_id = obj._id;
  delete obj._id;
  return obj;
});

PlaidWebhookSchema.methods.scrapeDetails = function() {
  return new Promise((resolve, reject) => {
    plaidClient.getConnectUser(this.access_token, (err, response) => {
      if(err) { return reject(err); }
      console.log('recieved user info')
      response.transactions = transformIds(response.transactions);
      response.accounts = transformIds(response.accounts);
      resolve({
        PlaidAccount: response.accounts,
        PlaidTransaction: response.transactions
      });
    });
  });
};

module.exports = mongoose.model('PlaidWebhook', PlaidWebhookSchema);