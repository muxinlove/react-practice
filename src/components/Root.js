import React from 'react'

// redux
import { store } from '../store/index.js'
import { Provider } from 'react-redux'
import App from './App.js'

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
