'use strict';

var path = require('path'),
    _ = require('lodash');

function Aggregator(aggregations, groups, variations) {
  this._aggregations = aggregations;
  this._groups = groups || {};
  this._variations = variations || [];

  this._aggregated = this.fill(this._aggregations, 0);
  this._sizesByVariations = {};
  this._sizesByExtension = {};
}

Aggregator.prototype.aggregate = function(files) {
  this
    .aggregateSingle(files)
    .aggregateMultiple();

  return this._aggregated;
};

Aggregator.prototype.aggregateSingle = function(files) {
  var _this = this;

  Object.keys(files).forEach(function(file) {
    var extension = _this.getExtension(file);

    _this.sumUp(
      file,
      files[file],
      _this.shouldBeAggregated(extension),
      _this.isVariation(extension)
    );
  });

  return this;
};

Aggregator.prototype.getSizesByExtensions = function() {
  return this._sizesByExtension;
};

Aggregator.prototype.getSizesByVariations = function() {
  return this._sizesByVariations;
};

Aggregator.prototype.aggregateMultiple = function() {
  var _this = this;

  Object.keys(this._groups).forEach(function(byName) {
    _this._aggregated[byName] = 0;

    _this._groups[byName].forEach(function(aggregation) {
      _this._aggregated[byName] += _this._sizesByExtension[aggregation] || 0;
    });
  });

  return this;
};

Aggregator.prototype.sumUp = function(file, size, isAggregation, isVariation) {
  var extension = this.getExtension(file);

  if (isAggregation === true) { this.sumUpAggregation(extension, size); }
  if (isVariation === true) { this.sumUpVariation(file, size); }

  this.sumUpExtension(extension, size);
};

Aggregator.prototype.sumUpAggregation = function(extension, size) {
  this._aggregated[extension] += size;
};

Aggregator.prototype.sumUpVariation = function(file, size) {
  var extension = this.getExtension(file),
      ordinaryExtension = this.getExtension(path.basename(file, extension));

  this._sizesByVariations[ordinaryExtension] = this._sizesByVariations[ordinaryExtension] || {};

  this._sizesByVariations[ordinaryExtension][extension] = (this._sizesByVariations[ordinaryExtension][extension] === undefined) ?
    size :
    this._sizesByVariations[ordinaryExtension][extension] + size;
};

Aggregator.prototype.sumUpExtension = function(extension, size) {
  this._sizesByExtension[extension] = (this._sizesByExtension[extension] === undefined) ?
    size :
    this._sizesByExtension[extension] + size;
};

Aggregator.prototype.getExtension = function(file) {
  return path.extname(file);
};

Aggregator.prototype.isVariation = function(extension) {
  var isVariation = (
    _.some(this._variations, function(variation) {
      return (
        _.includes(extension, variation)
      );
    })
  );

  return isVariation;
};

Aggregator.prototype.shouldBeAggregated = function(extension) {
  return (
    this._aggregated[extension] !== undefined
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
