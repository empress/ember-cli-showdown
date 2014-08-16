## ember-cli-showdown

This addon adds [markdown](http://en.wikipedia.org/wiki/Markdown) to HTML compilation in the form of a bound Handlebars helper.

### Installation / Usage

From within your Ember CLI application (must be > 0.0.34), run the following:

```bash
npm install --save-dev ember-cli-showdown
```

Once installed you can use it on any template

```handlebars
{{showdown-addon '#Markdown is cool [link](google.com)'}}
{{!-- or --}}
{{showdown-addon postContent}}
```

### References

* [Showdown](https://github.com/coreyti/showdown)
