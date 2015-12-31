'use strict';
const express = require('express');
const router = express.Router();
const model = require('../models/phoneBatteries');
module.exports = router;

router.post('/', (req, res, next) => {
  model.create(req.body)
    .then( doc => res.status(201).json(doc) )
    .catch(next);
});