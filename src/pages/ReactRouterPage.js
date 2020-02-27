import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import HomePage from './HomePage.js'
import UserPage from './UserPage.js'
import LoginPage from './LoginPage.js'


export default class ReactRouterPage extends Component {
  render() {
    return (
      <div>
        <h3>ReactRouterPage</h3>
        <Router>
          <Link to='/'>首页</Link>{' '}
          <Link to='/user'>用户中心</Link> {' '}
          <Link to='/login'>登陆</Link>{' '}
          <Link to='/search/123'>搜索</Link>

          {/* Route 一定要放在Router中, 因为Route要使用history和location，这些来自于Router */}
          {/* path 如果不指定 则一直显示 */}
          {/* exact 精确匹配  */}
          {/* Switch只有一个显示 如果path='/'不使用exact 则路由不会变化 */}

          {/* 渲染顺序 children > component > render */}
          {/* component 可以使用匿名函数 但是不能用 是因为底层实现 使用React.createElement 导致每次返回的都是新组件，会一直卸载挂载，影响性能 */}
          {/* !! 如果想使用匿名函数 使用children 或者 render的形式  */}
          <Switch>
            <Route exact path='/' component={HomePage}></Route>
            <Route path='/user' component={UserPage}></Route>
            <Route path='/login' component={LoginPage}></Route>
            <Route path='/search/:id' component={SearchComponent}></Route>

            <Route render={() => <div>404page</div>}></Route>
          </Switch>

          {/* children 不管location是否匹配 都会去渲染 */}
          <Route
            path='/children'
            children={() => <div>children</div>}
          />

        </Router>
      </div>
    )
  }
}

function DetailComponent(props) {
  console.log('DetailPage-props', props);

  return (
    <div>DetailPage</div>
  )
}


function SearchComponent(props) {
  const { id } = props.match.params;
  return (
    <div>
      <div>SearchPage - {id}</div>
      <div>
        <Link to={`/search/${id}/detail`}>详情</Link>
        <Route path={'/search/:id/detail'} component={DetailComponent}></Route>
      </div>
    </div>
  )
}
