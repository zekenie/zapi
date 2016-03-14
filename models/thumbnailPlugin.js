'use strict';

module.exports = schema => {
  schema.virtual('thumbFilePath').get(function() {
    const components = this.filePath.split('/');
    components[components.length - 1] = 'thumb' + components[components.length - 1];
    return components.join('/');
  }); 
}