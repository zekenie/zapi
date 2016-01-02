'use strict';

const mongoose = require('mongoose');
const timeseriesPlugin = require('./timeseriesPlugin');

const PhoneBatteriesSchema = new mongoose.Schema({
  isPlugged: Boolean,
  level: { type: Number }
}, { strict: false, collection: 'phoneBattery'});

PhoneBatteriesSchema.methods.transformer = function() {
  const doc = this.toObject();
  doc.value = this.level;
  return doc;
};

PhoneBatteriesSchema.pre('validate', function(next) {
  if(!this.__date) { this.__date = new Date(); }
  next();
});

module.exports = mongoose.model('PhoneBattery', PhoneBatteriesSchema);
timeseriesPlugin.add(PhoneBatteriesSchema, 'PhoneBattery');