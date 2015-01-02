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

    expect(aggregator.aggregate(sizes.files)['.txt']).to.equal(14);
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
    aggregated = aggregator.aggregate(sizes.files);

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
    aggregated = aggregator.aggregate(sizes.files);

    expect(aggregated['.txt']).to.equal(14);
    expect(aggregated['.css']).to.equal(12);
    expect(aggregated.css).to.equal(0);
  });

  it('aggregates file sizes with listed aggregations', function() {
    aggregator = new Aggregator(['.jpg'], {
      text: ['.css', '.js', '.txt']
    });

    var files = [
      './test/fixtures/my.txt',
      './test/fixtures/five.txt',
      './test/fixtures/cents.txt',
      './test/fixtures/some.css'
    ],
    sizes,
    aggregated;

    sizes = sizeDeterminer.determine(files);
    aggregated = aggregator.aggregate(sizes.files);

    expect(aggregated['.jpg']).to.equal(0);
    expect(aggregated.text).to.equal(26);
  });

  it('calculates sizes by extensions', function() {
    aggregator = new Aggregator(['.jpg'], {
      text: ['.js', '.txt']
    });

    var files = [
      './test/fixtures/my.txt',
      './test/fixtures/five.txt',
      './test/fixtures/cents.txt',
      './test/fixtures/some.css'
    ],
    sizes,
    extensions;

    sizes = sizeDeterminer.determine(files);
    aggregator.aggregate(sizes.files);
    extensions = aggregator.getSizesByExtensions();

    expect(extensions['.txt']).to.equal(14);
    expect(extensions['.css']).to.equal(12);
    expect(extensions['.jpg']).to.be.undefined;
  });

  it('handles variations of ordinary files', function() {
    aggregator = new Aggregator(['.txt', '.js'], {
      text: ['.css', '.js', '.txt']
    }, ['.gz']);

    var files = [
      './test/fixtures/my.txt',
      './test/fixtures/five.txt',
      './test/fixtures/cents.txt',
      './test/fixtures/some.css',
      './test/fixtures/five.txt.gz',
      './test/fixtures/cents.txt.gz'
    ],
    sizes,
    aggregated,
    variations;

    sizes = sizeDeterminer.determine(files);
    aggregated = aggregator.aggregate(sizes.files);
    variations = aggregator.getSizesByVariations();

    expect(aggregated['.js']).to.equal(0);
    expect(aggregated.text).to.equal(26);
    expect(variations['.txt']['.gz']).to.equal(12);
  });
});
