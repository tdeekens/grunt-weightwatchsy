# grunt-weightwatchsy

> Grunt task for gathering the file sizes of different asset types over time.

[![NPM](https://nodei.co/npm/grunt-weightwatchsy.png?mini=true)](https://nodei.co/npm/grunt-weightwatchsy/)

[![Build Status](https://travis-ci.org/tdeekens/grunt-weightwatchsy.svg?branch=master)](https://travis-ci.org/tdeekens/grunt-weightwatchsy)
[![Coverage Status](https://coveralls.io/repos/tdeekens/grunt-weightwatchsy/badge.png)](https://coveralls.io/r/tdeekens/grunt-weightwatchsy)
[![Dependency Status](https://david-dm.org/tdeekens/grunt-weightwatchsy.svg?style=flat)](https://david-dm.org/tdeekens/grunt-weightwatchsy)

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-weightwatchsy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-weightwatchsy');
```

## The "weightwatchsy" task

### Overview
In your project's Gruntfile, the `weightwatchsy` task is available to use.

You can run `grunt weightwatchsy` standalone
Or add it to an existing task: `grunt.registerTask('test', ['clean', 'weightwatchsy']);`

### Options

```javascript
{
  //Prettifies file sizes to readable format
  human: <true>,
  //Path where to save results
  location: <'dist/weightwatchsy.json'>,
  //Sums up assets' sizes per extension type
  aggregate: <['.txt', '.css', '.js', '.png', '.jpg']>,
  /**
   * Allows for grouping asset types e.g.
   * {
   *   text: ['.css', '.js']
   * }
   */
  groups: <{}>,
  /**
   * Allows breaking the build by e.g. stating
   * {
   *   aggregations: {
   *     css: 1000
   *   },
   *   groups: {
   *     text: 20000
   *   },
   *   summary: {
   *     size: 50000,
   *     average: 250
   *   }
   * }
   */
   break: <{
     file: {},
     aggregations: {},
     summary: {}
   }>,
   //Aborts grunt immediately if false and a `break`-condition holds
   warn: <true>,
   //Excludes dependencies by name (from extensions and total size etc.)
   exclusions: <[]>
}
```

An example configuration can be found [here](https://github.com/tdeekens/grunt-weightwatchsy/blob/master/grunt/tasks/weightwatchsy.js) and if you want to check the options you might want to check the [Gruntfile](https://github.com/tdeekens/grunt-weightwatchsy/blob/master/tasks/weightwatchsy.js#L22) itself.

## Developing & Contributing

Developing on the task alone is fairly easy just `git clone https://github.com/tdeekens/grunt-weightwatchsy.git` then `cd grunt-weightwatchsy`. From there one has to link the package to itself via `npm link && npm link grunt-weightwatchsy` which will allow for calling `grunt dev`. Now just work the `task/weightwatchsy.js` and check results - feel free to submit a pull-request!

## Release History
- 0.0.1 Initial release
- 0.0.2 Add conditional breaking of build
- 0.0.3 Clean up and refactoring
- 0.0.4 Add support for breaking on summary conditions
- 0.0.5 Add warn-flag allowing to immediately fail grunt if break-condition holds
- 0.1.0 Minor version bump - stable enough
- 0.1.1 Fix breaking build with warn-flag
- 0.1.2 Add summary of sizes by extensions
- 0.1.3 Add brief information under summary entry
- 0.1.4 Add support for explicitly excluding extensions
