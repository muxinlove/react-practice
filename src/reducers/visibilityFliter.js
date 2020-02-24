import { SET_VISIBILITY_FILTER } from "../actionTypes";

export function visibilityFliter(state = 'all', action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}