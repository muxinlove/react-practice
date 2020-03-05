import React from 'react';
import AppRouter from './routes/AppRouter.js'
import './App.css'
import './assest/iconfont/iconfont.css'
import './static/js/flexible.js'
import { store } from './store/index.js'
import { Provider } from 'react-redux'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
