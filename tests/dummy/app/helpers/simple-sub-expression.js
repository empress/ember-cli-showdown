import Ember from 'ember';

export function simpleSubExpression(params/*, hash*/) {
  return params[0];
}

export default Ember.Helper.helper(simpleSubExpression);
