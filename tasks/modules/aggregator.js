'use strict';

var path = require('path');

function Aggregator(aggregations) {
  this._aggregations = aggregations;

  this._aggregated = this.fill(this._aggregations, 0);
}

Aggregator.prototype.aggregate = function(files) {
  var that = this;

  Object.keys(files).forEach(function(file) {
    var extension = that.getExtension(file);

    if (that.shouleBeAggregated(extension)) {
      that.sumUp(extension, files[file]);
    }
  });

  return this._aggregated;
};

Aggregator.prototype.sumUp = function(extension, size) {
  if (this._aggregated[extension.ordinary] !== undefined) {
    this._aggregated[extension.ordinary] += size;
  } else {
    this._aggregated[extension.sanitized] += size;
  }
};

Aggregator.prototype.getExtension = function(file) {
  return {
    ordinary: path.extname(file),
    sanitized: path.extname(file).substring(1)
  };
};

Aggregator.prototype.shouleBeAggregated = function(extension) {
  return (
    this._aggregated[extension.ordinary] !== undefined ||
    this._aggregated[extension.sanitized] !== undefined
  );
};

Aggregator.prototype.clone = function(object) {
  return JSON.parse(
    JSON.stringify(object)
  );
};

Aggregator.prototype.fill = function(fromArray, withValue) {
  var filled = {};

  fromArray.forEach(function(key) {
    filled[key] = withValue;
  });

  return filled;
};

module.exports = Aggregator;
