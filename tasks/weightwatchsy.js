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
var Breaker = require('./modules/breaker');
var fs = require('fs');

module.exports = function(grunt) {

  grunt.registerMultiTask('weightwatchsy', 'Gather your assets\' size over time', function() {
    var options = this.options({
      human: true,
      location: './dist/weightwatchsy.json',
      aggregate: ['.txt', '.css', '.js', '.png', '.jpg'],
      groups: {},
      break: {
        files: {},
        aggregations: {}
      }
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
    var aggregator = new Aggregator(options.aggregate, options.groups);
    var formatter = new Formatter(options.human);
    var persister = new Persister(options.location);
    var breaker = new Breaker();

    var fileSizes = sizeDeterminer.determine(files);
    var aggregatedSizes = aggregator.aggregate(fileSizes.files);
    var sanity = breaker.breakOn(files, options.break);

    var completeSizes = {
      files: formatter.formatAll(fileSizes.files),
      summary: formatter.formatAll(fileSizes.summary),
      aggregations: formatter.formatAll(aggregatedSizes),
      sanity: sanity
    };

    completeSizes.summary.quantity = Object.keys(completeSizes.files).length;

    persister.persist(completeSizes);

    if (sanity.broken === true) {
      grunt.log.errorlns('Assets are not passing your conditions, breaking build...');
    } else {
      grunt.log.oklns('Assets have been analyzed, build passing...');
    }
  });
};
