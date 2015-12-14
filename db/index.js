'use strict';
const mongodb = require('mongodb');
const DbOp = require('./dbOp');

const db = require('mongoose').connection.db;


module.exports = {
  collection: function(col) {
    return new DbOp(col, db);
  },
  getCollections: function() {
    return new Promise( (resolve, reject) => {
      console.log(Object.keys(db.prototype));
      db.collectionNames(function(err, names) {
        if(err) { return reject(err); }
        resolve(names);
      });
    });
  }
};