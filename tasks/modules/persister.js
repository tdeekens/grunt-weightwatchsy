'use strict';

var fs = require('fs');

function Persister(location, keepHistory) {
  this._location = location;
  this._keepHistory = keepHistory;
}

Persister.prototype.persist = function(stats) {
  var written = null;

  if (!this._keepHistory) {
    written = this.write(stats);
  } else {
    try {
      stats.createdAt = new Date();

      var history = this.read();

      history.push(stats);

      written = this.write(history);
    } catch (err) {
      written = this.write([stats]);
    }
  }

  return written;
};

Persister.prototype.write = function(data) {
  var json = JSON.stringify(data, null, 2);

  fs.writeFileSync(this._location, json);

  return json;
};

Persister.prototype.read = function() {
  var json = fs.readFileSync(this._location);

  return JSON.parse(json);
};

module.exports = Persister;
