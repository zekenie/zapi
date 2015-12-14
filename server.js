'use strict';
const express = require('express');
const https = require('https');
const app = express();
const config = require('./config');

https.createServer(config.https, app).listen(config.port);

require('./models');
app.use(require('./api'));