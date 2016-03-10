'use strict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const express = require('express');
const Exif = require('fixed-node-exif').ExifImage;
const router = express.Router();
const multer = require('multer');
module.exports = router;

const model = require('../models/photos');

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.get('/:id', (req,res, next) => {
  model.findById(req.params.id)
    .then(doc => {
      if(!doc) { throw 'not found'; }
      res.set('Record', JSON.stringify(doc));
      res.sendFile(doc.filePath);
    })
    .catch(next);
});

router.post('/',
  upload.single('photo'),

  (req, res, next) => {
    console.log(req.body);
    req.doc = new model(req.body);
    fs.writeFileAsync(req.doc.filePath, req.file.buffer)
      .then( () => next() )
      .catch(next);
  },

  (req, res, next) => {
    req.doc.save()
      .then(function(doc) {
        res.status(201).json(doc);
      })
      .catch(next);
  },

  // if there was an error thrown in upload, delete the file
  (err, req, res, next) => {
    console.log(err);
    console.log(err.stack);
    if(req.doc) {
      req.doc.deleteFile()
        .then(function() {
          console.log(`successfully deleted ${req.doc.filePath}`);
          next(err);
        })
        .catch(next);
    } else { next(err); }
  }
);