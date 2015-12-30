'use strict';
const mongoose = require('mongoose');
const express = require('express');
const bluebird = require('bluebird');
const router = express.Router();
const timeseriesPlugin = require('../models/timeseriesPlugin');

const bulkAdd = (collection, array) => bluebird.map(array, el => mongoose.model(collection).create(el) );

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
  const query = {};
  if(req.query.start) {
    query.__date = { $gte: Date(req.query.start) };
  }
  if(req.query.end) {
    query.__date = query.__date || {};
    query.__date.$lte = Date(req.query.end);
  }
  mongoose.model(req.params.dataset).find(query)
    .then( values => res.json(values) )
    .catch(next);
});

module.exports = router;
