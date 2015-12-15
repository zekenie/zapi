'use strict';
const fs = require('fs');
const express = require('express');
const Exif = require('fixed-node-exif').ExifImage;
const router = express.Router();
const multer = require('multer');
const config = require('../config');
const scanr = require('scanr')(config.scanr);
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
    req.filePath = `${process.cwd()}/files/${req.doc.id}.jpg`;
    fs.writeFile(req.filePath, req.file.buffer, function(err) {
      if(err) { next(err); }
      next();
    });
  },

  (req, res, next) => {
    scanr.ocr(req.filePath, (err, text) => {
      if(err) {
        console.error('error generating ocr from Scanr');
        return next();
      }
      console.log('ocr text is ', text);
      req.doc.ocr = text;
      req.doc.markModified('ocr');
      next();
    });
  },

  (req, res, next) => {
    req.doc.save()
      .then(function(doc) {
        res.status(201).json(doc);
      })
      .catch(next);
  }
);