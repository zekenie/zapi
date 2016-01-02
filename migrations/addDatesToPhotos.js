'use strict';

const mongoose = require('mongoose');
const Promise = require('bluebird');
const ids = [ ];
const tick = () => {
  mongoose.model('Photo').find({ _id: { $not: {$in: ids}}/*__date: { $exists: false }*/ }).limit(350)
    .then( photos => Promise.map(photos, photo => photo.save() ) )
    .then( photos => {
      photos.forEach( photo => ids.push(photo._id) );
      console.log(new Date(), '>', photos.length, 'saved');
      if(photos.length) { tick(); }
    });
};

tick();