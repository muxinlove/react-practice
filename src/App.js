import React from 'react';
// import ContextPage from './pages/ContextPage.js';
import ReduxPage from './pages/ReduxPage.js';
import './App.css';


function f1(arg) {
  console.log('f1', arg);
  return arg;
}

function f2(arg) {
  console.log('f2', arg);
  return arg;
}

function f3(arg) {
  console.log('f3', arg);
  return arg;
}

// const res = f1(f2(f3('xxx')));
// console.log('res', res);

// const res = compose(f1, f2, f3)('xxx');
// console.log('res', res);


// 组合函数 將函数的返回值 传递给上一个函数
// function compose(...funcs) {
//   if (funcs.length === 0) {
//     return arg => arg;
//   }

//   if (funcs.length === 1) {
//     return funcs[0];
//   }

//   return funcs.reduce((a, b) => (...args) => a(b(...args)));
// }


function App() {
  return (
    <div className="App">
      {/* context */}
      {/* <ContextPage /> */}

      {/* redux */}
      <ReduxPage />
    </div>
  );
}

export default App;
