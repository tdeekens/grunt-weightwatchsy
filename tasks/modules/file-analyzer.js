'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

function FileAnalyzer(exclusions) {
  this._exclusions = exclusions;
}

FileAnalyzer.prototype.shuntAll = function(files) {
  var that = this;

  return _.filter(files, function(file) {
    return !that.isExcluded(file);
  });
};

FileAnalyzer.prototype.getExtension = function(file) {
  return {
    ordinary: path.extname(file),
    sanitized: path.extname(file).substring(1)
  };
};

FileAnalyzer.prototype.isExcluded = function(file) {
  var extension = this.getExtension(file);

  return (
    _.contains(this._exclusions, extension.ordinary) ||
    _.contains(this._exclusions, extension.ordinary)
  );
};

module.exports = FileAnalyzer;
