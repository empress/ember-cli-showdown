import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('markdown-to-html', 'Unit | Component | markdown to html', {
  unit: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render();
  assert.equal(this.$().text().trim(), '');
});

test('it produces markdown', function(assert) {
  assert.expect(2);

  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.set('markdown', '##Hello, [world](#)');
  });

  var expectedHtml = '<h2 id="helloworld">Hello, <a href="#">world</a></h2>';

  assert.equal(component.get('html').toString(), expectedHtml);
  assert.equal(component.$().html().toString().trim(), expectedHtml);
});

test('it inserts <br> tag', function(assert) {
  assert.expect(1);

  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.set('markdown', 'foo  \nbar');
  });

  var expectedHtml = '<p>foo <br />\nbar</p>';

  assert.equal(component.get('html').toString(), expectedHtml);
});
