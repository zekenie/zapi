'use strict';
const _ = require('lodash');
const mongoose = require('mongoose');
const timeseriesPlugin = require('./timeseriesPlugin');
const PhotoSchema = new mongoose.Schema({}, {
  strict: false,
  timestamps: true
});

PhotoSchema.methods.inferDate = function() {
  // this.set('__date', _.get(this.toObject(), 'exif.DateTimeOriginal', this.createdAt));
  let dateStr = this.createdAt;
  if(this.exif && this.exif.DateTimeOriginal) {
    dateStr = this.toObject().exif.DateTimeOriginal
      .replace(':','-')
      .replace(':','-');
  }

  this.set('__date', new Date(dateStr));
};

PhotoSchema.pre('validate', function(next) {
  // if(!this.__date) {
    this.inferDate();
  // }
  next();
});

PhotoSchema.plugin(require('./filePlugin'), { checksum: true, filetype: '.jpg' });
timeseriesPlugin.add(PhotoSchema, 'Photo');

module.exports = mongoose.model('Photo', PhotoSchema);