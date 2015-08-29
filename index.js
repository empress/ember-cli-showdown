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

    var bower = app.bowerDirectory;

    app.import(bower + '/showdown/dist/showdown.js');
  }
};
