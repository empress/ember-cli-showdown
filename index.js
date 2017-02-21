/* jshint node: true */
'use strict';

var path = require('path');
var funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

function isFastBoot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}

module.exports = {
  name: 'ember-cli-showdown',

  blueprintsPath: function () {
    return __dirname + '/blueprints';
  },

  included: function showdownIncluded(app) {
    if (app.app) {
      app = app.app;
    }
    this._super.included.call(this, app);

    var host = this._findHost();

    if (isFastBoot()) {
      this.importFastBootDependencies(host);
    } else {
      this.importBrowserDependencies(host);
    }
  },

  treeForVendor: function(vendorTree) {
    var trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    if (isFastBoot()) {
      trees.push(funnel(path.join(__dirname, './assets'), {
        files: ['fastboot-showdown.js']
      }));
    }

    return mergeTrees(trees);
  },

  importFastBootDependencies: function(app) {
    var pkg = require(path.join(app.project.root, 'package.json'));
    var whitelist = pkg.fastbootDependencies;

    if (!whitelist || whitelist && !~whitelist.indexOf('showdown')) {
      throw new Error("[ember-cli-showdown] showdown is missing from package.json's fastbootDependencies.\nSee: https://github.com/ember-fastboot/ember-cli-fastboot#whitelisting-packages");
    }

    this.import('vendor/fastboot-showdown.js');
  },

  importBrowserDependencies: function(app) {
    this.import(app.bowerDirectory + '/showdown/dist/showdown.js');
  }
};
