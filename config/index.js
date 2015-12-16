'use strict';
const fs = require('fs');
module.exports = {
  mongoURI: 'mongodb://localhost/zeke-data',
  port: process.env.PORT || 8999,
  scanr: process.env.SCANR || 'garbage value',
  password: process.env.HTTP_PASSWORD || 'foobar',
  https: {
    key: fs.readFileSync(process.env.PRIVATE_KEY || `${process.cwd()}/devKeys/key.pem`, 'utf8'),
    cert: fs.readFileSync(process.env.CERT || `${process.cwd()}/devKeys/cert.pem`, 'utf8'),
    passphrase: process.env.SSL_PASSWORD
  }
};