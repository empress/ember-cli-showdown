# Ember CLI Showdown

[![Build Status](https://travis-ci.org/gcollazo/ember-cli-showdown.svg?branch=master)](https://travis-ci.org/gcollazo/ember-cli-showdown) [![Ember Observer Score](http://emberobserver.com/badges/ember-cli-showdown.svg)](http://emberobserver.com/addons/ember-cli-showdown)

This addon provides a component that transforms [Markdown](http://en.wikipedia.org/wiki/Markdown) into valid HTML.

![Screenshot](http://x.gcollazo.com/GS2zhpEpde.gif)

## Usage
From within your Ember CLI application, run the following:

- `ember install ember-cli-showdown`

Passing a markdown string inline:

```handlebars
{{markdown-to-html markdown="#Markdown is cool [link](http://emberjs.com)"}}
```

```html
<!-- Output -->
<h1>Markdown is cool <a href="http://emberjs.com">link</a></h1>
```

You can also pass a bound value:

```handlebars
{{markdown-to-html markdown=postContent}}
```

### Showdown Options

You can use [configuration settings from Showdown][showdown-config]:

```handlebars
{{markdown-to-html
  markdown=postContent
  strikethrough=true
  literalMidWordUnderscores=true
  simplifiedAutoLink=true}}
```

[showdown-config]: https://github.com/showdownjs/showdown#valid-options

### Showdown Extensions

You can load [Showdown Extensions](showdown-extensions) by specifying the
"extensions" property when initializing your component:

```handlebars
{{markdown-to-html
  markdown=postContent
  extensions=myExtensionList}}
```
(`myExtensionList` should be an array of extension names as strings)

Note that you'll have to register your extensions with Showdown first.
For example, in an initializer:

```js
// app/initializers/register-showdown-extensions.js

export function initialize() {
  window.showdown.extension("myExtensionName", function() {
    return [{
      type: 'html',
      regex: '<blockquote>',
      replace: '<blockquote class="blockquote">'
    }];
  });
}

export default {
  name: 'register-showdown-extensions',
  initialize
};
```

[showdown-extensions]: https://github.com/showdownjs/showdown/wiki/extensions

## Dependencies
* [Showdown](https://github.com/showdownjs/showdown)

## Development

* `git clone https://github.com/gcollazo/ember-cli-showdown.git`
* `cd ember-cli-showdown`
* `npm install`
* `bower install`

## Previewing

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`
