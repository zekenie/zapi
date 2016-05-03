'use strict';
const mongoose = require('mongoose');
const express = require('express');
const bluebird = require('bluebird');
const router = express.Router();
const timeseriesPlugin = require('../models/timeseriesPlugin');

const bulkAdd = (collection, array) => bluebird.map(array, el => mongoose.model(collection).create(el).then(function() {}), {
  concurrency: 150
});

router.get('/', (req, res, next) => {
  try {
    res.json(timeseriesPlugin.list());
  } catch(e) {
    next(e);
  }
});

router.post('/bulk', (req, res, next) => {
  return bluebird.map(Object.keys(req.body), key => bulkAdd(key, req.body[key]) )
    .then( () => res.status(201).end() )
    .catch(next);
});

router.get('/:dataset', (req, res, next) => {
  req.query.start = req.query.start || new Date(Date.now() - 1000*60*60*24);
  req.query.end = req.query.end || new Date();
  mongoose.model(req.params.dataset)
    .range(req.query.start, req.query.end)
    .then( objs => res.json(objs) )
    .catch(next);
});

module.exports = router;
