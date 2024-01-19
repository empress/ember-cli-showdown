/* eslint-disable  prettier/prettier, no-prototype-builtins */

import showdown from 'showdown';
import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { getOwner } from '@ember/application';

const CONFIG_LOOKUP = 'config:environment';

export default class ShowdownComponent extends Component {
  _globalOptions = null

  get defaultOptionKeys() {
    return Object.keys(showdown.getDefaultOptions());
  }

  constructor() {
    super(...arguments);
    const owner = getOwner(this);

    if (owner && owner.hasRegistration(CONFIG_LOOKUP)) {
      this._globalOptions = (
        owner.resolveRegistration(CONFIG_LOOKUP) || {}
      ).showdown;
    }
  }

  get html() {
    let showdownOptions = this.getShowdownProperties(
      this.defaultOptionKeys
    );
    let converter = this.converter;

    for (let option in showdownOptions) {
      if (
        showdownOptions.hasOwnProperty(option) &&
        typeof showdownOptions[option] !== 'undefined'
      ) {
        converter.setOption(option, showdownOptions[option]);
      }
    }

    return htmlSafe(converter.makeHtml(this.args.markdown));
  }

  get converter() {
    let extensions = this.args.extensions ?? [];

    if (typeof extensions === 'string') {
      extensions = extensions.split(' ');
    }

    return new showdown.Converter({ extensions });
  }

  getShowdownProperties(keyNames) {
    return keyNames.reduce((accumulator, keyName) => {
      let value = this.args[keyName];

      if (value === undefined && this._globalOptions) {
        value = this._globalOptions[keyName];
      }

      accumulator[keyName] = value;

      return accumulator;
    }, {});
  }
}

