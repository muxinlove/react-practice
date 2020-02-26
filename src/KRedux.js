let currentState = undefined;
export function createStore(reducer, enhancer) {
  // 增强 中间件是对store中api的增强或者其他操作（lg:logger 日志）
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  const currentListeners = [];
  const currentUnSubscribe = {};

  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.forEach(listener => listener());
  }
  // 订阅 可以多次订阅
  function subscribe(listener) {
    // 將监听回调函数存储起来
    currentListeners.push(listener);
    const unSubscribe = unSubscribeFactory();
    currentUnSubscribe[unSubscribe] = currentListeners.length - 1;
    return unSubscribe;
  }

  function unSubscribeFactory() {
    function unSubscribeFun() {
      const newIndex = currentUnSubscribe[unSubscribeFun];
      currentListeners.splice(newIndex, 1)
    }
    return unSubscribeFun;
  }

  // 初始化state 保证type不与项目中重复 可用随机串代替
  dispatch({ type: '@INIT/REDUX-KKB' });

  return {
    getState,
    dispatch,
    subscribe
  }
}

export function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer);
    const { getState } = store;
    let dispatch = store.dispatch;
    //
    const middleApi = {
      getState,
      dispatch
    }
    // 中间件链  给中间件参数 比如说dispatch
    const middlewaresChain = middlewares.map(middleware => middleware(middleApi));

    // 函数组合
    dispatch = compose(...middlewaresChain)(dispatch)

    return {
      ...store,

      // 覆盖dispatch方法
      dispatch
    }
  }
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export function combineReducers(reducers) {
  return (state = {}, action) => {
    // reduce 参数2 为第一个回调函数的参数1 的默认值 （nextState 默认为 {}）
    return Object.keys(reducers).reduce((nextState, key) => {
      // 调用每一个 reducer 并将其管理的部分 state 传给它
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  }
}