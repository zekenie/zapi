'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');
const collections = {};
const _ = require('lodash');

const composeDateQuery = (start, end) => {
  const query = {};
  if(start) {
    query.__date = { $gte: new Date(start) };
  }
  if(end) {
    query.__date = query.__date || {};
    query.__date.$lte = new Date(end);
  }
  return query;
};

const plugin = (schema, config) => {

  schema.add({
    __date: { type: Date, required: true, index: true },
    dateApproximate: Boolean
  });

  schema.statics.range = function(start, end) {
    const query = composeDateQuery(start, end);
    return this.aggregate({ $match: query }).sample(5000).exec()
      .then(docs => {
        if(!config.transformer) { return docs; }
        return Promise.map(docs, config.transformer);
      });
  };
};

exports.add = function(schema, collection, klass, config) {
  schema.plugin(plugin, config);
  process.nextTick(function() {
    collections[collection] = klass || mongoose.model(collection);
  });
};

exports.get = function(collection) {
  return collections[collection];
};

exports.list = function() {
  return Object.keys(collections);
};