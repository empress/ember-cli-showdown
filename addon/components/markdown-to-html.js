import showdown from 'showdown';
import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { get, computed } from '@ember/object';
import layout from '../templates/components/markdown-to-html';

const ShowdownComponent = Component.extend({
  layout,
  markdown: '',

  /* @private */
  globalConfig: null,

  extensions: computed(function() {
    return [];
  }),

  defaultOptionKeys: computed(function() {
    return Object.keys(showdown.getDefaultOptions());
  }).readOnly(),

  html: computed('markdown', 'converter', function() {
    let showdownOptions = this.getShowdownProperties(get(this, 'defaultOptionKeys'));
    let converter = get(this, 'converter');

    for (let option in showdownOptions) {
      if (showdownOptions.hasOwnProperty(option) && (typeof showdownOptions[option]) !== 'undefined') {
        converter.setOption(option, showdownOptions[option]);
      }
    }

    return htmlSafe(converter.makeHtml(get(this, 'markdown')));
  }).readOnly(),

  converter: computed('extensions', function() {
    let extensions = get(this, 'extensions');

    if (typeof extensions === 'string') {
      extensions = extensions.split(' ');
    }

    return new showdown.Converter({ extensions });
  }),

  getShowdownProperties(keyNames) {
    return keyNames.reduce((accumulator, keyName) => {
      let value = get(this, keyName);

      if (value === undefined && this.globalConfig) {
        value = get(this.globalConfig, keyName);
      }

      accumulator[keyName] = value;

      return accumulator;
    }, {});
  }
});

ShowdownComponent.reopenClass({
  positionalParams: ['markdown']
});

export default ShowdownComponent;
