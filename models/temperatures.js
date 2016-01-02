'use strict';

const mongoose = require('mongoose');
const timeseriesPlugin = require('./timeseriesPlugin');

const TemperatureSchema = new mongoose.Schema({
  value: { type: Number, required: true }
});

module.exports = mongoose.model('Temperature', TemperatureSchema);
timeseriesPlugin.add(TemperatureSchema, 'Temperature');