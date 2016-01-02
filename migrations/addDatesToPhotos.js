'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');

const tick = () => {
  mongoose.model('Photo').find({ __date: { $exists: false } }).limit(300)
    .then( photos => Promise.map(photos, photo => photo.save() ) )
    .then( photos => {
      if(photos.length) { tick(); }
    });
};

tick();