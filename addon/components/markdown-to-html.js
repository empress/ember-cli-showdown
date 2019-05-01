import showdown from 'showdown';
import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { get, computed } from '@ember/object';
import { getOwner } from '@ember/application';
import layout from '../templates/components/markdown-to-html';

const CONFIG_LOOKUP = 'config:environment';

const ShowdownComponent = Component.extend({
  layout,
  markdown: '',
  tagName: '',
  _globalOptions: null,

  extensions: computed(function() {
    return [];
  }),

  defaultOptionKeys: computed(function() {
    return Object.keys(showdown.getDefaultOptions());
  }).readOnly(),

  init() {
    this._super(...arguments);
    const owner = getOwner(this);

    if (owner && owner.hasRegistration(CONFIG_LOOKUP)) {
      this._globalOptions = (
        owner.resolveRegistration(CONFIG_LOOKUP) || {}
      ).showdown;
    }
  },

  html: computed('markdown', 'converter', function() {
    let showdownOptions = this.getShowdownProperties(
      get(this, 'defaultOptionKeys')
    );
    let converter = get(this, 'converter');

    for (let option in showdownOptions) {
      if (
        showdownOptions.hasOwnProperty(option) &&
        typeof showdownOptions[option] !== 'undefined'
      ) {
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

      if (value === undefined && this._globalOptions) {
        value = get(this._globalOptions, keyName);
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
