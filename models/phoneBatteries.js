'use strict';

const mongoose = require('mongoose');
const timeseriesPlugin = require('./timeseriesPlugin');

const PhoneBatteriesSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  isPlugged: Boolean
});

// need 2 setters, one for 
// 
PhoneBatteriesSchema.virtual('level').set( v => {
  this.value = v;
});

timeseriesPlugin.add(PhoneBatteriesSchema, 'PhoneBattery');
module.exports = mongoose.model('PhoneBattery', PhoneBatteriesSchema);