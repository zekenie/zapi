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

const plugin = (schema) => {

  schema.add({
    __date: { type: Date, required: true, index: true },
    dateApproximate: Boolean
  });

  if(!schema.methods.transformer) {
    schema.methods.transformer = function() {
      return this.toObject();
    };
  }

  schema.statics.range = function(start, end) {
    const query = composeDateQuery(start, end);
    return this.find(query).select('-__v')
      .then(docs => {
        return Promise.map( docs, doc => {
          return doc.transformer();
        });
      });
  };
};

exports.add = function(schema, collection, klass) {
  schema.plugin(plugin);
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