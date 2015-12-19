'use strict';
const mongoose = require('mongoose');
const PhotoSchema = new mongoose.Schema({}, {
  strict: false,
  timestamps: true
});

PhotoSchema.plugin(require('./filePlugin'), { checksum: true, filetype: '.jpg' });

module.exports = mongoose.model('Photo', PhotoSchema);