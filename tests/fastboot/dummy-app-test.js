import { module, test } from 'qunit';
import {
  setup,
  visit /* mockServer */,
} from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | dummy-app', function (hooks) {
  setup(hooks);

  test('it renders the dummy app properly', async function (assert) {
    await visit('/');

    assert.dom('h1').hasText('Markdown is cool link');
    assert.dom('a').hasAttribute('href', 'https://google.com');
  });
});
