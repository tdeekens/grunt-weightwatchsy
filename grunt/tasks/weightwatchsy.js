/* globals module */
module.exports = {
  options: {
    groups: {
      text: ['.js', '.css', '.txt']
    },
    exclusions: ['.txt'],
    variations: ['.gz']
  },
  test: ['./tasks/**']
};
