'use strict';
const path = require('path');
const mongoose = require('mongoose');
const crypto = require('crypto');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const PhotoSchema = new mongoose.Schema({
  checksum: { type: String, index: true }
}, {
  strict: false,
  timestamps: true
});

PhotoSchema.virtual('filepath').get(function() {
  return path.join(process.cwd(), 'files', this.id + '.jpg');
});

PhotoSchema.methods.getFile = function() {
  return fs.readFileAsync(this.filepath);
};

PhotoSchema.methods.getFileStream = function() {
  return fs.createReadStrem(this.filepath);
};

PhotoSchema.methods.calculateChecksum = function() {
  const stream = this.getFileStream();
  const hash = crypto.createHash('md5');
  stream.on('data', data => hash.update(data, 'utf8'));
  return new Promise(function(resolve, reject) {
    stream.on('end', () => resolve(hash.digest('hex')) );
  });
};

PhotoSchema.pre('save', function(next) {
  if(!this.isNew) { return next(); }
  this.calculateChecksum()
    .then( checksum => {
      this.checksum = checksum;
      return this.save();
    })
    .then( doc => next() )
    .catch(next);
});

module.exports = mongoose.model('Photo', PhotoSchema);