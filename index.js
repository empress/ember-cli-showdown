/* eslint-env node */
'use strict';

const path = require('path');
const semver = require('semver');
const funnel = require('broccoli-funnel');
const stringReplace = require('broccoli-string-replace');
const UnwatchedDir = require('broccoli-source').UnwatchedDir;

module.exports = {
  name: 'ember-cli-showdown',

  included() {
    this._super.included.apply(this, arguments);

    this.import('vendor/showdown.js', {
      using: [{ transformation: 'amd', as: 'showdown' }]
    });

    this.import('vendor/showdown.js.map', { destDir: 'assets' })
  },

  findModulePath(basedir) {
    try {
      let resolve = require('resolve');

      return path.dirname(resolve.sync('showdown', { basedir: basedir }));
    } catch (_) {
      try {
        return path.dirname(require.resolve('showdown'));
      } catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
          this.ui.writeLine(
            `ember-cli-showdown: showdown not installed, be sure you have showdown installed via npm/yarn.`
          );
          return;
        }

        throw e;
      }
    }
  },

  treeForVendor() {
    let modulePath = this.findModulePath(this.project.root);

    if (modulePath) {
      let showdownTree = funnel(new UnwatchedDir(modulePath), {
        include: ['showdown.js', 'showdown.js.map']
      });

      let pkg = require(path.join(modulePath, '..', 'package.json'));

      if (pkg.version && semver.gt(pkg.version, '1.7.4')) {
        return showdownTree;
      }

      /*
       * The stringReplace forces showdown's loader to use define.amd vs. commonjs/node.
       * This allows us to use the vendored copy of showdown when the app is eval'd within node (fastboot).
       * https://github.com/showdownjs/showdown/blob/5d2016c0c1fa2bd722e45b952f1e446c3c870d0f/src/loader.js#L4
       */
      return stringReplace(showdownTree, {
        files: ['showdown.js'],
        patterns: [
          {
            match: /typeof module !== 'undefined'/g,
            replacement: 'false'
          }
        ]
      });
    }
  }
};
