'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config');
mongoose.connect(config.mongoURI);

module.exports = {
  Photo: require('./photos'),
  GoogleSearche: require('./googleSearches'),
  Screenshot: require('./screenshots'),
  JobRun: require('./jobRuns'),
  JobTouche: require('./jobTouches')
};