var expect = require('chai').expect,
    fs = require('fs');

var SizeDeterminer = require('../../tasks/modules/size-determiner'),
    sizeDeterminer,
    Aggregator = require('../../tasks/modules/aggregator'),
    aggregator;

describe('Aggregator specification', function() {
  beforeEach(function() {
    sizeDeterminer = new SizeDeterminer({});
  });

  it('aggregates file sizes with one type', function() {
    aggregator = new Aggregator(['.txt']);

    var files = [
          './test/fixtures/my.txt',
          './test/fixtures/five.txt',
          './test/fixtures/cents.txt'
        ],
        sizes;

    sizes = sizeDeterminer.determine(files);

    expect(aggregator.aggregate(sizes)['.txt']).to.equal(14);
  });

  it('aggregates file sizes with two type', function() {
    aggregator = new Aggregator(['.txt', '.css']);

    var files = [
        './test/fixtures/my.txt',
        './test/fixtures/five.txt',
        './test/fixtures/cents.txt',
        './test/fixtures/some.css'
      ],
      sizes,
      aggregated;

    sizes = sizeDeterminer.determine(files);
    aggregated = aggregator.aggregate(sizes);

    expect(aggregated['.txt']).to.equal(14);
    expect(aggregated['.css']).to.equal(12);
  });

  it('aggregates file sizes with two type and double extensions', function() {
    aggregator = new Aggregator(['.txt', '.css', 'css']);

    var files = [
          './test/fixtures/my.txt',
          './test/fixtures/five.txt',
          './test/fixtures/cents.txt',
          './test/fixtures/some.css'
        ],
        sizes,
        aggregated;

    sizes = sizeDeterminer.determine(files);
    aggregated = aggregator.aggregate(sizes);

    expect(aggregated['.txt']).to.equal(14);
    expect(aggregated['.css']).to.equal(12);
    expect(aggregated.css).to.equal(0);
  });
});
