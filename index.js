/* eslint-env node */
'use strict';

const path = require('path');
const funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

function isFastBoot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}

module.exports = {
  name: 'ember-cli-showdown',

  included(app) {
    this._super.included.apply(this, arguments);

    let host = this._findHost();

    if (isFastBoot()) {
      this.importFastBootDependencies(host);
    } else {
      this.importBrowserDependencies(host);
    }
  },

  treeForVendor(vendorTree) {
    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(funnel(path.dirname(require.resolve('showdown/dist/showdown.js')), {
      files: ['showdown.js'],
    }));

    if (isFastBoot()) {
      trees.push(funnel(path.join(__dirname, './assets'), {
        files: ['fastboot-showdown.js']
      }));
    }

    return mergeTrees(trees);
  },

  importFastBootDependencies(app) {
    let pkg = require(path.join(app.project.root, 'package.json'));
    let whitelist = pkg.fastbootDependencies;

    if (!whitelist || whitelist && !~whitelist.indexOf('showdown')) {
      throw new Error("[ember-cli-showdown] showdown is missing from package.json's fastbootDependencies.\nSee: https://github.com/ember-fastboot/ember-cli-fastboot#whitelisting-packages");
    }

    this.import('vendor/fastboot-showdown.js');
  },

  importBrowserDependencies(app) {
    this.import('vendor/showdown.js');
  }
};
