'use strict';

function Breaker() {

}

Breaker.prototype.breakOn = function(conditions, sizes) {
  var
    analysis = {
      broken: false,
      reasons: []
    },
    fileConditions = conditions.files || {},
    aggregationConditions = conditions.aggregations || {};

  Object.keys(fileConditions).forEach(function(file) {
    if (sizes.files[file] > conditions.files[file]) {
      analysis.reasons.push(file);
      analysis.broken = true;
    }
  });

  Object.keys(aggregationConditions).forEach(function(aggregation) {
    if (sizes.aggregations[aggregation] > conditions.aggregations[aggregation]) {
      analysis.reasons.push(aggregation);
      analysis.broken = true;
    }
  });

  return analysis;
};

module.exports = Breaker;
