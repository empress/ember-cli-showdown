'use strict';

const path = require('path');
const assert = require('assert');
const semver = require('semver');
const funnel = require('broccoli-funnel');
const stringReplace = require('broccoli-string-replace');
const VersionChecker = require('ember-cli-version-checker');
const UnwatchedDir = require('broccoli-source').UnwatchedDir;

module.exports = {
  name: 'ember-cli-showdown',

  init() {
    this._super.init && this._super.init.apply(this, arguments);

    let checker = new VersionChecker(this);
    let dep = checker.for('ember-cli');

    assert(
      dep.gte('2.16.0'),
      '[ember-cli-showdown] ember-cli >= 2.16.0 is required for ember-cli-showdown@^4.0.0.  Either upgrade ember-cli or target ember-cli-showdown@3.'
    );
  },

  included() {
    this._super.included.apply(this, arguments);

    this.import('vendor/showdown.js', {
      using: [{ transformation: 'amd', as: 'showdown' }]
    });
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

  removeSourcemapAnnotation(node) {
    return stringReplace(node, {
      files: ['showdown.js'],
      annotation: 'Remove sourcemap annotation (showdown)',
      patterns: [
        {
          match: /\/\/# sourceMappingURL=showdown.js.map/g,
          replacement: ''
        }
      ]
    });
  },

  treeForVendor() {
    let modulePath = this.findModulePath(this.project.root);

    if (modulePath) {
      let showdownTree = funnel(new UnwatchedDir(modulePath), {
        include: ['showdown.js']
      });

      let pkg = require(path.join(modulePath, '..', 'package.json'));

      if (pkg.version && semver.gt(pkg.version, '1.7.4')) {
        return this.removeSourcemapAnnotation(showdownTree);
      }

      /*
       * The stringReplace forces showdown's loader to use define.amd vs. commonjs/node.
       * This allows us to use the vendored copy of showdown when the app is eval'd within node (fastboot).
       * https://github.com/showdownjs/showdown/blob/5d2016c0c1fa2bd722e45b952f1e446c3c870d0f/src/loader.js#L4
       */
      return this.removeSourcemapAnnotation(
        stringReplace(showdownTree, {
          files: ['showdown.js'],
          patterns: [
            {
              match: /typeof module !== 'undefined'/g,
              replacement: 'false'
            }
          ]
        })
      );
    }
  }
};
