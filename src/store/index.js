// import { createStore, applyMiddleware } from "redux";
import { createStore, applyMiddleware, combineReducers } from "../KRedux.js";
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';

const countReducer = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    case 'MINUS':
      return state - action.payload;
    default:
      return state;
  }
}
const rootReduce = combineReducers({
  count: countReducer
})
const store = createStore(rootReduce, applyMiddleware(thunk, logger));

export default store;

function logger() {
  return dispatch => action => {
    console.log(action.type + '执行了');
    return dispatch(action);
  }
}

function thunk({ getState }) {
  return dispatch => action => {
    // action 可以是对象 可以是函数 不同类型 操作不同
    if (typeof action === 'function') {
      return action(dispatch, getState);
    } else {
      return dispatch(action);
    }
  }
}
