'use strict';

const ResizeJob = require('../resizeJob');

class ScreenshotResize {
  constructor() {
    super()
    this.GROUP = 'screenshots';
    this.TITLE = 'resize';
    this.TABLE = 'Screenshot';
  }
}

module.exports = ScreenshotResize;