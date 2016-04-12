'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const model = require('../models').money.PlaidWebhook;

router.use(bodyParser.json({ limit: '300kb' }));
router.post('/plaid', (req, res, next) => {
  model.create(req.body)
    .then( () => res.status(201).end() )
    .catch(next);
});

module.exports = router;