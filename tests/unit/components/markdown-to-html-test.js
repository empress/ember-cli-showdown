/* globals showdown */
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

  let component = this.subject();
  this.render();

  Ember.run(function() {
    component.set('markdown', '##Hello, [world](#)');
  });

  let expectedHtml = '<h2 id="helloworld">Hello, <a href="#">world</a></h2>';

  assert.equal(component.get('html').toString(), expectedHtml);
  assert.equal(component.$().html().toString().trim(), expectedHtml);
});

test('it inserts <br> tag', function(assert) {
  assert.expect(1);

  let component = this.subject();
  this.render();

  Ember.run(function() {
    component.set('markdown', 'foo  \nbar');
  });

  let expectedHtmlRegex = /<p>foo ?<br \/>\nbar<\/p>/;
  let actualHtml = component.get('html').toString();

  assert.ok(expectedHtmlRegex.test(actualHtml));
});

test('supports setting showdown options', function(assert) {
  assert.expect(1);

  let component = this.subject();
  this.render();

  Ember.run(function() {
    component.set('markdown', '# title\nI ~~dislike~~ enjoy visiting http://www.google.com');
    component.set('simplifiedAutoLink', true);
    component.set('headerLevelStart', 3);
    component.set('strikethrough', true);
  });

  let expectedHtml = '<h3 id="title">title</h3>\n<p>I <del>dislike</del> enjoy visiting <a href="http://www.google.com">http://www.google.com</a></p>';

  assert.equal(component.get('html').toString(), expectedHtml);
});

test('supports setting showdown options merged with global options', function(assert) {
  assert.expect(1);

  this.register('config:environment', {
    showdown: {
      simplifiedAutoLink: true
    }
  });

  let component = this.subject();
  this.render();

  Ember.run(function() {
    component.set('markdown', '# title\nI ~~dislike~~ enjoy visiting http://www.google.com');
    component.set('headerLevelStart', 3);
    component.set('strikethrough', true);
  });

  let expectedHtml = '<h3 id="title">title</h3>\n<p>I <del>dislike</del> enjoy visiting <a href="http://www.google.com">http://www.google.com</a></p>';

  assert.equal(component.get('html').toString(), expectedHtml);
});

test('it supports loading showdown extensions', function(assert) {
  assert.expect(1);

  showdown.extension("demo", function() {
    return [{
      type: "lang",
      regex: "this is an ember showdown!",
      replace() {
        return "no it isn't!";
      }
    }];
  });

  let component = this.subject({ extensions: ['demo'] });
  this.render();

  Ember.run(function() {
    component.set("markdown", "this is an ember showdown!");
  });

  let expectedHtml = "<p>no it isn't!</p>";
  assert.equal(component.get('html').toString(), expectedHtml);
});

test('does not reset default showdown options with undefined', function(assert) {
  assert.expect(1);

  let originalStrikeThroughValue = showdown.getOption('strikethrough');
  showdown.setOption('strikethrough', true);

  let component = this.subject();
  this.render();

  Ember.run(function() {
    component.set('markdown', '~~dislike~~');
  });

  let expectedHtml = '<p><del>dislike</del></p>';

  assert.equal(component.get('html').toString(), expectedHtml);

  showdown.setOption('strikethrough', originalStrikeThroughValue);
});


test('it supports loading showdown extensions', function(assert) {
  assert.expect(1);

  showdown.extension("demo", function() {
    return [{
      type: "lang",
      regex: /\sa\s/,
      replace() {
        return " an ember ";
      }
    }];
  });

  showdown.extension("excited", function() {
    return [{
      type: "lang",
      regex: /showdown/,
      replace() {
        return "showdown!";
      }
    }];
  });

  let component = this.subject({ extensions: 'demo excited' });
  this.render();

  Ember.run(function() {
    component.set("markdown", "this is a showdown");
  });

  let expectedHtml = "<p>this is an ember showdown!</p>";
  assert.equal(component.get('html').toString(), expectedHtml);
});


test('it does not munge code fences', function(assert) {
  assert.expect(1);

  let component = this.subject();
  this.render();

  Ember.run(function() {
    component.set("ghCodeBlocks", true);
    component.set("markdown", "```html\n<strong>hello</strong>\n<em>world</em>\n```");
  });

  let expectedHtml = "<pre><code class=\"html language-html\">&lt;strong&gt;hello&lt;/strong&gt;\n&lt;em&gt;world&lt;/em&gt;\n</code></pre>";
  assert.equal(component.get('html').toString(), expectedHtml);
});
