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

    expect(sizeDeterminer.determine([
      file
    ])[file]).to.equal(
      fs.statSync(file).size
    );
  });

  it('retuns the correct size for multiple files', function() {
    var files = [
      './test/fixtures/my.txt',
      './test/fixtures/five.txt',
      './test/fixtures/cents.txt'
    ];

    expect(
      sizeDeterminer.determine(files).total
    ).to.equal(
      fs.statSync(files[0]).size +
      fs.statSync(files[1]).size +
      fs.statSync(files[2]).size
    );
    });
});
