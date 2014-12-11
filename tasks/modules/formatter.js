/*jshint node:true*/
'use strict';

var sprint = require('sprint');

var gb = Math.pow(2, 30),
    mb = Math.pow(2, 20),
    kb = Math.pow(2, 10);

function Formatter(options) {
  this._options = options;
}

Formatter.prototype.format = function(size) {
  if (this._options.human !== true) { return size; }

  var candidate = size / gb;

  if (candidate > 1) {
    return sprint('%.1f GiB', candidate);
  }

  candidate = size / mb;

  if (candidate > 1) {
    return sprint('%.1f MiB', candidate);
  }

  candidate = size / kb;

  if (candidate > 1) {
    return sprint('%.1f KiB', candidate);
  }

  return sprint('%d B', size);
};

module.exports = Formatter;
