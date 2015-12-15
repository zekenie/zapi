'use strict';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('../config');
mongoose.connect(config.mongoURI);

require('./photos');
require('./googleSearches');