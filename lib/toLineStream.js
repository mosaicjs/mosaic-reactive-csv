var csvReader = require('./csvReader');

/**
 * Transforms NodeJS data streams to a stream of lines
 */
module.exports = function toLineStream(fileStream, output, keepOpen) {
  var data = '';
  fileStream.on('data', function(d) {
    data += (d || '').toString();
    var array = data.split(/\n/);
    data = array.pop();
    for (var i = 0; i < array.length; i++) {
      output.write(array[i]);
    }
  });
  fileStream.on('end', function() {
    output.write(data);
    if (!keepOpen) {
      output.end();
    }
  })
  fileStream.on('error', function(err) {
    if (!keepOpen) {
      output.reject(err);
    }
  })
  return output;
}
