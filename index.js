/* eslint-env node */
'use strict';

const path = require('path');
const funnel = require('broccoli-funnel');
const map = require('broccoli-stew').map;
const mergeTrees = require('broccoli-merge-trees');

// <= fastboot-beta
function legacyIsFastboot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}

module.exports = {
  name: 'ember-cli-showdown',

  included() {
    this._super.included.apply(this, arguments);

    let host = this._findHost();

    if (legacyIsFastboot()) {
      this.legacyImportFastBootDependencies(host);
    } else {
      this.importBrowserDependencies(host);
    }
  },

  // >= fastboot-rc
  updateFastBootManifest(manifest) {
    manifest.vendorFiles.unshift('ember-cli-showdown/fastboot-showdown.js');

    return manifest;
  },

  treeForVendor(vendorTree) {
    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(map(funnel(path.dirname(require.resolve('showdown/dist/showdown.js')), {
      files: ['showdown.js', 'showdown.js.map']
    }), (content) => "if (typeof FastBoot === 'undefined') { " + content + " }"));

    if (legacyIsFastboot()) {
      trees.push(funnel(path.join(__dirname, './public'), {
        files: ['fastboot-showdown.js']
      }));
    }

    return mergeTrees(trees);
  },

  legacyImportFastBootDependencies(app) {
    let pkg = require(path.join(app.project.root, 'package.json'));
    let whitelist = pkg.fastbootDependencies;

    if (!whitelist || whitelist && !~whitelist.indexOf('showdown')) {
      throw new Error("[ember-cli-showdown] showdown is missing from package.json's fastbootDependencies.\nSee: https://github.com/ember-fastboot/ember-cli-fastboot#whitelisting-packages");
    }

    this.import('vendor/fastboot-showdown.js');
  },

  importBrowserDependencies() {
    this.import('vendor/showdown.js');
  }
};
