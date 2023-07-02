/* eslint-disable prettier/prettier */
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import showdown from 'showdown';

module('Integration | Component | markdown-to-html', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('markdown', '*hello world*');
    await render(hbs`{{markdown-to-html this.markdown}}`);

    assert.strictEqual(this.element.querySelector('div').innerHTML.trim(), '<p><em>hello world</em></p>');
  });

  test('it renders empty', async function(assert) {
    await render(hbs`<MarkdownToHtml />`);

    assert.strictEqual(
      this.element
        .innerText
        .trim(),
      ''
    );
  });

  test('it produces markdown', async function(assert) {
    this.markdown = '##Hello, [world](#)';
    await render(hbs`{{markdown-to-html this.markdown}}`);

    let expectedHtml = '<h2 id="helloworld">Hello, <a href="#">world</a></h2>\n';

    assert.strictEqual(
      this
        .element
        .querySelector('div')
        .innerHTML,
      expectedHtml
    );
  });

  test('it inserts <br> tag', async function(assert) {
    this.markdown = 'foo  \nbar';
    await render(hbs`{{markdown-to-html this.markdown}}`);

    let actualHtml = this.element.querySelector('div').innerHTML;

    assert.strictEqual(actualHtml, '<p>foo<br>\nbar</p>\n');
  });

  test('supports setting showdown options', async function(assert) {
    assert.expect(1);

    this.markdown = '# title\nI ~~dislike~~ enjoy visiting http://www.google.com';
    await render(hbs`{{markdown-to-html this.markdown simplifiedAutoLink=true headerLevelStart=3 strikethrough=true}}`);

    let expectedHtml =
      '<h3 id="title">title</h3>\n<p>I <del>dislike</del> enjoy visiting <a href="http://www.google.com">http://www.google.com</a></p>\n';

    assert.strictEqual(this.element.querySelector('div').innerHTML, expectedHtml);
  });

  test('supports setting showdown options merged with global options', async function(assert) {
    assert.expect(1);

    this.owner.register('config:environment', {
      showdown: {
        simplifiedAutoLink: true
      }
    });

    this.markdown = '# title\nI ~~dislike~~ enjoy visiting http://www.google.com';
    await render(hbs`{{markdown-to-html this.markdown headerLevelStart=3 strikethrough=true}}`);

    let expectedHtml =
      '<h3 id="title">title</h3>\n<p>I <del>dislike</del> enjoy visiting <a href="http://www.google.com">http://www.google.com</a></p>\n';

    assert.strictEqual(this.element.querySelector('div').innerHTML, expectedHtml);
  });

  test('it supports loading showdown extensions', async function(assert) {
    assert.expect(1);

    showdown.extension('demo', function() {
      return [
        {
          type: 'lang',
          regex: 'this is an ember showdown!',
          replace() {
            return "no it isn't!";
          }
        }
      ];
    });

    this.markdown =  'this is an ember showdown!'
    await render(hbs`<MarkdownToHtml @markdown={{this.markdown}} @extensions="demo" />`);

    let expectedHtml = "<p>no it isn't!</p>\n";
    assert.strictEqual(this.element.querySelector('div').innerHTML, expectedHtml);
  });

  test('does not reset default showdown options with undefined', async function(assert) {
    assert.expect(1);

    let originalStrikeThroughValue = showdown.getOption('strikethrough');
    showdown.setOption('strikethrough', true);

    this.markdown =  '~~dislike~~';
    await render(hbs`<MarkdownToHtml @markdown={{this.markdown}} />`);


    let expectedHtml = '<p><del>dislike</del></p>\n';

    assert.strictEqual(this.element.querySelector('div').innerHTML, expectedHtml);

    showdown.setOption('strikethrough', originalStrikeThroughValue);
  });

  test('it supports loading multiple showdown extensions', async function(assert) {
    assert.expect(1);

    showdown.extension('demo', function() {
      return [
        {
          type: 'lang',
          regex: /\sa\s/,
          replace() {
            return ' an ember ';
          }
        }
      ];
    });

    showdown.extension('excited', function() {
      return [
        {
          type: 'lang',
          regex: /showdown/,
          replace() {
            return 'showdown!';
          }
        }
      ];
    });

    this.markdown =  'this is a showdown';
    await render(hbs`<MarkdownToHtml @markdown={{this.markdown}} @extensions="demo excited" />`);

    let expectedHtml = '<p>this is an ember showdown!</p>\n';
    assert.strictEqual(this.element.querySelector('div').innerHTML, expectedHtml);
  });

  test('it does not mess with code fences', async function(assert) {
    assert.expect(1);

    this.markdown =  '```html\n<strong>hello</strong>\n<em>world</em>\n```';
    await render(hbs`<MarkdownToHtml @markdown={{this.markdown}} @ghCodeBlocks={{true}} />`);

    let expectedHtml =
      '<pre><code class="html language-html">&lt;strong&gt;hello&lt;/strong&gt;\n&lt;em&gt;world&lt;/em&gt;\n</code></pre>\n';
    assert.strictEqual(this.element.querySelector('div').innerHTML, expectedHtml);
  });
});
