var expect = require('chai').expect,
    fs = require('fs');

var SizeDeterminer = require('../../tasks/modules/size-determiner'),
    sizeDeterminer,
    Persister = require('../../tasks/modules/persister'),
    persister;

var historyFile = './test/fixtures/history.json';

describe('Persister specification', function() {
  before(function() {
    if (fs.existsSync(historyFile)) {
      fs.unlinkSync(historyFile);
    }
  })

  beforeEach(function() {
    persister = new Persister(historyFile, true);
    sizeDeterminer = new SizeDeterminer({});
  });

  it('creates a file to store history if none is existent', function() {
    var files = [
          './test/fixtures/my.txt',
          './test/fixtures/five.txt',
          './test/fixtures/cents.txt',
          './test/fixtures/some.css'
        ],
        sizes;

    sizes = sizeDeterminer.determine(files);
    var written = JSON.parse(persister.persist(sizes));

    files.forEach(function(fileName) {
      expect(written[0].fileName).to.be.defined;
    });
  });

  it('maintains a file to store history if one is existent', function() {
    var files = [
          './test/fixtures/my.txt',
          './test/fixtures/five.txt',
          './test/fixtures/cents.txt',
          './test/fixtures/some.css'
        ],
        sizes;

    sizes = sizeDeterminer.determine(files);
    var written = JSON.parse(persister.persist(sizes));

    files.forEach(function(fileName) {
      expect(written[0].fileName).to.be.defined;
      expect(written[1].fileName).to.be.defined;
    });
  });

  it('overwrites a file to store history if one is existent', function() {
    persister = new Persister(historyFile, false);

    var files = [
          './test/fixtures/my.txt',
          './test/fixtures/five.txt',
          './test/fixtures/cents.txt',
          './test/fixtures/some.css'
        ],
        sizes;

    sizes = sizeDeterminer.determine(files);
    persister.persist(sizes);

    var written = JSON.parse(fs.readFileSync(historyFile));

    expect(written).to.be.an.object
  });
});
