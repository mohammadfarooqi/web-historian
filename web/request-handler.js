var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var assetsHelper = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //res.end(archive.paths.list);
  console.log('serving ', req.method, ' ', req.url);

  if (req.method === 'GET' && req.url === '/') {
    assetsHelper.serveAssets(res, '/public/index.html');
  } else if(req.method === 'GET' && req.url === '/styles.css') {
    assetsHelper.serveAssets(res, '/public/styles.css');
  }
};
