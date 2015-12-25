'use strict';
const JobRun = require('../models/jobRuns');
const _ = require('lodash');
const Promise = require('bluebird');
const JobTouch = require('../models/jobTouches');

class Job {
  constructor(query) {
    this.GROUP = 'overwrite';
    this.TITLE = 'overwrite';
    this.TABLE = 'overwrite';
    this.query = query || {};
  }

  findPreviousIDs() {
    return JobTouch
      .find({
        group: this.GROUP,
        title: this.TITLE,
        table: this.TABLE
      })
      .then( touches => touches.map( touch => touch.reference ) );
  }

  find() {
    return Promise.resolve([]);
  }

  processRecord(r) {
    return Promise.resolve(r);
  }

  run() {
    console.log('Starting', this.constructor.name);
    return JobRun.create({
      group: this.GROUP,
      title: this.TITLE
    })
    .then( run => {
      this.run = run;
      return this.findPreviousIDs();
    })
    .then( ids => {
      this.query = _.extend(this.query, { _id: {$nin: ids}});
      return this.find();
    })
    .then( records => {
      console.log('found', records.length, 'docs to process');
      return Promise.map(records, record => this.processRecord(record) );
    })
    .then( records => {
      return Promise.map(records, record => JobTouch.create({
        title: this.TITLE,
        group: this.GROUP,
        run: this.run,
        table: this.TABLE, 
        reference: record._id
      }));
    })
    .then( runTouches => {
      this.run.recordsTouched = runTouches.length;
      return this.run.save();
    });
  }
}

module.exports = Job;