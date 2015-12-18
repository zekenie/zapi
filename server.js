'use strict';
const express = require('express');
const https = require('https');
const app = express();
const morgan = require('morgan');
const config = require('./config');

https.createServer(config.https, app).listen(config.port);

require('./models');
app.use(morgan('dev'));

app.use(function(req, res, next) {
  if(req.get('Authentication') !== config.password) { return res.status(401).end(); }
  next();
});

app.use(require('./api'));