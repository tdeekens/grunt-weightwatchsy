/*jshint node:true*/
'use strict';

var sprint = require('sprint');

var gb = Math.pow(2, 30),
    mb = Math.pow(2, 20),
    kb = Math.pow(2, 10);

function Formatter(human) {
  this._human = human;
}

Formatter.prototype.format = function(size) {
  if (this._human !== true) { return size; }

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

Formatter.prototype.formatAll = function(files) {
  var that = this;

  Object.keys(files).forEach(function(file) {
    files[file] = that.format(files[file]);
  });

  return files;
};

module.exports = Formatter;
