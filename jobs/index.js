'use strict';
const config = require('../config');
const models = require('../models');
const Agenda = require('agenda');
const agenda = new Agenda({ db: { address: config.jobsDb } });

const AddDatesToScreenshots = require('./screenshots/addDates');

agenda.define('grab dates from screenshots', function() {
  new AddDatesToScreenshots().run();
});

agenda.on('ready', function() {
  agenda.every('3 minutes', 'grab dates from screenshots');
});