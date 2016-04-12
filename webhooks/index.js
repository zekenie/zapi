'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json({ limit: '300kb' }));
router.post('/plaid', (req, res, next) => {
  mongoose.model('PlaidWebhook').create(req.body)
    .then( () => res.status(201).end() )
    .catch(next);
});

module.exports = router;