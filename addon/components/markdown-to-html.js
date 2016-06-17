/* global showdown */
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

const { computed, get, Handlebars } = Ember;

const ShowdownComponent = Ember.Component.extend({
  layout: hbs`{{html}}`,
  markdown: '',

  extensions: computed(function() {
    return [];
  }),

  defaultOptionKeys: computed(function() {
    return Object.keys(showdown.getDefaultOptions());
  }).readOnly(),

  html: computed('markdown', function() {
    let showdownOptions = this.getProperties(get(this, 'defaultOptionKeys'));

    for (let option in showdownOptions) {
      if (showdownOptions.hasOwnProperty(option)) {
        this.converter.setOption(option, showdownOptions[option]);
      }
    }

    return new Handlebars.SafeString(this.converter.makeHtml(get(this, 'markdown')));
  }).readOnly(),
  
  createConverter() {
    let extensions = get(this, 'extensions');

    if (typeof extensions === 'string') {
      extensions = extensions.split(' ');
    }

    this.converter = new showdown.Converter({ extensions });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.createConverter();
  }
});

ShowdownComponent.reopenClass({
  positionalParams: ['markdown']
});

export default ShowdownComponent;
