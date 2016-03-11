'use strict';

const mongoose = require('mongoose');
const timeseriesPlugin = require('./timeseriesPlugin');

const PhoneBatteriesSchema = new mongoose.Schema({
  isPlugged: Boolean,
  level: { type: Number }
}, { strict: false, collection: 'phoneBattery'});

PhoneBatteriesSchema.pre('validate', function(next) {
  if(!this.__date) { this.__date = new Date(); }
  next();
});

timeseriesPlugin.add(PhoneBatteriesSchema, 'PhoneBattery');
module.exports = mongoose.model('PhoneBattery', PhoneBatteriesSchema, null, {
  transformer: function(doc) {
    doc = doc.toObject();
    doc.value = doc.level;
    return doc;
  }
});