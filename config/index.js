'use strict';
const fs = require('fs');
module.exports = {
  mongoURI: 'mongodb://localhost/zeke-data',
  port: 8999 || process.env.PORT,
  https: {
    key: fs.readFileSync(process.env.PRIVATE_KEY || `${process.cwd()}/devKeys/key.pem`, 'utf8'),
    cert: fs.readFileSync(process.env.CERT || `${process.cwd()}/devKeys/cert.pem`, 'utf8'),
    passphrase: process.env.SSL_PASSWORD
  }
};