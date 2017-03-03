var archive = require('../helpers/archive-helpers');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');

// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

//go through each sites.txt
//if site is not found in archive then download it
//else skip

exports.htmlFetcher = function () {
  archive.readListOfUrls(function (urls) {
    _.each(urls, function (url) {
      archive.isUrlArchived(url, function (exists) {
        if (!exists) {
          archive.downloadUrls([url]);
        }
      });
    });
  });

  // fs.writeFile(path.join(__dirname, './test.html'), 'works', function(err) {
  //   if (err) {
  //     throw err;
  //   }
  // });
};

