'use strict';
/**
 * Job touch record
 * a record in this col means a mongoose doc was touched in a job run
 */

const mongoose = require('mongoose');
const JobTouchSchema = new mongoose.Schema({
  group: { type: String, index: true },
  title: { type: String, required: true, index: true },
  run: { type: mongoose.Types.ObjectId, ref: 'JobRun', required: true },
  collection: { type: String, required: true, index: true },
  reference: { type: mongoose.Types.ObjectId, required: true }
}, {
  timestamps: true
});


module.exports = mongoose.model('JobTouch', JobTouchSchema);