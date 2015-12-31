'use strict';

const mongoose = require('mongoose');
const timeseriesPlugin = require('./timeseriesPlugin');

const PhoneBatteriesSchema = new mongoose.Schema({
  value: { type: Number },
  isPlugged: Boolean,
  level: { type: Number }
}, { strict: false, collection: 'phoneBattery'});


PhoneBatteriesSchema.pre('validate', function(next) {
  if(!this.__date) { this.__date = new Date(); }
  if(!this.value) { this.value = this.level; }
  next();
});

timeseriesPlugin.add(PhoneBatteriesSchema, 'PhoneBattery');
module.exports = mongoose.model('PhoneBattery', PhoneBatteriesSchema);