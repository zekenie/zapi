'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');

const tick = (i) => {
  mongoose.model('Photo').find({ /*__date: { $exists: false }*/ }).limit(300).skip(i)
    .then( photos => Promise.map(photos, photo => photo.save() ) )
    .then( photos => {
      console.log(new Date(), '>', photos.length, 'saved');
      if(photos.length) { tick(i+300); }
    });
};

tick();