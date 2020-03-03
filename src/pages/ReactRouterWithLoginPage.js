import React, { Component } from 'react'
import HomePage from './HomePage.js'
import UserPage from './UserPage.js'
import LoginPage from './LoginPage.js'
import PrivateRouter from './PrivateRouter.js'

// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import BrowserRouter from '../k-react-router-dom/BrowserRouter.js'
import Route from '../k-react-router-dom/Route.js'
import Link from '../k-react-router-dom/Link.js'
import Switch from '../k-react-router-dom/Switch.js'


export default class ReactRouterWithLoginPage extends Component {
  render() {
    return (
      <div>
        {/* 二级目录 basename="/kkb" */}
        <BrowserRouter>
          <Link to='/'>首页</Link>{' '}
          <Link to='/user'>用户中心</Link> {' '}
          <Link to='/children'>children</Link> {' '}
          <Link to='/render'>render</Link> {' '}
          <Link to='/search/123'>搜索</Link> {' '}
          <Link to='/login'>登陆</Link>{' '}

          {/* Switch 可以传一个location属性  location={{ pathname: '/' }} */}
          <Switch>
            <Route exact path='/' component={HomePage}></Route>
            {/* <Route path='/user' component={UserPage}></Route> */}
            {/* 路由守卫 UserPage */}
            <PrivateRouter path='/user' component={UserPage}></PrivateRouter>
            <Route path='/children' children={() => <div>children</div>}></Route>
            <Route path='/render' render={() => <div>render</div>}></Route>
            <Route path='/search/:id' component={SearchComponent}></Route>
            <Route path='/login' component={LoginPage}></Route>
            {/* 404页面 */}
            <Route render={() => <div>404页面</div>}></Route>
          </Switch>

        </BrowserRouter>
      </div>
    )
  }
}

function SearchComponent(props) {
  const { id } = props.match.params;
  return <div>
    <div>SearchComponent-{id}</div>
    <Link to='/search/123/detail'>详情 </Link>
    <Route path="/search/:id/detail" component={DetailComponent}></Route>
  </div>
}

function DetailComponent() {
  return <div>
    <div>DetailComponent</div>
  </div>
}
