/* eslint-env node */
'use strict';

const path = require('path');
const funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const stringReplace = require('broccoli-string-replace');
const UnwatchedDir = require('broccoli-source').UnwatchedDir;

module.exports = {
  name: 'ember-cli-showdown',

  included() {
    this._super.included.apply(this, arguments);

    this.import('vendor/showdown.js', {
      using: [{ transformation: 'amd', as: 'showdown' }]
    });
  },

  findShowdown(basedir) {
    try {
      let resolve = require('resolve');

      return path.dirname(resolve.sync('showdown', { basedir: basedir }));
    } catch(_) {
      try {
        return path.dirname(require.resolve('showdown'));
      } catch(e) {
        if (e.code === 'MODULE_NOT_FOUND') {
          this.ui.writeLine(`ember-cli-showdown: showdown not installed, be sure you have showdown installed via npm/yarn.`)
          return;
        }

        throw e;
      }
    }
  },

  treeForVendor(vendorTree) {
    let trees = [];
    let folderPath = this.findShowdown(this.project.root);

    if (vendorTree) {
      trees.push(vendorTree);
    }

    let showdownTree = funnel(new UnwatchedDir(folderPath), {
      include: ['showdown.js', 'showdown.js.map']
    });

    /* force AMD */
    trees.push(stringReplace(showdownTree, {
      files: ['showdown.js'],
      pattern: {
        match: /typeof module !== 'undefined'/g,
        replacement: 'false'
      }
    }));

    return mergeTrees(trees);
  }
};
