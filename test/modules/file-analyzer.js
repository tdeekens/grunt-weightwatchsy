var expect = require('chai').expect,
    fs = require('fs'),
    FileAnalyzer = require('../../tasks/modules/file-analyzer'),
    fileAnalyzer;

describe('Formatter specification', function() {
  beforeEach(function() {
    fileAnalyzer = new FileAnalyzer(['.txt']);
  });

  it('returns files and omits directories', function() {
    var glob = [{
      src: ['./test/fixtures']
    }];

    var files = fileAnalyzer.getFiles(glob);

    expect(files).to.have.length(0);
  });

  it('lets unexcluded files pass through the shunt', function() {
    var files = [
      './test/fixtures/my.css'
    ];

    var shuntedFiles = fileAnalyzer.shuntAll(files);

    expect(shuntedFiles).to.have.length(1);
  });

  it('lets unexcluded files pass through the shunt', function() {
    var files = [
      './test/fixtures/my.txt',
      './test/fixtures/my.css'
    ];

    var shuntedFiles = fileAnalyzer.shuntAll(files);

    expect(shuntedFiles).to.have.length(1);
  });
});
