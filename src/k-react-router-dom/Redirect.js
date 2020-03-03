import React, { Component } from 'react'
import { RouterContext } from './RouterContext.js'

// static 可以使用生命周期
// export default class Redirect extends Component {
//   static contextType = RouterContext;
//   componentDidMount() {
//     let { to } = this.props;
//     const { history } = this.context;
//     if (typeof to === 'string') {
//       to = { pathname: to };
//     }
//     history.push(to);
//   }
//   render() {
//     return null;
//   }
// }

// consumer 消费者 生命周期 能用一个组件表示
export default class Redirect extends Component {
  render() {
    return <RouterContext.Consumer>
      {
        context => {
          let { to } = this.props;
          const { history } = context;
          // router 源码是把to 转换为一个location对象 这边比较简单 就认为是一个location对象吧
          if (typeof to === 'string') {
            to = { pathname: to };
          }
          return <LifeCycle onMount={() => history.push(to)}></LifeCycle>
        }
      }
    </RouterContext.Consumer>;
  }
}

class LifeCycle extends Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount();
    }
  }
  render() {
    return null;
  }
}



