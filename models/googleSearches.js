'use strict';
const mongoose = require('mongoose');
const Promise = require('bluebird');
const GoogleSearchSchema = new mongoose.Schema({
  queryText: { type: String, required: true, index: true },
  __date: { type: Date, required: true }
}, {
  strict: false,
  timestamps: true
});

GoogleSearchSchema.statics.processGoogleEvent = function(evt) {
  return Promise.map(evt.query.id, timeStampObj => this.create({ queryText: evt.query.query_text, __date: timeStampObj.timestamp_usec }) );
};

GoogleSearchSchema.statics.processGoogleEvents = function(events) {
  return Promise.map(events, this.processGoogleEvent.bind(this));
};

module.exports = mongoose.model('GoogleSearch', GoogleSearchSchema);