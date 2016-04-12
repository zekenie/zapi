'use strict';

const router = module.exports = require('express').Router;
const bodyParser = require('body-parser');
const model = require('../models').money.PlaidWebhook;

router.use(bodyParser.json());
router.post('/plaid', (req, res, next) => {
  model.create(req.body)
    .then( () => res.status(201).end() )
    .catch(next);
});