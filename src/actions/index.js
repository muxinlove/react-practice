import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER } from "../actionTypes/index";

let nextTodoId = 0;

// action 创建函数
/**
 * 添加todo
 */
export function addTodo(text) {
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text
  }
}

/**
 * 切换todo状态
 */
export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id
  }
}

/**
 * 设置显示状态
 */
export function setVisibilityFliter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}
