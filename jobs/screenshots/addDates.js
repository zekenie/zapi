'use strict';

const model = require('../../models/screenshots');
const Job = require('../job');

class AddDateJob extends Job {

  constructor(query) {
    super(query);
    this.GROUP = 'screenshots';
    this.TITLE = 'addDates';
    this.TABLE = 'Screenshot';
  }

  find() {
    return model.find(this.query);
  }

  processRecord(record) {
    if(record.filename) {
      const dateStr = record.filename.filename
        .replace('Screen Shot ','')
        .replace(' at ', ' ')
        .replace('.png','')
        .replace(/\./g, ':');
      record.__date = new Date(dateStr);
    } else {
      record.__date = record._id.getTimestamp();
      record.dateApproximate = true;
    }
    console.log('presave', record.__date);
    record.markModified('__date');
    return record.save();
  }
}

module.exports = AddDateJob;