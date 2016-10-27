/**
 * This function transforms a sequence of strings to a sequence of structured
 * objects.
 */
function csvWriter(stream) {
  var header, delimiter, columns, escape;
  var output = stream.clone();
  stream.each(function(obj) {
    if (!columns) {
      if (typeof header === 'function') {
        columns = header(obj);
      } else {
        columns = header;
      }
      if (columns) {
        var str = '';
        for (var i = 0; i < columns.length; i++) {
          var col = columns[i];
          if (i > 0) {
            str += delimiter;
          }
          str += escape(col.name);
        }
        output.write(str);
      }
    }
    if (columns) {
      str = '';
      for (var i = 0; i < columns.length; i++) {
        var col = columns[i];
        if (i > 0) {
          str += delimiter;
        }
        var value = obj[col.key];
        str += escape(value);
      }
      output.write(str);
    }
  });
  output.escape = function(_) {
    if (_ === undefined) {
      return escape;
    }
    escape = _;
    return output;
  }
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
  return output.delimiter(',').escape(function(val) {
    if (val == undefined || val === null)
      return '';
    return JSON.stringify(val);
  }).header(function h(obj) {
    return Object.keys(obj).map(function(key) {
      return {
        key : key,
        name : key
      }
    });
  });
}
module.exports = csvWriter;