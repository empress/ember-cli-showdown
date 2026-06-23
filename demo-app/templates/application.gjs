import { Textarea } from '@ember/component';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { MarkdownToHtml } from 'ember-cli-showdown';
import RouteTemplate from 'ember-route-template';

class ApplicationRoute extends Component {
  @tracked
  editableText = '**TODO** _edit me_';

  <template>
    <h1 id="title">ember-cli-showdown demo</h1>

    <label id="input-label">
      Live content:
    </label>

    <div class="split-view">
      <Textarea aria-labelledby="input-label" @value={{this.editableText}} />
      <MarkdownToHtml @markdown={{this.editableText}} />
    </div>

    <hr />
    Inline content:

    <MarkdownToHtml
      @markdown="## Markdown is cool [link](https://google.com)"
    />

    {{outlet}}
  </template>
}

export default RouteTemplate(ApplicationRoute);
