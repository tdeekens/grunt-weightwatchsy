var expect = require('chai').expect,
    Formatter = require('../../tasks/modules/formatter'),
    unhumanFormatter,
    humanFormatter;

var gb = Math.pow(2, 30),
    mb = Math.pow(2, 20),
    kb = Math.pow(2, 10);

describe('Formatter specification', function() {
  beforeEach(function() {
    unhumanFormatter = new Formatter(false);

    humanFormatter = new Formatter(true);
  });

  it('returns only bytes if human option not set', function() {
    expect(unhumanFormatter.format(1.5 * gb)).to.equal(1610612736);
  });

  it('returns B if less than 1 KiB', function() {
    expect(humanFormatter.format(512)).to.equal('512 B');
  });

  it('returns KiB if less than 1 MiB and more than 1 KiB', function() {
    expect(humanFormatter.format(1.5 * kb)).to.equal('1.5 KiB');
  });

  it('returns MiB if less than 1 GiB and more than 1 MiB', function() {
    expect(humanFormatter.format(1.5 * mb)).to.equal('1.5 MiB');
  });

  it('returns GiB if more than 1 GiB', function() {
    expect(humanFormatter.format(1.5 * gb)).to.equal('1.5 GiB');
  });
});
