'use strict';

const mongoose = require('mongoose');
const timeseriesPlugin = require('./timeseriesPlugin');

const TemperatureSchema = new mongoose.Schema({
  value: { type: Number, required: true }
});

timeseriesPlugin.add(TemperatureSchema, 'Temperature');
module.exports = mongoose.model('Temperature', TemperatureSchema);