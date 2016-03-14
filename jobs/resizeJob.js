'use strict';

const Job = require('./job');
const fs = require('fs');
const easyimg = require('easyimage');

class ResizeJob extends Job {

  constructor() {
    super();
  }

  find() {
    return this.model.find(this.query).limit(3);
  }

  processRecord(record) {
    return easyimg.resize({
      src: record.filePath,
      dst: record.thumbFilePath,
      width: 450
    });
  }
}

module.exports = ResizeJob;