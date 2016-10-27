var d3_dsv = require('d3-dsv');
/**
 * This function transforms a sequence of strings to a sequence of structured
 * objects.
 */
function csvReader(stream) {
  var header, delimiter, columns, d;
  var output = stream.map(function(str) {
    if (!d) {
      d = d3_dsv.dsvFormat(delimiter);
    }
    if (!columns) {
      if (typeof header === 'function') {
        var cells = d.parse(str).columns;
        columns = header(cells);
      } else {
        columns = header;
      }
      return null;
    } else {
      var obj = {};
      d.parseRows(str, function(d, r) {
        for (var i = 0; i < columns.length; i++) {
          obj[columns[i]] = d[i];
        }
      });
      return obj;
    }
  }).filter(function(obj) {
    return !!obj;
  });
  output.delimiter = function(_) {
    if (_ === undefined)
      return delimiter;
    delimiter = _;
    return output;
  }
  output.header = function(_) {
    if (_ === undefined) {
      return header;
    }
    header = _;
    return output;
  }
  return output.delimiter(',').header(function h(cells) {
    return cells.map(function clean(s) {
      return s.replace(/^.*?([\w\s_]+).*?$/gim, '$1');
    });
  });
}
module.exports = csvReader;