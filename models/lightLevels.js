'use strict';

const mongoose = require('mongoose');
const timeseriesPlugin = require('./timeseriesPlugin');

const LightLevelSchema = new mongoose.Schema({
  value: { type: Number, required: true }
});

module.exports = mongoose.model('LightLevel', LightLevelSchema);
timeseriesPlugin.add(LightLevelSchema, 'LightLevel');