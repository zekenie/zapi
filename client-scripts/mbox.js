'use strict';

const Mbox = require('node-mbox');
const MailParser = require('mailparser').MailParser;
const args = process.argv.slice(2);
const fileName = args[0];

const mbox = new Mbox(fileName);

mbox.on('message', function(msg) {
  var mailparser = new MailParser({ streamAttachments : true });
  mailparser.on('end', function(email) {
    console.log(email);
  });
  mailparser.write(msg);
  mailparser.end();
});
