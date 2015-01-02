'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

function FileAnalyzer(exclusions) {
  this._exclusions = exclusions;
}

FileAnalyzer.prototype.getFiles = function(globbedFiles) {
  var files = [];

  globbedFiles.forEach(function(file) {
    files = file.src.filter(function(filepath) {
      return fs.lstatSync(filepath).isFile();
    }).map(function(filepath) {
      return filepath;
    });
  });

  return files;
};

FileAnalyzer.prototype.shuntAll = function(files) {
  var _this = this;

  return _.filter(files, function(file) {
    return !_this.isExcluded(file);
  });
};

FileAnalyzer.prototype.getExtension = function(file) {
  return path.extname(file);
};

FileAnalyzer.prototype.isExcluded = function(file) {
  var extension = this.getExtension(file);

  return (
    _.contains(this._exclusions, extension)
  );
};

module.exports = FileAnalyzer;
