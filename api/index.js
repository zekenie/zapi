'use strict';
const express = require('express');
const router = express.Router();
const fallback = require('./fallback');
module.exports = router;

router.use('/photos', require('./photos'));
// if we don't have a specail route defined, see if we can just catch the data
router.use(fallback);

router.use(function(err, req, res, next) {
  console.log(err);
  console.log(err.stack);
  res.status(err.status || err.statusCode || 500).json({ message: err.message });
});