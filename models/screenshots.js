'use strict';

const timeseriesPlugin = require('./timeseriesPlugin');
const mongoose = require('mongoose');
const ScreenshotSchema = new mongoose.Schema({
  hasThumbnail: Boolean,
  filename: { type: String }
}, {
  strict: false,
  timestamps: true
});

const pullDateFromFilename = function() {
  return new Date(this.filename
        .replace('Screen Shot ','')
        .replace(' at ', ' ')
        .replace('.png','')
        .replace(/\./g, ':'));
};

ScreenshotSchema.pre('validate', function(next) {
  this.set('__date', pullDateFromFilename.call(this));
  next();
});

ScreenshotSchema.plugin(require('./filePlugin'), { checksum: true, filetype: '.png' });
timeseriesPlugin.add(ScreenshotSchema, 'Screenshot');

module.exports = mongoose.model('Screenshot', ScreenshotSchema);