'use strict';
const JobRun = require('../../models/jobRuns');
const _ = require('lodash');
const JobTouch = require('../models/jobTouches');

class Job {
  constructor(query) {
    this.GROUP = 'overwrite';
    this.TITLE = 'overwrite';
    this.COLLECTION = 'overwrite';
    this.query = query;
  }

  findPreviousIDs() {
    return JobTouch
      .find({
        group: this.GROUP,
        title: this.TITLE,
        collection: this.COLLECTION
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
      return Promise.map(records, record => this.processRecord(record) );
    })
    .then( records => {
      return Promise.map(records, record => JobTouch.create({
        title: this.TITLE,
        group: this.GROUP,
        run: this.run,
        collection: this.COLLECTION, 
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