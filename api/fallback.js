'use strict';
const express = require('express');
const router = express.Router();

const db = require('../db');


// list collections
router.get('/', function(req, res, next) {
  db.getCollections()
    .then(function(collections) {
      res.json(collections);
    })
    .catch(next);
});

router.use('/:collection', function(req, res, next) {
  req.collection = db.collection(req.params.collection);
  next();
});

// list records of collection
router.get('/:collection', function(req, res, next) {
  req.collection.query(req.query || {})
    .then(function(data) {
      console.log(data);
      res.json(data);
    })
    .catch(next);
});

// add to collection
router.post('/:collection', function(req, res, next) {
  req.collection.insert(req.body)
    .then(function(doc) {
      res.status(201).json(doc);
    })
    .catch(next);
});

// get one from collection
// router.get('/:collection/:id');
// // update one
// router.put('/:collection/:id');

module.exports = router;