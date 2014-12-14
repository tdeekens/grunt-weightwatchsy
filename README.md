# grunt-weightwatchsy

**Note: This grunt plugin is under current development and not ready for use just now!**

> Grunt task for gathering the file sizes of different asset types over time.

[![NPM](https://nodei.co/npm/grunt-weightwatchsy.png?mini=true)](https://nodei.co/npm/grunt-weightwatchsy/)

[![Build Status](https://travis-ci.org/tdeekens/grunt-weightwatchsy.svg?branch=master)](https://travis-ci.org/tdeekens/grunt-weightwatchsy)
[![Build Status](https://drone.io/github.com/tdeekens/grunt-weightwatchsy/status.png)](https://drone.io/github.com/tdeekens/grunt-weightwatchsy/latest)
[![Circle CI](https://circleci.com/gh/tdeekens/grunt-weightwatchsy/tree/master.svg?style=svg)](https://circleci.com/gh/tdeekens/grunt-weightwatchsy/tree/master)
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
  human: <true> //Prettifies file sizes to readable format
  location: <'dist/weightwatchsy.json'> //Path where to save results
  aggregate: <['.txt', '.css', '.js', '.png', '.jpg']> //Sums up assets' sizes per extension type
  groups: <{}> //Allows for grouping asset types e.g. `{text: ['.css', '.css']}`
  break: <{}> //Allows breaking the build by e.g. stating `{aggregations: {css: 1000}}`
}
```

## Developing & Contributing

Developing on the task alone is fairly easy just `git clone https://github.com/tdeekens/grunt-weightwatchsy.git` then `cd grunt-weightwatchsy`. From there one has to link the package to itself via `npm link && npm link grunt-weightwatchsy` which will allow for calling `grunt dev`. Now just work the `task/weightwatchsy.js` and check results - feel free to submit a pull-request!

## Release History
- 0.0.1 Initial release
- 0.0.2 Add conditional breaking of build
