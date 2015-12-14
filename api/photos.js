'use strict';
const fs = require('fs');
const express = require('express');
const Exif = require('fixed-node-exif').ExifImage;
const router = express.Router();
const multer = require('multer');
const uuid = require('uuid');
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
    model.create(req.body)
      .then(function(doc) {
        req.doc = doc;
        next();
      })
      .catch(next);
  },

  (req, res, next) => {
    fs.writeFile(`${process.cwd()}/files/${uuid.v4()}`, req.file.buffer, function(err) {
      if(err) { next(err); }
      try{
        res.status(201).json(req.doc);
      } catch(e) {
        next(e);
      }
    });
  }
);