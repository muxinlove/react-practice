import React, { Component } from 'react'
import { RouterContext } from './RouterContext.js'
// import { matchPath } from 'react-router-dom';
import matchPath from './matchPath.js';

export default class Route extends Component {
  render() {
    const { children, component, render, computedMatch, path } = this.props;
    return (
      <RouterContext.Consumer>
        {
          context => {
            // Route 分三种情况 children component render 
            // 三者都可以接收到history location match 所以將其作为porps传下去
            // Route 有个单独的属性location 可以自己传进来 所以先取本身props上的location属性
            const location = this.props.location || context.location;
            // matchPath 是源码中的一个UTIL方法 返回一个match对象
            const match = computedMatch ? computedMatch : path ? matchPath(location.pathname, this.props) : context.match;
            const props = {
              ...context,
              location,
              match
            }
            // 匹配判断
            // match 三者之一 或者 null
            // children 判断是函数还是节点
            // component 
            // 不match children 或者 null

            // Route 包一层最新的context 因为可能在其中加入了新的数据 比如match
            if (component) {
              console.log('component', component);
            }

            return <RouterContext.Provider value={props}>
              {
                match ? (
                  children ? (typeof children === 'function' ? children(props) : children) : (
                    component ? (React.createElement(component, props)) : (render ? render(props) : null)
                  )
                ) : (
                    (typeof children === 'function') ? children(props) : null
                  )
              }
            </RouterContext.Provider>
            // const match = context.location.pathname === path;
            // return match ? React.createElement(component, this.props) : null
          }
        }
      </RouterContext.Consumer>
    );
  }
}
