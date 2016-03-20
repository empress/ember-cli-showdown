import Ember from 'ember';

export function sample(params/*, hash*/) {
  return Ember.String.htmlSafe(params);
}

export default Ember.Helper.helper(sample);
