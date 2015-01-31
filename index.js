/* jshint node: true */
'use strict';
var path = require('path');

module.exports = {
  name: 'ember-cli-showdown',
  included: function showdownIncluded(app) {
    this._super.included(app);

    var showdownPath = path.join(app.bowerDirectory, 'showdown', 'compressed');
    this.app.import(path.join(showdownPath, 'Showdown.min.js'));
  }
};
