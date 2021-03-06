'use strict';
const express = require('express');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const multer = require('multer');
const router = express.Router();

module.exports = router;

const model = require('../models/screenshots');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/:id', (req,res, next) => {
  model.findById(req.params.id)
    .then(doc => {
      if(!doc) { throw 'not found'; }
      res.set('Record', JSON.stringify(doc));
      let path;
      if(req.query.thumb && doc.thumbFilePath) {
        path = doc.thumbFilePath
      } else {
        path = doc.filePath;
      }
      res.sendFile(path);
    })
    .catch(next);
});

router.post('/',
  upload.single('screenshot'),

  (req, res, next) => {
    req.doc = new model(req.body);
    fs.writeFileAsync(req.doc.filePath, req.file.buffer)
      .then( () => req.doc.save() )
      .then( doc => res.status(201).json(doc) )
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