'use strict';

const mongoose = require('mongoose');
const timeseriesPlugin = require('./timeseriesPlugin');

const LightLevelSchema = new mongoose.Schema({
  value: { type: Number, required: true }
});

timeseriesPlugin.add(LightLevelSchema, 'LightLevel');
mongoose.model('LightLevel', LightLevelSchema);