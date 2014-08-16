/* jshint node:true */
'use strict';

var path = require('path'),
    mergeTrees = require('broccoli-merge-trees');

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
  if (tree !== 'vendor') { return; }
  var treePath = path.join('node_modules', 'ember-cli-showdown', 'node_modules');
  return unwatchedTree(treePath);
};

ShowdownPlugin.prototype.included = function(app) {
  var addonApp = path.join('node_modules', 'ember-cli-showdown', 'app');
  app.trees.app = mergeTrees([app.trees.app, addonApp], {overwrite: true});

  app.import('vendor/showdown/src/showdown.js');
};

module.exports = ShowdownPlugin;
