'use strict';
/**
 * This is a one-time script to import fitbit data from
 * jan 2014 to feb 25 2014 when i had a fitbit
 */
const args = process.argv.slice(2);
var data = require(args[0]);
const request = require('sync-request');


var start = new Date('1/20/14'),
    end = new Date('2/25/14');

var createDateRange = function(start, end) {
  var dates = [];
  while(start <= end) {
    dates.push(start);
    start = new Date(start.setDate(start.getDate() + 1));
  }
  return dates;
};

var pullOutAttributes = function(d) { return d._attributes; };

//if a day has 1440 sedentary minutes, we'll assume that there was no tracking
var isBlankDay = function(day) {
  return day.sedentaryMinutes === 1440;
};

var activities = data.activities
                   .map(pullOutAttributes)
                   .map(function(d) { return d.summary })

var sleep = data.sleep.map(pullOutAttributes);

var range = createDateRange(start, end);

range.forEach(function(day,i) {
  var activity = activities[i];
  var sleepDay = sleep[i];
  activity.date = day;
  sleepDay.date = day;
  // if(isBlankDay(activity)) { return; }
  console.log('=-=-=-=', day, '-=-=-=-=-');
  if(!isBlankDay(activity)) {
    var resp = request('POST', 'https://api.codetutor.me/fitbitActivityDays', {json: activity}).getBody('utf8');
    console.log(resp);
  }
  if(sleepDay.sleep.length) {
    resp = request('POST', 'https://api.codetutor.me/fitbitSleepDays', {json: sleepDay}).getBody('utf8');
    console.log(resp);
  }
});