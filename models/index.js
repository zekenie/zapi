'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config');
mongoose.connect(config.mongoURI);

module.exports = {
  Temperature: require('./temperatures'),
  LightLevel: require('./lightLevels'),
  Photo: require('./photos'),
  PhoneBattery: require('./phoneBatteries'),
  GoogleSearch: require('./googleSearches'),
  Screenshot: require('./screenshots'),
  JobRun: require('./jobRuns'),
  JobTouch: require('./jobTouches')
};