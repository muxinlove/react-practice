import { createStore } from "redux";

// 初始化state 并且 定义state修改规则
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1;
    case 'MINUS':
      return state + 1;
    default:
      return state;
  }
}
export const store = createStore(counterReducer);