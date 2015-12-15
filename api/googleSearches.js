'use strict';
const express = require('express');
const router = express.Router();
const config = require('../config');
module.exports = router;

const model = require('../models/googleSearches');

// we're not ready to publish that shit
router.get('/', function(req, res, next) {
  res.status(501).end();
});

router.get('/latest', function(req, res, next) {
  model.findOne().sort({__date: -1})
    .then( search => res.send(search.__date || new Date('04/29/1991')) )
    .catch(next);
});

router.post('/bulk', function(req, res, next) {
  model.processGoogleEvents(req.body)
    .then( events => res.status(201).json({ message: `${events.length} events processed`}) )
    .catch(next);
});