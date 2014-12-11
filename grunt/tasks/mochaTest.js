module.exports = {
  test: {
    src: '<%= paths.test.mocha %>',
    options: {
      reporter: 'spec',
      require: [
      ]
    }
  }
};
