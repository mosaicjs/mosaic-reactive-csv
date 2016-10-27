var expect = require('expect.js');
var fs = require('fs');
var newStream = require('./newStream');
var toLineStream = require('../').toLineStream;

describe('toLineStream', function() {
  it('should transform a NodeJS stream to a sequence of lines', function(done) {
    var file = __dirname + '/toLineStreamTest-data.txt';
    var fileStream = fs.createReadStream(file, 'UTF-8');
    var output = newStream();
    var result = [];
    output.each(function(str) {
      result.push(str);
    })
    toLineStream(fileStream, output);
    output.then(function() {
      var content = fs.readFileSync(file, 'UTF-8');
      var lines = content.split(/\n/);
      expect(result).to.eql(lines);
    }).then(done, done);
  })
});
