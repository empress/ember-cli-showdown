/* global showdown */
import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super();
    this.converter = new showdown.Converter();
  },

  html: Ember.computed('markdown', function() {
    var source = this.get('markdown') || '';
    return new Ember.Handlebars.SafeString(this.converter.makeHtml(source));
  })
});
