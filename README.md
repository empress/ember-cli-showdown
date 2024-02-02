# ember-cli-showdown

[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-showdown.svg)](http://emberobserver.com/addons/ember-cli-showdown)

This addon provides a component that transforms [Markdown](http://en.wikipedia.org/wiki/Markdown) into valid HTML.

* Fastboot compatible

## Compatibility

* Ember.js v3.16 or above
* Ember CLI v3.16 or above
* Node.js v16 or above

## Installation

- `ember install ember-cli-showdown`

## Usage

Passing a markdown string inline:

```handlebars
<MarkdownToHtml @markdown={{"#Markdown is cool [link](http://emberjs.com)"}} />
```

```html
<!-- Output -->
<h1>Markdown is cool <a href="http://emberjs.com">link</a></h1>
```

You can also pass a bound value:

```handlebars
<MarkdownToHtml @markdown={{postContent}} />
```

### Showdown Options

You can use [configuration settings from Showdown][showdown-config]:

```handlebars
<MarkdownToHtml
  @markdown={{postContent}}
  @strikethrough={{true}}
  @literalMidWordUnderscores={{true}}
  @simplifiedAutoLink={{true}}
/>
```

[showdown-config]: https://github.com/showdownjs/showdown#valid-options

#### Global Showdown Options

Global options are supported as of 2.11.x.  This lets you define options that will be used
for showdown options that were not provided as an attribute.

An example where you always want to auto link:

```js
// config/environment.js
module.exports = function(environment) {
  var ENV = {
    showdown: {
      simplifiedAutoLink: true
    }
  }

  return ENV;
}
```

### Showdown Extensions

You can load [Showdown Extensions](https://github.com/showdownjs/showdown/wiki/extensions) by specifying the
"extensions" property when initializing your component:

```handlebars
<MarkdownToHtml
  @markdown={{postContent}}
  @extensions={{myExtensionList}}
/>
```

```handlebars
<MarkdownToHtml
  @markdown={{postContent}}
  @extensions={{'foo bar baz'}}
/>
```

(`myExtensionList` can be an array of strings or a space separated string)

Note that you'll have to register your extensions with Showdown first.
For example, in an initializer:

```js
// app/initializers/register-showdown-extensions.js
import showdown from 'showdown';

export function initialize() {
  showdown.extension("myExtensionName", function() {
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

## 3.x to 4.3 migration

* Global `showdown` is no longer supported.  Must be imported via `import showdown from 'showdown'`
* Remove any use of `FastBoot.require('require')` with `import showdown from 'showdown'`

## 7.x to 8.x migration

* Positional parameters are no longer supported. Use the `@markdown` argument to provide the markdown content to `<MarkdownToHtml />`.

## Dependencies
* [Showdown](https://github.com/showdownjs/showdown)

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
