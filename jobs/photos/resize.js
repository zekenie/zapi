'use strict';

const ResizeJob = require('../resizeJob');
const mongoose = require('mongoose');

class PhotoResize extends ResizeJob{
  constructor() {
    super()
    this.GROUP = 'photos';
    this.TITLE = 'resize';
    this.TABLE = 'Photo';
    this.model = mongoose.model(this.TABLE);
  }
}

module.exports = PhotoResize;