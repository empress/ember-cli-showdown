/* jshint node: true */
'use strict';
var path = require('path');

module.exports = {
  name: 'ember-cli-showdown',
  included: function showdownIncluded(app) {
    this._super.included(app);

    var showdownPath = path.join('vendor', 'showdown');
    this.app.import(path.join(showdownPath, 'showdown.js'));
  }
};
