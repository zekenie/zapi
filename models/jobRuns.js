'use strict';
/**
 * Job run record
 * a record in this col means a job was run
 */

const mongoose = require('mongoose');
const JobRunSchema = new mongoose.Schema({
  group: { type: String, index: true },
  title: { type: String, required: true, index: true },
  recordsTouched: Number
}, {
  strict: false,
  timestamps: true
});


module.exports = mongoose.model('JobRun', JobRunSchema);