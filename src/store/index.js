import { createStore, combineReducers } from "redux";
import reducers from "../reducers/index.js";
// import { addTodo } from "../actions/index.js";

export const store = createStore(combineReducers(reducers));

// // 初始化状态
// console.log('初始化', store.getState());

// // 监听
// const unsubscribe = store.subscribe(() => {
//   console.log('subscribe', store.getState());
// })


// // dispatch
// store.dispatch(addTodo('新年第一件事'));

// // 解除监听
// unsubscribe();

// store.dispatch(addTodo('新年第二件事'));
