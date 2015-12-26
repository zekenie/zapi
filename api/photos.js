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

router.post('/',
  upload.single('photo'),

  (req, res, next) => {
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