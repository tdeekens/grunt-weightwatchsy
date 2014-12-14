var expect = require('chai').expect,
    fs = require('fs'),
    SizeDeterminer = require('../../tasks/modules/size-determiner'),
    sizeDeterminer;

describe('Formatter specification', function() {
  beforeEach(function() {
    sizeDeterminer = new SizeDeterminer({});
  });

  it('retuns the correct size for a file', function() {
    var file = './test/fixtures/my.txt';
    var sizes = sizeDeterminer.determine([file]);

    expect(sizes.files[file]).to.equal(fs.statSync(file).size);
  });

  it('retuns the correct size for multiple files', function() {
    var files = [
      './test/fixtures/my.txt',
      './test/fixtures/five.txt',
      './test/fixtures/cents.txt'
    ];

    expect(
      sizeDeterminer.determine(files).summary.size
    ).to.equal(
      fs.statSync(files[0]).size +
      fs.statSync(files[1]).size +
      fs.statSync(files[2]).size
    );
    });
});
