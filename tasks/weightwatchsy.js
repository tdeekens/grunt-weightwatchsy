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
var FileAnalyzer = require('./modules/file-analyzer');
var fs = require('fs');
var _ = require('lodash');

module.exports = function(grunt) {

  grunt.registerMultiTask('weightwatchsy', 'Gather your assets\' size over time', function() {
    var options = this.options({
        human: true,
        warn: true,
        exclusions: [],
        variations: [],
        location: './dist/weightwatchsy.json',
        aggregate: ['.txt', '.css', '.js', '.png', '.jpg'],
        groups: {},
        break: {
          files: {},
          aggregations: {},
          summary: {}
        },
        history: {
          enabled: false,
          limit: 10
        }
      });

    var files = [],
        fileAnalyzer = new FileAnalyzer(options.exclusions),
        sizeDeterminer = new SizeDeterminer(),
        aggregator = new Aggregator(options.aggregate, options.groups, options.variations),
        formatter = new Formatter(options.human),
        persister = new Persister(options.location, options.history.enabled, options.history.limit),
        breaker = new Breaker();

    files = fileAnalyzer.getFiles(this.files);
    files = fileAnalyzer.shuntAll(files);

    var fileSizes = sizeDeterminer.determine(files);
    fileSizes.aggregations = aggregator.aggregate(fileSizes.files);

    var sanity = breaker.breakOn(fileSizes, options.break),
        rawSizes = _.clone(aggregator.getSizesByExtensions());

    var completeSizes = {
      files: formatter.formatAll(fileSizes.files),
      summary: formatter.formatAll(fileSizes.summary),
      aggregations: formatter.formatAll(fileSizes.aggregations),
      sanity: sanity,
      extensions: {},
      variations: {},
      exclusions: options.exclusions
    };

    completeSizes.summary.quantity = Object.keys(completeSizes.files).length;

    completeSizes.extensions.devilish = rawSizes;
    completeSizes.extensions.human = formatter.formatAll(aggregator.getSizesByExtensions());

    _.each(aggregator.getSizesByVariations(), function(extensions, variation) {
      completeSizes.variations[variation] =  formatter.formatAll(extensions);
    }, this);

    completeSizes.summary.info = Object.keys(completeSizes.aggregations).map(function(extension) {
      var extensionSummary = completeSizes.aggregations[extension] + ' (' + extension + ')',
          variations = completeSizes.variations[extension];

      if (variations !== undefined) {
        _.each(variations, function(size, variation) {
          extensionSummary += ' - ' + size + ' (' + variation + ')';
        });
      }

      return extensionSummary;
    });

    persister.persist(completeSizes);

    if (sanity.broken === true) {
      grunt.log.errorlns('Assets are not passing your conditions...');

      if (options.warn === false) {
        grunt.fail.warn('...breaking build as a result thereof!');
      }
    } else {
      grunt.log.oklns('Assets have been analyzed, build passing...');
    }
  });
};
