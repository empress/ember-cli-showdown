'use strict';

var RSVP = require('rsvp');

module.exports = {
  normalizeEntityName: function () {},
  afterInstall: function () {
    return RSVP.hash({
      browser: this.addBowerPackageToProject('showdown'),
      node: this.addPackageToProject('showdown')
    });
  }
};
