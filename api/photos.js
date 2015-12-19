'use strict';
const fs = require('fs');
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

  // get exif data
  (req, res, next) => {
    try {
      new Exif({ image: req.file.buffer }, function(err, data) {
        if(err) { return next(err); }
        req.exif = data;
        next();
      });
    } catch (e) {
      next(e);
    }
  },

  (req, res, next) => {
    req.body.exif = req.exif;
    req.doc = new model(req.body);
    next();
  },

  (req, res, next) => {
    req.filePath = req.doc.filepath
    fs.writeFile(req.filePath, req.file.buffer, function(err) {
      if(err) { next(err); }
      next();
    });
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
    if(req.doc) {
      req.doc.deleteFile()
        .then(function() {
          console.log(`successfully deleted ${req.doc.id}.jpg.`);
          next(err);
        })
        .catch(next);
    } else { next(err); }
  }
);