'use strict';

const ResizeJob = require('../resizeJob');
const mongoose = require('mongoose');

class ScreenshotResize extends ResizeJob {
  constructor() {
    super()
    this.GROUP = 'screenshots';
    this.TITLE = 'resize';
    this.TABLE = 'Screenshot';
    this.model = mongoose.model(this.TABLE);
  }
}

module.exports = ScreenshotResize;