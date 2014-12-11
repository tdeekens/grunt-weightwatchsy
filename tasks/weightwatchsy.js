/*
* grunt-weightwatchsy
* https://github.com/tdeekens/grunt-weightwatchsy
*
* Copyright (c) 2014 tdeekens
* Licensed under the MIT license.
*/

'use strict';

var SizeDeterminer = require('./modules/size-determiner');
var Aggregator = require('./modules/aggregator');
var Formatter = require('./modules/formatter');
var Persister = require('./modules/persister');
var fs = require('fs');

module.exports = function(grunt) {

  grunt.registerMultiTask('weightwatchsy', 'Gather your assets\' size over time', function() {
    var options = this.options({
      human: true,
      location: './dist/weightwatchsy.json',
      aggregate: ['.txt', '.css', '.js', '.png', '.jpg']
    });

    var files = [];

    this.files.forEach(function(file) {
      files = file.src.filter(function(filepath) {
        return fs.lstatSync(filepath).isFile();
      }).map(function(filepath) {
        return filepath;
      });
    });

    var sizeDeterminer = new SizeDeterminer();
    var aggregator = new Aggregator(options.aggregate);
    var formatter = new Formatter(options.human);
    var persister = new Persister(options.location);

    var sizes = sizeDeterminer.determine(files);
    var aggregated = aggregator.aggregate(sizes);
    var formatted = formatter.formatAll(aggregated);

    persister.persist(aggregated);
  });
};
