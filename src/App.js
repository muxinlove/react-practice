import React from 'react';
import './App.css';
// import ReactReduxPage from './pages/ReactReduxPage.js'
// import ReactRouterPage from './pages/ReactRouterPage.js'
import ReactRouterWithLoginPage from './pages/ReactRouterWithLoginPage.js'

function App() {
  // const [num, setNum] = useState(0);
  return (
    <div className="App">
      {/* <button onClick={() => setNum(num + 1)}>change num</button> */}
      {/* react-redux */}
      {/* <ReactReduxPage num={num} /> */}

      {/* router学习 */}
      {/* <ReactRouterPage /> */}

      {/* 登陆登出 */}
      <ReactRouterWithLoginPage />

    </div>
  );
}

export default App;
