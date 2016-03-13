'use strict';

const ResizeJob = require('../resizeJob');

class PhotoResize {
  constructor() {
    super()
    this.GROUP = 'photos';
    this.TITLE = 'resize';
    this.TABLE = 'Photo';
  }
}

module.exports = PhotoResize;