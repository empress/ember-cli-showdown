/* jshint node: true */
'use strict';
var path = require('path');

module.exports = {
  name: 'ember-cli-showdown',
  blueprintsPath: function () {
    return __dirname + '/blueprints';
  },
  included: function showdownIncluded(app) {
    this._super.included.apply(this, arguments);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      // If this flag is present, the addon is being built in FastBoot
      // The jQuery plugin causes FastBoot to crash, so only import in
      // the browser build
      var bower = app.bowerDirectory;

      app.import(bower + '/showdown/dist/showdown.js');
    }
  }
};
