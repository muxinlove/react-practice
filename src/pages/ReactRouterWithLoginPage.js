import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import HomePage from './HomePage.js'
import UserPage from './UserPage.js'
import LoginPage from './LoginPage.js'
import PrivateRouter from './PrivateRouter.js'


export default class ReactRouterWithLoginPage extends Component {
  render() {
    return (
      <div>
        <Router>
          <Link to='/'>首页</Link>{' '}
          <Link to='/user'>用户中心</Link> {' '}
          <Link to='/login'>登陆</Link>{' '}

          <Switch>
            <Route exact path='/' component={HomePage}></Route>
            {/* 路由守卫 UserPage */}
            <PrivateRouter path='/user' component={UserPage}></PrivateRouter>
            <Route path='/login' component={LoginPage}></Route>
            <Route render={() => <div>404page</div>}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
