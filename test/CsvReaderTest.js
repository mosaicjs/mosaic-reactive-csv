var expect = require('expect.js');
var newStream = require('./newStream');
var csvReader = require('../').csvReader;

describe('CSV Read Stream', function() {
  test('should generate nothing for empty inputs ', [], []);
  test('should generate nothing if only headers are defined',
      [ 'foo,bar,boo' ], []);
  test('should be able to generate one object', //
  [ 'foo,bar,boo', 'a,b,c' ], //
  [ {
    foo : 'a',
    bar : 'b',
    boo : 'c'
  } ]);
  test('should be able to generate multiple objects',//
  [ 'foo,bar,boo', 'a,b,c', 'e,f,g', 'h,i,j' ], //
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
  } ]);
});
function test(msg, lines, objects) {
  it(msg, function(done) {
    var result = [];
    return Promise.resolve().then(function() {
      var stream = newStream();
      var objectStream = csvReader(stream);
      objectStream.each(function(obj) {
        result.push(obj);
      })
      lines.forEach(stream.write);
      stream.end();
      return stream;
    }).then(function() {
      expect(result).to.eql(objects);
    }).then(done, done);
  });
}
