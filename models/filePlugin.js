'use strict';
const _ = require('lodash');
const Promise = require('bluebird');
const crypto = require('crypto');
const path = require('path');
const fs = Promise.promisifyAll(require('fs'));

module.exports = function(schema, options) {

  options = _.extend({
    filetype: '',
    checksum: true
  }, options);

  if(options.checksum) {
    schema.add({ checksum: String, index: true });

    schema.methods.calculateChecksum = function() {
      return new Promise( (resolve, reject) => {
        const stream = this.getFileStream();
        const hash = crypto.createHash('md5');
        stream.on('data', data => hash.update(data, 'utf8'));
        stream.on('error', (e) => reject(e) );
        stream.on('end', () => resolve(hash.digest('hex')) );
      });
    };

    schema.pre('save', function(next) {
      if(!this.isNew) { return next(); }
      this.calculateChecksum()
        .then( checksum => {
          this.checksum = checksum;

          return this;
        })
        .then( doc => {
          return this.constructor.count({ checksum: doc.checksum });
        })
        .then( otherDocsCount => {
          if(otherDocsCount !== 0) { throw new Error('File with same checksum found'); }
          next();
        })
        .catch(next);
    });
  }

  schema.methods.getFile = function() {
    return fs.readFileAsync(this.filepath);
  };

  schema.methods.getFileStream = function() {
    return fs.createReadStream(this.filepath);
  };

  schema.methods.deleteFile = function() {
    return fs.unlinkAsync(this.filepath)
  };

  schema.virtual('filepath').get(function() {
    return path.join(process.cwd(), 'files', this.collection.name, this.id + options.filetype);
  });
}