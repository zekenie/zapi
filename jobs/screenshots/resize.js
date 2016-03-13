'use strict';

const ResizeJob = require('../resizeJob');

class ScreenshotResize extends ResizeJob {
  constructor() {
    super()
    this.GROUP = 'screenshots';
    this.TITLE = 'resize';
    this.TABLE = 'Screenshot';
  }
}

module.exports = ScreenshotResize;