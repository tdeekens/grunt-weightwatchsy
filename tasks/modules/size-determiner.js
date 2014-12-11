'use strict';

var fs = require('fs'),
    sprint = require('sprint');

function SizeDeterminer() {

}

SizeDeterminer.prototype.determine = function(files) {
  var sizes = {
    total: 0
  };

  files.forEach(function(file) {
    sizes[file] = fs.statSync(file).size;
    sizes.total += fs.statSync(file).size;
  });

  return sizes;
};

module.exports = SizeDeterminer;
