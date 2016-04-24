'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promise = require('bluebird');

router.use(bodyParser.json({ limit: '300kb' }));
router.post('/plaid', (req, res, next) => {
  mongoose.model('PlaidWebhook').create(req.body)
    .catch(next)
    .then( () => res.status(201).end() )
    .then( doc => doc.scrapeDetails())
    .catch( err => console.error(err,err.stack) );
});

module.exports = router;