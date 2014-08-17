/* jshint node:true */
'use strict';

var path = require('path');

function ShowdownPlugin() {
  this.name = 'ember-cli-showdown';
}

function unwatchedTree(dir) {
  return {
    read: function() { return dir; },
    cleanup: function() {}
  };
}

ShowdownPlugin.prototype.treeFor = function(tree) {
  /*
   * Return the path of a tree you want
   * merged. This method will be called
   * a few times, once for each of the
   * following trees:
   * app, vendor, templates, styles
   *
   * Paths returned here will be merged
   * with the corresponding tree of the
   * host application.
   */

  if (tree === 'app') {
    // app tree
    var appPath = path.join('node_modules', 'ember-cli-showdown', 'app');
    return unwatchedTree(appPath);

  } else if (tree === 'vendor') {
    // vendor tree
    var vendorPath = path.join('node_modules', 'ember-cli-showdown', 'node_modules');
    return unwatchedTree(vendorPath);

  } else {
    // all other trees
    return;
  }
};

ShowdownPlugin.prototype.included = function(app) {
  /*
   * Here you import assets that are
   * already part of a tree.
   */
  app.import('vendor/showdown/src/showdown.js');
};

module.exports = ShowdownPlugin;
