import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | markdown-to-html', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('markdown', '*hello world*');
    await render(hbs`{{markdown-to-html markdown}}`);

    assert.equal(this.element.querySelector('div').innerHTML.trim(), '<p><em>hello world</em></p>');
  });
});
