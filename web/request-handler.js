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
  } else if (req.method === 'GET' && req.url === '/styles.css') {
    assetsHelper.serveAssets(res, '/public/styles.css');
  } else if (req.method === 'POST' && req.url === '/') {
    var formData = '';

    req.on('data', function (chunk) {
      formData += chunk;
    });

    req.on('end', function () {
      formData = formData.toString();

      var equalSignIndex = formData.indexOf('=');
      var url = formData.slice(equalSignIndex + 1);

      console.log(formData);
      archive.readListOfUrls(function(urlArr) {
        if (urlArr.indexOf(url) > -1) {
          //check if we have it in archeive
          archive.isUrlArchived(url, function(boolean) {
            //if found ... serve it
            if (boolean) {
              assetsHelper.serveAssets(res, '../archives/sites/' + url);
            } else {
              assetsHelper.serveAssets(res, '/public/loading.html');
            }
          });
        } else {
          //add url to sites.txt
          archive.addUrlToList(url);

          //redirect sue to loading.html
          assetsHelper.serveAssets(res, '/public/loading.html');
        }
      });
    });
  } else if (req.method === 'GET') {
    //archive.downloadUrls(['www.google.com', 'www.yahoo.ca']);
    var url = req.url.slice(1);

    //should check for file in archived
    archive.isUrlArchived(url, function(boolean) {
      //if found ... TODO: server it
      if (boolean) {
        assetsHelper.serveAssets(res, '../archives/sites/' + url);
      } else {
        res.writeHead(404, assetsHelper.headers);
        res.end('404 - NOT FOUND');
      }
    });
  }
};