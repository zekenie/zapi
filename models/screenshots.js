'use strict';

const mongoose = require('mongoose');
const ScreenshotSchema = new mongoose.Schema({}, {
  strict: false,
  timestamps: true
});

ScreenshotSchema.plugin(require('./filePlugin'), { checksum: true, filetype: '.png' });

module.exports = mongoose.model('Screenshot', ScreenshotSchema);