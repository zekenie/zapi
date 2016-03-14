'use strict';

const Job = require('./job');
const fs = require('fs');
const easyimg = require('easyimage');

class ResizeJob extends Job {

  constructor() {
    super({hasThumbnail: {$ne: true}});
  }

  find() {
    return this.model.find(this.query).limit(3);
  }

  getThumbnailPath(path) {
    const components = path.split('/');
    components[components.length - 1] = 'thumb' + components[components.length - 1];
    return components.join('/');
  }

  processRecord(record) {
    return easyimg.resize({
      src: record.filePath,
      dst: this.getThumbnailPath(record.filePath),
      width: 500
    })
      .then( () => {
        record.hasThumbnail = true;
        return record.save();
      });
  }
}

module.exports = ResizeJob;