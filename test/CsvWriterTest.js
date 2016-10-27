var expect = require('expect.js');
var newStream = require('./newStream');
var csvWriter = require('../').csvWriter;

describe('CSV Writer Stream', function() {
  test('should generate nothing for empty inputs ', [], []);
  test('should be able to generate one line', //
  [ {
    foo : 'a',
    bar : 'b',
    boo : 'c'
  } ], //
  [ '"foo","bar","boo"', '"a","b","c"' ]);
  test('should be able to generate multiple lines',//
  [ {
    foo : 'a',
    bar : 'b',
    boo : 'c'
  }, {
    foo : 'e',
    bar : 'f',
    boo : 'g'
  }, {
    foo : 'h',
    bar : 'i',
    boo : 'j'
  } ], [ '"foo","bar","boo"', '"a","b","c"', '"e","f","g"', '"h","i","j"' ]);
});
function test(msg, objects, lines) {
  it(msg, function(done) {
    var result = [];
    return Promise.resolve().then(function() {
      var stream = newStream();
      var lineStream = csvWriter(stream);
      lineStream.each(function(str) {
        result.push(str);
      })
      objects.forEach(stream.write);
      stream.end();
      return stream;
    }).then(function() {
      expect(result).to.eql(lines);
    }).then(done, done);
  });
}
