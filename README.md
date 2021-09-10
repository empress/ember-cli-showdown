ember-cli-showdown
==============================================================================

[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-showdown.svg)](http://emberobserver.com/addons/ember-cli-showdown)

This addon provides a component that transforms [Markdown](http://en.wikipedia.org/wiki/Markdown) into valid HTML.

* Fastboot compatible

## Requirements

* ember-cli >= 2.16.0 (if on older version of ember-cli, target ember-cli-showdown@3)

## Usage
From within your Ember CLI application, run the following:

- `ember install ember-cli-showdown`

Passing a markdown string inline:

```handlebars
{{markdown-to-html "#Markdown is cool [link](http://emberjs.com)"}}
```

```html
<!-- Output -->
<h1>Markdown is cool <a href="http://emberjs.com">link</a></h1>
```

You can also pass a bound value:

```handlebars
{{markdown-to-html postContent}}
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
{{markdown-to-html
  markdown=postContent
  extensions=myExtensionList}}
```

```handlebars
{{markdown-to-html
  markdown=postContent
  extensions='foo bar baz'}}
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

## Dependencies
* [Showdown](https://github.com/showdownjs/showdown)

## Development

* `git clone git@github.com:ember-cli/ember-addon-output.git` this repository
* `cd ember-cli-showdown`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `npm test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## License

This project is licensed under the [MIT License](LICENSE.md).
