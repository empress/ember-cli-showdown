import setupInspector from '@embroider/legacy-inspector-support/ember-source-4.12';

import EmberApp from 'ember-strict-application-resolver';
import Router from './router';

export default class App extends EmberApp {
  modules = {
    './router': { default: Router },
    ...import.meta.glob('./templates/**/*.gjs', { eager: true }),
  };
  inspector = setupInspector(this);
}
