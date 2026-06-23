import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { MarkdownToHtml } from 'ember-cli-showdown';

import showdown from 'showdown';

module('Integration | Component | markdown-to-html', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const markdown = '*hello world*';
    await render(
      <template><MarkdownToHtml @markdown={{markdown}} /></template>,
    );

    assert.strictEqual(
      this.element.querySelector('div').innerHTML.trim(),
      '<p><em>hello world</em></p>',
    );
  });

  test('it renders empty', async function (assert) {
    await render(<template><MarkdownToHtml /></template>);

    assert.strictEqual(this.element.innerText.trim(), '');
  });

  test('it produces markdown', async function (assert) {
    const markdown = '##Hello, [world](#)';
    await render(
      <template><MarkdownToHtml @markdown={{markdown}} /></template>,
    );

    let expectedHtml = '<h2 id="helloworld">Hello, <a href="#">world</a></h2>';

    assert.strictEqual(
      this.element.querySelector('div').innerHTML,
      expectedHtml,
    );
  });

  test('it inserts <br> tag', async function (assert) {
    const markdown = 'foo  \nbar';
    await render(
      <template><MarkdownToHtml @markdown={{markdown}} /></template>,
    );

    let actualHtml = this.element.querySelector('div').innerHTML;

    assert.strictEqual(actualHtml, '<p>foo<br>\nbar</p>');
  });

  test('supports setting showdown options', async function (assert) {
    const markdown =
      '# title\nI ~~dislike~~ enjoy visiting http://www.google.com';
    await render(
      <template>
        <MarkdownToHtml
          @markdown={{markdown}}
          @simplifiedAutoLink={{true}}
          @headerLevelStart={{3}}
          @strikethrough={{true}}
        />
      </template>,
    );

    let expectedHtml =
      '<h3 id="title">title</h3>\n<p>I <del>dislike</del> enjoy visiting <a href="http://www.google.com">http://www.google.com</a></p>';

    assert.strictEqual(
      this.element.querySelector('div').innerHTML,
      expectedHtml,
    );
  });

  test('supports setting showdown options merged with global options', async function (assert) {
    this.owner.register('config:environment', {
      showdown: {
        simplifiedAutoLink: true,
      },
    });

    const markdown =
      '# title\nI ~~dislike~~ enjoy visiting http://www.google.com';
    await render(
      <template>
        <MarkdownToHtml
          @markdown={{markdown}}
          @headerLevelStart={{3}}
          @strikethrough={{true}}
        />
      </template>,
    );

    let expectedHtml =
      '<h3 id="title">title</h3>\n<p>I <del>dislike</del> enjoy visiting <a href="http://www.google.com">http://www.google.com</a></p>';

    assert.strictEqual(
      this.element.querySelector('div').innerHTML,
      expectedHtml,
    );
  });

  test('it supports loading showdown extensions', async function (assert) {
    showdown.extension('demo', function () {
      return [
        {
          type: 'lang',
          regex: 'this is an ember showdown!',
          replace() {
            return "no it isn't!";
          },
        },
      ];
    });

    const markdown = 'this is an ember showdown!';
    await render(
      <template>
        <MarkdownToHtml @markdown={{markdown}} @extensions="demo" />
      </template>,
    );

    let expectedHtml = "<p>no it isn't!</p>";
    assert.strictEqual(
      this.element.querySelector('div').innerHTML,
      expectedHtml,
    );
  });

  test('does not reset default showdown options with undefined', async function (assert) {
    let originalStrikeThroughValue = showdown.getOption('strikethrough');
    showdown.setOption('strikethrough', true);

    const markdown = '~~dislike~~';
    await render(
      <template><MarkdownToHtml @markdown={{markdown}} /></template>,
    );

    let expectedHtml = '<p><del>dislike</del></p>';

    assert.strictEqual(
      this.element.querySelector('div').innerHTML,
      expectedHtml,
    );

    showdown.setOption('strikethrough', originalStrikeThroughValue);
  });

  test('it supports loading multiple showdown extensions', async function (assert) {
    showdown.extension('demo', function () {
      return [
        {
          type: 'lang',
          regex: /\sa\s/,
          replace() {
            return ' an ember ';
          },
        },
      ];
    });

    showdown.extension('excited', function () {
      return [
        {
          type: 'lang',
          regex: /showdown/,
          replace() {
            return 'showdown!';
          },
        },
      ];
    });

    const markdown = 'this is a showdown';
    await render(
      <template>
        <MarkdownToHtml @markdown={{markdown}} @extensions="demo excited" />
      </template>,
    );

    let expectedHtml = '<p>this is an ember showdown!</p>';
    assert.strictEqual(
      this.element.querySelector('div').innerHTML,
      expectedHtml,
    );
  });

  test('it does not mess with code fences', async function (assert) {
    const markdown = '```html\n<strong>hello</strong>\n<em>world</em>\n```';
    await render(
      <template>
        <MarkdownToHtml @markdown={{markdown}} @ghCodeBlocks={{true}} />
      </template>,
    );

    let expectedHtml =
      '<pre><code class="html language-html">&lt;strong&gt;hello&lt;/strong&gt;\n&lt;em&gt;world&lt;/em&gt;\n</code></pre>';
    assert.strictEqual(
      this.element.querySelector('div').innerHTML,
      expectedHtml,
    );
  });
});
