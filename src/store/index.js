import { createStore, combineReducers, applyMiddleware } from "redux"
// import logger from 'redux-logger'
import createSagaMiddleware from "redux-saga"
import { rootSaga } from '../actions/rootSaga.js'

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

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(combineReducers({
  status: statusReducer,
  base: baseReducer
}),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

