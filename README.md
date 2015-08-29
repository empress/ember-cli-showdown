# Ember CLI Showdown

[![Build Status](https://travis-ci.org/gcollazo/ember-cli-showdown.svg?branch=master)](https://travis-ci.org/gcollazo/ember-cli-showdown) [![Ember Observer Score](http://emberobserver.com/badges/ember-cli-showdown.svg)](http://emberobserver.com/addons/ember-cli-showdown)

This addon provides a component that transforms [Markdown](http://en.wikipedia.org/wiki/Markdown) into valid HTML.

![Screenshot](http://x.gcollazo.com/GS2zhpEpde.gif)

## Usage
From within your Ember CLI application, run the following:

- `ember install:addon ember-cli-showdown`

Passing a makrdown string inline:

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
