'use strict';
const express = require('express');
const router = express.Router();
const fallback = require('./fallback');
const bodyParser = require('body-parser');
const rawBody = require('raw-body');
const fs = require('fs');

module.exports = router;

router.use((req, res, next) => {
  console.log('request body size', Number(req.headers['content-length']));
  // if(Number(req.headers['Content-Length']) > (8800 * 1024)) {
  //   console.log('big request found!');
  //   // return res.status(200).end();
  //   rawBody(req)
  //     .then(buffer => {
  //       return new Promise((resolve, reject) => {
  //         fs.writeFile(__dirname + './tempRequest', buffer, (err, result) => {
  //           if(err) { return reject(err); }
  //           resolve(result);
  //         });
          
  //       });
  //     })
  //     .then(() => console.log('logged HUGE request'))
  //     .then(() => res.send(200))
  //     .catch(next);
  // }
  next();
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: '1mb' }));

router.use('/photos', require('./photos'));
router.use('/screenshots', require('./screenshots'));
router.use('/phoneBattery', require('./phoneBatteries'));

router.use('/timeseries', require('./timeseries'));


router.use('/googleSearches', require('./googleSearches'));
// if we don't have a specail route defined, see if we can just catch the data
router.use(fallback);

router.use(function(err, req, res, next) {
  console.log(err);
  console.log(err.stack);
  res.status(err.status || err.statusCode || 500).json({ message: err.message });
});