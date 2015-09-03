/* global showdown */
import Ember from 'ember';

export default Ember.Component.extend({
  init: function() {
    this._super();

    this.converter = new showdown.Converter({
      extensions: (this.get("extensions") || [])
    });
  },

  html: Ember.computed('markdown', function() {
    var showdownOptions = this.getProperties(
      'omitExtraWLInCodeBlocks',
      'noHeaderId',
      'prefixHeaderId',
      'parseImgDimensions',
      'headerLevelStart',
      'simplifiedAutoLink',
      'literalMidWordUnderscores',
      'strikethrough',
      'tables',
      'tablesHeaderId',
      'ghCodeBlocks',
      'tasklists',
      'smoothLivePreview'
    );

    for (var option in showdownOptions) {
      if (showdownOptions.hasOwnProperty(option)) {
        this.converter.setOption(option, showdownOptions[option]);
      }
    }

    var source = this.get('markdown') || '';
    return new Ember.Handlebars.SafeString(this.converter.makeHtml(source));
  })
});
