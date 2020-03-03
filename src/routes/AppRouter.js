import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../pages/Home.js'
import Search from '../pages/Search.js'
import Cart from '../pages/Cart.js'
import Personal from '../pages/Personal.js'
import PrivateRoute from '../components/PrivateRoute/PrivateRoute.js'

export default class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/home' component={Home}></Route>
          <Route path='/search' component={Search}></Route>
          <Route path='/cart' component={Cart}></Route>
          {/* 守卫personal */}
          <PrivateRoute path='/personal' component={Personal}></PrivateRoute>
        </Switch>
      </Router>
    )
  }
}
