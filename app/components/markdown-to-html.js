import Component from 'ember-cli-showdown/components/markdown-to-html';
import config from '../config/environment';

export default Component.extend({
  globalConfig: config && config.showdown
})
