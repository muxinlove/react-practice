import React from 'react';
import './App.css';
// import ReduxPage from "./pages/ReduxPage.js";
// import ReactReduxPage from "./pages/ReactReduxPage.js";
import HookPage from "./pages/HookPage.js";
import HookCallbackPage from "./pages/HookCallbackPage.js";

function App() {
  return (
    <div className="App">
      {/* redux */}
      {/* <ReduxPage /> */}

      {/* react-redux */}
      {/* <ReactReduxPage /> */}

      {/* hook */}
      {/* <HookPage /> */}
      <HookCallbackPage />
    </div>
  );
}

export default App;
