'use strict';

class DbOp {
  constructor(collection, db) {
    this.collection = collection;
    this.db = db;
  }

  query(query, fields, options) {
    return new Promise((resolve, reject) => {
      this.db.collection(this.collection).find(query, fields, options).toArray(function(err, results) {
        if(err) { return reject(err); }
        resolve(results);
      });
    });
  }

  insert(doc) {
    return new Promise((resolve, reject) => {
      this.db.collection(this.collection).insertOne(doc, function(err, result) {
        if(err) { return reject(err); }
        result._id = result.insertedId.toString();
        resolve({_id: result._id});
      });
    });
  }
}

module.exports = DbOp;