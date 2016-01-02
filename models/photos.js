'use strict';
const _ = require('lodash');
const mongoose = require('mongoose');
const timeseriesPlugin = require('./timeseriesPlugin');
const PhotoSchema = new mongoose.Schema({}, {
  strict: false,
  timestamps: true
});

PhotoSchema.methods.inferDate = function() {
  this.set('__date', _.get(this, 'exif.DateTimeOriginal') || this.createdAt);
}

PhotoSchema.pre('validate', function(next) {
  // if(!this.__date) {
    this.inferDate();
  // }
  next();
});

PhotoSchema.plugin(require('./filePlugin'), { checksum: true, filetype: '.jpg' });
timeseriesPlugin.add(PhotoSchema, 'Photo');

module.exports = mongoose.model('Photo', PhotoSchema);