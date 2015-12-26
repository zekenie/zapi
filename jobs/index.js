'use strict';
const config = require('../config');
const models = require('../models');
const Agenda = require('agenda');
const agenda = new Agenda({ db: { address: config.jobsDb } });

const AddDatesToScreenshots = require('./screenshots/addDates');
const ExifJob = require('./photos/exif');

agenda.define('grab dates from screenshots', function(done) {
  new AddDatesToScreenshots().run()
    .then( () => done(), done);
});

agenda.define('pull exif from photos', function(done) {
  new ExifJob().run()
    .then( () => done(), done);
});

agenda.on('ready', function() {
  console.log('job system ready');
  agenda.every('3 minutes', 'grab dates from screenshots');
  agenda.every('3 minutes', 'pull exif from photos');
  agenda.start();
});