'use strict';
const config = require('../config');
const models = require('../models');
const Agenda = require('agenda');
const agenda = new Agenda({ db: { address: config.jobsDb } });

const AddDatesToScreenshots = require('./screenshots/addDates');
const ExifJob = require('./photos/exif');
const ResizePhotosJob = require('./photos/resize');
const ResizeScreenshotsJob = require('./screenshots/resize');

agenda.define('grab dates from screenshots', function(job, done) {
  new AddDatesToScreenshots().run()
    .then( () => done(), done);
});

agenda.define('pull exif from photos', function(job, done) {
  new ExifJob().run()
    .then( () => done(), done);
});

agenda.define('resize photos', function(job, done) {
  new ResizePhotosJob().run()
    .then( () => done(), done);
});

agenda.define('resize screenshots', function(job, done) {
  new ResizeScreenshotsJob().run()
    .then( () => done(), done);
});

agenda.on('ready', function() {
  console.log('job system ready');
  // agenda.every('3 minutes', 'grab dates from screenshots');
  agenda.every('3 minutes', 'pull exif from photos');
  agenda.every('2 minutes', 'resize photos');
  agenda.every('2 minutes', 'resize screenshots');
  agenda.start();
});