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
    this._super.included.apply(this, arguments);

    var host;

    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
    // use that.
    if (typeof this._findHost === 'function') {
      host = this._findHost();
    } else {
      // Otherwise, we'll use this implementation borrowed from the _findHost()
      // method in ember-cli.
      var current = this;
      do {
        host = current.app || host;
      } while (current.parent.parent && (current = current.parent));
    }

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
