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

    // support for using ember-cli-showdown as a deeply nested addon
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    if (isFastBoot()) {
      this.importFastBootDependencies(app);
    } else {
      this.importBrowserDependencies(app);
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
      throw new Error("[ember-cli-showdown] showdown is missing from package.json's fastbootDependencies.\nSee: https://github.com/ember-fastboot/ember-cli-fastboot#whitelisting-packages")
    }

    app.import('vendor/fastboot-showdown.js');
  },

  importBrowserDependencies: function(app) {
    app.import(app.bowerDirectory + '/showdown/dist/showdown.js');
  }
};
