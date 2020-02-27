import { createStore, combineReducers } from 'redux'

function countReducer(state = 0, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'MINUS':
      return state - 1;
    default:
      return state;
  }
}

const initialState = {
  isLogin: false
};
function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        isLogin: true
      }
    case 'LOGOUT':
      return {
        isLogin: false
      }
    default:
      return state;
  }
}

const store = createStore(combineReducers({
  baseInfo: loginReducer,
  count: countReducer
}));

export default store;