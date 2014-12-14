var expect = require('chai').expect,
    fs = require('fs'),
    SizeDeterminer = require('../../tasks/modules/size-determiner'),
    sizeDeterminer,
    Breaker = require('../../tasks/modules/breaker'),
    breaker,
    Aggregator = require('../../tasks/modules/aggregator'),
    aggregator;

describe('Breaker specification', function() {
  beforeEach(function() {
    sizeDeterminer = new SizeDeterminer({});
    breaker = new Breaker();
    aggregator = new Aggregator(['.txt']);
  });

  it('does not break without conditions', function() {
    var file = './test/fixtures/my.txt';
    var sizes = sizeDeterminer.determine([file]);

    expect(breaker.breakOn({}, sizes).broken).to.be.false;
  });

  it('intendens to break when a file condition is truethy', function() {
    var files = [
      './test/fixtures/my.txt',
      './test/fixtures/five.txt',
      './test/fixtures/cents.txt'
    ];
    var sizes = sizeDeterminer.determine(files);
    var breakerResult = breaker.breakOn({
      files: {
        './test/fixtures/my.txt': 0
      }
    }, sizes);

    expect(
      breakerResult.broken
    ).to.be.true;

    expect(
      breakerResult.reasons.indexOf('./test/fixtures/my.txt') >= 0
    ).to.be.true;
  });

  it('intendens to break when an aggregation condition is truethy', function() {
    var files = [
      './test/fixtures/my.txt',
      './test/fixtures/five.txt',
      './test/fixtures/cents.txt'
    ];
    var sizes = sizeDeterminer.determine(files);
    var aggregated = aggregator.aggregate(sizes.files);
    var breakerResult = breaker.breakOn({
      aggregations: {
        '.txt': 0
      }
    }, {
      aggregations: aggregated
    });

    expect(
      breakerResult.broken
    ).to.be.true;

    expect(
      breakerResult.reasons.indexOf('.txt') >= 0
    ).to.be.true;
  });
});
