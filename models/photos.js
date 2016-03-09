'use strict';
const _ = require('lodash');
const mongoose = require('mongoose');
const timeseriesPlugin = require('./timeseriesPlugin');
const PhotoSchema = new mongoose.Schema({
  googleUploadComplete: Boolean
}, {
  strict: false,
  timestamps: true
});

PhotoSchema.methods.inferDate = function() {
  // this.set('__date', _.get(this.toObject(), 'exif.DateTimeOriginal', this.createdAt));
  let dateStr = this.createdAt;
  const obj = this.toObject();
  if(obj.exif && obj.exif.exif && obj.exif.exif.DateTimeOriginal) {
    dateStr = obj.exif.exif.DateTimeOriginal
      .replace(':','-')
      .replace(':','-');
  }

  this.set('__date', new Date(dateStr));
};

PhotoSchema.pre('validate', function(next) {
  if(!this.__date) {
    this.inferDate();
  }
  next();
});

PhotoSchema.plugin(require('./filePlugin'), { checksum: true, filetype: '.jpg' });
timeseriesPlugin.add(PhotoSchema, 'Photo');

module.exports = mongoose.model('Photo', PhotoSchema);