'use strict';

const model = require('../../models/photos');
const Job = require('../job');
const Exif = require('fixed-node-exif').ExifImage;
const fs = require('fs');

class ExifJob extends Job {

  constructor(query) {
    super(query);
    this.GROUP = 'photos';
    this.TITLE = 'exif';
    this.TABLE = 'Photo';
  }

  find() {
    console.log('querying docs to update', this.query);
    return model.find(this.query);
  }

  processRecord(record) {
    if(record.exif) { return Promise.resolve(record); }
    return new Promise( (resolve, reject) => {
      var buffer = fs.readFileSync(record.filePath);
      if(!buffer) { return resolve(); }
      new Exif({ image: buffer }, function(err, data) {
        if(err) { 
          console.log('failing record', record);
          return reject(err);
        }
        resolve(data);
      });
    })
    .then( exif => {
      record.set('exif', exif);
      record.markModified('exif');
      return record.save();
    });
  }
}

module.exports = ExifJob;