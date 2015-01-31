# Ember CLI Showdown [![Build Status](https://travis-ci.org/gcollazo/ember-cli-showdown.svg?branch=master)](https://travis-ci.org/gcollazo/ember-cli-showdown)

This addon adds [markdown](http://en.wikipedia.org/wiki/Markdown) to HTML compilation in the form of a simple component.

## Usage
From within your Ember CLI application, run the following:

- `ember install:addon ember-cli-showdown`
- `ember generate ember-cli-showdown`

Passing a makrdown string inline:

```handlebars
{{markdown-to-html markdown='#Markdown is cool [link](http://emberjs.com)'}}
```

Passing a bound markdown value:

```handlebars
{{showdown-addon markdown=postContent}}
```

## Dependencies
* [Showdown](https://github.com/coreyti/showdown)

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
