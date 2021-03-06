'use strict';

const mongoose = require('mongoose');
const timeseriesPlugin = require('./timeseriesPlugin');

const cap = string => string.charAt(0).toUpperCase() + string.slice(1);

['macbook_battery_charged',
'macbook_battery_temp',
'macbook_cpu_temp',
'macbook_ram',
'macbook_cpu_usage'].forEach(function(name) {
  const schema = new mongoose.Schema({
    value: { type: Number, required: true }
  });

  timeseriesPlugin.add(schema, name);
  
  mongoose.model(name, schema);
});
