var reactive = require('mosaic-reactive');
module.exports = function() {
  return reactive.Stream(Promise, reactive.stream);
}
