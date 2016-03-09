'use strict';

const model = require('../../models/photos');
const fs = require('fs');

const tick = () => {
  model
    .find({googleUploadComplete: { $ne: true }})
    .limit(150)
    .then( photos => {
      return Promise.all(photos.map(photo => {

      }));
    });
};