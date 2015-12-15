'use strict';

const args = process.argv.slice(2);
const fs = require('fs');
const path = require('path');
const request = require();


const dir = args[0];

var responses = fs.readdirSync(dir)
  .map( filename => path.join(dir, filename) )
  .map( fullpath => fs.readFileSync(fullpath) )
  .map( buffer => buffer.toString() )
  .map( str => JSON.parse(str) )
  .map( month => month.event )
  .map( queryArray => {
    console.log('making request for', queryArray);
    return request('POST', 'https://api.codetutor.me/googleSearches', {json: queryArray}).getBody('utf8');
  })

console.log(responses);