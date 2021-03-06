var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  var filePath = path.join(__dirname, asset);

  fs.readFile(filePath, function (err, data) {
    if (err) {
      throw err;
    }

    if (asset === '/public/loading.html') {
      res.writeHead(302, exports.headers);
      res.end(data.toString());
    } else {
      res.writeHead(200, exports.headers);
      res.end(data.toString());
    }

    if (callback) {
      callback(data);
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!
