'use strict';

var fs = require('fs'),
    sprint = require('sprint');

function SizeDeterminer() {

}

SizeDeterminer.prototype.determine = function(files) {
  var
    sizes = {
      summary: {
        size: 0,
        average: 0
      },
      files: {}
    },
    quantity = 0;

  files.forEach(function(file) {
    sizes.files[file] = fs.statSync(file).size;
    sizes.summary.size += fs.statSync(file).size;
    quantity++;
  });

  sizes.summary.average = sizes.summary.size / quantity;

  return sizes;
};

module.exports = SizeDeterminer;
