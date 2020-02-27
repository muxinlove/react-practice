/**
 * 路由守卫
 */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const mapStateToProps = ({ baseInfo }) => ({
  isLogin: baseInfo.isLogin
})

export default connect(
  mapStateToProps
)(
  class PrivateRouter extends Component {
    render() {
      const { path, component, isLogin } = this.props;
      if (isLogin) {
        return <Route path={path} component={component} />
      } else {
        // 没有登陆 跳转 并且存储当前path
        return <Redirect to={{ pathname: '/login', state: { redirect: path } }} />
      }
    }
  }
)
