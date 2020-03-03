import { createStore, combineReducers, applyMiddleware } from "redux"
import logger from 'redux-logger'

const statusDefault = {
  showLogin: false
}

const baseDefault = {
  isLogin: false
}

const statusReducer = (state = statusDefault, action) => {
  switch (action.type) {
    case 'SHOWLOGIN':
      return {
        showLogin: true
      }
    case 'HIDELOGIN':
      return {
        showLogin: false
      }
    default:
      return state;
  }
}

const baseReducer = (state = baseDefault, action) => {
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

export const store = createStore(combineReducers({
  status: statusReducer,
  base: baseReducer
}),
  applyMiddleware(logger)
)

