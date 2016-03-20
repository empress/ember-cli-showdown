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

test('it produces markdown from a Handlebars sub-expression', function(assert) {
  assert.expect(2);

  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.set('markdown', ['##Hello, [world](#)']);
  });

  var expectedHtml = '<h2 id="helloworld">Hello, <a href="#">world</a></h2>';

  assert.equal(component.get('html').toString(), expectedHtml);
  assert.equal(component.$().html().toString().trim(), expectedHtml);
});

test('it produces markdown from a Handlebars sub-expression that returns a SafeString', function(assert) {
  assert.expect(2);

  var component = this.subject();
  this.render();

  Ember.run(function() {
    component.set('markdown', Ember.String.htmlSafe('##Hello, <em>strange</em>[world](#)'));
  });

  var expectedHtml = '<h2 id="helloemstrangeemworld">Hello, <em>strange</em><a href="#">world</a></h2>';

  assert.equal(component.get('html').toHTML(), expectedHtml);
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

test('supports setting showdown options', function(assert) {
  assert.expect(1);

  var component = this.subject();
  this.append();

  Ember.run(function() {
    component.set('markdown', '# title\nI ~~dislike~~ enjoy visiting http://www.google.com');
    component.set('simplifiedAutoLink', true);
    component.set('headerLevelStart', 3);
    component.set('strikethrough', true);
  });

  var expectedHtml = '<h3 id="title">title</h3>\n\n<p>I <del>dislike</del> enjoy visiting <a href="http://www.google.com">http://www.google.com</a></p>';

  assert.equal(component.get('html').toString(), expectedHtml);
});

test('it supports loading showdown extensions', function(assert) {
  assert.expect(1);

  window.showdown.extension("demo", function() {
    return [{
      type: "lang",
      regex: "this is an ember showdown!",
      replace: function() {
        return "no it isn't!";
      }
    }];
  });

  var component = this.subject({ extensions: ['demo'] });
  this.append();

  Ember.run(function() {
    component.set("markdown", "this is an ember showdown!");
  });

  var expectedHtml = "<p>no it isn't!</p>";
  assert.equal(component.get('html').toString(), expectedHtml);

});
