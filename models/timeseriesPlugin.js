'use strict';

const collections = [ ];
const _ = require('lodash');

const plugin = (schema) => {
  schema.add({ __date: { type: Date, required: true} });
};

exports.add = function(schema, collection) {
  schema.plugin(plugin);
  collections.push(collection);
};

exports.list = function() {
  module.exports = _.clone(collections);
};