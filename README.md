## ember-cli-showdown

This addon adds [markdown](http://en.wikipedia.org/wiki/Markdown) to HTML compilation in the form of a simple component.

### Installation / Usage

From within your Ember CLI application, run the following:

```
ember install:npm ember-cli-showdown
# or
npm install --save-dev ember-cli-showdown
```

Once installed you can use it on any template

```
{{markdown-to-html markdown='#Markdown is cool [link](http://emberjs.com)'}}
{{!-- or --}}
{{showdown-addon markdown=postContent}}
```

### References
* [Showdown](https://github.com/coreyti/showdown)
