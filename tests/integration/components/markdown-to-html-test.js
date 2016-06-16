import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('markdown-to-html', 'Integration | Component | markdown to html', {
  integration: true
});

test('positional parameter', function(assert) {
  assert.expect(1);

  this.set('markdown', '*hello world*');
  this.render(hbs`{{markdown-to-html markdown}}`);
  assert.equal(this.$('> *').html(), '<p><em>hello world</em></p>');
});
