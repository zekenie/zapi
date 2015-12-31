'use strict';
const express = require('express');
const router = express.Router();
const fallback = require('./fallback');
const bodyParser = require('body-parser');
module.exports = router;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: '300kb' }));

router.use('/photos', require('./photos'));
router.use('/screenshots', require('./screenshots'));
router.use('/phoneBattery', require('./phoneBatteries'));

router.use('/timeseries', require('./timeseries'));


router.use('/googleSearches', require('./googleSearches'));
// if we don't have a specail route defined, see if we can just catch the data
router.use(fallback);

router.use(function(err, req, res, next) {
  console.log(err);
  console.log(err.stack);
  res.status(err.status || err.statusCode || 500).json({ message: err.message });
});