import React, { Component } from 'react'
import { RouterContext } from './RouterContext'
import matchPath from './matchPath';

export default class Switch extends Component {
  render() {
    return <RouterContext.Consumer>
      {
        context => {
          // 遍历子元素 找出渲染的，第一个符合匹配的元素，存储在element中
          let element, match;
          const { children } = this.props;
          // const { location } = context;
          const location = this.props.location || context.location;
          // this.props.children 多个子元素 数组 / 单个节点 对象 ， 如果用数组形式 则需要处理对象形式 所以用React.Children api
          React.Children.forEach(children, child => {
            // 全部渲染的
            if (!match && React.isValidElement(child)) {
              // 第一条符合match的
              element = child;
              const { path } = child.props;
              // 确定path 是否存在 不存在比如 404页面
              match = path ? matchPath(location.pathname, { ...child.props }) : context.match;
            }
          })

          // 最好是clone
          // cloneElement(element, optionProps) 第一个参数是组件
          // createElement(type, props) 第一个参数是组件或者节点的type
          // console.log('element', element);
          // return match ? React.createElement(element.type, { ...element.props, location, computedMatch: match }) : null
          return match ? React.cloneElement(element, { location, computedMatch: match }) : null
        }
      }
    </RouterContext.Consumer>
  }
}
