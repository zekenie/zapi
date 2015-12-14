'use strict';
const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({}, {
  strict: false,
  timestamps: true
});

module.exports = mongoose.model('Photo', PhotoSchema);