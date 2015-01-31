module.exports = {
  afterInstall: function(options) {
    return this.addBowerPackageToProject('showdown', '0.3.4');
  }
};
