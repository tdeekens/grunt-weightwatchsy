'use strict';

var path = require('path');

function Aggregator(aggregations, groups) {
  this._aggregations = aggregations;
  this._groups = groups || {};

  this._aggregated = this.fill(this._aggregations, 0);
  this._sizesByExtension = {};
}

Aggregator.prototype.aggregate = function(files) {
  this
    .aggregateSingle(files)
    .aggregateMultiple();

  return this._aggregated;
};

Aggregator.prototype.aggregateSingle = function(files) {
  var that = this;

  Object.keys(files).forEach(function(file) {
    var extension = that.getExtension(file);

    that.sumUp(
      extension,
      files[file],
      that.shouleBeAggregated(extension)
    );
  });

  return this;
};

Aggregator.prototype.aggregateMultiple = function() {
  var that = this;

  Object.keys(this._groups).forEach(function(byName) {
    that._aggregated[byName] = 0;

    that._groups[byName].forEach(function(aggregation) {
      that._aggregated[byName] += that._sizesByExtension[aggregation] || 0;
    });
  });

  return this;
};

Aggregator.prototype.sumUp = function(extension, size, exported) {
  if (exported === true) {
    if (this._aggregated[extension.ordinary] !== undefined) {
      this._aggregated[extension.ordinary] += size;
    } else {
      this._aggregated[extension.sanitized] += size;
    }
  }

  this._sizesByExtension[extension.ordinary] = (this._sizesByExtension[extension.ordinary] === undefined) ?
    size : this._sizesByExtension[extension.ordinary] + size;
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

  fromArray.forEach(function(value) {
    filled[value] = withValue;
  });

  return filled;
};

module.exports = Aggregator;
