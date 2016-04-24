'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('../../config');
const plaid = require('plaid');
const plaidClient = new plaid.Client(config.plaid.clientId, config.plaid.secret, plaid.environments.production);
const PlaidWebhookSchema = new mongoose.Schema({
  access_token: String
}, {
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
    plaidClient.getConnectUser(this.access_token, {
      gte: '5 days ago',
    }, (err, response) => {
      if(err) { return reject(err); }
      response.transactions = transformIds(response.transactions);
      response.accounts = transformIds(response.accounts);
      resolve({
        PlaidAccount: response.accounts,
        PlaidTransaction: response.transactions
      });
    });
  })
  .then(docTypes => {
      console.log('processed transactions', docTypes);
      Object.keys(docTypes).forEach(key => {
        docTypes[key] = docTypes[key].map( docObj => mongoose.model(key).findOrCreate({ plaid_id: docObj.plaid_id }, docObj) )
      })
      return Promise.props(docTypes);
    });
};

module.exports = mongoose.model('PlaidWebhook', PlaidWebhookSchema);