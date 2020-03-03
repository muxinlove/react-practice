import React, { Component } from 'react'
import { RouterContext } from './RouterContext.js'
import { createBrowserHistory } from 'history'

export default class BrowserRouter extends Component {
  // 给初始化match数据
  static computeRootMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  }
  constructor(props) {
    super(props);
    // 创建history 比浏览器中的history优化过的
    this.history = createBrowserHistory();
    this.state = {
      location: this.history.location
    }
    // 监听history变化
    this.unListen = this.history.listen(location => {
      this.setState({ location });
    })
  }
  componentWillUnmount() {
    if (this.unListen) {
      this.unListen();
    }
  }
  render() {
    const { history } = this;
    const { location } = this.state;
    const context = {
      history,
      location,
      match: BrowserRouter.computeRootMatch(location.pathname)
    }
    return <RouterContext.Provider value={context}>
      {this.props.children}
    </RouterContext.Provider>;
  }
}
