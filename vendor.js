/* jshint node:true */

var ncp = require('ncp'),
    mkdirp = require('mkdirp'),

    src = 'node_modules/showdown/compressed/showdown.js',
    dest = 'vendor/showdown/showdown.js';

mkdirp('vendor/showdown', function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  ncp(src, dest, function(err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log('Copied files to vendor folder');
  });
});
