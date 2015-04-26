import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleForComponent('markdown-to-html', 'MarkdownToHtmlComponent', {
  // specify the other units that are required for this test
  needs: ['component:markdown-to-html']
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});

test('it produces markdown', function() {
  expect(2);

  var component = this.subject();
  this.append();

  Ember.run(function() {
    component.set('markdown', '##Hello, [world](#)');
  });

  var expectedHtml = '<h2 id="helloworld">Hello, <a href="#">world</a></h2>';

  equal(component.get('html').toString(), expectedHtml);
  equal(component.$().html().toString().trim(), expectedHtml);
});

test('it inserts <br> tag', function() {
  expect(1);

  var component = this.subject();
  this.append();

  Ember.run(function() {
    component.set('markdown', 'foo  \nbar');
  });

  var expectedHtml = '<p>foo <br />\nbar</p>';

  equal(component.get('html').toString(), expectedHtml);
});
