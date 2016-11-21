/* global showdown */
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

const { computed, get } = Ember;

const ShowdownComponent = Ember.Component.extend({
  layout: hbs`{{html}}`,
  markdown: '',

  extensions: computed(function() {
    return [];
  }),

  defaultOptionKeys: computed(function() {
    return Object.keys(showdown.getDefaultOptions());
  }).readOnly(),

  html: computed('markdown', 'converter', function() {
    let showdownOptions = this.getProperties(get(this, 'defaultOptionKeys'));
    let converter = get(this, 'converter');
 
    for (let option in showdownOptions) {
      if (showdownOptions.hasOwnProperty(option)) {
        converter.setOption(option, showdownOptions[option]);
      }
    }

    return Ember.String.htmlSafe(converter.makeHtml(get(this, 'markdown')));
  }).readOnly(),

  converter: computed('extensions', function() {
    let extensions = get(this, 'extensions');

    if (typeof extensions === 'string') {
      extensions = extensions.split(' ');
    }

    return new showdown.Converter({ extensions });
  })
});

ShowdownComponent.reopenClass({
  positionalParams: ['markdown']
});

export default ShowdownComponent;
