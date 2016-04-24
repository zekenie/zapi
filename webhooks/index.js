'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const plaid = require('plaid');
const config = require('../config');
const Promise = require('bluebird');
const plaidClient = new plaid.Client(config.plaid.clientId, config.plaid.secret, plaid.environments.production);

const transformIds = arr => arr.map( obj => {
  obj.plaid_id = obj._id;
  delete obj._id;
  return obj;
});

router.use(bodyParser.json({ limit: '300kb' }));
router.post('/plaid', (req, res, next) => {
  mongoose.model('PlaidWebhook').create(req.body)
    .catch(next)
    .then( () => res.status(201).end() )
    .then( doc => {
      return new Promise(function(resolve, reject) {
        plaidClient.getConnectUser(doc.access_token, function(err, response) {
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
    })
    .then((docTypes) => {
      console.log('processed transactions', docTypes);
      Object.keys(docTypes).forEach(key => {
        docTypes[key] = docTypes[key].map( docObj => mongoose.model(key).findOrCreate({ plaid_id: docObj.plaid_id }, docObj) )
      })
      return Promise.props(docTypes);
    })
    .catch( err => console.error(err,err.stack) );
});

module.exports = router;