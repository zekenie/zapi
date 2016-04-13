'use strict';

module.exports = schema => {
  schema.statics.findOrCreate = function(query, create) {
    return this.findOne(query)
      .then(result => {
        if(result) { return result; }
        return this.create(create);
      });
  };
};