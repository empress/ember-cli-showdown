import Ember from 'ember';

export function safestringSubExpression(params/*, hash*/) {
  return Ember.String.htmlSafe(params);
}

export default Ember.Helper.helper(safestringSubExpression);
