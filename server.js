'use strict';
const express = require('express');
const https = require('https');
const compression = require('compression');
const app = express();
const morgan = require('morgan');
const config = require('./config');

https.createServer(config.https, app).listen(config.port);

require('./models');
app.use(morgan('dev'));
app.use(compression());

app.use('/webhooks', require('./webhooks'));

app.use(function(req, res, next) {
  const pass = req.get('Authentication') || req.query.Authentication;
  if(pass !== config.password) { return res.status(401).end(); }
  next();
});

app.use(require('./api'));