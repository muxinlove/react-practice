import React, { useState } from 'react';
import './App.css';
import ReactReduxPage from './pages/ReactReduxPage.js'

function App() {
  const [num, setNum] = useState(0);
  return (
    <div className="App">
      <button onClick={() => setNum(num + 1)}>change num</button>
      {/* react-redux */}
      <ReactReduxPage num={num} />
    </div>
  );
}

export default App;
