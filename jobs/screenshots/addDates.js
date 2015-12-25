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
    console.log('querying docs to update', this.query);
    return model.find(this.query);
  }

  processRecord(record) {
    if(record.filename) {
      const dateStr = record.filename
        .replace('Screen Shot ','')
        .replace(' at ', ' ')
        .replace('.png','')
        .replace(/\./g, ':');
      record.set('__date', new Date(dateStr));
      record.set('dateApproximate', false);
    } else {
      record.set('__date', record._id.getTimestamp());
      record.set('dateApproximate', true);
    }
    record.markModified('__date');
    return record.save();
  }
}

module.exports = AddDateJob;