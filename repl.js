'use strict';
const promisify = require('repl-promised').promisify;
const repl = require('repl');
const models = require('./models');


const replServer = repl.start({
  prompt: 'Z > ',
  useColors: true
});

promisify(replServer);

for(var key in models) {
  replServer.context[key] = models[key];
  replServer.context.jobs = {
    AddDateJob: require('./jobs/screenshots/addDates'),
    Exif: require('./jobs/photos/exif')
  };
}